/* 失去之后 - 滚动叙事与可视化
   数据层保持在 story-data.js；本文件只负责呈现。 */

"use strict";

const NS = "http://www.w3.org/2000/svg";
const DATA = STORY_DATA;
const FIGURES = DATA.figures;
const CASES = DATA.cases;
const CASE_BY_ID = new Map(CASES.map(d => [d.id, d]));
const FIG_BY_ID = new Map(FIGURES.map(d => [d.id, d]));
const PALETTE = ["#247ba0", "#d95d39", "#15806f", "#e0a22b", "#77579a", "#39736a"];
const CATEGORY_COLORS = ["#d94b3d", "#247ba0", "#15806f", "#77579a", "#e0a22b", "#577590", "#9a6b45", "#6b705c"];
const TYPE_LABEL = { injured_worker: "受伤工人", died_worker: "工亡者", family_claimant: "家属请求人" };

const svg = document.querySelector("#vizSvg");
const card = document.querySelector("#figureCard");
const chapterTag = document.querySelector("#chapterTag");
const steps = Array.from(document.querySelectorAll(".step"));
const toTop = document.querySelector("#toTop");

let mapLayer;
let routeLayer;
let chartLayer;
let figureLayer;
let annotationLayer;
let currentStep = -1;
let renderToken = 0;
let chapterTimer = null;

function setResponsiveViewBox() {
  if (window.innerWidth <= 760) {
    svg.setAttribute("viewBox", "280 45 720 520");
    svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
  } else {
    svg.setAttribute("viewBox", "0 0 1000 600");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  }
}

function el(name, attrs = {}, parent) {
  const node = document.createElementNS(NS, name);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "text") node.textContent = value;
    else if (value !== undefined && value !== null) node.setAttribute(key, value);
  });
  if (parent) parent.appendChild(node);
  return node;
}

function text(parent, x, y, value, className, anchor) {
  return el("text", { x, y, text: value, class: className, "text-anchor": anchor || "start" }, parent);
}

function line(parent, x1, y1, x2, y2, className, extra = {}) {
  return el("line", { x1, y1, x2, y2, class: className, ...extra }, parent);
}

function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

function buildLayers() {
  setResponsiveViewBox();
  clear(svg);
  mapLayer = el("g", { class: "map-layer" }, svg);
  routeLayer = el("g", { class: "route-layer" }, svg);
  chartLayer = el("g", { class: "chart-layer" }, svg);
  figureLayer = el("g", { class: "figure-layer" }, svg);
  annotationLayer = el("g", { class: "annotation-layer" }, svg);
  FIGURES.forEach((d, i) => figureLayer.appendChild(makePixelPerson(d, i)));
  figureLayer.addEventListener("pointerover", event => {
    const person = event.target.closest?.(".pixel-person");
    if (!person) return;
    const data = FIG_BY_ID.get(person.dataset.id);
    if (data) showFigureCard(data, event.clientX, event.clientY);
  });
  figureLayer.addEventListener("pointermove", event => {
    if (event.target.closest?.(".pixel-person")) moveCard(event.clientX, event.clientY);
  });
  figureLayer.addEventListener("pointerout", event => {
    const person = event.target.closest?.(".pixel-person");
    if (person && !person.contains(event.relatedTarget)) hideCard();
  });
  figureLayer.addEventListener("click", event => {
    const person = event.target.closest?.(".pixel-person");
    if (!person) return;
    event.stopPropagation();
    const data = FIG_BY_ID.get(person.dataset.id);
    if (data) showFigureCard(data, event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2);
  });
}

function rect(parent, x, y, width, height, fill, className, extra = {}) {
  return el("rect", { x, y, width, height, fill, class: className || "", ...extra }, parent);
}

