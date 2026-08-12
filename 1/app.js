(() => {
  const YEAR_START = 1996;
  const YEAR_END = 2026;
  // 打印模式：URL 带 ?print=1 时画布与字号整体放大 2 倍（配合高 DPI 截图输出可打印长图）
  const PRINT_SCALE = new URLSearchParams(window.location.search).get("print") === "1" ? 2 : 1;
  if (PRINT_SCALE > 1) document.documentElement.classList.add("print-scale");
  const CATEGORY_ORDER = ["case", "policy", "media", "event"];
  // 列宽比例：案件标注多占 1.5 倍、政策 1.2 倍、媒体/事件 1.0 倍（对应 CATEGORY_ORDER 顺序）
  const LANE_SCALE = [1.5, 1.2, 1, 1];
  // 不在任何关系链上、但默认也应显示标签的重要节点
  const ALWAYS_LABELED_IDS = new Set(["2015-wang-bing", "2025-forty-years"]);
  // 强制标签方向（left / right），用于避开局部拥挤
  const FORCE_LABEL_SIDE = {
    "2012-reduce-cases": "left",
    "2012-cleanup": "left",
    "2007-media-dilemma": "right",
    "2015-thepaper": "right",
    "2015-wang-bing": "right",
    "2025-forty-years": "right"
  };
  const FEATURED_IDS = new Set([
    "1996-xu", "1996-low-base", "1997-peng", "1998-wang-result",
    "1998-liu-tao", "1999-spc-meeting", "1999-prosthesis-rule",
    "2000-chen", "2001-occupational-law", "2004-work-injury-reg",
    "2004-cctv-struggle", "2006-spc-reply", "2008-labor-contract-law",
    "2008-citizen-standard", "2010-hand-value", "2011-social-insurance-law",
    "2012-reduce-cases", "2012-cleanup", "2013-luo-shilin-result",
    "2015-wang-bing", "2015-wu-ximei-start", "2021-article24-repealed",
    "2021-luo-review", "2024-wu-ximei-paid", "2026-digital-archive"
  ]);
  const state = {
    categories: new Set(Object.keys(TIMELINE_CATEGORIES)),
    query: "",
    pinned: null,
    solo: null,
    showAllLabels: false
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const scrollBox = $("#timeline-scroll");
  const canvas = $("#timeline-canvas");
  const gutter = $("#timeline-gutter");
  const hoverCard = $("#hover-card");
  const drawer = $("#detail-drawer");
  const backdrop = $("#drawer-backdrop");
  const nodesById = new Map();
  const labelsById = new Map();
  const positionsById = new Map();
  let measureCtx = null;

  // ---------- helpers ----------
  function categoryColor(category) {
    return TIMELINE_CATEGORIES[category].color;
  }
  function formatDate(item) {
    if (!item.month) return `${item.year}`;
    const month = Math.max(1, Math.min(12, Math.floor(item.month)));
    return `${item.year}.${String(month).padStart(2, "0")}`;
  }
  function monthLabel(item) {
    if (!item.month) return "";
    const m = Math.max(1, Math.min(12, Math.floor(item.month)));
    return `${m} 月`;
  }
  function cleanSearchText(item) {
    return [item.title, item.short, item.summary, item.impact, item.status].join(" ").toLowerCase();
  }
  function importance(item) {
    if (FEATURED_IDS.has(item.id)) return 3;
    if ((item.chains || []).length || TIMELINE_CHAINS.some((chain) => chain.nodeIds.includes(item.id))) return 2;
    return 1;
  }
  function shouldLabel(item) {
    return item.category === "event" || ALWAYS_LABELED_IDS.has(item.id) || TIMELINE_CHAINS.some((chain) => chain.nodeIds.includes(item.id));
  }
  function measureText(text, font) {
    if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d");
    measureCtx.font = font;
    return measureCtx.measureText(text).width;
  }

  // ---------- DOM: 类目筛选 ----------
  function buildFilters() {
    const root = $("#category-filters");
    Object.entries(TIMELINE_CATEGORIES).forEach(([key, info]) => {
      const label = document.createElement("label");
      label.className = "filter-toggle";
      label.style.setProperty("--filter-color", info.color);
      label.innerHTML = `<input type="checkbox" value="${key}" checked><i></i><span>${info.label}</span>`;
      $("input", label).addEventListener("change", (event) => {
        if (event.target.checked) state.categories.add(key);
        else state.categories.delete(key);
        applyFilters();
      });
      root.appendChild(label);
    });
  }

  // ---------- DOM: 关系图例（可点击聚焦单链） ----------
  function buildRelationshipLegend() {
    const root = $("#relationship-legend");
    TIMELINE_CHAINS.forEach((chain) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "relationship-legend__item";
      item.dataset.chain = chain.id;
      item.setAttribute("aria-pressed", "false");
      item.title = `点击只显示「${chain.kicker}」这条关系链`;
      item.innerHTML = `<i style="background:${chain.color}"></i>${chain.kicker}`;
      item.addEventListener("click", () => toggleSolo(chain.id));
      root.appendChild(item);
    });
  }

  function toggleSolo(chainId) {
    state.solo = state.solo === chainId ? null : chainId;
    $$("#relationship-legend .relationship-legend__item").forEach((item) => {
      const active = item.dataset.chain === state.solo;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", active ? "true" : "false");
      const chain = TIMELINE_CHAINS.find((c) => c.id === item.dataset.chain);
      item.style.borderColor = active ? chain.color : "";
    });
    applyFilters();
  }

  // ---------- DOM: 节点 ----------
  function buildNodes() {
    const root = $("#timeline-nodes");
    TIMELINE_EVENTS.forEach((item) => {
      const node = document.createElement("button");
      node.type = "button";
      node.className = "timeline-node";
      node.dataset.id = item.id;
      node.dataset.importance = importance(item);
      node.style.setProperty("--node-color", categoryColor(item.category));
      node.style.setProperty("--node-size", `${[8, 14, 21][importance(item) - 1] * PRINT_SCALE}px`);
      node.setAttribute("aria-label", `${formatDate(item)} ${item.title}，点击查看详情`);
      node.addEventListener("mouseenter", (event) => showHover(item, event.currentTarget));
      node.addEventListener("mouseleave", hideHover);
      node.addEventListener("focus", (event) => showHover(item, event.currentTarget));
      node.addEventListener("blur", hideHover);
      node.addEventListener("click", () => openDrawer(item));
      root.appendChild(node);
      nodesById.set(item.id, node);
    });
  }

  // ---------- DOM: 左侧泳道栏 ----------
  function buildGutter() {
    CATEGORY_ORDER.forEach((category) => {
      const info = TIMELINE_CATEGORIES[category];
      const block = document.createElement("div");
      block.className = `timeline-gutter__lane timeline-gutter__lane--${category}`;
      block.innerHTML = `<i style="background:${info.color}"></i><span>${info.label}</span>`;
      gutter.appendChild(block);
    });
  }

  // ---------- DOM: 关系链详解 ----------
  function buildChainCards() {
    const root = $("#chain-cards");
    TIMELINE_CHAINS.forEach((chain, index) => {
      const nodes = chain.nodeIds
        .map((id) => TIMELINE_EVENTS.find((item) => item.id === id))
        .filter(Boolean)
        .sort((a, b) => (a.year - b.year) || ((a.month || 0) - (b.month || 0)));

      const card = document.createElement("article");
      card.className = "chain-card";
      card.id = `chain-${chain.id}`;
      card.innerHTML = `
        <div class="chain-card__num" style="color:${chain.color}">
          ${String(index + 1).padStart(2, "0")}
          <small>${nodes.length} 节点</small>
        </div>
        <div class="chain-card__copy">
          <span class="kicker" style="color:${chain.color}">${chain.kicker}</span>
          <h3>${chain.title}</h3>
          <p>${chain.description}</p>
        </div>
        <div class="chain-card__nodes">
          ${nodes.map((node) => `
            <div class="chain-node-row">
              <div class="yr">${node.year}<small>${monthLabel(node)}</small></div>
              <div>
                <div class="title" style="color:${categoryColor(node.category)}">${node.title}</div>
                <div class="desc">${node.summary}</div>
              </div>
            </div>
          `).join("")}
        </div>
      `;
      root.appendChild(card);
    });
  }

  // ---------- hover & drawer ----------
  function showHover(item, anchor) {
    if (window.matchMedia("(max-width: 600px)").matches) return;
    const info = TIMELINE_CATEGORIES[item.category];
    hoverCard.innerHTML = `
      <div class="hover-card__meta"><i style="background:${info.color}"></i><span>${formatDate(item)} · ${info.label}</span></div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <small>点击查看资料状态与来源</small>`;
    hoverCard.hidden = false;
    const rect = anchor.getBoundingClientRect();
    const cardRect = hoverCard.getBoundingClientRect();
    let left = rect.left + rect.width + 12;
    let top = rect.top - cardRect.height / 2;
    if (left + cardRect.width > window.innerWidth - 12) left = rect.left - cardRect.width - 12;
    if (top + cardRect.height > window.innerHeight - 12) top = window.innerHeight - cardRect.height - 12;
    hoverCard.style.left = `${Math.max(12, left)}px`;
    hoverCard.style.top = `${Math.max(12, top)}px`;
  }
  function hideHover() { hoverCard.hidden = true; }

  function openDrawer(item) {
    state.pinned = item.id;
    hideHover();
    $$(".timeline-node.is-active").forEach((node) => node.classList.remove("is-active"));
    nodesById.get(item.id)?.classList.add("is-active");
    const info = TIMELINE_CATEGORIES[item.category];
    const image = item.image ? `<img class="detail-image" src="${item.image}" alt="${item.title}相关档案照片">` : "";
    const relatedChains = TIMELINE_CHAINS
      .filter((chain) => chain.nodeIds.includes(item.id))
      .map((chain) => chain.kicker)
      .join("、");
    $("#drawer-content").innerHTML = `
      ${image}
      <div class="detail-meta"><i style="background:${info.color}"></i><span>${formatDate(item)} · ${info.label}</span></div>
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <h3>为什么重要</h3>
      <p class="detail-impact">${item.impact}</p>
      ${relatedChains ? `<h3>所在关系链</h3><p>${relatedChains}</p>` : ""}
      <h3>资料状态</h3>
      <p class="detail-status">${item.status}</p>
      <a class="detail-source" href="../../LLM%20wiki/wiki/${item.source}" target="_blank" rel="noreferrer">打开对应 Wiki 页面 ↗</a>`;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    $("#drawer-close").focus();
  }
  function closeDrawer() {
    const previous = state.pinned ? nodesById.get(state.pinned) : null;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.style.overflow = "";
    previous?.classList.remove("is-active");
    state.pinned = null;
    previous?.focus({ preventScroll: true });
  }

  // ---------- 匹配 ----------
  function matches(item) {
    return state.categories.has(item.category) && (!state.query || cleanSearchText(item).includes(state.query));
  }
  function inSoloChain(id) {
    if (!state.solo) return true;
    const chain = TIMELINE_CHAINS.find((c) => c.id === state.solo);
    return chain ? chain.nodeIds.includes(id) : true;
  }

  // ---------- 应用筛选 / 重绘 ----------
  function applyFilters() {
    let visible = 0;
    TIMELINE_EVENTS.forEach((item) => {
      const node = nodesById.get(item.id);
      const isVisible = matches(item);
      node.hidden = !isVisible;
      node.classList.toggle("is-dimmed", !inSoloChain(item.id));
      if (isVisible) visible += 1;
    });
    const soloChain = state.solo ? TIMELINE_CHAINS.find((c) => c.id === state.solo) : null;
    $("#result-summary").textContent = soloChain
      ? `聚焦「${soloChain.kicker}」 · ${soloChain.nodeIds.length} 个节点 —— 再次点击图例恢复全景`
      : `显示 ${visible} / ${TIMELINE_EVENTS.length} 个节点 · ${TIMELINE_CHAINS.length} 条关系同时显示`;
    layoutTimeline();
  }

  // ---------- SVG helpers ----------
  function svgElement(name, attrs = {}) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  }

  // ---------- 布局参数（竖版：X = 类别列，Y = 年份） ----------
  function computeMetrics() {
    const vw = window.innerWidth;
    const narrow = !PRINT_SCALE && vw < 720;
    const mid = !PRINT_SCALE && !narrow && vw < 1100;
    const pxPerYear = (narrow ? 62 : mid ? 92 : 108) * PRINT_SCALE; // 每年纵向高度
    const baseLane = (narrow ? 118 : mid ? 176 : 224) * PRINT_SCALE; // 基准列宽（再乘 LANE_SCALE 得到各列宽）
    const laneWidths = LANE_SCALE.map((s) => Math.round(baseLane * s));
    const gutterH = (narrow ? 52 : 64) * PRINT_SCALE;                // 顶部固定类别栏高度
    const yearAxisW = (narrow ? 58 : mid ? 92 : 116) * PRINT_SCALE;  // 左侧年份轴宽度（含左侧标签空间）
    const footerH = 20 * PRINT_SCALE;
    const topPad = gutterH + (narrow ? 10 : 16) * PRINT_SCALE;
    const bottomPad = (narrow ? 30 : 60) * PRINT_SCALE;
    const rightPad = (narrow ? 16 : 40) * PRINT_SCALE;
    const width = yearAxisW + laneWidths.reduce((a, b) => a + b, 0) + rightPad;
    const height = topPad + (YEAR_END - YEAR_START + 1) * pxPerYear + bottomPad;
    const yFor = (year, month = 6) =>
      topPad + (year - YEAR_START + (Math.max(1, Math.min(12, month)) - 1) / 12) * pxPerYear;
    const laneX = (index) => yearAxisW + laneWidths.slice(0, index).reduce((a, b) => a + b, 0);
    return { narrow, mid, pxPerYear, laneWidths, gutterH, yearAxisW, footerH, topPad, bottomPad, rightPad, width, height, yFor, laneX };
  }

  // ---------- 节点位置（竖版：同列内按年份纵向排列，时间相近者左右错开） ----------
  function layoutNodes(metrics) {
    positionsById.clear();
    const slotStep = metrics.narrow ? 11 : 14;
    const minDistance = metrics.narrow ? 13 : 17;
    CATEGORY_ORDER.forEach((category, categoryIndex) => {
      const items = TIMELINE_EVENTS
        .filter((item) => item.category === category)
        .sort((a, b) => metrics.yFor(a.year, a.month) - metrics.yFor(b.year, b.month));
      const recent = [];
      items.forEach((item) => {
        const y = metrics.yFor(item.year, item.month || 6);
        while (recent.length && y - recent[0].y > minDistance) recent.shift();
        const occupied = new Set(recent.map((entry) => entry.slot));
        const slotOrder = [0, -1, 1, -2, 2, -3, 3];
        const slot = slotOrder.find((candidate) => !occupied.has(candidate)) ?? 0;
        recent.push({ y, slot });
        const laneCenter = metrics.laneX(categoryIndex) + metrics.laneWidths[categoryIndex] * 0.5;
        const x = laneCenter + slot * slotStep;
        positionsById.set(item.id, { x, y });
        const node = nodesById.get(item.id);
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
      });
    });
  }

  // ---------- 平滑路径（Catmull-Rom → 贝塞尔） ----------
  function smoothPath(points) {
    if (points.length < 2) return "";
    const r = (n) => Math.round(n * 10) / 10;
    if (points.length === 2) {
      const [a, b] = points;
      const mx = (a.x + b.x) / 2;
      return `M ${r(a.x)} ${r(a.y)} C ${r(mx)} ${r(a.y)}, ${r(mx)} ${r(b.y)}, ${r(b.x)} ${r(b.y)}`;
    }
    let d = `M ${r(points[0].x)} ${r(points[0].y)}`;
    for (let i = 0; i < points.length - 1; i += 1) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${r(c1x)} ${r(c1y)}, ${r(c2x)} ${r(c2y)}, ${r(p2.x)} ${r(p2.y)}`;
    }
    return d;
  }

  // ---------- 主渲染 ----------
  function layoutTimeline() {
    const metrics = computeMetrics();
    canvas.style.width = `${metrics.width}px`;
    canvas.style.height = `${metrics.height}px`;
    gutter.style.height = `${metrics.gutterH}px`;

    layoutNodes(metrics);

    const svg = $("#timeline-grid");
    svg.innerHTML = "";
    svg.setAttribute("width", metrics.width);
    svg.setAttribute("height", metrics.height);
    svg.setAttribute("viewBox", `0 0 ${metrics.width} ${metrics.height}`);

    const gBands = svgElement("g");
    const gGrid = svgElement("g");
    const gConn = svgElement("g");
    const gLeader = svgElement("g");
    const gLabel = svgElement("g");
    svg.append(gBands, gGrid, gConn, gLeader, gLabel);

    // 纵向泳道色带 + 列分隔线
    CATEGORY_ORDER.forEach((category, index) => {
      const x = metrics.laneX(index);
      gBands.appendChild(svgElement("rect", {
        x, y: metrics.gutterH, width: metrics.laneWidths[index],
        height: metrics.height - metrics.gutterH - metrics.footerH,
        class: `grid-band grid-band--${category}`
      }));
      if (index > 0) {
        gGrid.appendChild(svgElement("line", {
          x1: x, y1: metrics.gutterH, x2: x, y2: metrics.height - metrics.footerH,
          class: "grid-row-line"
        }));
      }
    });
    // 左/右轴
    gGrid.appendChild(svgElement("line", {
      x1: metrics.yearAxisW, y1: metrics.gutterH, x2: metrics.yearAxisW, y2: metrics.height - metrics.footerH,
      class: "grid-axis"
    }));
    gGrid.appendChild(svgElement("line", {
      x1: metrics.width - metrics.rightPad, y1: metrics.gutterH,
      x2: metrics.width - metrics.rightPad, y2: metrics.height - metrics.footerH,
      class: "grid-axis"
    }));

    // 年份刻度：5 年主刻度通长横线，其余年份只在轴上画短 tick
    for (let year = YEAR_START; year <= YEAR_END; year += 1) {
      const y = metrics.yFor(year, 1);
      const major = year === YEAR_START || year === YEAR_END || year % 5 === 0;
      if (major) {
        gGrid.appendChild(svgElement("line", {
          x1: metrics.yearAxisW, y1: y, x2: metrics.width - metrics.rightPad, y2: y,
          class: "grid-vline--major"
        }));
      } else {
        gGrid.appendChild(svgElement("line", {
          x1: metrics.yearAxisW, y1: y, x2: metrics.yearAxisW + 7, y2: y, class: "grid-tick"
        }));
      }
      if (major || !metrics.narrow) {
        const label = svgElement("text", {
          x: metrics.yearAxisW - 10, y: y + 3.5,
          "text-anchor": "end",
          class: major ? "grid-year grid-year--major" : "grid-year grid-year--minor"
        });
        label.textContent = year;
        gGrid.appendChild(label);
      }
    }

    // 顶部固定类别栏对齐
    $$(".timeline-gutter__lane", gutter).forEach((block, index) => {
      block.style.left = `${metrics.laneX(index)}px`;
      block.style.width = `${metrics.laneWidths[index]}px`;
    });

    // 关系链连线
    TIMELINE_CHAINS.forEach((chain) => {
      const points = chain.nodeIds
        .map((id) => {
          const node = nodesById.get(id);
          return node && !node.hidden ? positionsById.get(id) : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.y - b.y);
      if (points.length < 2) return;
      const dimmed = state.solo && chain.id !== state.solo;
      const solo = state.solo === chain.id;
      const d = smoothPath(points);
      gConn.appendChild(svgElement("path", {
        d, class: `conn-under${dimmed ? " is-dimmed" : ""}`
      }));
      gConn.appendChild(svgElement("path", {
        d, class: `conn-path${dimmed ? " is-dimmed" : ""}${solo ? " is-solo" : ""}`,
        stroke: chain.color
      }));
      // 链末箭头（退到节点圆之外，避免被节点盖住）
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      const dx = last.x - prev.x;
      const dy = last.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const ax = last.x - (dx / len) * 17;
      const ay = last.y - (dy / len) * 17;
      const arrow = svgElement("path", {
        d: "M -7 -4.2 L 0 0 L -7 4.2",
        class: `conn-arrow${dimmed ? " is-dimmed" : ""}`,
        stroke: chain.color,
        transform: `translate(${ax.toFixed(1)} ${ay.toFixed(1)}) rotate(${angle.toFixed(1)})`
      });
      gConn.appendChild(arrow);
    });

    // 标签（竖版：标签在节点左侧或右侧，按纵向位置防重叠）
    labelsById.clear();
    const baseSize = (metrics.narrow ? 9 : 11) * PRINT_SCALE;
    const minorSize = (metrics.narrow ? 8.5 : 10) * PRINT_SCALE;
    const labelFont = `700 ${baseSize}px "Noto Sans SC", sans-serif`;
    const yearFont = `800 ${Math.round(baseSize * 0.82 * 10) / 10}px "Noto Sans SC", sans-serif`;
    const colsFor = (all) => {
      if (metrics.narrow) return [-30, 30, -56, 56, -82, 82];
      if (metrics.mid) return [-50, 50, -96, 96, -142, 142];
      return all ? [-60, 60, -114, 114, -168, 168] : [-64, 64, -122, 122];
    };
    const colOffsets = colsFor(state.showAllLabels);
    const rowH = baseSize + 7;

    CATEGORY_ORDER.forEach((category, categoryIndex) => {
      const laneCenter = metrics.laneX(categoryIndex) + metrics.laneWidths[categoryIndex] * 0.5;
      const items = TIMELINE_EVENTS
        .filter((item) => item.category === category)
        .filter((item) => (state.showAllLabels && !nodesById.get(item.id).hidden) || shouldLabel(item))
        .sort((a, b) => positionsById.get(a.id).y - positionsById.get(b.id).y);
      const lastBottom = colOffsets.map(() => -Infinity);

      items.forEach((item) => {
        const point = positionsById.get(item.id);
        const yearText = `${item.year}`;
        const titleText = item.title;
        const w = measureText(yearText, yearFont) + 5 + measureText(titleText, labelFont) + 8;
        const cy = Math.max(metrics.gutterH + rowH / 2, Math.min(metrics.height - 8 - rowH / 2, point.y));
        const top = cy - rowH / 2;
        let col = lastBottom.findIndex((bottom) => top > bottom + 8);
        if (col < 0) {
          let min = Infinity;
          lastBottom.forEach((bottom, i) => { if (bottom < min) { min = bottom; col = i; } });
        }
        lastBottom[col] = top + rowH;

        const offset = colOffsets[col];
        // 方向：FORCE_LABEL_SIDE 指定的节点固定方向；其余按可用空间自适应（放不下则翻转）
        const dist = Math.abs(offset);
        const leftOK = laneCenter - dist - w >= metrics.yearAxisW + 10;
        const rightOK = laneCenter + dist + w <= metrics.width - 10;
        const forced = FORCE_LABEL_SIDE[item.id];
        let leftSide = forced ? forced === "left" : offset < 0;
        if (!forced) {
          if (leftSide && !leftOK && rightOK) leftSide = false;
          else if (!leftSide && !rightOK && leftOK) leftSide = true;
        }
        const baselineX = leftSide
          ? Math.max(laneCenter - dist, metrics.yearAxisW + 10 + w)
          : Math.min(laneCenter + dist, metrics.width - 10 - w);
        const baselineY = cy + baseSize * 0.36;
        const hidden = nodesById.get(item.id).hidden;
        const dimmed = !inSoloChain(item.id);

        const leader = svgElement("line", {
          x1: point.x, y1: point.y,
          x2: baselineX + (leftSide ? 3 : -9),
          y2: cy,
          class: `tl-leader${dimmed ? " is-dimmed" : ""}`
        });
        if (hidden) leader.setAttribute("visibility", "hidden");
        gLeader.appendChild(leader);

        const minor = state.showAllLabels && !shouldLabel(item);
        const text = svgElement("text", {
          x: baselineX, y: baselineY,
          "text-anchor": leftSide ? "end" : "start",
          class: `tl-label${minor ? " tl-label--minor" : ""}${dimmed ? " is-dimmed" : ""}`
        });
        text.style.fontSize = `${minor ? minorSize : baseSize}px`;
        if (hidden) text.setAttribute("visibility", "hidden");
        const yearSpan = svgElement("tspan", { class: "tl-label__year" });
        yearSpan.textContent = yearText;
        const gap = svgElement("tspan", { dx: 5 * PRINT_SCALE });
        gap.textContent = titleText;
        text.append(yearSpan, gap);
        gLabel.appendChild(text);
        labelsById.set(item.id, { text, leader });
      });
    });
  }

  // ---------- 拖拽纵向滚动 ----------
  function bindDragScroll() {
    let down = false;
    let startY = 0;
    let startTop = 0;
    let moved = false;
    scrollBox.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".timeline-node")) return;
      down = true;
      moved = false;
      startY = event.clientY;
      startTop = scrollBox.scrollTop;
    });
    window.addEventListener("pointermove", (event) => {
      if (!down) return;
      const dy = event.clientY - startY;
      if (Math.abs(dy) > 4) {
        moved = true;
        scrollBox.classList.add("is-dragging");
      }
      scrollBox.scrollTop = startTop - dy;
    });
    window.addEventListener("pointerup", () => {
      down = false;
      scrollBox.classList.remove("is-dragging");
    });
    scrollBox.addEventListener("click", (event) => {
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      }
    }, true);
  }

  // ---------- 重置 / 事件绑定 ----------
  function reset() {
    state.categories = new Set(Object.keys(TIMELINE_CATEGORIES));
    state.query = "";
    state.solo = null;
    state.showAllLabels = false;
    $$("#category-filters input").forEach((input) => { input.checked = true; });
    $("#toggle-all-labels").checked = false;
    $$("#relationship-legend .relationship-legend__item").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
      item.style.borderColor = "";
    });
    $("#search-input").value = "";
    applyFilters();
  }

  function bindEvents() {
    $("#search-input").addEventListener("input", (event) => {
      state.query = event.target.value.trim().toLowerCase();
      applyFilters();
    });
    $("#toggle-all-labels").addEventListener("change", (event) => {
      state.showAllLabels = event.target.checked;
      applyFilters();
    });
    $("#reset-button").addEventListener("click", reset);
    $("#drawer-close").addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
    });
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutTimeline, 120);
    });
    bindDragScroll();
  }

  function init() {
    $("#event-count").textContent = TIMELINE_EVENTS.length;
    $("#chain-count").textContent = TIMELINE_CHAINS.length;
    buildFilters();
    buildRelationshipLegend();
    buildChainCards();
    buildNodes();
    buildGutter();
    bindEvents();
    applyFilters();
  }

  init();
})();
