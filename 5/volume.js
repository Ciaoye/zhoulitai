/* 卷宗呈现 · 互动翻卷组件 v2（性能版）
 * 变更（2026-10-28）：缩略图改用 th/ 小图（约 15KB/张，替代 60-130KB 原图）；
 * 主图与缩略图均懒加载；翻页时预取相邻页；图片渐入。
 *
 * 用法：页面内嵌 <script id="vol-pages" type="application/json">{...}</script>
 *   { "dir": "assets/xxx", "parts": [{"t":"段落名","pages":["G17",...]}, ...] }
 *   页标题放 "titles": {"G17": "..."}（或另嵌 vol-titles JSON）。
 * 挂载点 <div class="vol" id="vol"></div>，然后引入本脚本。
 */
(function () {
  function init() {
    var host = document.getElementById('vol');
    var dataEl = document.getElementById('vol-pages');
    if (!host || !dataEl) return;
    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { console.error('vol-pages JSON 解析失败', e); return; }
    var titles = data.titles || {};
    var tEl = document.getElementById('vol-titles');
    if (tEl) { try { JSON.parse(tEl.textContent).forEach(function (p) { titles[p[0]] = p[1]; }); } catch (e) {} }

    var parts = (data.parts || []).map(function (p) {
      return { t: p.t, d: p.d || '', pages: p.pages.slice(), start: 0 };
    });
    var flat = [];
    parts.forEach(function (p) { p.start = flat.length; p.pages.forEach(function (c) { flat.push({ code: c, part: p }); }); });
    if (!flat.length && data.pages) { data.pages.forEach(function (c) { flat.push({ code: c, part: null }); }); }
    if (!flat.length) return;
    var cur = 0;

    var html = '<div class="vol-head"><span class="vol-title"></span><span class="vol-count"></span><div class="vol-parts"></div></div>'
      + '<div class="vol-stage"><button class="vol-nav prev" aria-label="上一页">‹</button>'
      + '<div class="vol-page"><div class="vol-frame" title="点击查看大图"><img alt="卷宗扫描页"></div>'
      + '<div class="vol-cap"><div class="row1"><span class="code"></span><span class="pt"></span><span class="date"></span></div><div class="d"></div></div></div>'
      + '<button class="vol-nav next" aria-label="下一页">›</button></div>'
      + '<div class="vol-bar"><span class="vol-pos"></span><div class="vol-progress" title="点击跳页"><i></i></div><button class="vol-zoom">查看大图</button></div>'
      + '<div class="vol-thumbs"></div>'
      + '<div class="vol-hint">提示：← → 方向键翻页 · 点击图片看大图</div>';
    host.innerHTML = html;

    var $ = function (s) { return host.querySelector(s); };
    var img = host.querySelector('.vol-frame img');
    var frame = host.querySelector('.vol-frame');
    var thumbsEl = host.querySelector('.vol-thumbs');
    var partsEl = host.querySelector('.vol-parts');

    // 大图浮层
    var lb = document.createElement('div');
    lb.className = 'vol-lightbox';
    lb.innerHTML = '<span class="x">×</span><img><div class="cap"></div>';
    document.body.appendChild(lb);
    function openLb() {
      var p = flat[cur];
      lb.querySelector('img').src = data.dir + '/' + p.code + '.jpg';
      lb.querySelector('.cap').textContent = p.code + ' · ' + (titles[p.code] || '');
      lb.classList.add('open');
    }
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
    frame.addEventListener('click', openLb);
    $('.vol-zoom').addEventListener('click', openLb);
    document.addEventListener('keydown', function (e) {
      if (lb.classList.contains('open')) { if (e.key === 'Escape' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); lb.classList.remove('open'); } return; }
      if (e.key === 'ArrowLeft') go(cur - 1);
      else if (e.key === 'ArrowRight') go(cur + 1);
    });

    // 缩略图：th/ 小图 + 懒加载（IntersectionObserver，不支持的浏览器直接加载）
    var thumbBtns = [];
    var lazyOk = 'IntersectionObserver' in window;
    var io = lazyOk ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var im = en.target.querySelector('img');
          if (im && im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; }
          io.unobserve(en.target);
        }
      });
    }, { root: thumbsEl, rootMargin: '300px' }) : null;

    flat.forEach(function (p, i) {
      var b = document.createElement('button');
      b.className = 'vol-thumb';
      b.title = p.code + ' · ' + (titles[p.code] || '');
      b.innerHTML = '<img alt="">';
      var tim = b.querySelector('img');
      var src = data.dir + '/th/' + p.code + '.jpg';
      if (io) { tim.dataset.src = src; io.observe(b); }
      else tim.src = src;
      b.addEventListener('click', function () { go(i); });
      thumbsEl.appendChild(b);
      thumbBtns.push(b);
    });

    // 分段按钮
    var partBtns = [];
    if (parts.length) {
      parts.forEach(function (p) {
        var b = document.createElement('button');
        b.className = 'vol-part';
        b.textContent = p.t;
        b.addEventListener('click', function () { go(p.start); });
        partsEl.appendChild(b);
        partBtns.push(b);
      });
    }

    var prevB = host.querySelector('.prev'), nextB = host.querySelector('.next');
    prevB.addEventListener('click', function () { go(cur - 1); });
    nextB.addEventListener('click', function () { go(cur + 1); });

    var prog = host.querySelector('.vol-progress'), progFill = prog.querySelector('i');
    prog.addEventListener('click', function (e) {
      var r = prog.getBoundingClientRect();
      var frac = (e.clientX - r.left) / r.width;
      go(Math.round(frac * (flat.length - 1)));
    });

    // 预取相邻页原图（进缓存，翻页即显）
    function prefetch(i) {
      if (i < 0 || i > flat.length - 1) return;
      var im = new Image();
      im.src = data.dir + '/' + flat[i].code + '.jpg';
    }

    function go(i) {
      if (i < 0) i = 0;
      if (i > flat.length - 1) i = flat.length - 1;
      cur = i;
      var p = flat[i];
      img.classList.remove('loaded');
      img.src = data.dir + '/' + p.code + '.jpg';
      if (img.complete) { img.classList.add('loaded'); }
      else img.onload = function () { img.classList.add('loaded'); };
      host.querySelector('.code').textContent = p.code;
      host.querySelector('.pt').textContent = titles[p.code] || '';
      host.querySelector('.date').textContent = p.part ? p.part.t : '';
      host.querySelector('.d').textContent = p.part && p.part.d ? p.part.d : '';
      host.querySelector('.vol-count').textContent = flat.length + ' 页 · 按叙事顺序';
      host.querySelector('.vol-title').textContent = data.title || '卷宗翻阅';
      host.querySelector('.vol-pos').textContent = (i + 1) + ' / ' + flat.length;
      progFill.style.width = (((i + 1) / flat.length) * 100) + '%';
      prevB.disabled = i === 0;
      nextB.disabled = i === flat.length - 1;
      thumbBtns.forEach(function (b, bi) { b.classList.toggle('on', bi === i); });
      var on = thumbBtns[i];
      if (on && on.scrollIntoView) {
        var r = thumbsEl.getBoundingClientRect(), br = on.getBoundingClientRect();
        if (br.left < r.left || br.right > r.right) on.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
      partBtns.forEach(function (b, pi) { b.classList.toggle('on', parts[pi] === p.part); });
      prefetch(i + 1);
    }
    go(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