function makePixelPerson(d, index) {
  const outer = el("g", {
    class: "pixel-person",
    tabindex: "0",
    role: "img",
    "aria-label": `${d.name}，${d.injury || TYPE_LABEL[d.type] || "当事人"}`
  });
  outer.dataset.id = d.id;
  const bob = el("g", { class: "person-bob" }, outer);
  const body = el("g", { class: "person-body" }, bob);
  const shirt = d.type === "family_claimant" ? "#77579a" : PALETTE[index % PALETTE.length];
  const trousers = index % 2 ? "#273f4d" : "#34483e";
  const skin = "#d39a72";
  const hair = index % 3 === 0 ? "#2b2824" : "#49392d";
  const injuryText = `${d.injury || ""} ${(d.bodyParts || []).join(" ")} ${(d.lostParts || []).join(" ")}`;
  const lost = (d.lostParts || []).join(" ");
  const leftArmGone = /左上肢|左臂|双上臂|双臂/.test(lost);
  const rightArmGone = /右上肢|右臂|双上臂|双臂/.test(lost);
  const leftForearmGone = /左前臂/.test(lost);
  const rightForearmGone = /右前臂/.test(lost);
  const leftLowerLegGone = /左小腿|左腿/.test(lost);
  const rightLowerLegGone = /右小腿|右腿/.test(lost);
  const handsHurt = /双手|左手|右手/.test(injuryText);
  const lung = /肺|矽肺|尘肺/.test(injuryText);
  const spine = /截瘫|瘫痪|脊柱/.test(injuryText);
  const dead = d.type === "died_worker" || (d.death && d.death.is_death);

  rect(body, 12, 3, 14, 13, skin);
  rect(body, 12, 3, 14, 4, hair);
  rect(body, 10, 7, 2, 5, hair);
  rect(body, 14, 9, 2, 2, "#1d2724");
  rect(body, 22, 9, 2, 2, "#1d2724");
  rect(body, 16, 16, 6, 3, skin);
  rect(body, 10, 19, 18, 20, shirt, "garment");
  rect(body, 18, 19, 2, 20, "rgba(255,255,255,.45)");
  rect(body, 8, 20, 2, 7, shirt, "garment");
  rect(body, 28, 20, 2, 7, shirt, "garment");

  const arm = (side, gone, forearmGone) => {
    const left = side === "left";
    const xUpper = left ? 4 : 30;
    const xLower = left ? 2 : 32;
    const stumpX = left ? 6 : 30;
    if (gone) {
      rect(body, stumpX, 21, 4, 5, "#d94b3d", "stump");
      return;
    }
    rect(body, xUpper, 23, 6, 10, shirt, "garment");
    if (forearmGone) {
      rect(body, left ? 3 : 33, 32, 5, 4, "#d94b3d", "stump");
      return;
    }
    rect(body, xLower, 31, 6, 10, skin);
    rect(body, left ? 1 : 33, 39, 7, 5, handsHurt ? "#d94b3d" : skin, handsHurt ? "injury-pulse" : "");
  };
  arm("left", leftArmGone, leftForearmGone);
  arm("right", rightArmGone, rightForearmGone);

  if (spine) {
    rect(body, 11, 39, 15, 7, trousers);
    rect(body, 22, 44, 12, 5, trousers);
    el("circle", { cx: 26, cy: 52, r: 9, fill: "none", stroke: "#1d2724", "stroke-width": 4 }, body);
    el("circle", { cx: 26, cy: 52, r: 3, fill: "#f2b544" }, body);
    line(body, 8, 49, 18, 49, "", { stroke: "#1d2724", "stroke-width": 3 });
  } else {
    rect(body, 11, 39, 7, 10, trousers);
    rect(body, 21, 39, 7, 10, trousers);
    if (leftLowerLegGone) rect(body, 12, 48, 6, 5, "#d94b3d", "stump");
    else {
      rect(body, 11, 48, 7, 12, trousers);
      rect(body, 8, 58, 10, 4, "#202927");
    }
    if (rightLowerLegGone) rect(body, 21, 48, 6, 5, "#d94b3d", "stump");
    else {
      rect(body, 21, 48, 7, 12, trousers);
      rect(body, 21, 58, 10, 4, "#202927");
    }
  }
  if (lung) {
    rect(body, 13, 25, 6, 8, "#d94b3d", "injury-pulse");
    rect(body, 20, 25, 6, 8, "#d94b3d", "injury-pulse");
  }
  if (dead) {
    rect(body, 9, 27, 21, 4, "#1d2724");
    rect(body, 17, 24, 4, 10, "#1d2724");
    outer.classList.add("is-deceased");
  }
  if (d.type === "family_claimant") {
    rect(body, 27, 33, 9, 12, "#f2b544");
    rect(body, 29, 35, 5, 2, "#fffdf7");
  }
  body.querySelectorAll(".garment").forEach(shape => { shape.dataset.baseFill = shape.getAttribute("fill"); });
  rect(bob, -3, -3, 45, 69, "none", "focus-ring");
  outer.addEventListener("mouseenter", event => showFigureCard(d, event.clientX, event.clientY));
  outer.addEventListener("mousemove", event => moveCard(event.clientX, event.clientY));
  outer.addEventListener("mouseleave", hideCard);
  outer.addEventListener("focus", () => showFigureCard(d, window.innerWidth / 2, window.innerHeight / 2));
  outer.addEventListener("blur", hideCard);
  outer.addEventListener("click", event => {
    event.stopPropagation();
    showFigureCard(d, event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2);
  });
  outer.__pose = { x: 500, y: 300, scale: 0.01, opacity: 0 };
  return outer;
}

function figureEl(id) { return figureLayer.querySelector(`[data-id="${id}"]`); }

