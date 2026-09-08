/**
 * warhammer-simulator — cross-device realtime board sync (Firebase Realtime Database).
 *
 * How it works:
 *  - A "room" is identified by a short id. Two devices that open the same room
 *    (`?room=<id>`) see each other's board live.
 *  - Board state is serialized from the Zustand store (window.__store), debounced and
 *    pushed to /rooms/<id>/board as a single JSON string (Firebase mangles raw arrays
 *    into keyed objects, so we stringify to keep arrays intact).
 *  - Every device subscribes to /rooms/<id>/board; on a remote change it parses the
 *    JSON and applies it back into the store via restoreState().
 *  - Echo suppression: the last payload string we wrote is ignored when it comes back.
 */

(function () {
  'use strict';

  /* ============================================================
   *  FIREBASE CONFIG (public web config — safe to embed)
   * ============================================================ */
  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyB3bIlfEwwr4HX3MpkC1wV_nzFYSBsEoik",
    authDomain: "warhammer-simulator.firebaseapp.com",
    databaseURL: "https://warhammer-simulator-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "warhammer-simulator",
    storageBucket: "warhammer-simulator.firebasestorage.app",
    messagingSenderId: "909466866109",
    appId: "1:909466866109:web:c9154a570f9fd79f4482d4"
  };

  var ROOM_KEY = "ws_sync_room";

  /* ---------- tiny helpers ---------- */
  function roomFromUrl() {
    var m = window.location.search.match(/[?&]room=([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  }
  function randomRoom() {
    var a = "abcdefghjkmnpqrstuvwxyz23456789";
    var s = "";
    for (var i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
    return s;
  }
  function shareUrl(room) {
    var base = window.__APP_BASENAME || "";
    return window.location.origin + base + "/?room=" + room;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- store access ---------- */
  function store() { return window.__store; }

  function resolveLayout(id) {
    if (!id) return null;
    return (window.get11eLayoutById && window.get11eLayoutById(id)) ||
           (window.getLayoutById && window.getLayoutById(id)) || null;
  }
  function resolveDeployment(id) {
    if (!id) return null;
    return (window.getDeploymentById && window.getDeploymentById(id)) || null;
  }

  function serialize() {
    var s = store().getState();
    return {
      edition: s.edition,
      category: s.category,
      selectedLayoutId: (s.selectedLayout && s.selectedLayout.id) || null,
      selectedDeploymentId: (s.selectedDeployment && (s.selectedDeployment.id || s.selectedDeployment.deploymentId)) || null,
      placedBases: s.placedBases || [],
      measurements: s.measurements || [],
      losStates: s.losStates || {},
      radiusStates: s.radiusStates || {},
      snapToGrid: !!s.snapToGrid,
      playbook: s.playbook || null,
      baseIdCounter: s.baseIdCounter || 0,
      groupIdCounter: s.groupIdCounter || 0,
      measurementIdCounter: s.measurementIdCounter || 0
    };
  }

  function apply(snap) {
    if (!snap) return;
    var s = store().getState();
    var layout = resolveLayout(snap.selectedLayoutId);
    var deployment = resolveDeployment(snap.selectedDeploymentId);
    s.restoreState({
      edition: (layout && layout.edition) || snap.edition,
      category: snap.category,
      selectedLayout: layout || null,
      selectedDeployment: deployment || null,
      placedBases: snap.placedBases || [],
      measurements: snap.measurements || [],
      losStates: snap.losStates || {},
      radiusStates: snap.radiusStates || {},
      snapToGrid: !!snap.snapToGrid,
      playbook: snap.playbook || null,
      baseIdCounter: snap.baseIdCounter || 0,
      groupIdCounter: snap.groupIdCounter || 0,
      measurementIdCounter: snap.measurementIdCounter || 0
    });
  }

  var SYNC_FIELDS = [
    "placedBases", "measurements", "losStates", "radiusStates", "snapToGrid",
    "playbook", "selectedLayout", "selectedDeployment", "edition", "category",
    "baseIdCounter", "groupIdCounter", "measurementIdCounter"
  ];

  /* ---------- sync engine ---------- */
  var ref = null;
  var unsub = null;
  var lastWritten = null;
  var timer = null;
  var joining = false;

  function stop() {
    if (unsub) { unsub(); unsub = null; }
    if (ref) { ref.off("value"); ref = null; }
    lastWritten = null;
    joining = false;
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function start(room) {
    stop();
    var db = window.firebase.database();
    ref = db.ref("rooms/" + room + "/board");
    // Suppress local pushes until we know whether this is a join or a create —
    // otherwise the app's own init (it picks a layout on load) would overwrite
    // a remote board before we've had a chance to read it.
    joining = true;

    ref.on("value", function (snap) {
      var val = snap.val();
      if (!val || typeof val.s !== "string") return;
      if (lastWritten !== null && val.s === lastWritten) return; // ignore own echo
      var parsed;
      try { parsed = JSON.parse(val.s); } catch (e) { return; }
      apply(parsed);
    });

    unsub = store().subscribe(function (state, prevState) {
      if (!prevState) return;
      var changed = false;
      for (var i = 0; i < SYNC_FIELDS.length; i++) {
        if (state[SYNC_FIELDS[i]] !== prevState[SYNC_FIELDS[i]]) { changed = true; break; }
      }
      if (!changed) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(push, 350);
    });

    ref.once("value").then(function (snap) {
      if (!snap.exists()) {
        // Fresh room: seed it with our current board.
        joining = false;
        push();
        return;
      }
      var val = snap.val();
      if (val && typeof val.s === "string") {
        try { apply(JSON.parse(val.s)); } catch (e) {}
      }
      // Keep suppressing pushes for a grace period so the remote state wins over
      // any late client-side init; then release.
      setTimeout(function () { joining = false; }, 1500);
    });
  }

  function push() {
    if (!ref || joining) return;
    var json = JSON.stringify(serialize());
    lastWritten = json;
    ref.set({ s: json, t: Date.now() }).catch(function () {});
  }

  /* ---------- floating UI ---------- */
  var pill = null;
  var syncToggleBtn = null;

  function ensureToggleBtn() {
    if (syncToggleBtn) return;
    syncToggleBtn = el("button");
    syncToggleBtn.textContent = "🔗";
    syncToggleBtn.title = "Sync / share board";
    syncToggleBtn.style.cssText = "position:fixed;right:14px;bottom:14px;z-index:99999;width:46px;height:46px;border-radius:50%;border:0;cursor:pointer;background:#ff9800;color:#111;font-size:20px;box-shadow:0 6px 18px rgba(0,0,0,.45)";
    syncToggleBtn.onclick = expandSync;
    document.body.appendChild(syncToggleBtn);
  }

  function collapseSync() {
    if (pill) pill.style.display = "none";
    if (syncToggleBtn) syncToggleBtn.style.display = "block";
  }
  function expandSync() {
    if (pill) pill.style.display = "block";
    if (syncToggleBtn) syncToggleBtn.style.display = "none";
  }

  function ui(statusText, subText, actions) {
    ensureToggleBtn();
    if (!pill) {
      pill = el("div");
      pill.style.cssText = "position:fixed;right:14px;bottom:14px;z-index:99999;background:#1a1a2e;color:#eee;border:1px solid #333;border-radius:10px;padding:10px 12px;font-family:IBM Plex Mono,monospace;font-size:12px;box-shadow:0 6px 24px rgba(0,0,0,.45);max-width:300px;line-height:1.5;display:none";
      document.body.appendChild(pill);
    }
    pill.innerHTML = "";
    var header = el("div");
    header.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px";
    header.appendChild(el("div", null, statusText));
    var minBtn = el("button", null, "−");
    minBtn.style.cssText = "background:none;border:0;color:#888;cursor:pointer;font-size:14px;padding:0 4px;line-height:1";
    minBtn.onclick = collapseSync;
    header.appendChild(minBtn);
    pill.appendChild(header);
    if (subText) { var s = el("div", null, subText); s.style.cssText = "color:#888;font-size:11px;word-break:break-all"; pill.appendChild(s); }
    if (actions) {
      var row = el("div");
      row.style.cssText = "margin-top:8px;display:flex;gap:6px;flex-wrap:wrap";
      actions.forEach(function (a) {
        var b = el("button", null, a.label);
        b.style.cssText = "background:#ff9800;border:0;color:#111;border-radius:6px;padding:4px 10px;cursor:pointer;font-weight:600;font-size:11px";
        b.onclick = a.onClick;
        row.appendChild(b);
      });
      pill.appendChild(row);
    }
  }

  function copy(text) {
    try { navigator.clipboard.writeText(text); } catch (e) {}
  }

  function startRoom(room) {
    try { localStorage.setItem(ROOM_KEY, room); } catch (e) {}
    if (history.replaceState) {
      history.replaceState(null, "", window.location.pathname + "?room=" + room + window.location.hash);
    }
    start(room);
    if (window.__chat) window.__chat.setRoom(room);
    if (window.__score) window.__score.setRoom(room);
    var link = shareUrl(room);
    ui("🟢 Syncing — room " + room, link, [
      { label: "Copy link", onClick: function () { copy(link); this.textContent = "Copied!"; } },
      { label: "Leave", onClick: function () { leaveRoom(); } }
    ]);
    if (syncToggleBtn) syncToggleBtn.textContent = "🟢";
  }

  function leaveRoom() {
    try { localStorage.removeItem(ROOM_KEY); } catch (e) {}
    if (history.replaceState) {
      history.replaceState(null, "", window.location.pathname + window.location.hash);
    }
    stop();
    if (window.__chat) window.__chat.setRoom(null);
    if (window.__score) window.__score.setRoom(null);
    ui("⚪ Sync off", null, [{ label: "Start sync", onClick: begin }]);
    if (syncToggleBtn) syncToggleBtn.textContent = "🔗";
  }

  function begin() {
    startRoom(randomRoom());
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!window.__store) { setTimeout(boot, 200); return; }
    if (typeof window.firebase === "undefined" || !window.firebase.database) {
      setTimeout(boot, 200); return;
    }
    try { if (!window.firebase.apps.length) window.firebase.initializeApp(FIREBASE_CONFIG); } catch (e) {}

    var room = roomFromUrl();
    if (!room) { try { room = localStorage.getItem(ROOM_KEY) || null; } catch (e) {} }

    if (room) {
      startRoom(room);
    } else {
      ui("⚪ Sync off", "Share this board across devices in real time", [
        { label: "Start sync", onClick: begin }
      ]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
