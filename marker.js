/**
 * warhammer-simulator — deploy marker tool.
 *
 * Adds a "deploy marker" base: a 60mm circle that carries arbitrary text/number.
 * Markers are real bases in the Zustand store (window.__store), so they:
 *   - render through the app's own base renderer (label text auto-fits),
 *   - can be dragged / selected / deleted like any base,
 *   - sync across devices (placedBases is already synced by sync.js).
 *
 * Flow: type a label, pick a colour, toggle "place mode", then click the map.
 */
(function () {
  'use strict';

  var MARKER_FLAG = 'isDeployMarker';
  var COLORS = ['#ff9800', '#4a9eff', '#ff4a4a', '#4aff88', '#ffd54f', '#b388ff'];
  var SIZES = [
    { label: 'S', mm: 32 },
    { label: 'M', mm: 40 },
    { label: 'L', mm: 60 }
  ];

  /* board constants (must match the app bundle: Mi=20 px/unit, board 60x44) */
  var MI = 20;
  var BOARD_W = 60;
  var BOARD_H = 44;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- store access ---------- */
  function store() { return window.__store; }

  function findMapSvg() {
    var svgs = document.querySelectorAll('svg');
    var best = null, bestArea = -1;
    for (var i = 0; i < svgs.length; i++) {
      var r = svgs[i].getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      var area = r.width * r.height;
      if (area > bestArea) { bestArea = area; best = svgs[i]; }
    }
    return best;
  }

  function screenToBoard(cx, cy) {
    var svg = findMapSvg();
    if (!svg) return null;
    var m;
    try { m = svg.getScreenCTM(); } catch (e) { return null; }
    if (!m) return null;
    var pt = svg.createSVGPoint();
    pt.x = cx; pt.y = cy;
    var sp = pt.matrixTransform(m.inverse());
    return { x: sp.x / MI, y: BOARD_H - sp.y / MI };
  }

  /* ---------- state ---------- */
  var placeMode = false;
  var currentColor = COLORS[0];
  var currentSize = 60;
  var panel, toggle, labelInput, placeBtn, colorRow, sizeRow, listEl;

  function addMarkerAt(cx, cy) {
    var p = screenToBoard(cx, cy);
    if (!p) return;
    var label = labelInput.value.trim() || 'Marker';
    store().getState().addBase({
      type: 'circle',
      size: String(currentSize),
      x: p.x,
      y: p.y,
      color: currentColor,
      label: label,
      isDeployMarker: true
    });
  }

  function setPlaceMode(on) {
    placeMode = on;
    placeBtn.textContent = on ? '✅ Placing… (click map)' : '📍 Place on map';
    placeBtn.classList.toggle('active', on);
    placeBtn.style.background = on ? '#4caf50' : '#ff9800';
    if (on) {
      document.addEventListener('pointerdown', onPointerDown, true);
      document.body.style.cursor = 'crosshair';
    } else {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.body.style.cursor = '';
    }
  }

  function onPointerDown(e) {
    if (!placeMode) return;
    var svg = findMapSvg();
    if (!svg || !svg.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    addMarkerAt(e.clientX, e.clientY);
  }

  /* ---------- marker list ---------- */
  var lastBases = null;

  function refreshList() {
    if (!store()) return;
    var bases = store().getState().placedBases;
    if (bases === lastBases) return;
    lastBases = bases;
    var markers = (bases || []).filter(function (b) { return b && b[MARKER_FLAG]; });
    listEl.innerHTML = '';
    if (markers.length === 0) {
      var hint = el('div', 'ws-mk-hint', 'No markers yet');
      listEl.appendChild(hint);
      return;
    }
    markers.forEach(function (m) {
      var row = el('div', 'ws-mk-item');
      var dot = el('span', 'ws-mk-dot');
      dot.style.background = m.color || currentColor;
      var lbl = el('span', 'ws-mk-label', m.label || m.size || '?');
      var del = el('button', 'ws-mk-del', '✕');
      del.title = 'Delete marker';
      del.onclick = function () { store().getState().deleteBase(m.id); };
      row.appendChild(dot);
      row.appendChild(lbl);
      row.appendChild(del);
      listEl.appendChild(row);
    });
  }

  /* ---------- ui ---------- */
  function buildUI() {
    var css = el('style');
    css.textContent = [
      "#ws-mk-toggle{position:fixed;right:66px;top:76px;z-index:99999;width:46px;height:46px;border-radius:50%;border:0;cursor:pointer;background:#ff9800;color:#111;font-size:20px;box-shadow:0 6px 18px rgba(0,0,0,.45);display:block}",
      "#ws-mk-panel{position:fixed;right:66px;top:76px;z-index:99998;width:260px;background:#1a1a2e;color:#eee;border:1px solid #333;border-radius:12px;font-family:'IBM Plex Mono',monospace;font-size:12px;box-shadow:0 8px 28px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden}",
      "#ws-mk-header{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#12121f;border-bottom:1px solid #333}",
      "#ws-mk-title{font-weight:700;color:#ffb74d}",
      "#ws-mk-close{background:none;border:0;color:#888;cursor:pointer;font-size:14px;padding:0 4px;line-height:1}",
      "#ws-mk-label-row{display:flex;gap:6px;padding:8px 10px;align-items:center}",
      "#ws-mk-label-row label{color:#888;font-size:10px;white-space:nowrap}",
      "#ws-mk-label-row input{flex:1;background:#12121f;border:1px solid #333;border-radius:6px;color:#eee;padding:5px 8px;font-size:12px;font-family:inherit;min-width:0}",
      "#ws-mk-color-row{display:flex;gap:6px;padding:0 10px 8px;align-items:center}",
      "#ws-mk-color-row label{color:#888;font-size:10px;white-space:nowrap}",
      ".ws-mk-swatch{width:20px;height:20px;border-radius:50%;cursor:pointer;border:2px solid transparent;padding:0}",
      ".ws-mk-swatch.sel{border-color:#fff}",
      "#ws-mk-size-row{display:flex;gap:6px;padding:0 10px 8px;align-items:center}",
      "#ws-mk-size-row label{color:#888;font-size:10px;white-space:nowrap}",
      ".ws-mk-size{flex:1;background:#12121f;border:1px solid #333;color:#ccc;border-radius:6px;padding:4px 0;cursor:pointer;font-size:11px}",
      ".ws-mk-size.sel{background:#ff9800;color:#111;border-color:#ff9800;font-weight:700}",
      "#ws-mk-place{margin:0 10px 10px;background:#ff9800;border:0;color:#111;border-radius:6px;padding:8px;font-weight:700;cursor:pointer;font-size:12px}",
      "#ws-mk-list{padding:0 10px 10px;display:flex;flex-direction:column;gap:4px;max-height:200px;overflow-y:auto;border-top:1px solid #2a2a3a;padding-top:8px}",
      ".ws-mk-item{display:flex;align-items:center;gap:8px;background:#12121f;border-radius:6px;padding:5px 8px}",
      ".ws-mk-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0}",
      ".ws-mk-label{flex:1;color:#ddd;word-break:break-word}",
      ".ws-mk-del{background:none;border:0;color:#888;cursor:pointer;font-size:12px;padding:0 2px}",
      ".ws-mk-del:hover{color:#ff4a4a}",
      ".ws-mk-hint{color:#666;font-size:11px;text-align:center;padding:6px 0}"
    ].join("\n");
    document.head.appendChild(css);

    toggle = el('button');
    toggle.id = 'ws-mk-toggle';
    toggle.textContent = '📍';
    toggle.title = 'Deploy marker';
    toggle.onclick = function () { show(); };
    document.body.appendChild(toggle);

    panel = el('div');
    panel.id = 'ws-mk-panel';

    var header = el('div');
    header.id = 'ws-mk-header';
    var title = el('span');
    title.id = 'ws-mk-title';
    title.textContent = '📍 MARKER';
    var minBtn = el('button');
    minBtn.id = 'ws-mk-close';
    minBtn.textContent = '−';
    minBtn.title = 'Minimize';
    minBtn.onclick = function () { hide(); };
    header.appendChild(title);
    header.appendChild(minBtn);
    panel.appendChild(header);

    var labelRow = el('div');
    labelRow.id = 'ws-mk-label-row';
    labelRow.appendChild(el('label', null, 'Label'));
    labelInput = el('input');
    labelInput.type = 'text';
    labelInput.maxLength = 30;
    labelInput.placeholder = 'e.g. DS-1, Drop 2, Turn 3…';
    labelRow.appendChild(labelInput);
    panel.appendChild(labelRow);

    colorRow = el('div');
    colorRow.id = 'ws-mk-color-row';
    colorRow.appendChild(el('label', null, 'Color'));
    COLORS.forEach(function (c) {
      var sw = el('button', 'ws-mk-swatch');
      sw.style.background = c;
      sw.title = c;
      if (c === currentColor) sw.classList.add('sel');
      sw.onclick = function () {
        currentColor = c;
        colorRow.querySelectorAll('.ws-mk-swatch').forEach(function (s) { s.classList.remove('sel'); });
        sw.classList.add('sel');
      };
      colorRow.appendChild(sw);
    });
    panel.appendChild(colorRow);

    sizeRow = el('div');
    sizeRow.id = 'ws-mk-size-row';
    sizeRow.appendChild(el('label', null, 'Size'));
    SIZES.forEach(function (s) {
      var b = el('button', 'ws-mk-size');
      b.textContent = s.label + ' ' + s.mm;
      b.title = s.mm + 'mm';
      if (s.mm === currentSize) b.classList.add('sel');
      b.onclick = function () {
        currentSize = s.mm;
        sizeRow.querySelectorAll('.ws-mk-size').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
      };
      sizeRow.appendChild(b);
    });
    panel.appendChild(sizeRow);

    placeBtn = el('button');
    placeBtn.id = 'ws-mk-place';
    placeBtn.textContent = '📍 Place on map';
    placeBtn.onclick = function () { setPlaceMode(!placeMode); };
    panel.appendChild(placeBtn);

    listEl = el('div');
    listEl.id = 'ws-mk-list';
    panel.appendChild(listEl);

    document.body.appendChild(panel);
  }

  function show() {
    panel.style.display = 'flex';
    toggle.style.display = 'none';
  }
  function hide() {
    panel.style.display = 'none';
    toggle.style.display = 'block';
    if (placeMode) setPlaceMode(false);
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!store()) { setTimeout(boot, 200); return; }
    buildUI();
    store().subscribe(function () { refreshList(); });
    refreshList();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