function setPose(d, pose, options = {}) {
  const node = figureEl(d.id);
  if (!node) return;
  const target = { x: pose.x, y: pose.y, scale: pose.scale ?? 1, opacity: pose.opacity ?? 1 };
  const from = node.__pose || target;
  const duration = options.duration ?? 760;
  const delay = options.delay ?? 0;
  const token = renderToken;
  const started = performance.now() + delay;
  node.style.display = target.opacity <= 0 && duration === 0 ? "none" : "";
  node.classList.toggle("moving", duration > 200 && (Math.abs(target.x - from.x) > 20 || Math.abs(target.y - from.y) > 20));
  const ease = t => 1 - Math.pow(1 - t, 3);
  function frame(now) {
    if (token !== renderToken) return;
    if (now < started) { requestAnimationFrame(frame); return; }
    const t = duration === 0 ? 1 : Math.min(1, (now - started) / duration);
    const p = ease(t);
    const x = from.x + (target.x - from.x) * p;
    const y = from.y + (target.y - from.y) * p;
    const scale = from.scale + (target.scale - from.scale) * p;
    const opacity = from.opacity + (target.opacity - from.opacity) * p;
    node.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(3)})`);
    node.style.opacity = opacity.toFixed(3);
    if (t < 1) requestAnimationFrame(frame);
    else {
      node.__pose = target;
      node.classList.remove("moving");
      if (target.opacity <= 0) node.style.display = "none";
    }
  }
  requestAnimationFrame(frame);
  node.__pose = target;
}

function hideAll(duration = 260) {
  FIGURES.forEach(d => {
    const p = figureEl(d.id).__pose;
    setPose(d, { ...p, opacity: 0, scale: Math.max(0.01, p.scale * 0.7) }, { duration });
  });
}

function showFigureCard(d, x, y) {
  const money = d.totalCompensation ? `${formatMoney(d.totalCompensation)}元` : "资料未载明";
  const origin = d.originCoord?.label || d.origin || "资料未载明";
  const accident = d.accidentCoord?.label || d.accidentPlace || "资料未载明";
  const grade = d.disabilityGrade || "未载明 / 不适用";
  card.innerHTML = `
    <div class="card-role">${TYPE_LABEL[d.type] || "当事人"}${d.representedByZhou ? " · 周立太代理" : ""}</div>
    <h3>${escapeHtml(d.name)}</h3>
    <div class="card-row"><b>从哪里来</b><span>${escapeHtml(origin)}</span></div>
    <div class="card-row"><b>伤在哪里</b><span>${escapeHtml(d.injury || (d.death?.cause || "档案未载明"))}</span></div>
    <div class="card-row"><b>伤残等级</b><span>${escapeHtml(grade)}</span></div>
    <div class="card-row"><b>获赔记录</b><span>${money}</span></div>
    ${d.storyNotes ? `<div class="card-note">${escapeHtml(d.storyNotes)}</div>` : ""}`;
  card.classList.add("show");
  moveCard(x, y);
}

function moveCard(x, y) {
  if (!card.classList.contains("show")) return;
  const pad = 14;
  const width = card.offsetWidth || 340;
  const height = card.offsetHeight || 260;
  card.style.left = `${Math.max(pad, Math.min(window.innerWidth - width - pad, x + 18))}px`;
  card.style.top = `${Math.max(pad, Math.min(window.innerHeight - height - pad, y + 18))}px`;
}

function hideCard() { card.classList.remove("show"); }
function escapeHtml(value) { const span = document.createElement("span"); span.textContent = String(value || ""); return span.innerHTML; }
function formatMoney(value) { return Number(value).toLocaleString("zh-CN", { maximumFractionDigits: 0 }); }

function header(kicker, titleValue, subtitle) {
  text(chartLayer, 62, 66, kicker.toUpperCase(), "viz-kicker");
  text(chartLayer, 62, 99, titleValue, "viz-title");
  text(chartLayer, 62, 126, subtitle, "viz-subtitle");
}

function progress(index) {
  rect(annotationLayer, 62, 558, 876, 5, "", "progress-rail");
  rect(annotationLayer, 62, 558, 876 * ((index + 1) / steps.length), 5, "", "progress-fill");
  text(annotationLayer, 938, 582, `${String(index + 1).padStart(2, "0")} / ${steps.length}`, "progress-label", "end");
}

const MAP_BOX = { x: 330, y: 90, w: 620, h: 430 };
const LON = [72.5, 135.5];
const LAT = [17.5, 54.5];
function project(coord) {
  if (!coord) return null;
  return [
    MAP_BOX.x + ((coord.lon - LON[0]) / (LON[1] - LON[0])) * MAP_BOX.w,
    MAP_BOX.y + ((LAT[1] - coord.lat) / (LAT[1] - LAT[0])) * MAP_BOX.h
  ];
}

function geometryPath(geometry) {
  if (!geometry) return "";
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.map(polygon => polygon.map(ring => ring.map(([lon, lat], index) => {
    const [x, y] = project({ lon, lat });
    return `${index ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z").join(" ")).join(" ");
}

function drawMap(mode) {
  const geometry = window.PLACE_MAP_DATA?.outline;
  if (geometry) el("path", { d: geometryPath(geometry), class: "map-shape", "fill-rule": "evenodd" }, mapLayer);
  else text(mapLayer, 500, 300, "地图轮廓未加载", "axis-label", "middle");
  const taiwan = { type: "Polygon", coordinates: [[
    [121.0, 25.3], [121.6, 24.8], [121.7, 24.1], [121.3, 23.3],
    [120.9, 22.5], [120.5, 21.9], [120.1, 22.4], [120.2, 23.1],
    [120.5, 24.0], [120.7, 24.8], [121.0, 25.3]
  ]] };
  el("path", { d: geometryPath(taiwan), class: "map-shape" }, mapLayer);
  [
    [[85, 42], [129, 42]],
    [[96, 30], [121, 30]],
    [[106, 23], [116, 23]]
  ].forEach(pair => {
    const a = project({ lon: pair[0][0], lat: pair[0][1] });
    const b = project({ lon: pair[1][0], lat: pair[1][1] });
    line(mapLayer, a[0], a[1], b[0], b[1], "map-inner");
  });
  const legendX = 72;
  if (mode === "migration") {
    el("circle", { cx: legendX, cy: 164, r: 7, fill: "#f2b544", stroke: "#1d2724", "stroke-width": 1 }, chartLayer);
    text(chartLayer, legendX + 16, 168, "原籍 · 起点", "legend-item");
    el("circle", { cx: legendX, cy: 197, r: 7, fill: "#d94b3d", stroke: "#1d2724", "stroke-width": 1 }, chartLayer);
    text(chartLayer, legendX + 16, 201, "事故地 · 终点", "legend-item");
    line(chartLayer, legendX - 7, 229, legendX + 7, 229, "route");
    text(chartLayer, legendX + 16, 233, "迁徙路径", "legend-item");
  } else {
    const color = mode === "origin" ? "#f2b544" : "#d94b3d";
    el("circle", { cx: legendX, cy: 164, r: 7, fill: color, stroke: "#1d2724", "stroke-width": 1 }, chartLayer);
    text(chartLayer, legendX + 16, 168, mode === "origin" ? "原籍有记录" : "事故地有记录", "legend-item");
    text(chartLayer, legendX, 194, "圆点是地点，人物环绕排布", "chart-note");
  }
}

