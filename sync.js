/**
 * warhammer-simulator — cross-device realtime board sync (Firebase Realtime Database).
 *
 * How it works:
 *  - A "room" is identified by a short id. Two devices that open the same room
 *    (`?room=<id>`) see each other's board live.
 *  - Board state (placed bases, measurements, LOS/radius overlays, layout/deployment
 *    selection) is serialized from the Zustand store (window.__store), debounced and
 *    pushed to /rooms/<id>/board.
 *  - Every device also subscribes to /rooms/<id>/board; on a remote change it applies
 *    the snapshot back into the store via restoreState().
 *  - Echo suppression: the last payload we wrote is ignored when it comes back.
 */

(function () {
  'use strict';

  /* ============================================================
   *  FIREBASE CONFIG — replace with your own project's values
   *  (Firebase console → Project settings → General → Your apps →
   *   Web app → Config). You only need apiKey / databaseURL / projectId / appId.
   * ============================================================ */
  var FIREBASE_CONFIG = {
    apiKey: "REPLACE_ME_API_KEY",
    databaseURL: "https://REPLACE_ME-default-rtdb.firebaseio.com",
    projectId: "REPLACE_ME_PROJECT_ID",
    appId: "REPLACE_ME_APP_ID"
  };

  var CONFIGURED = FIREBASE_CONFIG.apiKey.indexOf("REPLACE_ME") === -1;
  var ROOM_KEY = "ws_sync_room";
  var PREFIX = "/warhammer-simulator";

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
    return window.location.origin + PREFIX + "/?room=" + room;
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

  function stop() {
    if (unsub) { unsub(); unsub = null; }
    if (ref) { ref.off("value"); ref = null; }
    lastWritten = null;
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function start(room) {
    stop();
    var db = window.firebase.database();
    ref = db.ref("rooms/" + room + "/board");

    ref.on("value", function (snap) {
      var val = snap.val();
      if (!val) return;
      // ignore our own echo
      var copy = Object.assign({}, val); delete copy.updatedAt;
      if (lastWritten !== null && JSON.stringify(copy) === lastWritten) return;
      apply(val);
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
  }

  function push() {
    if (!ref) return;
    var snap = serialize();
    var copy = Object.assign({}, snap); delete copy.updatedAt;
    lastWritten = JSON.stringify(copy);
    snap.updatedAt = Date.now();
    ref.set(snap).catch(function () {});
  }

  /* ---------- floating UI ---------- */
  var pill = null;

  function ui(statusText, subText, actions) {
    if (!pill) {
      pill = el("div");
      pill.style.cssText = "position:fixed;right:14px;bottom:14px;z-index:99999;background:#1a1a2e;color:#eee;border:1px solid #333;border-radius:10px;padding:10px 12px;font-family:IBM Plex Mono,monospace;font-size:12px;box-shadow:0 6px 24px rgba(0,0,0,.45);max-width:300px;line-height:1.5";
      document.body.appendChild(pill);
    }
    pill.innerHTML = "";
    pill.appendChild(el("div", null, statusText));
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
      var url = window.location.pathname + "?room=" + room + window.location.hash;
      history.replaceState(null, "", url);
    }
    start(room);
    var link = shareUrl(room);
    ui("🟢 Syncing — room " + room, link, [
      { label: "Copy link", onClick: function () { copy(link); this.textContent = "Copied!"; } },
      { label: "Leave", onClick: function () { leaveRoom(); } }
    ]);
  }

  function leaveRoom() {
    try { localStorage.removeItem(ROOM_KEY); } catch (e) {}
    if (history.replaceState) {
      history.replaceState(null, "", window.location.pathname + window.location.hash);
    }
    stop();
    ui("⚪ Sync off", null, [{ label: "Start sync", onClick: begin }]);
  }

  function begin() {
    startRoom(randomRoom());
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!window.__store) { setTimeout(boot, 200); return; }
    if (!CONFIGURED) {
      ui("⚠️ Sync not configured", "Add Firebase config in sync.js", null);
      return;
    }
    if (typeof window.firebase === "undefined" || !window.firebase.database) {
      ui("⚠️ Firebase SDK missing", null, null);
      return;
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
