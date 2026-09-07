/**
 * warhammer-simulator — random D6 dice generator.
 *
 * Standalone, local-only (no Firebase). Floating panel on the right.
 * Pick a number of D6 dice, hit Roll, and get:
 *   - the individual dice faces, and
 *   - the cumulative "X+" counts (how many dice scored >= 1, >= 2, ... >= 6).
 */
(function () {
  'use strict';

  var MAX_DICE = 120;
  var FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- state ---------- */
  var panel, countInput, resultsEl;

  function roll(n) {
    var counts = [0, 0, 0, 0, 0, 0, 0];
    var dice = [];
    for (var i = 0; i < n; i++) {
      var d = 1 + Math.floor(Math.random() * 6);
      counts[d]++;
      dice.push(d);
    }
    // cumulative: cum[x] = how many dice scored >= x
    var cum = [0, 0, 0, 0, 0, 0, 0];
    var running = 0;
    for (var x = 6; x >= 1; x--) { running += counts[x]; cum[x] = running; }
    return { dice: dice, counts: counts, cum: cum };
  }

  function render(res) {
    resultsEl.innerHTML = '';

    // individual dice faces
    var facesRow = el('div', 'ws-dice-faces');
    res.dice.forEach(function (d) {
      facesRow.appendChild(el('span', 'ws-dice-face', FACES[d]));
    });
    resultsEl.appendChild(facesRow);

    // cumulative X+ breakdown
    var table = el('div', 'ws-dice-table');
    for (var x = 1; x <= 6; x++) {
      var row = el('div', 'ws-dice-row' + (x === 6 ? ' crit' : ''));
      row.appendChild(el('span', 'ws-dice-th', x + '+'));
      row.appendChild(el('span', 'ws-dice-val', String(res.cum[x])));
      table.appendChild(row);
    }
    resultsEl.appendChild(table);
  }

  function readCount() {
    var n = parseInt(countInput.value, 10);
    if (!isFinite(n)) n = 10;
    return Math.max(1, Math.min(MAX_DICE, n));
  }

  function doRoll() {
    var n = readCount();
    countInput.value = n;
    render(roll(n));
  }

  function setCount(n) {
    n = Math.max(1, Math.min(MAX_DICE, n));
    countInput.value = n;
  }
  function bump(delta) {
    setCount(readCount() + delta);
  }

  /* ---------- ui ---------- */
  function buildUI() {
    var css = el('style');
    css.textContent = [
      "#ws-dice-panel{position:fixed;right:14px;top:76px;z-index:99998;width:250px;background:#1a1a2e;color:#eee;border:1px solid #333;border-radius:12px;font-family:'IBM Plex Mono',monospace;font-size:12px;box-shadow:0 8px 28px rgba(0,0,0,.5);display:flex;flex-direction:column;overflow:hidden}",
      "#ws-dice-header{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#12121f;border-bottom:1px solid #333}",
      "#ws-dice-title{font-weight:700;color:#ffb74d}",
      "#ws-dice-count-row{display:flex;gap:6px;align-items:center;padding:8px 10px;border-bottom:1px solid #2a2a3a}",
      "#ws-dice-count-row label{color:#888;font-size:10px;white-space:nowrap}",
      ".ws-dice-btn{background:#12121f;border:1px solid #333;color:#eee;border-radius:6px;width:26px;height:26px;cursor:pointer;font-size:14px;line-height:1}",
      "#ws-dice-count{flex:1;background:#12121f;border:1px solid #333;border-radius:6px;color:#eee;padding:4px 8px;font-size:13px;font-family:inherit;text-align:center;min-width:0}",
      "#ws-dice-presets{display:flex;gap:5px;padding:0 10px 8px;border-bottom:1px solid #2a2a3a;flex-wrap:wrap}",
      ".ws-dice-preset{background:#12121f;border:1px solid #333;color:#ccc;border-radius:6px;padding:3px 0;cursor:pointer;font-size:11px;flex:1;min-width:30px;text-align:center}",
      ".ws-dice-preset:hover{background:#1e1e33}",
      "#ws-dice-roll{background:#ff9800;border:0;color:#111;border-radius:6px;padding:8px;margin:8px 10px;font-weight:700;cursor:pointer;font-size:13px}",
      "#ws-dice-results{padding:2px 10px 10px;display:flex;flex-direction:column;gap:8px;max-height:340px;overflow-y:auto}",
      ".ws-dice-faces{display:flex;flex-wrap:wrap;gap:5px;font-size:48px;line-height:1.15;color:#ffd54f}",
      ".ws-dice-face{min-width:40px;text-align:center}",
      ".ws-dice-table{display:flex;flex-direction:column;gap:2px}",
      ".ws-dice-row{display:flex;justify-content:space-between;padding:2px 8px;border-radius:6px;background:#12121f}",
      ".ws-dice-row.crit{background:#2a1a12;border:1px solid #ff9800}",
      ".ws-dice-th{color:#888}",
      ".ws-dice-row.crit .ws-dice-th{color:#ffb74d;font-weight:700}",
      ".ws-dice-val{font-weight:700;color:#eee}",
      ".ws-dice-row.crit .ws-dice-val{color:#ffb74d}"
    ].join("\n");
    document.head.appendChild(css);

    panel = el('div');
    panel.id = 'ws-dice-panel';

    // header
    var header = el('div');
    header.id = 'ws-dice-header';
    var title = el('span');
    title.id = 'ws-dice-title';
    title.textContent = '🎲 DICE';
    header.appendChild(title);
    panel.appendChild(header);

    // count row (+/-)
    var countRow = el('div');
    countRow.id = 'ws-dice-count-row';
    var minus = el('button', 'ws-dice-btn', '−');
    minus.onclick = function () { bump(-1); };
    countInput = el('input');
    countInput.id = 'ws-dice-count';
    countInput.type = 'number';
    countInput.min = 1;
    countInput.max = MAX_DICE;
    countInput.value = 10;
    var plus = el('button', 'ws-dice-btn', '+');
    plus.onclick = function () { bump(1); };
    countRow.appendChild(el('label', null, 'D6'));
    countRow.appendChild(minus);
    countRow.appendChild(countInput);
    countRow.appendChild(plus);
    panel.appendChild(countRow);

    // presets
    var presets = el('div');
    presets.id = 'ws-dice-presets';
    [1, 5, 10, 20, 40, 60].forEach(function (n) {
      var b = el('button', 'ws-dice-preset', String(n));
      b.onclick = function () { setCount(n); };
      presets.appendChild(b);
    });
    panel.appendChild(presets);

    // roll button
    var rollBtn = el('button', null, '🎲 ROLL');
    rollBtn.id = 'ws-dice-roll';
    rollBtn.onclick = doRoll;
    panel.appendChild(rollBtn);

    // results
    resultsEl = el('div');
    resultsEl.id = 'ws-dice-results';
    panel.appendChild(resultsEl);

    document.body.appendChild(panel);
  }

  function boot() {
    buildUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
