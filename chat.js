/**
 * warhammer-simulator — in-room chat (Firebase Realtime Database).
 *
 * Lives alongside sync.js and reuses the same room id + Firebase project.
 * Each message is stored at rooms/<room>/chat/<autoId> = { name, text, ts }.
 * Users pick their own display name; it persists in localStorage so the same
 * device keeps its name across sessions / rooms.
 */
(function () {
  'use strict';

  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyB3bIlfEwwr4HX3MpkC1wV_nzFYSBsEoik",
    authDomain: "warhammer-simulator.firebaseapp.com",
    databaseURL: "https://warhammer-simulator-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "warhammer-simulator",
    storageBucket: "warhammer-simulator.firebasestorage.app",
    messagingSenderId: "909466866109",
    appId: "1:909466866109:web:c9154a570f9fd79f4482d4"
  };

  var NAME_KEY = "ws_chat_name";
  var HISTORY = 50;

  /* ============================================================
   *  helpers
   * ============================================================ */
  function roomFromUrl() {
    var m = window.location.search.match(/[?&]room=([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  }
  function storageRoom() {
    try { return localStorage.getItem("ws_sync_room") || null; } catch (e) { return null; }
  }
  function currentRoom() { return roomFromUrl() || storageRoom(); }

  function getName() {
    try { return localStorage.getItem(NAME_KEY) || ""; } catch (e) { return ""; }
  }
  function saveName(n) {
    try { localStorage.setItem(NAME_KEY, n); } catch (e) {}
  }
  function randomName() {
    var p = ["Captain", "Warlord", "Commissar", "Inquisitor", "Chaplain", "Librarian", "Tech-Priest", "Marshal"];
    return p[Math.floor(Math.random() * p.length)] + "-" + Math.floor(Math.random() * 900 + 100);
  }
  function nameColor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return "hsl(" + (h % 360) + ",70%,66%)";
  }
  function fmtTime(ts) {
    var d = new Date(ts || Date.now());
    function p(n) { return n < 10 ? "0" + n : "" + n; }
    return p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ============================================================
   *  firebase
   * ============================================================ */
  var chatRef = null;
  var unsub = null;
  var room = null;

  function ensureFirebase() {
    if (!window.firebase || !window.firebase.database) return false;
    try {
      if (!window.firebase.apps.length) window.firebase.initializeApp(FIREBASE_CONFIG);
    } catch (e) {}
    return true;
  }

  function bind(r) {
    unbind();
    room = r;
    if (!r) {
      renderIdle();
      return;
    }
    var db = window.firebase.database();
    chatRef = db.ref("rooms/" + r + "/chat");
    messagesEl.innerHTML = "";
    unsub = chatRef.limitToLast(HISTORY).on("child_added", function (snap) {
      addMessage(snap.val());
    });
    setRoomLabel(r);
  }

  function unbind() {
    if (unsub && chatRef) {
      try { chatRef.off("child_added", unsub); } catch (e) {}
    }
    unsub = null;
    chatRef = null;
  }

  function send(text) {
    if (!chatRef || !text) return;
    var name = getName().trim();
    if (!name) {
      name = randomName();
      saveName(name);
      nameInput.value = name;
    }
    chatRef.push({ name: name, text: text, ts: Date.now() }).catch(function () {});
  }

  /* ============================================================
   *  ui
   * ============================================================ */
  var panel, toggle, messagesEl, nameInput, textInput, roomLabel;

  function buildUI() {
    var css = el("style");
    css.textContent = [
      "#ws-chat-panel{position:fixed;left:14px;bottom:14px;z-index:99998;width:300px;background:#1a1a2e;color:#eee;border:1px solid #333;border-radius:12px;font-family:'IBM Plex Mono',monospace;font-size:12px;box-shadow:0 8px 28px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden}",
      "#ws-chat-header{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#12121f;border-bottom:1px solid #333}",
      "#ws-chat-title{font-weight:700;color:#ffb74d}",
      "#ws-chat-room{color:#888;font-size:10px;margin-left:6px}",
      "#ws-chat-close{background:none;border:0;color:#888;cursor:pointer;font-size:14px;padding:0 4px;line-height:1}",
      "#ws-chat-name-row{display:flex;gap:6px;padding:6px 10px;border-bottom:1px solid #2a2a3a;align-items:center}",
      "#ws-chat-name-row label{color:#888;font-size:10px;white-space:nowrap}",
      "#ws-chat-name-row input{flex:1;background:#12121f;border:1px solid #333;border-radius:6px;color:#eee;padding:4px 8px;font-size:11px;font-family:inherit;min-width:0}",
      "#ws-chat-msgs{overflow-y:auto;max-height:260px;min-height:120px;padding:8px 10px;display:flex;flex-direction:column;gap:6px}",
      "#ws-chat-hint{color:#666;font-size:11px;text-align:center;margin:auto}",
      ".ws-msg{background:#12121f;border-radius:8px;padding:6px 8px}",
      ".ws-msg-head{display:flex;justify-content:space-between;gap:8px;margin-bottom:2px}",
      ".ws-msg-name{font-weight:700;word-break:break-word}",
      ".ws-msg-time{color:#888;font-size:10px;white-space:nowrap}",
      ".ws-msg-body{color:#ddd;word-break:break-word;white-space:pre-wrap}",
      "#ws-chat-input-row{display:flex;gap:6px;padding:8px 10px;border-top:1px solid #2a2a3a}",
      "#ws-chat-input-row input{flex:1;background:#12121f;border:1px solid #333;border-radius:6px;color:#eee;padding:6px 8px;font-size:12px;font-family:inherit;min-width:0}",
      "#ws-chat-send{background:#ff9800;border:0;color:#111;border-radius:6px;padding:0 12px;font-weight:700;cursor:pointer}",
      "#ws-chat-toggle{position:fixed;left:14px;bottom:14px;z-index:99999;width:46px;height:46px;border-radius:50%;border:0;cursor:pointer;background:#ff9800;color:#111;font-size:20px;box-shadow:0 6px 18px rgba(0,0,0,.45);display:block}"
    ].join("\n");
    document.head.appendChild(css);

    // Collapsed toggle button
    toggle = el("button");
    toggle.id = "ws-chat-toggle";
    toggle.textContent = "💬";
    toggle.title = "Chat";
    toggle.onclick = function () { showPanel(); };
    document.body.appendChild(toggle);

    // Panel (collapsed by default)
    panel = el("div");
    panel.id = "ws-chat-panel";

    var header = el("div");
    header.id = "ws-chat-header";

    var titleSpan = el("span");
    titleSpan.id = "ws-chat-title";
    titleSpan.textContent = "💬 Chat";
    roomLabel = el("span");
    roomLabel.id = "ws-chat-room";

    var minBtn = el("button");
    minBtn.id = "ws-chat-close";
    minBtn.textContent = "−";
    minBtn.title = "Minimize";
    minBtn.onclick = function () { hidePanel(); };

    var left = el("div");
    left.appendChild(titleSpan);
    left.appendChild(roomLabel);
    header.appendChild(left);
    header.appendChild(minBtn);
    panel.appendChild(header);

    // Name row
    var nameRow = el("div");
    nameRow.id = "ws-chat-name-row";
    nameRow.appendChild(el("label", null, "Name"));
    nameInput = el("input");
    nameInput.type = "text";
    nameInput.maxLength = 24;
    nameInput.placeholder = "Your name";
    nameInput.value = getName();
    nameInput.addEventListener("change", function () {
      saveName(nameInput.value.trim());
    });
    nameInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { nameInput.blur(); textInput.focus(); }
    });
    nameRow.appendChild(nameInput);
    panel.appendChild(nameRow);

    // Messages
    messagesEl = el("div");
    messagesEl.id = "ws-chat-msgs";
    panel.appendChild(messagesEl);

    // Input row
    var inputRow = el("div");
    inputRow.id = "ws-chat-input-row";
    textInput = el("input");
    textInput.type = "text";
    textInput.maxLength = 500;
    textInput.placeholder = "Type a message…";
    var sendBtn = el("button", null, "Send");
    sendBtn.id = "ws-chat-send";
    function doSend() {
      var t = textInput.value.trim();
      if (!t) return;
      send(t);
      textInput.value = "";
      textInput.focus();
    }
    sendBtn.onclick = doSend;
    textInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") doSend();
    });
    inputRow.appendChild(textInput);
    inputRow.appendChild(sendBtn);
    panel.appendChild(inputRow);

    document.body.appendChild(panel);
  }

  function addMessage(m) {
    if (!m || typeof m.text !== "string" || !m.text.trim()) return;
    var name = (m.name || "Player").trim() || "Player";

    var line = el("div", "ws-msg");
    var head = el("div", "ws-msg-head");
    var who = el("span", "ws-msg-name", name);
    who.style.color = nameColor(name);
    head.appendChild(who);
    head.appendChild(el("span", "ws-msg-time", fmtTime(m.ts)));
    line.appendChild(head);
    line.appendChild(el("div", "ws-msg-body", m.text));
    messagesEl.appendChild(line);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderIdle() {
    messagesEl.innerHTML = "";
    var hint = el("div");
    hint.id = "ws-chat-hint";
    hint.textContent = "Start sync to chat with your opponent.";
    messagesEl.appendChild(hint);
    roomLabel.textContent = "";
  }

  function setRoomLabel(r) {
    roomLabel.textContent = "· " + r;
  }

  function showPanel() {
    panel.style.display = "flex";
    toggle.style.display = "none";
    if (room) textInput.focus();
  }
  function hidePanel() {
    panel.style.display = "none";
    toggle.style.display = "block";
  }

  /* ============================================================
   *  api + boot
   * ============================================================ */
  window.__chat = {
    setRoom: function (r) { bind(r); }
  };

  function boot() {
    if (!ensureFirebase()) { setTimeout(boot, 200); return; }
    buildUI();
    bind(currentRoom());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
