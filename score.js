/**
 * warhammer-simulator — match score tracker (Red vs Blue).
 *
 * 6 scoring rounds per team: R1..R5 + End Mission.
 * Each round = Primary + Secondary; round score = P + S.
 * Team total = sum of all 6 round scores.
 *
 * Sync: reuses the same room id + Firebase RTDB project as the board sync.
 * Score is stored at rooms/<room>/score = { s: "<JSON string>", t: <ts> }
 * (stringified to survive Firebase's array→keyed-object mangling). Any device
 * in the same room sees live score updates.
 */
(function () {
  'use strict';

  var ROUNDS = [
    { label: 'R1' }, { label: 'R2' }, { label: 'R3' },
    { label: 'R4' }, { label: 'R5' }, { label: 'End', title: 'End Mission' }
  ];
  var TEAMS = [
    { key: 'red',  name: 'RED',  color: '#ff4a4a' },
    { key: 'blue', name: 'BLUE', color: '#4a9eff' }
  ];
  var LS_KEY = 'ws_score_state';

  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyB3bIlfEwwr4HX3MpkC1wV_nzFYSBsEoik",
    authDomain: "warhammer-simulator.firebaseapp.com",
    databaseURL: "https://warhammer-simulator-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "warhammer-simulator",
    storageBucket: "warhammer-simulator.firebasestorage.app",
    messagingSenderId: "909466866109",
    appId: "1:909466866109:web:c9154a570f9fd79f4482d4"
  };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- room helpers (mirror chat.js) ---------- */
  function roomFromUrl() {
    var m = window.location.search.match(/[?&]room=([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  }
  function storageRoom() {
    try { return localStorage.getItem('ws_sync_room') || null; } catch (e) { return null; }
  }
  function currentRoom() { return roomFromUrl() || storageRoom(); }

  /* ---------- state ---------- */
  function emptyTeam() {
    return ROUNDS.map(function () { return { p: '', s: '' }; });
  }
  function defaultState() {
    return { red: emptyTeam(), blue: emptyTeam() };
  }
  function load() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && d.red && d.blue && d.red.length === ROUNDS.length && d.blue.length === ROUNDS.length) {
          return d;
        }
      }
    } catch (e) {}
    return defaultState();
  }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function num(v) {
    var n = parseInt(v, 10);
    return isFinite(n) ? n : 0;
  }

  var state = load();
  var panel, toggle, roomLabel;

  /* refs: inputEls[key][i] = {p, s}; roundEls[key][i]; totalEls[key] */
  var inputEls = {}, roundEls = {}, totalEls = {};

  function roundTotal(team, i) { return num(team[i].p) + num(team[i].s); }
  function teamTotal(team) {
    var t = 0;
    for (var i = 0; i < ROUNDS.length; i++) t += roundTotal(team, i);
    return t;
  }

  function updateTeam(key) {
    var team = state[key];
    for (var i = 0; i < ROUNDS.length; i++) {
      roundEls[key][i].textContent = String(roundTotal(team, i));
    }
    totalEls[key].textContent = String(teamTotal(team));
  }

  function applyState(d) {
    if (!d || !d.red || !d.blue) return;
    state = d;
    TEAMS.forEach(function (t) {
      for (var i = 0; i < ROUNDS.length; i++) {
        var r = state[t.key][i] || { p: '', s: '' };
        inputEls[t.key][i].p.value = r.p || '';
        inputEls[t.key][i].s.value = r.s || '';
      }
    });
    updateTeam('red');
    updateTeam('blue');
    save();
  }

  /* ---------- sync engine ---------- */
  var scoreRef = null, unsub = null, room = null;
  var lastWritten = null, pushTimer = null, joining = false;

  function ensureFirebase() {
    if (!window.firebase || !window.firebase.database) return false;
    try {
      if (!window.firebase.apps.length) window.firebase.initializeApp(FIREBASE_CONFIG);
    } catch (e) {}
    return true;
  }

  function serialize() { return JSON.stringify(state); }

  function push() {
    if (!scoreRef || joining) return;
    var json = serialize();
    lastWritten = json;
    scoreRef.set({ s: json, t: Date.now() }).catch(function () {});
  }
  function schedulePush() {
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 300);
  }

  function unbind() {
    if (unsub && scoreRef) { try { scoreRef.off('value', unsub); } catch (e) {} }
    unsub = null;
    scoreRef = null;
    lastWritten = null;
    joining = false;
    if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
  }

  function bind(r) {
    unbind();
    room = r;
    if (roomLabel) roomLabel.textContent = r ? ('· ' + r) : '';
    if (!r) return;
    if (!ensureFirebase()) return;

    var db = window.firebase.database();
    scoreRef = db.ref('rooms/' + r + '/score');

    // Suppress local pushes until we know whether this is a join or a create.
    joining = true;

    unsub = scoreRef.on('value', function (snap) {
      var val = snap.val();
      if (!val || typeof val.s !== 'string') return;
      if (lastWritten !== null && val.s === lastWritten) return; // ignore own echo
      var d;
      try { d = JSON.parse(val.s); } catch (e) { return; }
      applyState(d);
    });

    scoreRef.once('value').then(function (snap) {
      if (!snap.exists()) {
        // Fresh room: seed it with our current (local) score.
        joining = false;
        push();
        return;
      }
      var val = snap.val();
      if (val && typeof val.s === 'string') {
        try { applyState(JSON.parse(val.s)); } catch (e) {}
      }
      // Grace period so the remote state wins over any late local edits.
      setTimeout(function () { joining = false; }, 1500);
    });
  }

  /* ---------- input handling ---------- */
  function onInput(key, i, field) {
    state[key][i][field] = inputEls[key][i][field].value;
    updateTeam(key);
    save();
    schedulePush();
  }

  function resetAll() {
    state = defaultState();
    TEAMS.forEach(function (t) {
      for (var i = 0; i < ROUNDS.length; i++) {
        inputEls[t.key][i].p.value = '';
        inputEls[t.key][i].s.value = '';
      }
    });
    updateTeam('red');
    updateTeam('blue');
    save();
    schedulePush();
  }

  /* ---------- ui ---------- */
  function buildUI() {
    var css = el('style');
    css.textContent = [
      "#ws-sc-toggle{position:fixed;right:118px;top:76px;z-index:99999;width:46px;height:46px;border-radius:50%;border:0;cursor:pointer;background:#ff9800;color:#111;font-size:20px;box-shadow:0 6px 18px rgba(0,0,0,.45);display:block}",
      "#ws-sc-panel{position:fixed;right:14px;top:76px;z-index:99998;width:400px;background:#1a1a2e;color:#eee;border:1px solid #333;border-radius:12px;font-family:'IBM Plex Mono',monospace;font-size:12px;box-shadow:0 8px 28px rgba(0,0,0,.5);display:none;overflow:hidden}",
      "#ws-sc-header{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#12121f;border-bottom:1px solid #333}",
      "#ws-sc-title{font-weight:700;color:#ffb74d}",
      "#ws-sc-room{color:#888;font-size:10px;margin-left:6px}",
      "#ws-sc-header-right{display:flex;gap:8px;align-items:center}",
      "#ws-sc-reset,#ws-sc-close{background:none;border:0;color:#888;cursor:pointer;font-size:15px;padding:0 2px;line-height:1}",
      "#ws-sc-reset:hover{color:#ffb74d}",
      "#ws-sc-close:hover{color:#ff4a4a}",
      "#ws-sc-body{display:flex;gap:8px;padding:10px}",
      ".ws-sc-team{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0}",
      ".ws-sc-team-head{border-radius:6px;padding:4px 0;text-align:center;font-weight:700;color:#111;font-size:12px}",
      ".ws-sc-colhead{display:grid;grid-template-columns:28px 1fr 1fr 30px;gap:3px;text-align:center;color:#888;font-size:9px}",
      ".ws-sc-row{display:grid;grid-template-columns:28px 1fr 1fr 30px;gap:3px;align-items:center}",
      ".ws-sc-rl{color:#999;font-size:10px}",
      ".ws-sc-in{width:100%;min-width:0;background:#12121f;border:1px solid #333;border-radius:5px;color:#eee;padding:3px 2px;font-size:11px;font-family:inherit;text-align:center}",
      ".ws-sc-in:focus{outline:none;border-color:#ff9800}",
      ".ws-sc-in::-webkit-inner-spin-button,.ws-sc-in::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}",
      ".ws-sc-in[type=number]{-moz-appearance:textfield}",
      ".ws-sc-rt{text-align:right;font-weight:700;color:#ffd54f;font-size:11px}",
      ".ws-sc-total{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #333;padding:5px 2px 0;margin-top:2px;font-weight:700;color:#ccc}",
      ".ws-sc-total-val{color:#ffb74d;font-size:14px}"
    ].join("\n");
    document.head.appendChild(css);

    toggle = el('button');
    toggle.id = 'ws-sc-toggle';
    toggle.textContent = '🏆';
    toggle.title = 'Score tracker';
    toggle.onclick = function () { show(); };
    document.body.appendChild(toggle);

    panel = el('div');
    panel.id = 'ws-sc-panel';

    // header
    var header = el('div');
    header.id = 'ws-sc-header';
    var title = el('span');
    title.id = 'ws-sc-title';
    title.textContent = '🏆 SCORE';
    roomLabel = el('span');
    roomLabel.id = 'ws-sc-room';
    var left = el('div');
    left.appendChild(title);
    left.appendChild(roomLabel);
    var headerRight = el('span');
    headerRight.id = 'ws-sc-header-right';
    var resetBtn = el('button');
    resetBtn.id = 'ws-sc-reset';
    resetBtn.textContent = '↺';
    resetBtn.title = 'Reset all scores';
    resetBtn.onclick = resetAll;
    var minBtn = el('button');
    minBtn.id = 'ws-sc-close';
    minBtn.textContent = '−';
    minBtn.title = 'Minimize';
    minBtn.onclick = function () { hide(); };
    headerRight.appendChild(resetBtn);
    headerRight.appendChild(minBtn);
    header.appendChild(left);
    header.appendChild(headerRight);
    panel.appendChild(header);

    // body
    var body = el('div');
    body.id = 'ws-sc-body';

    TEAMS.forEach(function (team) {
      var col = el('div', 'ws-sc-team');

      var head = el('div', 'ws-sc-team-head', team.name);
      head.style.background = team.color;
      col.appendChild(head);

      var ch = el('div', 'ws-sc-colhead');
      ch.appendChild(el('span', null, ''));
      ch.appendChild(el('span', null, 'P'));
      ch.appendChild(el('span', null, 'S'));
      ch.appendChild(el('span', null, 'Σ'));
      col.appendChild(ch);

      inputEls[team.key] = [];
      roundEls[team.key] = [];

      ROUNDS.forEach(function (r, i) {
        var row = el('div', 'ws-sc-row');

        var rl = el('span', 'ws-sc-rl', r.label);
        if (r.title) rl.title = r.title;
        row.appendChild(rl);

        var pIn = el('input', 'ws-sc-in');
        pIn.type = 'number';
        pIn.min = '0';
        pIn.step = '1';
        pIn.inputMode = 'numeric';
        pIn.value = state[team.key][i].p;
        pIn.addEventListener('input', function () { onInput(team.key, i, 'p'); });

        var sIn = el('input', 'ws-sc-in');
        sIn.type = 'number';
        sIn.min = '0';
        sIn.step = '1';
        sIn.inputMode = 'numeric';
        sIn.value = state[team.key][i].s;
        sIn.addEventListener('input', function () { onInput(team.key, i, 's'); });

        var rt = el('span', 'ws-sc-rt', '0');

        row.appendChild(pIn);
        row.appendChild(sIn);
        row.appendChild(rt);
        col.appendChild(row);

        inputEls[team.key].push({ p: pIn, s: sIn });
        roundEls[team.key].push(rt);
      });

      var tot = el('div', 'ws-sc-total');
      tot.appendChild(el('span', null, 'TOTAL'));
      var totVal = el('span', 'ws-sc-total-val', '0');
      tot.appendChild(totVal);
      col.appendChild(tot);
      totalEls[team.key] = totVal;

      body.appendChild(col);
    });

    panel.appendChild(body);
    document.body.appendChild(panel);

    updateTeam('red');
    updateTeam('blue');
  }

  function show() {
    panel.style.display = 'block';
    toggle.style.display = 'none';
  }
  function hide() {
    panel.style.display = 'none';
    toggle.style.display = 'block';
  }

  /* ---------- api + boot ---------- */
  window.__score = {
    setRoom: function (r) { bind(r); }
  };

  function boot() {
    if (!ensureFirebase()) { setTimeout(boot, 200); return; }
    buildUI();
    bind(currentRoom());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