function groupedMapPos(field, d, indexInGroup, groupSize, clusterBase) {
  const base = clusterBase || project(d[field]);
  if (!base) return null;
  const angle = (Math.PI * 2 * indexInGroup) / Math.max(groupSize, 1) - Math.PI / 2;
  const ring = groupSize > 4 ? 34 + Math.floor(indexInGroup / 8) * 18 : 27;
  return { x: base[0] + Math.cos(angle) * ring - 10, y: base[1] + Math.sin(angle) * ring - 16, base };
}

function clusterByLocation(field) {
  const clusters = [];
  FIGURES.filter(d => d[field]).forEach(d => {
    const point = project(d[field]);
    let cluster = clusters.find(c => Math.hypot(c.base[0] - point[0], c.base[1] - point[1]) < 54);
    if (!cluster) {
      cluster = { people: [], points: [], base: point, labels: new Set() };
      clusters.push(cluster);
    }
    cluster.people.push(d);
    cluster.points.push(point);
    cluster.labels.add(d[field].label);
    cluster.base = [
      cluster.points.reduce((sum, p) => sum + p[0], 0) / cluster.points.length,
      cluster.points.reduce((sum, p) => sum + p[1], 0) / cluster.points.length
    ];
  });
  return clusters;
}

function plotMapFigures(field, dotClass) {
  const clusters = clusterByLocation(field);
  clusters.forEach(cluster => {
    const group = cluster.people;
    const base = cluster.base;
    el("circle", { cx: base[0], cy: base[1], r: 10 + Math.min(9, group.length), class: dotClass }, chartLayer);
    text(chartLayer, base[0], base[1] + 1, group.length, "map-count", "middle");
    const labels = Array.from(cluster.labels);
    let label = labels[0] || "";
    if (labels.some(v => /深圳|东莞|惠州/.test(v)) && labels.length > 1) label = "深圳及珠三角";
    else if (labels.some(v => /重庆/.test(v)) && labels.length > 1) label = "重庆地区";
    if (group.length > 1) text(chartLayer, base[0] + 16, base[1] - 16, label, "map-label");
    group.forEach((d, i) => {
      const pos = groupedMapPos(field, d, i, group.length, base);
      line(routeLayer, base[0], base[1], pos.x + 9, pos.y + 13, "", { stroke: "#9b917d", "stroke-width": 0.8, opacity: 0.42 });
      setPose(d, { x: pos.x, y: pos.y, scale: 0.42, opacity: 1 }, { delay: i * 18 });
    });
  });
  FIGURES.filter(d => !d[field]).forEach((d, i) => setPose(d, { x: 74 + (i % 6) * 34, y: 410 + Math.floor(i / 6) * 45, scale: 0.38, opacity: 0.38 }, { delay: i * 15 }));
  text(chartLayer, 74, 397, `地点未载明 ${FIGURES.filter(d => !d[field]).length} 人`, "chart-note");
}

function figureYear(d) {
  const own = String(d.accidentDate || "").match(/\d{4}/)?.[0];
  if (own) return Number(own);
  for (const id of d.caseIds || []) {
    const value = String(CASE_BY_ID.get(id)?.dateStart || "").match(/\d{4}/)?.[0];
    if (value) return Number(value);
  }
  return null;
}

function primaryCategory(d) {
  for (const id of d.caseIds || []) {
    const category = CASE_BY_ID.get(id)?.incidentCategory?.[0];
    if (category) return category;
  }
  if (/肺|职业病|矽肺|尘肺/.test(d.injury || "")) return "职业病长期暴露";
  if ((d.lostParts || []).length) return "机器卷入挤压截肢";
  if (d.type === "died_worker") return "岗位突发疾病猝死";
  return "资料未分类";
}

function gradeNumber(d) {
  const raw = String(d.disabilityGrade || "");
  const map = { "一级": 1, "二级": 2, "三级": 3, "四级": 4, "五级": 5, "六级": 6, "七级": 7 };
  for (const [key, value] of Object.entries(map)) if (raw.includes(key)) return value;
  const range = raw.match(/(\d)\s*[—-]\s*(\d)/);
  return range ? Number(range[1]) : null;
}

function resetScene(index) {
  renderToken += 1;
  if (chapterTimer) clearTimeout(chapterTimer);
  chapterTimer = null;
  clear(mapLayer);
  clear(routeLayer);
  clear(chartLayer);
  clear(annotationLayer);
  figureLayer.querySelectorAll(".garment").forEach(shape => {
    if (shape.dataset.baseFill) shape.setAttribute("fill", shape.dataset.baseFill);
  });
  hideCard();
  progress(index);
}

