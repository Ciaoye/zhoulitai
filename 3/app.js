(function () {
  const data = window.ARCHIVE_DATA;
  const pagesById = new Map(data.pages.map((page) => [page.id, page]));
  if (data.bio) pagesById.set(data.bio.id, data.bio);
  // Network nodes are a subset of data.pages (which carry full `body`); only
  // fill gaps so we never overwrite a rich page with a sparse node object.
  if (data.network) {
    data.network.nodes.forEach((n) => { if (!pagesById.has(n.id)) pagesById.set(n.id, n); });
  }

  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[char]);
  const excerpt = (text = "", length = 88) => text.length > length ? `${text.slice(0, length - 1)}…` : text;

  /* ---------- lightweight markdown renderer ---------- */
  function splitRow(row) {
    let s = row.trim();
    if (s.startsWith("|")) s = s.slice(1);
    if (s.endsWith("|")) s = s.slice(0, -1);
    return s.split("|").map((c) => c.trim());
  }
  function inlineMd(text) {
    text = escapeHtml(text);
    text = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, id, label) => {
      const t = label || id;
      const node = pagesById.get(id);
      return node ? `<a href="#/page/${encodeURIComponent(id)}" class="wikilink">${t}</a>` : t;
    });
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      (m, t, url) => `<a href="${url}" target="_blank" rel="noopener" class="ext-link">${escapeHtml(t)}</a>`);
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
      (m, alt) => `<span class="md-img">🖼 ${escapeHtml(alt || "图片")}</span>`);
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    text = text.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
    text = text.replace(/(^|[^_])_([^_]+)_/g, "$1<em>$2</em>");
    text = text.replace(/`([^`]+)`/g, "<code class='md-code'>$1</code>");
    return text;
  }
  function renderMarkdown(md) {
    const lines = (md || "").split("\n");
    let html = "";
    let i = 0;
    const isTableSep = (l) => l.includes("-") && /^[\s|:-]+$/.test(l) && l.includes("|");
    const isBlockStart = (l) => /^(#{1,6}\s|>\s?|```|-\s+|\*\s+|\d+\.\s)/.test(l) || isTableSep(l);
    while (i < lines.length) {
      const line = lines[i];
      if (/^```/.test(line)) {
        const buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        html += `<pre class="md-pre"><code>${escapeHtml(buf.join("\n"))}</code></pre>`;
        continue;
      }
      if (line.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        const header = splitRow(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
          rows.push(splitRow(lines[i])); i++;
        }
        html += `<div class="md-table-wrap"><table class="md-table"><thead><tr>${
          header.map((h) => `<th>${inlineMd(h)}</th>`).join("")
        }</tr></thead><tbody>${
          rows.map((r) => `<tr>${r.map((c) => `<td>${inlineMd(c)}</td>`).join("")}</tr>`).join("")
        }</tbody></table></div>`;
        continue;
      }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        const level = Math.min(5, h[1].length);
        const tag = "h" + (level + 1);
        html += `<${tag} class="md-h">${inlineMd(h[2])}</${tag}>`;
        i++; continue;
      }
      if (/^>\s?/.test(line)) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
        html += `<blockquote class="md-quote">${inlineMd(buf.join(" "))}</blockquote>`;
        continue;
      }
      if (/^(-{3,}|\*{3,})\s*$/.test(line)) { html += "<hr class='md-hr'>"; i++; continue; }
      if (/^(\s*[-*]\s+)/.test(line) || /^(\s*\d+\.\s+)/.test(line)) {
        const ordered = /^\s*\d+\.\s+/.test(line);
        const re = ordered ? /^(\s*)(\d+)\.\s+(.*)$/ : /^(\s*)[-*]\s+(.*)$/;
        const buf = [];
        while (i < lines.length && re.test(lines[i])) {
          const m = lines[i].match(re);
          buf.push(m[ordered ? 3 : 2]); i++;
        }
        html += `<${ordered ? "ol" : "ul"} class="md-list">${buf.map((it) => `<li>${inlineMd(it)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`;
        continue;
      }
      if (line.trim() === "") { i++; continue; }
      const buf = [line];
      i++;
      while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines[i])) { buf.push(lines[i]); i++; }
      html += `<p class="md-p">${inlineMd(buf.join(" "))}</p>`;
    }
    return html;
  }

  /* ---------- metrics ---------- */
  function renderMetrics() {
    const metrics = data.sourceInventory.primary.map((item) => [item.value, item.label]);
    $("#metrics").innerHTML = metrics.map(([value, label]) => `
      <div class="metric"><strong>${value}</strong><span>${escapeHtml(label)}</span></div>
    `).join("");
    $("#source-detail").innerHTML = data.sourceInventory.detail.map((item) => `
      <div class="source-detail-item"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>
    `).join("");
  }

  const NODE_COLORS = {
    case: "#B85A4E", person: "#2E4A66", organization: "#5E7D6F",
    theme: "#B8956B", law_policy: "#4D453C", event: "#D88C7D",
    moc: "#2E4A66", bio: "#2E4A66",
    place: "#5E7D6F", group: "#B8956B", media: "#D88C7D",
  };

  /* ---------- relationship network (force-directed) ---------- */
  const W = 1200, H = 800;
  const CLUSTER_CENTERS = {
    case: [260, 250], person: [900, 200], organization: [980, 560],
    event: [300, 600], theme: [620, 170], law_policy: [640, 640],
    moc: [600, 400], bio: [600, 400], place: [1060, 380], group: [420, 410],
    media: [150, 420],
  };
  let netState = null;

  function buildNetworkData() {
    const nodes = data.network.nodes.map((n) => ({ ...n }));
    const idx = new Map(nodes.map((n, i) => [n.id, i]));
    const edges = [];
    const seen = new Set();
    data.network.edges.forEach(([s, t]) => {
      const a = idx.get(s), b = idx.get(t);
      if (a === undefined || b === undefined) return;
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push([a, b]);
    });
    const neighbors = new Map(nodes.map((_, i) => [i, []]));
    edges.forEach(([a, b]) => { neighbors.get(a).push(b); neighbors.get(b).push(a); });
    // seed positions spread around each type cluster (no initial overlaps)
    nodes.forEach((n, i) => {
      const c = CLUSTER_CENTERS[n.type] || [W / 2, H / 2];
      const ang = (i * 2.399963) % (Math.PI * 2);
      const rad = 70 + (i % 9) * 24;
      n.x = c[0] + Math.cos(ang) * rad;
      n.y = c[1] + Math.sin(ang) * rad;
      n.vx = 0; n.vy = 0;
    });
    // alpha-cooled force simulation with hard caps so it can never explode
    const linkDist = 64, REP = 540, FMAX = 24, VMAX = 20;
    for (let iter = 0; iter < 320; iter++) {
      const alpha = Math.pow(0.99, iter); // 1 → ~0.035
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          let dx = nodes[a].x - nodes[b].x;
          let dy = nodes[a].y - nodes[b].y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) d2 = 1;
          const d = Math.sqrt(d2);
          let f = (REP / d2) * alpha;
          if (f > FMAX) f = FMAX;
          const fx = (dx / d) * f, fy = (dy / d) * f;
          nodes[a].vx += fx; nodes[a].vy += fy;
          nodes[b].vx -= fx; nodes[b].vy -= fy;
        }
      }
      for (const [a, b] of edges) {
        const dx = nodes[b].x - nodes[a].x;
        const dy = nodes[b].y - nodes[a].y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - linkDist) * 0.05 * alpha;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        nodes[a].vx += fx; nodes[a].vy += fy;
        nodes[b].vx -= fx; nodes[b].vy -= fy;
      }
      for (const n of nodes) {
        const c = CLUSTER_CENTERS[n.type] || [W / 2, H / 2];
        n.vx += (W / 2 - n.x) * 0.012 + (c[0] - n.x) * 0.006;
        n.vy += (H / 2 - n.y) * 0.012 + (c[1] - n.y) * 0.006;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > VMAX) { n.vx = (n.vx / sp) * VMAX; n.vy = (n.vy / sp) * VMAX; }
        n.vx *= 0.82; n.vy *= 0.82;
        n.x += n.vx; n.y += n.vy;
        if (n.x < -500) n.x = -500; else if (n.x > W + 500) n.x = W + 500;
        if (n.y < -500) n.y = -500; else if (n.y > H + 500) n.y = H + 500;
      }
    }
    // recenter onto centroid so the graph is always balanced
    let cx = 0, cy = 0;
    nodes.forEach((n) => { cx += n.x; cy += n.y; });
    cx /= nodes.length; cy /= nodes.length;
    nodes.forEach((n) => { n.x -= cx - W / 2; n.y -= cy - H / 2; });
    // fit entire graph into the viewBox
    const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const bw = Math.max(1, maxX - minX), bh = Math.max(1, maxY - minY);
    const pad = 60;
    const k = Math.max(0.25, Math.min((W - 2 * pad) / bw, (H - 2 * pad) / bh, 1.8));
    const fit = {
      k,
      x: (W - bw * k) / 2 - minX * k,
      y: (H - bh * k) / 2 - minY * k,
    };
    return { nodes, edges, neighbors, idx, fit };
  }

  function initNetwork() {
    const built = buildNetworkData();
    const svg = $("#network-svg");
    netState = {
      svg,
      nodes: built.nodes,
      edges: built.edges,
      neighbors: built.neighbors,
      idx: built.idx,
      fit: built.fit,
      zoom: { ...built.fit },
      hoverId: null,
      dragId: null,
      dragMoved: false,
      panning: null,
    };

    const seen = new Map();
    data.network.nodes.forEach((n) => { if (!seen.has(n.type)) seen.set(n.type, n.typeLabel); });
    $("#network-legend").innerHTML = Array.from(seen.entries())
      .map(([type, label]) => `<span class="legend-item"><i style="background:${NODE_COLORS[type] || "#999"}"></i>${escapeHtml(label)}</span>`).join("");

    const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    layer.setAttribute("id", "network-zoom");
    svg.appendChild(layer);
    netState.layer = layer;

    const edgeEls = built.edges.map(([a, b]) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("class", "network-edge");
      line.dataset.s = a; line.dataset.t = b;
      layer.appendChild(line);
      return line;
    });
    netState.edgeEls = edgeEls;

    const nodeEls = new Map();
    built.nodes.forEach((n, i) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("class", "network-node");
      circle.setAttribute("r", String(Math.min(3.2, 0.8 + Math.sqrt(n.degree + 1) * 0.4)));
      circle.setAttribute("fill", NODE_COLORS[n.type] || "#999");
      circle.dataset.type = n.type;
      circle.dataset.id = n.id;
      circle.setAttribute("tabindex", "0");
      circle.setAttribute("role", "link");
      circle.setAttribute("aria-label", escapeHtml(n.title));
      layer.appendChild(circle);
      nodeEls.set(n.id, circle);
    });
    netState.nodeEls = nodeEls;

    applyTransform();
    paintPositions();
    attachNetworkHandlers();
  }

  function paintPositions() {
    const { nodes, edges, edgeEls, nodeEls } = netState;
    edges.forEach(([a, b], i) => {
      const na = nodes[a], nb = nodes[b];
      const line = edgeEls[i];
      line.setAttribute("x1", na.x.toFixed(1));
      line.setAttribute("y1", na.y.toFixed(1));
      line.setAttribute("x2", nb.x.toFixed(1));
      line.setAttribute("y2", nb.y.toFixed(1));
    });
    nodes.forEach((n) => {
      const c = nodeEls.get(n.id);
      c.setAttribute("cx", n.x.toFixed(1));
      c.setAttribute("cy", n.y.toFixed(1));
    });
  }

  function applyTransform() {
    const { layer, zoom } = netState;
    layer.setAttribute("transform", `translate(${zoom.x.toFixed(2)},${zoom.y.toFixed(2)}) scale(${zoom.k.toFixed(3)})`);
  }

  function setHighlight(id) {
    const { nodes, edges, edgeEls, nodeEls, neighbors } = netState;
    const svg = netState.svg;
    if (id == null) {
      svg.classList.remove("has-highlight");
      edgeEls.forEach((e) => e.classList.remove("dim", "hot"));
      nodes.forEach((n) => nodeEls.get(n.id).classList.remove("dim", "hot"));
      return;
    }
    svg.classList.add("has-highlight");
    const near = new Set(neighbors.get(netState.idx.get(id)));
    near.add(netState.idx.get(id));
    edges.forEach(([a, b], i) => {
      const touches = a === netState.idx.get(id) || b === netState.idx.get(id);
      edgeEls[i].classList.toggle("hot", touches);
      edgeEls[i].classList.toggle("dim", !touches);
    });
    nodes.forEach((n, i) => {
      const el = nodeEls.get(n.id);
      el.classList.toggle("hot", i === netState.idx.get(id));
      el.classList.toggle("dim", !near.has(i));
    });
  }

  function attachNetworkHandlers() {
    const { svg, nodeEls } = netState;
    const stage = svg.parentElement;
    const tooltip = $("#network-tooltip");

    const toUser = (e) => {
      const rect = svg.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) / rect.width * W,
        y: (e.clientY - rect.top) / rect.height * H,
      };
    };
    const showTip = (id, e) => {
      const n = netState.nodes[netState.idx.get(id)];
      tooltip.hidden = false;
      tooltip.innerHTML = `<strong>${escapeHtml(n.title)}</strong><span>${escapeHtml(n.typeLabel)} · ${n.degree} 个互联</span>`;
      const rect = stage.getBoundingClientRect();
      let tx = e.clientX - rect.left + 14;
      let ty = e.clientY - rect.top + 14;
      if (tx + 240 > rect.width) tx = e.clientX - rect.left - 240;
      if (ty + 60 > rect.height) ty = e.clientY - rect.top - 60;
      tooltip.style.left = tx + "px";
      tooltip.style.top = ty + "px";
    };
    const hideTip = () => { tooltip.hidden = true; };

    nodeEls.forEach((circle, id) => {
      const enter = (e) => {
        netState.hoverId = id;
        setHighlight(id);
        const n = netState.nodes[netState.idx.get(id)];
        $("#network-info").innerHTML = `<small>${escapeHtml(n.typeLabel)} / ${n.degree} LINKS</small><strong>${escapeHtml(n.title)}</strong><p>点击打开这份档案及其相关页面。</p>`;
        showTip(id, e);
      };
      circle.addEventListener("mouseenter", enter);
      circle.addEventListener("focus", () => { netState.hoverId = id; setHighlight(id); });
      circle.addEventListener("mousemove", (e) => showTip(id, e));
      circle.addEventListener("mouseleave", () => {
        netState.hoverId = null;
        setHighlight(null);
        hideTip();
      });
      circle.addEventListener("click", () => {
        if (netState.dragMoved) return;
        location.hash = `#/page/${encodeURIComponent(id)}`;
      });
      circle.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") circle.click(); });
    });

    svg.addEventListener("wheel", (e) => {
      // 普通滚轮放行页面滚动；仅按住 Ctrl/Cmd + 滚轮才缩放网络图，避免滚到图上时滚动被吞
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      zoomAt(toUser(e), e.deltaY < 0 ? 1.12 : 1 / 1.12);
    }, { passive: false });

    svg.addEventListener("pointerdown", (e) => {
      const nodeEl = e.target.closest(".network-node");
      if (nodeEl) {
        netState.dragId = nodeEl.dataset.id;
        netState.dragMoved = false;
      } else {
        netState.panning = { x: e.clientX, y: e.clientY };
      }
      svg.setPointerCapture(e.pointerId);
    });
    svg.addEventListener("pointermove", (e) => {
      if (netState.dragId) {
        const u = toUser(e);
        const n = netState.nodes[netState.idx.get(netState.dragId)];
        n.x = (u.x - netState.zoom.x) / netState.zoom.k;
        n.y = (u.y - netState.zoom.y) / netState.zoom.k;
        netState.dragMoved = true;
        paintPositions();
      } else if (netState.panning) {
        const rect = svg.getBoundingClientRect();
        netState.zoom.x += (e.clientX - netState.panning.x) / rect.width * W;
        netState.zoom.y += (e.clientY - netState.panning.y) / rect.height * H;
        netState.panning = { x: e.clientX, y: e.clientY };
        applyTransform();
      }
    });
    const end = (e) => {
      netState.dragId = null;
      netState.panning = null;
      try { svg.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    svg.addEventListener("pointerup", end);
    svg.addEventListener("pointercancel", end);

    $("#net-zoom-in").addEventListener("click", () => zoomAt({ x: W / 2, y: H / 2 }, 1.25));
    $("#net-zoom-out").addEventListener("click", () => zoomAt({ x: W / 2, y: H / 2 }, 1 / 1.25));
    $("#net-reset").addEventListener("click", () => {
      netState.zoom = { ...netState.fit };
      applyTransform();
    });
  }

  function zoomAt(u, factor) {
    const zoom = netState.zoom;
    const k2 = Math.min(4, Math.max(0.3, zoom.k * factor));
    zoom.x = u.x * (1 - k2 / zoom.k) + zoom.x * (k2 / zoom.k);
    zoom.y = u.y * (1 - k2 / zoom.k) + zoom.y * (k2 / zoom.k);
    zoom.k = k2;
    applyTransform();
  }

  /* ---------- cases (grouped, no filter) ---------- */
  function renderCases() {
    const order = data.caseGroups.map((g) => g.name);
    const byKind = new Map();
    data.cases.forEach((page) => {
      if (!byKind.has(page.caseKind)) byKind.set(page.caseKind, []);
      byKind.get(page.caseKind).push(page);
    });
    const groups = order.filter((k) => byKind.has(k)).map((k) => [k, byKind.get(k)]);
    for (const [k, arr] of byKind.entries()) {
      if (!order.includes(k)) groups.push([k, arr]);
    }
    const chips = [`<button type="button" class="filter-chip active" data-kind="*">全部案件 <span class="chip-count">${data.cases.length}</span></button>`]
      .concat(data.caseGroups.map((g) =>
        `<button type="button" class="filter-chip" data-kind="${escapeHtml(g.name)}">${escapeHtml(g.name)} <span class="chip-count">${g.count}</span></button>`));
    $("#case-filter").innerHTML = chips.join("");
    $("#case-list").innerHTML = groups.map(([kind, arr]) => `
      <div class="case-group" data-kind="${escapeHtml(kind)}">
        <h3 class="case-group-title">${escapeHtml(kind)}<span>${arr.length}</span></h3>
        ${arr.map((page, index) => `
          <a class="case-row" href="#/page/${encodeURIComponent(page.id)}">
            <span class="case-name"><small>${String(index + 1).padStart(2, "0")}</small><strong>${escapeHtml(page.title)}</strong></span>
            <span class="case-kind">${escapeHtml(page.caseKind)}</span>
          </a>`).join("")}
      </div>`).join("");
    attachCaseFilter();
  }

  function attachCaseFilter() {
    const bar = $("#case-filter");
    if (!bar) return;
    bar.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      const kind = chip.dataset.kind;
      bar.querySelectorAll(".filter-chip").forEach((b) => b.classList.toggle("active", b === chip));
      document.querySelectorAll("#case-list .case-group").forEach((div) => {
        div.style.display = (kind === "*" || div.dataset.kind === kind) ? "" : "none";
      });
    });
  }

  /* ---------- biography ---------- */
  function renderBiography() {
    $("#bio-summary").textContent = data.bio?.summary || "从生平、执业、案件与公共表达进入周立太档案。";
    $("#life-path").innerHTML = data.life.map((item, index) => `
      <a class="life-item" href="#/page/${encodeURIComponent(item.id)}">
        <small>CHAPTER ${String(index + 1).padStart(2, "0")}</small>
        <h3>${escapeHtml(item.label)}</h3>
        <p>${escapeHtml(excerpt(item.summary, 105))}</p>
      </a>
    `).join("");
  }

  /* ---------- structures (no toolbar) ---------- */
  const STRUCTURE_BLOCKS = [
    { key: "moc", title: "专题索引", no: "Ⅰ", note: "档案的入口与导航枢纽" },
    { key: "theme", title: "核心议题", no: "Ⅱ", note: "围绕工伤、程序、规范与公共形象的论点集群" },
    { key: "law_policy", title: "法律与政策", no: "Ⅲ", note: "国家级立法与地方配套规定" },
  ];
  const THEME_CLUSTER_ORDER = [
    "工伤赔偿与保险", "维权程序与成本", "规范性文件审查",
    "周立太现象与公共形象", "打黑与辩护权", "农民工社会属性",
  ];
  const LAW_JURIS_ORDER = ["国家立法", "地方规定"];
  const MOC_KIND_ORDER = ["专题入口", "档案导航"];

  function structureCard(page, tagLabel, meta) {
    return `
      <a class="structure-row" href="#/page/${encodeURIComponent(page.id)}" data-type="${escapeHtml(page.type)}">
        <span class="structure-tag tag-${escapeHtml(page.type)}">${escapeHtml(tagLabel)}</span>
        <strong>${escapeHtml(page.title)}</strong>
        ${meta ? `<small class="struct-year">${escapeHtml(meta)}</small>` : ""}
        <p>${escapeHtml(excerpt(page.summary, 88))}</p>
      </a>`;
  }
  function yearOf(dateStart) {
    if (!dateStart) return "";
    const m = /^(\d{4})/.exec(dateStart);
    return m ? `${m[1]}年` : "";
  }
  function renderStructures() {
    const byType = { moc: [], theme: [], law_policy: [] };
    data.structures.forEach((page) => { (byType[page.type] || (byType[page.type] = [])).push(page); });
    const mocHtml = MOC_KIND_ORDER.map((kind) => {
      const items = byType.moc.filter((page) => page.mocKind === kind);
      if (!items.length) return "";
      return `<div class="moc-group"><p class="group-label">${escapeHtml(kind)}</p><div class="moc-chips">${
        items.map((page) => `<a class="moc-chip" href="#/page/${encodeURIComponent(page.id)}">${escapeHtml(page.title)}</a>`).join("")}</div></div>`;
    }).join("");
    const themeFilter = `<div class="filter-bar" id="theme-filter"><button type="button" class="filter-chip active" data-cluster="*">全部议题</button>${
      THEME_CLUSTER_ORDER
        .filter((c) => byType.theme.some((p) => p.cluster === c))
        .map((c) => `<button type="button" class="filter-chip" data-cluster="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
        .join("")
    }</div>`;
    const themeHtml = themeFilter + THEME_CLUSTER_ORDER.map((cluster) => {
      const items = byType.theme.filter((page) => page.cluster === cluster);
      if (!items.length) return "";
      return `<div class="theme-cluster" data-cluster="${escapeHtml(cluster)}"><p class="group-label">${escapeHtml(cluster)} <span class="group-count">${items.length}</span></p><div class="structure-index">${
        items.map((page) => structureCard(page, "议题")).join("")}</div></div>`;
    }).join("");
    const lawHtml = LAW_JURIS_ORDER.map((juris) => {
      const items = byType.law_policy
        .filter((page) => page.jurisdiction === juris)
        .sort((a, b) => (a.dateStart || "9999").localeCompare(b.dateStart || "9999"));
      if (!items.length) return "";
      return `<div class="theme-cluster"><p class="group-label">${escapeHtml(juris)} <span class="group-count">${items.length}</span></p><div class="structure-index">${
        items.map((page) => structureCard(page, "法律", yearOf(page.dateStart))).join("")}</div></div>`;
    }).join("");
    $("#structure-list").innerHTML = STRUCTURE_BLOCKS.map((block) => {
      const inner = block.key === "moc" ? mocHtml : block.key === "theme" ? themeHtml : lawHtml;
      return `<div class="struct-block" id="block-${block.key}">
        <div class="struct-block-head"><span class="struct-block-no">${block.no}</span><h3>${block.title}</h3><p>${block.note}</p></div>
        ${inner || "<p class='empty-note'>暂无</p>"}
      </div>`;
    }).join("");
    attachThemeFilter();
  }
  function attachThemeFilter() {
    const bar = $("#theme-filter");
    if (!bar) return;
    bar.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      const cluster = chip.dataset.cluster;
      bar.querySelectorAll(".filter-chip").forEach((b) => b.classList.toggle("active", b === chip));
      document.querySelectorAll("#block-theme .theme-cluster").forEach((div) => {
        div.style.display = (cluster === "*" || div.dataset.cluster === cluster) ? "" : "none";
      });
    });
  }

  /* ---------- people / organizations / media ---------- */
  function renderPeople() {
    $("#people-list").innerHTML = data.people.map((page, index) => `
      <a class="name-card" href="#/page/${encodeURIComponent(page.id)}">
        <small>P-${String(index + 1).padStart(3, "0")}</small>
        <h3>${escapeHtml(page.title)}</h3>
        <p>${escapeHtml(excerpt(page.summary, 90))}</p>
      </a>
    `).join("");
  }
  function renderOrganizations() {
    const kindLabels = {
      court: "法院", government: "政府部门", law_firm: "法律服务", media: "媒体",
      university: "研究与高校", social_org: "社会组织", enterprise: "企业", other: "机构",
    };
    $("#organization-list").innerHTML = data.organizations.map((page, index) => `
      <a class="org-row" href="#/page/${encodeURIComponent(page.id)}" data-org-kind="${escapeHtml(page.orgKind)}">
        <small>O-${String(index + 1).padStart(3, "0")} / ${escapeHtml(kindLabels[page.orgKind] || page.orgKind)}</small>
        <h3>${escapeHtml(page.title)}</h3>
        <p>${escapeHtml(excerpt(page.summary, 96))}</p>
      </a>
    `).join("");
  }
  function renderMedia() {
    $("#media-list").innerHTML = data.media.map((page) => `
      <a class="media-card" href="#/page/${encodeURIComponent(page.id)}">
        <span class="media-tag">${escapeHtml(page.typeLabel)}</span>
        <h3>${escapeHtml(page.title)}</h3>
        <p>${escapeHtml(excerpt(page.summary, 120))}</p>
      </a>
    `).join("");
  }

  /* ---------- search (all non-stub) ---------- */
  const searchDialog = $("#search-dialog");
  const searchInput = $("#search-input");
  function renderSearch(query = "") {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    const results = data.pages.filter((page) => {
      if (!needle) return true;
      return [page.title, page.summary, page.typeLabel, page.caseKind, ...page.personRoles]
        .join(" ").toLocaleLowerCase("zh-CN").includes(needle);
    }).slice(0, 120);
    $("#search-count").textContent = `${results.length} 条结果${needle ? ` · “${query.trim()}”` : " · 全部档案页"}`;
    $("#search-results").innerHTML = results.map((page) => `
      <a class="search-result" href="#/page/${encodeURIComponent(page.id)}">
        <small>${escapeHtml(page.typeLabel)}</small>
        <span><strong>${escapeHtml(page.title)}</strong><p>${escapeHtml(excerpt(page.summary, 130))}</p></span>
      </a>
    `).join("");
  }
  $("#search-trigger").addEventListener("click", () => {
    renderSearch("");
    searchDialog.showModal();
    requestAnimationFrame(() => searchInput.focus());
  });
  $("#search-close").addEventListener("click", () => searchDialog.close());
  searchInput.addEventListener("input", (e) => renderSearch(e.target.value));
  $("#search-results").addEventListener("click", () => searchDialog.close());

  /* ---------- reader (drawer) ---------- */
  const drawer = $("#record-drawer");
  function closeDrawer(updateHash = true) {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (updateHash && location.hash.startsWith("#/page/")) history.replaceState(null, "", "#top");
  }
  function interConnections(id) {
    if (!netState) return [];
    const i = netState.idx.get(id);
    if (i === undefined) return [];
    return netState.neighbors.get(i)
      .map((j) => netState.nodes[j])
      .sort((a, b) => b.degree - a.degree)
      .slice(0, 14);
  }
  function openRecord(pageId) {
    const page = pagesById.get(pageId);
    if (!page) return;
    const links = interConnections(pageId);
    $("#record-code").textContent = `${page.typeLabel.toUpperCase()} / ${page.id}`;
    const linksHtml = links.length ? `
      <section class="record-section record-links">
        <h3>互联档案 <span>${links.length}</span></h3>
        <div class="related-links">${links.map((item) => `
          <a href="#/page/${encodeURIComponent(item.id)}" class="related-chip" data-type="${escapeHtml(item.type)}">${escapeHtml(item.title)}</a>
        `).join("")}</div>
      </section>` : "";
    $("#record-content").innerHTML = `
      <div class="record-meta">
        <span>状态: ${escapeHtml(page.status)}</span>
        <span>核验: ${escapeHtml(page.verification)}</span>
        <span>公开: ${escapeHtml(page.publication)}</span>
      </div>
      <h2 class="record-title">${escapeHtml(page.title)}</h2>
      ${linksHtml}
      <div class="record-body">${renderMarkdown(page.body || page.summary)}</div>
    `;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#record-content").scrollTop = 0;
    $("#drawer-close").focus();
  }
  $("#drawer-close").addEventListener("click", () => closeDrawer());
  $("#drawer-scrim").addEventListener("click", () => closeDrawer());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
  });
  function handleRoute() {
    const match = location.hash.match(/^#\/page\/(.+)$/);
    if (match) openRecord(decodeURIComponent(match[1]));
    else if (drawer.classList.contains("open")) closeDrawer(false);
  }
  window.addEventListener("hashchange", handleRoute);

  /* ---------- location map (ported from 地点地图, core content only) ---------- */
  function initLocationMap() {
    const placeData = window.PLACE_MAP_DATA;
    const svg = document.querySelector("#china-map");
    const detail = document.querySelector("#loc-detail");
    if (!placeData || !svg || !detail) return;

    const MAP_COLORS = { person: "#758f68", organization: "#62889a", case: "#b75b48", event: "#c39b54", life: "#927fa2" };
    const MAP_LABELS = { person: "人物", organization: "机构", case: "案件", event: "事件", life: "生平 / 执业" };
    const regionRules = [
      ['新疆', /xinjiang|toksun|kumishi/], ['西藏', /tibet/], ['陕西', /shaanxi|zhidan/],
      ['四川', /sichuan|chengdu|luxian|quxian/],
      ['重庆', /chongqing|changshou|hechuan|kaizhou|liangping|nanan|wanzhou|wushan|yubei|yuzhong|jiangbei/],
      ['湖南', /hunan|anxiang|anyou|leiyang/], ['湖北', /hubei|macheng/],
      ['广东', /guangdong|dongguan|huizhou|panyu|pearl-river|shenzhen|futian|nanshan/],
      ['浙江', /wenzhou|longwan/], ['上海', /shanghai/], ['山东', /shandong|chiping/],
    ];
    const project = ([lon, lat]) => [68 + (lon - 73.5) / (134.8 - 73.5) * 925, 45 + (53.6 - lat) / (53.6 - 18) * 535];

    // china outline
    const rings = placeData.outline.type === 'MultiPolygon' ? placeData.outline.coordinates.flat() : placeData.outline.coordinates;
    rings.forEach((poly) => {
      const d = poly.map((p, i) => { const [x, y] = project(p); return `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ') + ' Z';
      svg.insertAdjacentHTML('beforeend', `<path class="map-outline" d="${d}"/>`);
    });

    // flatten links into point items (one dot per relation), plus a life marker per place
    const pointItems = [];
    placeData.places.forEach((place) => {
      place.links.filter((x) => ['person', 'organization', 'case', 'event'].includes(x.kind)).forEach((link) => pointItems.push({ ...link, place }));
      if (place.roles.includes('life') || !place.links.length) pointItems.push({ id: `${place.id}-life`, kind: 'life', title: `${place.title}：生平与执业记录`, place });
    });
    const typeCounts = Object.fromEntries(Object.keys(MAP_COLORS).map((k) => [k, pointItems.filter((p) => p.kind === k).length]));
    const regionCount = regionRules.filter(([, re]) => placeData.places.some((p) => re.test(p.id))).length;

    const allCountEl = document.querySelector('#loc-all-count');
    if (allCountEl) allCountEl.textContent = `(${pointItems.length})`;
    const legend = document.querySelector('#loc-legend');
    if (legend) {
      legend.querySelectorAll('.filter').forEach((btn) => {
        const n = typeCounts[btn.dataset.filter];
        if (n !== undefined) btn.insertAdjacentHTML('beforeend', ` <span>${n}</span>`);
      });
    }

    const labelPlaces = {
      'place-toksun-xinjiang': '新疆托克逊', 'place-tibet': '西藏', 'place-zhidan-shaanxi': '陕西志丹',
      'place-chiping-shandong': '山东茌平', 'place-shanghai': '上海', 'place-wenzhou': '温州',
      'place-macheng-hubei': '湖北麻城', 'place-chongqing-municipality': '重庆地区', 'place-chengdu': '成都',
      'place-luxian-sichuan': '四川泸县', 'place-quxian-sichuan': '四川渠县', 'place-anxiang-hunan': '湖南安乡',
      'place-leiyang-hunan': '湖南耒阳', 'place-guangdong': '珠三角', 'place-shenzhen': '深圳',
    };

    const groups = new Map();
    pointItems.forEach((item) => { if (!groups.has(item.place.id)) groups.set(item.place.id, []); groups.get(item.place.id).push(item); });

    // declutter: gently push apart place centers that sit too close (nearby cities overlap)
    const centers = new Map();
    placeData.places.forEach((place) => {
      const [bx, by] = project([place.lon, place.lat]);
      centers.set(place.id, { x: bx, y: by });
    });
    const cids = [...centers.keys()];
    const MIN_SEP = 36;
    for (let iter = 0; iter < 90; iter++) {
      for (let a = 0; a < cids.length; a++) {
        for (let b = a + 1; b < cids.length; b++) {
          const A = centers.get(cids[a]), B = centers.get(cids[b]);
          let dx = B.x - A.x, dy = B.y - A.y;
          const d = Math.hypot(dx, dy);
          if (d > 0.01 && d < MIN_SEP) {
            const push = (MIN_SEP - d) * 0.5;
            dx /= d; dy /= d;
            A.x -= dx * push; A.y -= dy * push;
            B.x += dx * push; B.y += dy * push;
          }
        }
      }
    }
    centers.forEach((c) => { c.x = Math.max(24, Math.min(1056, c.x)); c.y = Math.max(24, Math.min(636, c.y)); });

    const DOT_R = 3.2, BIG_R = 2.7, RING_GAP = 9.5, GOLDEN = 2.399963;
    const labelLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelLayer.classList.add('label-layer');

    groups.forEach((items, placeId) => {
      const place = items[0].place;
      const ctr = centers.get(placeId) || { x: 0, y: 0 };
      const ax = ctr.x, ay = ctr.y;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('place-cloud');
      g.dataset.place = placeId;
      const r = items.length > 15 ? BIG_R : DOT_R;
      items.forEach((item, i) => {
        const ring = Math.floor(Math.sqrt(i));
        const angle = i * GOLDEN;
        const dist = ring * RING_GAP;
        const x = ax + Math.cos(angle) * dist;
        const y = ay + Math.sin(angle) * dist;
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.classList.add('entity-dot');
        c.dataset.kind = item.kind;
        c.dataset.id = item.id;
        c.setAttribute('cx', x.toFixed(1));
        c.setAttribute('cy', y.toFixed(1));
        c.setAttribute('r', String(r));
        c.setAttribute('fill', MAP_COLORS[item.kind]);
        c.setAttribute('tabindex', '0');
        c.setAttribute('role', 'button');
        c.setAttribute('aria-label', `${place.title}，${MAP_LABELS[item.kind]}，${item.title}`);
        c.addEventListener('click', () => showItem(item));
        c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') showItem(item); });
        g.appendChild(c);
      });
      svg.appendChild(g);
      if (labelPlaces[placeId]) {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.classList.add('place-label');
        t.setAttribute('x', (ax + 11).toFixed(1));
        t.setAttribute('y', (ay - 11).toFixed(1));
        t.textContent = labelPlaces[placeId];
        labelLayer.appendChild(t);
      }
    });
    svg.appendChild(labelLayer);

    const summaryHtml = `<div class="coverage-summary"><span class="section-label">COVERAGE SUMMARY</span><h3>覆盖不是一个点</h3><p>档案中的地点关系跨越中国东西部与沿海制造业地区。每个圆点代表一条具体的人物、机构、案件或生平关联，而不是把同一地点压成一个综合符号。</p><div class="coverage-numbers"><div><strong>${regionCount}</strong><span>省级区域</span></div><div><strong>${placeData.placeCount}</strong><span>地点页</span></div><div><strong>${pointItems.length}</strong><span>关系点</span></div></div><div class="type-totals">${Object.keys(MAP_COLORS).map((k) => `<p><i style="background:${MAP_COLORS[k]}"></i><b>${typeCounts[k]}</b> ${MAP_LABELS[k]}</p>`).join('')}</div><small>点位与关系来自当前 LLM Wiki；未核验状态不因进入地图而改变。</small></div>`;
    detail.innerHTML = summaryHtml;

    function showItem(item) {
      document.querySelectorAll('.entity-dot').forEach((n) => n.classList.toggle('selected', n.dataset.id === item.id));
      const p = item.place;
      detail.innerHTML = `<div class="place-head"><span class="section-label">${escapeHtml(MAP_LABELS[item.kind])} / ${escapeHtml(p.id)}</span><h3>${escapeHtml(item.title)}</h3><div class="role-tags"><span class="role-tag" style="background:${MAP_COLORS[item.kind]}">${MAP_LABELS[item.kind]}</span><span class="role-tag neutral">${escapeHtml(p.title)}</span></div><p class="place-summary">${escapeHtml(p.summary)}</p><div class="place-meta"><span class="badge">来源 ${p.sourceCount}</span><span class="badge">核验 ${escapeHtml(p.status)}</span></div></div><button class="summary-return" type="button">返回覆盖总览</button>`;
      detail.querySelector('.summary-return').addEventListener('click', () => { detail.innerHTML = summaryHtml; document.querySelectorAll('.entity-dot').forEach((n) => n.classList.remove('selected')); });
    }

    let active = 'all';
    function applyFilter() {
      document.querySelectorAll('.entity-dot').forEach((n) => n.classList.toggle('node-hidden', active !== 'all' && n.dataset.kind !== active));
    }
    if (legend) {
      legend.querySelectorAll('.filter').forEach((btn) => btn.addEventListener('click', () => {
        active = btn.dataset.filter;
        legend.querySelectorAll('.filter').forEach((b) => b.classList.toggle('active', b === btn));
        applyFilter();
      }));
    }
  }

  /* ---------- boot ---------- */
  renderMetrics();
  initNetwork();
  renderCases();
  renderBiography();
  renderStructures();
  initLocationMap();
  renderPeople();
  renderOrganizations();
  renderMedia();
  handleRoute();
})();