function renderOpening() {
  header("档案中的工伤者", "33 个名字，不是一个抽象数字", "每一个像素人物都对应档案中的一位当事人、工亡者或家属请求人");
  const stats = [
    ["33", "人物"], ["28", "案件"], ["30", "由周立太代理"], ["1994—2019", "案件发生跨度"]
  ];
  stats.forEach((d, i) => {
    const x = 80 + i * 190;
    text(chartLayer, x, 190, d[0], "viz-title");
    text(chartLayer, x, 215, d[1], "axis-label");
    line(chartLayer, x, 229, x + 130, 229, "chart-grid");
  });
  const ids = ["person-xu-changwen", "person-peng-gangzhong"];
  ids.forEach((id, i) => setPose(FIG_BY_ID.get(id), { x: 380 + i * 210, y: 275, scale: 2.2, opacity: 1 }, { delay: i * 140 }));
  FIGURES.filter(d => !ids.includes(d.id)).forEach(d => setPose(d, { x: 500, y: 350, scale: 0.01, opacity: 0 }, { duration: 220 }));
  text(chartLayer, 420, 470, "徐昌文", "axis-value", "middle");
  text(chartLayer, 630, 470, "彭刚中", "axis-value", "middle");
  text(chartLayer, 420, 490, "下班途中交通事故 · 工亡", "chart-note", "middle");
  text(chartLayer, 630, 490, "机器轧断左上肢 · 五级", "chart-note", "middle");
}

function renderXu() {
  header("第一宗代理", "一次事故，两条赔偿路径", "1996 · 徐昌文夫妇交通事故与工伤事故双赔案");
  const d = FIG_BY_ID.get("person-xu-changwen");
  setPose(d, { x: 600, y: 190, scale: 3.8, opacity: 1 });
  FIGURES.filter(f => f.id !== d.id).forEach(f => setPose(f, { x: 810, y: 420, scale: 0.2, opacity: 0 }, { duration: 250 }));
  const items = [["交通事故赔偿", "约 13 万"], ["工伤待遇", "约 20 万"], ["合计", "30—35 万"]];
  items.forEach((item, i) => {
    const y = 225 + i * 86;
    rect(chartLayer, 78, y - 25, 205, 58, i === 2 ? "#1d2724" : "#e6dcc8");
    text(chartLayer, 92, y, item[0], i === 2 ? "category-count" : "axis-label");
    text(chartLayer, 267, y + 1, item[1], i === 2 ? "category-count" : "axis-value", "end");
  });
}

function renderPeng() {
  header("第一位工伤客户", "缺失必须能被看见", "1996 · 彭刚中左上肢被机器轧断；红色截面标记档案载明的缺失部位");
  const d = FIG_BY_ID.get("person-peng-gangzhong");
  setPose(d, { x: 610, y: 170, scale: 4.2, opacity: 1 });
  FIGURES.filter(f => f.id !== d.id).forEach(f => setPose(f, { ...figureEl(f.id).__pose, opacity: 0 }, { duration: 220 }));
  line(chartLayer, 535, 285, 680, 285, "", { stroke: "#d94b3d", "stroke-width": 2 });
  el("circle", { cx: 680, cy: 285, r: 5, fill: "#d94b3d" }, chartLayer);
  text(chartLayer, 500, 280, "左上肢截肢", "axis-value", "end");
  const values = [["旧标准", "33,101 元"], ["最终获赔", "约 17.2 万元"], ["变化", "赔偿基数 + 假肢费"]];
  values.forEach((v, i) => {
    text(chartLayer, 80, 250 + i * 68, v[0], "axis-label");
    text(chartLayer, 80, 276 + i * 68, v[1], i === 1 ? "viz-title" : "axis-value");
  });
}

function renderPanorama() {
  header("22 年案件轨迹", "从两宗个案到一条维权时间线", "人物按档案中可识别的事故或案件起始年份移动；未知年份留在右侧");
  const x0 = 360, x1 = 930, yAxis = 475;
  line(chartLayer, x0, yAxis, x1, yAxis, "chart-axis");
  [1994, 2000, 2006, 2012, 2019].forEach(year => {
    const x = x0 + ((year - 1994) / 25) * (x1 - x0);
    line(chartLayer, x, 150, x, yAxis, "chart-grid");
    text(chartLayer, x, 500, year, "axis-label", "middle");
  });
  const byYear = new Map();
  FIGURES.forEach(d => {
    const year = figureYear(d);
    const key = year || "unknown";
    if (!byYear.has(key)) byYear.set(key, []);
    byYear.get(key).push(d);
  });
  byYear.forEach((group, key) => group.forEach((d, i) => {
    const x = key === "unknown" ? 915 : x0 + ((key - 1994) / 25) * (x1 - x0);
    setPose(d, { x: x - 10 + (i % 3) * 18, y: 410 - Math.floor(i / 3) * 47, scale: 0.47, opacity: key === "unknown" ? 0.35 : 1 }, { delay: i * 14 });
  }));
  text(chartLayer, 914, 142, "年份未载明", "chart-note", "middle");
  const milestones = [[1996, "双赔案 / 断臂案"], [2000, "刘涛 158 万"], [2011, "社会保险法"], [2021, "先行支付突破"]];
  milestones.forEach(([year, label], i) => {
    const bounded = Math.min(2019, year);
    const x = x0 + ((bounded - 1994) / 25) * (x1 - x0);
    text(chartLayer, x, 150 + (i % 2) * 25, label, "chart-note", year > 2019 ? "end" : "middle");
  });
}

function renderRoster() {
  header("人物总览", "33 个人，三种档案身份", "彩色衣服区分人物；黑色十字标记工亡者，黄色文件标记代为主张权利的家属");
  const x0 = 390, y0 = 155, cols = 8, dx = 69, dy = 90;
  FIGURES.forEach((d, i) => {
    const x = x0 + (i % cols) * dx;
    const y = y0 + Math.floor(i / cols) * dy;
    setPose(d, { x, y, scale: 0.7, opacity: 1 }, { delay: i * 18 });
    text(annotationLayer, x + 13, y + 56, d.name, "chart-note", "middle");
  });
  const legend = [["#247ba0", "受伤工人 14"], ["#1d2724", "工亡者 12"], ["#77579a", "家属请求人 7"]];
  legend.forEach((d, i) => {
    rect(chartLayer, 72, 180 + i * 43, 15, 15, d[0]);
    text(chartLayer, 98, 192 + i * 43, d[1], "legend-item");
  });
}

function renderOriginMap() {
  header("身份与原籍", "他们从哪里来", `${DATA.coverage.figure.with_origin.count} / ${FIGURES.length} 人在档案中留下可定位的原籍`);
  drawMap("origin");
  plotMapFigures("originCoord", "map-dot-origin");
}

function renderAccidentMap() {
  header("事故现场", "伤害发生在哪里", `${FIGURES.filter(d => d.accidentCoord).length} 人有可定位的事故地；深圳及珠三角最密集`);
  drawMap("accident");
  plotMapFigures("accidentCoord", "map-dot-accident");
}

function renderMerge() {
  header("合并伤情", "把 33 个人重叠成一具身体", "已知伤情集中在手臂、双手、肺与脊柱；没有标记表示资料未载明，不代表没有受伤");
  FIGURES.forEach((d, i) => setPose(d, { x: 675 + (i % 3 - 1) * 1.2, y: 175 + (i % 4 - 1.5) * 1.1, scale: 3.35, opacity: 0.045 }, { delay: i * 10, duration: 1050 }));
  const composite = makePixelPerson({ id: "composite", name: "33 人叠加", type: "injured_worker", injury: "双上臂 肺 截瘫", bodyParts: ["肺", "脊柱"], lostParts: ["双上臂"] }, 2);
  composite.removeAttribute("tabindex");
  composite.style.pointerEvents = "none";
  composite.setAttribute("transform", "translate(675 175) scale(3.35)");
  annotationLayer.appendChild(composite);
  const labels = [
    [655, 258, 520, 235, "6 人：截肢 / 机器挤压"],
    [734, 270, 845, 246, "7 人：尘肺与职业病"],
    [712, 362, 852, 382, "2 人：截瘫 / 脊柱损伤"],
    [710, 215, 846, 175, "12 人：工亡"]
  ];
  labels.forEach(([x1, y1, x2, y2, label]) => {
    line(annotationLayer, x1, y1, x2, y2, "", { stroke: "#d94b3d", "stroke-width": 1.5 });
    el("circle", { cx: x1, cy: y1, r: 4, fill: "#d94b3d" }, annotationLayer);
    text(annotationLayer, x2 + (x2 < x1 ? -8 : 8), y2 + 4, label, "axis-value", x2 < x1 ? "end" : "start");
  });
}

function renderGradeAxis() {
  header("伤残等级", "法律如何给身体排序", "一级最重，十级最轻；本数据集中 12 人有明确或区间等级，其余保留为“未载明”");
  const columns = [1, 2, 3, 4, 5, 6, null];
  const labels = ["一级", "二级", "三级", "四级", "五级", "六级", "未载明"];
  const x0 = 360, dx = 92;
  columns.forEach((grade, i) => {
    const x = x0 + i * dx;
    rect(chartLayer, x - 8, 145, 74, 320, grade ? CATEGORY_COLORS[Math.min(grade - 1, 5)] : "#d8d0bf", "", { opacity: 0.16 });
    text(chartLayer, x + 28, 170, labels[i], "category-label", "middle");
    if (grade) text(chartLayer, x + 28, 188, grade === 1 ? "最重" : "", "chart-note", "middle");
  });
  const groups = columns.map(grade => FIGURES.filter(d => grade === null ? !gradeNumber(d) : gradeNumber(d) === grade));
  groups.forEach((group, col) => group.forEach((d, i) => {
    const x = x0 + col * dx + (i % 2) * 34;
    const y = 215 + Math.floor(i / 2) * 72;
    const node = figureEl(d.id);
    if (col < 6) node.querySelectorAll(".garment").forEach(shape => shape.setAttribute("fill", CATEGORY_COLORS[col]));
    setPose(d, { x, y, scale: 0.54, opacity: col === 6 ? 0.45 : 1 }, { delay: i * 15 });
  }));
  text(chartLayer, 74, 250, "颜色越深，等级越重", "legend-item");
  [1, 3, 6].forEach((n, i) => rect(chartLayer, 74 + i * 42, 270, 32, 16, CATEGORY_COLORS[n - 1]));
}

function renderIncidentType() {
  header("事故类型", "工伤如何发生", "把同一批人物从伤残等级重新排入事故机制；家属跟随其所主张的案件归类");
  const raw = new Map();
  FIGURES.forEach(d => {
    const key = primaryCategory(d);
    if (!raw.has(key)) raw.set(key, []);
    raw.get(key).push(d);
  });
  const groups = Array.from(raw.entries()).sort((a, b) => b[1].length - a[1].length);
  groups.forEach(([name, group], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 390 + col * 285;
    const y = 145 + row * 67;
    rect(chartLayer, x, y, 268, 52, CATEGORY_COLORS[i % CATEGORY_COLORS.length], "", { opacity: 0.16 });
    rect(chartLayer, x, y, 8, 52, CATEGORY_COLORS[i % CATEGORY_COLORS.length]);
    text(chartLayer, x + 17, y + 18, name, "category-label");
    text(chartLayer, x + 252, y + 19, `${group.length} 人`, "axis-value", "end");
    group.forEach((d, j) => {
      figureEl(d.id).querySelectorAll(".garment").forEach(shape => shape.setAttribute("fill", CATEGORY_COLORS[i % CATEGORY_COLORS.length]));
      setPose(d, { x: x + 18 + j * 29, y: y + 24, scale: 0.36, opacity: 1 }, { delay: j * 20 });
    });
  });
}

function renderMigration() {
  header("迁徙路径", "从原籍到事故地", "线条只连接同时具备两端坐标的人；人物会沿数据记录的方向重新移动");
  drawMap("migration");
  const movers = FIGURES.filter(d => d.originCoord && d.accidentCoord);
  movers.forEach((d, i) => {
    const a = project(d.originCoord);
    const b = project(d.accidentCoord);
    const curve = `M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.min(a[1], b[1]) - 28 - (i % 4) * 8} ${b[0]},${b[1]}`;
    el("path", { d: curve, class: "route" }, routeLayer);
    el("circle", { cx: a[0], cy: a[1], r: 3.5, class: "map-dot-origin" }, routeLayer);
    el("circle", { cx: b[0], cy: b[1], r: 4.5, class: "map-dot-accident" }, routeLayer);
    setPose(d, { x: a[0] - 8, y: a[1] - 15, scale: 0.38, opacity: 1 }, { duration: 600, delay: i * 18 });
  });
  FIGURES.filter(d => !(d.originCoord && d.accidentCoord)).forEach((d, i) => setPose(d, { x: 75 + (i % 6) * 34, y: 425 + Math.floor(i / 6) * 42, scale: 0.34, opacity: 0.28 }, { delay: i * 10 }));
  chapterTimer = setTimeout(() => {
    if (currentStep !== 7) return;
    movers.forEach((d, i) => {
      const b = project(d.accidentCoord);
      setPose(d, { x: b[0] - 8 + (i % 5) * 3, y: b[1] - 15 - (i % 4) * 3, scale: 0.38, opacity: 1 }, { duration: 1450, delay: i * 32 });
    });
  }, 850);
}

function compensationRecords() {
  return FIGURES.map(d => {
    let year = figureYear(d);
    if (!year) {
      for (const event of d.compensation || []) {
        const match = String(event.date || "").match(/\d{4}/);
        if (match) { year = Number(match[0]); break; }
      }
    }
    return { d, year, amount: d.totalCompensation };
  }).filter(item => item.year && item.amount);
}

function renderMatrix() {
  header("年份与获赔金额", "金额变高，留下的记录却并不完整", "横轴为事故或案件年份，纵轴为档案中的总获赔金额；悬停人物查看具体案件");
  const records = compensationRecords();
  const x0 = 345, x1 = 930, y0 = 470, y1 = 150;
  line(chartLayer, x0, y0, x1, y0, "chart-axis");
  line(chartLayer, x0, y0, x0, y1, "chart-axis");
  [1994, 2000, 2006, 2012, 2019].forEach(year => {
    const x = x0 + ((year - 1994) / 25) * (x1 - x0);
    line(chartLayer, x, y1, x, y0, "chart-grid");
    text(chartLayer, x, y0 + 25, year, "axis-label", "middle");
  });
  [0, 500000, 1000000, 1500000].forEach(amount => {
    const y = y0 - (amount / 1600000) * (y0 - y1);
    line(chartLayer, x0, y, x1, y, "chart-grid");
    text(chartLayer, x0 - 15, y + 4, amount === 0 ? "0" : `${amount / 10000}万`, "axis-label", "end");
  });
  records.forEach((item, i) => {
    const x = x0 + ((Math.min(2019, Math.max(1994, item.year)) - 1994) / 25) * (x1 - x0);
    const y = y0 - (Math.min(1600000, item.amount) / 1600000) * (y0 - y1);
    el("circle", { cx: x + 10, cy: y + 15, r: 13, fill: "#d94b3d", opacity: 0.18 }, chartLayer);
    setPose(item.d, { x, y, scale: 0.42, opacity: 1 }, { delay: i * 35 });
  });
  FIGURES.filter(d => !records.some(r => r.d.id === d.id)).forEach((d, i) => setPose(d, { x: 75 + (i % 6) * 34, y: 405 + Math.floor(i / 6) * 44, scale: 0.34, opacity: 0.25 }, { delay: i * 8 }));
  text(chartLayer, 75, 385, `年份或金额不足 ${FIGURES.length - records.length} 人`, "chart-note");
  const milestones = [[1996, "全国工伤框架"], [2004, "《工伤保险条例》"], [2011, "《社会保险法》"]];
  milestones.forEach(([year, label], i) => {
    const x = x0 + ((year - 1994) / 25) * (x1 - x0);
    line(chartLayer, x, y1, x, y0, "milestone");
    text(chartLayer, x + 5, y1 + 18 + i * 16, label, "chart-note");
  });
}

function renderPriceOfHand() {
  header("一双手的价格", "同样是身体缺失，数字相差十倍", "金额不能等同于生命或身体的价值，它记录的是当时规则允许主张到哪里");
  const ids = ["person-peng-gangzhong", "person-wang-qiong", "person-liu-tao"];
  const values = [172321, null, 1580000];
  const years = [1996, 1996, 1998];
  ids.forEach((id, i) => {
    const d = FIG_BY_ID.get(id);
    const x = 425 + i * 190;
    setPose(d, { x, y: 240, scale: 1.75, opacity: 1 }, { delay: i * 170 });
    text(chartLayer, x + 34, 390, d.name, "axis-value", "middle");
    text(chartLayer, x + 34, 413, `${years[i]} · ${d.disabilityGrade?.split("（")[0] || "等级未明"}`, "chart-note", "middle");
    text(chartLayer, x + 34, 445, values[i] ? `${formatMoney(values[i])} 元` : "金额未载明", "category-label", "middle");
  });
  FIGURES.filter(d => !ids.includes(d.id)).forEach(d => setPose(d, { ...figureEl(d.id).__pose, opacity: 0 }, { duration: 250 }));
  line(chartLayer, 390, 475, 870, 475, "chart-axis");
  text(chartLayer, 390, 505, "一只手", "axis-label");
  text(chartLayer, 870, 505, "双上臂", "axis-label", "end");
  rect(chartLayer, 75, 210, 215, 63, "#e6dcc8");
  text(chartLayer, 91, 235, "彭刚中旧标准", "axis-label");
  text(chartLayer, 91, 260, "33,101 元", "viz-title");
  text(chartLayer, 75, 305, "假肢更换费与赔偿基数", "legend-item");
  text(chartLayer, 75, 326, "在诉讼中被逐项争取。", "chart-note");
}

function renderEnding() {
  header("尾声", "数字之外，仍然是人", "档案让伤害可被主张；可视化只负责让这些记录不再隐身");
  const cols = 11;
  FIGURES.forEach((d, i) => setPose(d, { x: 315 + (i % cols) * 55, y: 205 + Math.floor(i / cols) * 100, scale: 0.62, opacity: 1 }, { delay: i * 22 }));
  text(chartLayer, 75, 230, "33", "viz-title");
  text(chartLayer, 75, 258, "位有名有姓的人", "axis-label");
  text(chartLayer, 75, 320, "16", "viz-title");
  text(chartLayer, 75, 348, "人留下赔偿金额", "axis-label");
  text(chartLayer, 75, 410, "13", "viz-title");
  text(chartLayer, 75, 438, "人留下身体部位信息", "axis-label");
}

const RENDERERS = [
  renderOpening,
  renderXu,
  renderPeng,
  renderPanorama,
  renderRoster,
  renderOriginMap,
  renderAccidentMap,
  renderMigration,
  renderMerge,
  renderGradeAxis,
  renderIncidentType,
  renderMatrix,
  renderPriceOfHand,
  renderEnding
];

function activate(index) {
  if (index === currentStep || index < 0 || index >= steps.length) return;
  currentStep = index;
  steps.forEach((step, i) => step.classList.toggle("active", i === index));
  resetScene(index);
  const renderer = RENDERERS[index];
  if (renderer) renderer();
  chapterTag.textContent = steps[index].dataset.chapter || "";
  chapterTag.classList.add("visible");
}

function updateScroll() {
  const targetY = window.innerHeight * 0.56;
  let nearest = 0;
  let distance = Infinity;
  steps.forEach((step, i) => {
    const rect = step.getBoundingClientRect();
    const center = rect.top + Math.min(rect.height * 0.5, window.innerHeight * 0.5);
    const d = Math.abs(center - targetY);
    if (d < distance) { distance = d; nearest = i; }
  });
  activate(nearest);
  const scrollyRect = document.querySelector("#scrolly").getBoundingClientRect();
  chapterTag.classList.toggle("visible", scrollyRect.top < window.innerHeight * 0.35 && scrollyRect.bottom > 80);
  toTop.classList.toggle("show", window.scrollY > window.innerHeight * 1.5);
}

let scrollTick = false;
window.addEventListener("scroll", () => {
  if (!scrollTick) {
    scrollTick = true;
    requestAnimationFrame(() => { updateScroll(); scrollTick = false; });
  }
}, { passive: true });
window.addEventListener("resize", () => {
  setResponsiveViewBox();
  currentStep = -1;
  updateScroll();
});
document.addEventListener("click", event => {
  if (!event.target.closest(".pixel-person")) hideCard();
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

buildLayers();
activate(0);
updateScroll();
