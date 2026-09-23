/* Papa Ginou's — shared global system. Single implementation for theme, storage,
   cart, favorites, icons, cards, modal, drawer, toasts, formatting. */
(function () {
  'use strict';

  /* ================= Icons (single family, inline SVG, currentColor) ================= */
  var P = {
    search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    whatsapp: '<path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5Z"/><path fill="currentColor" stroke="none" d="M9.2 8.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.6c-.1.2-.2.3-.1.6.3.7 1.3 2 2.7 2.6.3.1.5.1.6-.1l.7-.7c.2-.2.4-.2.7-.1l1.8 1c.3.2.5.3.5.6 0 .5-.3 1.3-.7 1.6-.3.3-.9.5-1.8.3-2.9-.6-6.1-3.7-6.9-6.7-.2-1 0-1.6.3-1.9.4-.3 1.1-.6 1.4-.6.1 0 .3 0 .5.4l.3.4Z" transform="translate(0.6,0.4) scale(0.92)"/>',
    'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    truck: '<path d="M2 6h12v10H2z"/><path d="M14 10h4l3.5 3.5V16H14z"/><circle cx="7" cy="18.5" r="1.8"/><circle cx="17" cy="18.5" r="1.8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    tag: '<path d="M3 3h8l10 10-8 8L3 11Z"/><circle cx="8" cy="8" r="1.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    tiktok: '<circle cx="7" cy="18" r="3"/><path d="M10 18V4l9-2v13"/><circle cx="19" cy="15" r="2.4"/>'
  };
  var FILLED = {
    'heart-filled': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    chef: '<path d="M12 2.6c-2.4 0-4.3 1.6-4.8 3.8C5.2 6.8 3.8 8.4 3.8 10.3c0 2.3 1.9 4.1 4.2 4.1h8c2.3 0 4.2-1.8 4.2-4.1 0-1.9-1.4-3.5-3.4-3.9C16.3 4.2 14.4 2.6 12 2.6Z"/><rect x="7" y="15.2" width="10" height="5.6" rx="1"/><path d="M10 6.6v2.6M12 6.1v3M14 6.6v2.6" stroke="#fff" stroke-width="1.1"/>'
  };
  function icon(name, cls) {
    var filled = !!FILLED[name];
    var body = FILLED[name] || P[name] || P.info;
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="' +
      (filled ? 'currentColor' : 'none') + '" stroke="' + (filled ? 'none' : 'currentColor') +
      '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  }

  /* ================= Utilities ================= */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function validNumber(n) { return typeof n === 'number' && isFinite(n) && n > 0; }
  function byDisplayOrder(a, b) {
    var da = (a && typeof a.displayOrder === 'number') ? a.displayOrder : 9999;
    var db = (b && typeof b.displayOrder === 'number') ? b.displayOrder : 9999;
    return da - db;
  }
  function emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail })); }
  function on(name, fn) { document.addEventListener(name, fn); }

  /* ================= Data layer ================= */
  var cache = {};
  function fetchJSON(path) {
    if (cache[path]) return Promise.resolve(cache[path]);
    return fetch(path, { headers: { 'Accept': 'application/json' } }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + path);
      return r.json();
    }).then(function (j) { cache[path] = j; return j; });
  }

  var PG = {
    icon: icon, esc: esc, on: on, emit: emit,
    settings: null, contact: null, menu: null, deals: null, waTemplate: null,
    ready: null, catalogReady: null
  };

  PG.ready = Promise.all([fetchJSON('data/settings.json'), fetchJSON('data/contact.json')]).then(function (res) {
    PG.settings = res[0]; PG.contact = res[1];
    validateSettings(PG.settings);
    hydrateChrome();
    return PG;
  });

  PG.catalogReady = PG.ready.then(function () {
    return Promise.all([fetchJSON('data/menu.json'), fetchJSON('data/deals.json'), fetchJSON('data/whatsapp-template.json')]).then(function (res) {
      PG.menu = res[0]; PG.deals = res[1]; PG.waTemplate = res[2];
      if (!PG.menu || !Array.isArray(PG.menu.products)) throw new Error('menu.json invalid');
      if (!PG.deals || !Array.isArray(PG.deals.deals)) throw new Error('deals.json invalid');
      validateWaTemplate(PG.waTemplate);
      pruneFavorites();
      updateBadges(); refreshFavButtons();
      return PG;
    });
  });

  function validateSettings(s) {
    if (!s || !s.branding || !s.branding.brandName || !s.currency || !s.whatsappPrimary) throw new Error('settings.json invalid');
  }
  function validateWaTemplate(t) {
    var keys = ['header', 'divider', 'customerSectionTitle', 'orderSectionTitle', 'paymentSectionTitle',
      'nameLineFormat', 'phoneLineFormat', 'addressLineFormat', 'notesLineFormat', 'itemLineFormat',
      'totalLineFormat', 'deliveryNoteFormat', 'deliveryLineFormat', 'footerLine'];
    var ok = t && keys.every(function (k) { return typeof t[k] === 'string' && t[k]; });
    if (!ok) throw new Error('whatsapp-template.json invalid');
  }

  PG.productById = function (id) {
    if (!PG.menu) return null;
    for (var i = 0; i < PG.menu.products.length; i++) if (PG.menu.products[i].id === id) return PG.menu.products[i];
    return null;
  };
  PG.dealById = function (id) {
    if (!PG.deals) return null;
    for (var i = 0; i < PG.deals.deals.length; i++) if (PG.deals.deals[i].id === id) return PG.deals.deals[i];
    return null;
  };
  PG.categoryName = function (id) {
    if (id === 'other') return 'Other';
    if (PG.menu && Array.isArray(PG.menu.categories)) {
      for (var i = 0; i < PG.menu.categories.length; i++) if (PG.menu.categories[i].id === id) return PG.menu.categories[i].name;
    }
    return 'Other';
  };
  PG.sortedCategories = function () {
    var cats = (PG.menu && PG.menu.categories ? PG.menu.categories.slice() : []).sort(byDisplayOrder);
    var known = {}, i;
    for (i = 0; i < cats.length; i++) known[cats[i].id] = true;
    var counts = {};
    PG.menu.products.forEach(function (p) {
      var c = known[p.category] ? p.category : 'other';
      if (p.availability !== false) counts[c] = (counts[c] || 0) + 1;
    });
    var out = cats.filter(function (c) { return counts[c.id] > 0; });
    if (counts.other > 0) out.push({ id: 'other', name: 'Other', displayOrder: 9999 });
    return out;
  };

  /* -------- prices / sizes -------- */
  PG.sizesOf = function (p) {
    if (!p || !Array.isArray(p.sizes)) return [];
    return p.sizes.filter(function (s) { return s && validNumber(s.price); });
  };
  PG.priceInfo = function (p) {
    var sizes = PG.sizesOf(p);
    if (sizes.length > 0) {
      var def = null, i;
      for (i = 0; i < sizes.length; i++) if (sizes[i].id === p.defaultSizeId) def = sizes[i];
      if (!def) def = sizes[0];
      var min = sizes[0].price;
      for (i = 1; i < sizes.length; i++) if (sizes[i].price < min) min = sizes[i].price;
      return { kind: 'sized', sizes: sizes, def: def, from: min };
    }
    if (validNumber(p.price)) return { kind: 'single', price: p.price };
    return { kind: 'invalid' };
  };
  PG.sizeName = function (p, sizeId) {
    if (!p || !Array.isArray(p.sizes)) return sizeId ? String(sizeId) : '';
    for (var i = 0; i < p.sizes.length; i++) if (p.sizes[i].id === sizeId) return p.sizes[i].name;
    return String(sizeId == null ? '' : sizeId);
  };
  PG.priceLabel = function (p) {
    var info = PG.priceInfo(p);
    if (info.kind === 'sized') return 'from ' + PG.fmtPKR(info.from);
    if (info.kind === 'single') return PG.fmtPKR(info.price);
    return 'Price unavailable';
  };
  PG.fmtPKR = function (n) {
    var sym = (PG.settings && PG.settings.currency && PG.settings.currency.symbol) || 'Rs. ';
    var num = Math.round(Number(n) || 0);
    return sym + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  PG.fmtNum = function (n) {
    return Math.round(Number(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  PG.fmtDate = function (iso) {
    try {
      var d = new Date(String(iso) + 'T00:00:00');
      if (isNaN(d)) return String(iso);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return String(iso); }
  };

  /* ================= Theme ================= */
  var THEME_KEY = 'papaGinousTheme';
  function currentTheme() { return document.documentElement.getAttribute('data-theme') || 'light'; }
  function applyTheme(t, persist) {
    document.documentElement.setAttribute('data-theme', t);
    try { if (persist) localStorage.setItem(THEME_KEY, t); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0C0E12' : '#E11B23');
    document.querySelectorAll('[data-theme-btn]').forEach(function (b) {
      b.innerHTML = icon(t === 'dark' ? 'sun' : 'moon');
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
    emit('pg:theme', { theme: t });
  }
  PG.toggleTheme = function () { applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true); };
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    var t = (saved === 'dark' || saved === 'light') ? saved :
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(t, false);
  }

  /* ================= Storage: cart & favorites ================= */
  var CART_KEY = 'papaGinousCart', FAV_KEY = 'papaGinousFavorites';
  function readStore(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var j = JSON.parse(raw);
      if (!j || typeof j !== 'object' || j.version !== 1) return fallback;
      return j;
    } catch (e) { return fallback; }
  }
  function writeStore(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  function sanitizeCartItems() {
    if (!Array.isArray(cart.items)) cart.items = [];
    cart.items = cart.items.filter(function (it) {
      return it && typeof it.id === 'string' && (it.type === 'deal' || it.type === 'product') &&
        validNumber(it.qty) && validNumber(it.unitPrice);
    });
  }
  var cart = readStore(CART_KEY, { version: 1, items: [] });
  var favs = readStore(FAV_KEY, { version: 1, ids: [] });
  sanitizeCartItems();
  if (!Array.isArray(favs.ids)) favs.ids = [];
  favs.ids = favs.ids.filter(function (id) { return typeof id === 'string'; });

  PG.cartCount = function () {
    var n = 0;
    cart.items.forEach(function (it) { n += Math.min(99, Math.max(1, Math.floor(it.qty))); });
    return n;
  };
  PG.cartItems = function () { return cart.items; };
  function saveCart(silent) {
    writeStore(CART_KEY, cart);
    updateBadges();
    if (!silent) emit('pg:cart', { items: cart.items });
  }
  PG.setQty = function (index, qty) {
    var it = cart.items[index];
    if (!it) return;
    qty = Math.max(1, Math.min(99, Math.floor(qty) || 1));
    it.qty = qty; saveCart();
  };
  PG.removeLine = function (index) { if (cart.items[index]) { cart.items.splice(index, 1); saveCart(); } };
  PG.clearCart = function () { cart.items = []; saveCart(); };

  PG.addToCart = function (id, opts) {
    opts = opts || {};
    var type = opts.type === 'deal' ? 'deal' : 'product';
    var entry = type === 'deal' ? PG.dealById(id) : PG.productById(id);
    if (!entry) { PG.toast('Sorry, that item no longer exists.'); return false; }
    if (entry.availability === false) { PG.toast('That item is currently unavailable.'); return false; }
    var sizeId = null, unitPrice = null, label = entry.name;
    if (type === 'deal') {
      if (!validNumber(entry.price)) { PG.toast('That deal has no valid price.'); return false; }
      unitPrice = entry.price;
    } else {
      var info = PG.priceInfo(entry);
      if (info.kind === 'invalid') { PG.toast('That item has no valid price.'); return false; }
      if (info.kind === 'single') { unitPrice = info.price; }
      else {
        var want = opts.sizeId || (info.def && info.def.id);
        var match = null, i;
        for (i = 0; i < info.sizes.length; i++) if (info.sizes[i].id === want) match = info.sizes[i];
        if (!match) return false; // no size selected: nothing added
        sizeId = match.id; unitPrice = match.price;
        label = entry.name + ' (' + match.name + ')';
      }
    }
    var merged = false, i;
    for (i = 0; i < cart.items.length; i++) {
      var it = cart.items[i];
      if (it.id === id && it.type === type && (it.sizeId || null) === (sizeId || null)) {
        it.qty = Math.min(99, it.qty + 1); merged = true; break; // keep earliest price snapshot
      }
    }
    if (!merged) cart.items.push({ id: id, type: type, sizeId: sizeId, qty: 1, unitPrice: unitPrice });
    saveCart();
    PG.toast('Added: ' + label, { label: 'View Cart', href: 'cart.html' });
    return true;
  };

  PG.isFav = function (id) { return favs.ids.indexOf(id) !== -1; };
  PG.toggleFav = function (id) {
    var p = PG.productById(id);
    if (!p) return false;
    var i = favs.ids.indexOf(id);
    if (i === -1) { favs.ids.push(id); PG.toast('Saved to favorites.'); }
    else { favs.ids.splice(i, 1); PG.toast('Removed from favorites.'); }
    writeStore(FAV_KEY, favs);
    refreshFavButtons(); emit('pg:favorites', { ids: favs.ids });
    return true;
  };
  function pruneFavorites() {
    if (!PG.menu) return;
    var before = favs.ids.length;
    favs.ids = favs.ids.filter(function (id) { return !!PG.productById(id); });
    if (favs.ids.length !== before) writeStore(FAV_KEY, favs);
  }

  /* -------- totals -------- */
  PG.totals = function () {
    var sub = 0, i;
    for (i = 0; i < cart.items.length; i++) sub += cart.items[i].qty * cart.items[i].unitPrice;
    return { subtotal: sub, delivery: null, total: sub }; // rule-only mode: Subtotal = Total
  };

  /* -------- WhatsApp -------- */
  PG.waDigits = function (intl) { return String(intl || '').replace(/\D/g, ''); };
  PG.waOrderLink = function (message) {
    return 'https://wa.me/' + PG.waDigits(PG.settings.whatsappPrimaryIntl) + '?text=' + encodeURIComponent(message || 'Assalam-o-Alaikum! I would like to place an order.');
  };
  function fill(fmt, map) {
    return String(fmt).replace(/\{(\w+)\}/g, function (m, k) { return (k in map) ? map[k] : m; });
  }
  PG.buildOrderMessage = function (customer) {
    var T = PG.waTemplate, del = PG.settings.delivery, c = customer || {};
    var itemLines = cart.items.map(function (it) {
      var name = it.id, sizeSuffix = '';
      if (it.type === 'deal') { var d = PG.dealById(it.id); if (d) name = d.name; }
      else {
        var p = PG.productById(it.id);
        if (p) {
          name = p.name;
          if (it.sizeId) { var sn = PG.sizeName(p, it.sizeId); if (sn) sizeSuffix = ' (' + sn + ')'; }
        }
      }
      return fill(T.itemLineFormat, {
        productName: name, sizeSuffix: sizeSuffix, quantity: it.qty, lineTotal: PG.fmtNum(it.qty * it.unitPrice)
      });
    });
    var note = (c.note || '').trim();
    var deliveryNote = fill(T.deliveryNoteFormat, { freeText: del.freeText, beyondShort: del.beyondShort });
    var msg = [
      T.header, T.divider, '', '',
      T.customerSectionTitle,
      fill(T.nameLineFormat, { customerName: c.name }),
      fill(T.phoneLineFormat, { phone: c.phone }),
      fill(T.addressLineFormat, { address: c.address })
    ];
    if (note) msg.push(fill(T.notesLineFormat, { note: note }));
    msg.push('', '', T.divider, T.orderSectionTitle, itemLines.join('\n'), '', '',
      T.divider, T.paymentSectionTitle,
      fill(T.totalLineFormat, { total: PG.fmtNum(PG.totals().total) }),
      fill(T.deliveryLineFormat, { deliveryNote: deliveryNote }),
      '', '', T.divider, T.footerLine);
    return msg.join('\n');
  };
  PG.validPhone = function (raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (/^92/.test(digits)) digits = digits.slice(2);
    if (/^0/.test(digits)) digits = digits.slice(1);
    return /^3\d{9}$/.test(digits);
  };

  /* ================= Badges & fav buttons ================= */
  function updateBadges() {
    var n = PG.cartCount();
    document.querySelectorAll('[data-cart-badge]').forEach(function (b) {
      b.textContent = n > 99 ? '99+' : String(n);
      if (n <= 0) b.setAttribute('hidden', ''); else b.removeAttribute('hidden');
    });
  }
  function refreshFavButtons() {
    document.querySelectorAll('[data-fav]').forEach(function (b) {
      var active = PG.isFav(b.getAttribute('data-fav'));
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
      b.innerHTML = icon(active ? 'heart-filled' : 'heart');
      b.setAttribute('aria-label', active ? 'Remove from favorites' : 'Save to favorites');
    });
  }
  PG.updateBadges = updateBadges; PG.refreshFavButtons = refreshFavButtons;

  /* ================= Toasts ================= */
  PG.toast = function (msg, action) {
    var root = document.querySelector('.toast-root');
    if (!root) return;
    while (root.children.length >= 2) root.removeChild(root.firstChild);
    var el = document.createElement('div');
    el.className = 'toast'; el.setAttribute('role', 'status');
    var span = document.createElement('span'); span.textContent = msg; el.appendChild(span);
    if (action && action.label && action.href) {
      var a = document.createElement('a'); a.href = action.href; a.textContent = action.label; el.appendChild(a);
    }
    root.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 3000);
  };

  /* ================= Cards ================= */
  PG.productCard = function (p, opts) {
    opts = opts || {};
    var info = PG.priceInfo(p);
    var unav = p.availability === false;
    var noPrice = info.kind === 'invalid';
    var disabled = unav || noPrice;
    var priceHtml = unav ? '<p class="card-price">' + esc(PG.priceLabel(p) === 'Price unavailable' ? 'Price unavailable' : PG.priceLabel(p)) + '</p>'
      : (noPrice ? '<p class="card-price">Price unavailable</p>'
        : '<p class="card-price">' + esc(PG.priceLabel(p)) + '</p>');
    var cta = info.kind === 'sized' ? 'Select Size' : 'Add to Cart';
    return '<article class="card product-card' + (unav ? ' unavailable' : '') + '" data-product="' + esc(p.id) + '">' +
      '<div class="card-media">' +
      (opts.badge ? '<span class="badge badge-gold">' + esc(opts.badge) + '</span>' : '') +
      '<img src="' + esc(p.image || '') + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">' +
      '<button class="fav-btn" data-fav="' + esc(p.id) + '" aria-pressed="' + (PG.isFav(p.id) ? 'true' : 'false') +
      '" aria-label="Save to favorites">' + icon(PG.isFav(p.id) ? 'heart-filled' : 'heart') + '</button>' +
      (unav ? '<span class="unavail-chip">Currently unavailable</span>' : '') +
      '</div><div class="card-body"><h3>' + esc(p.name) + '</h3>' + priceHtml +
      '<button class="btn btn-primary btn-block add-btn" data-add="' + esc(p.id) + '" data-type="product"' +
      (disabled ? ' disabled aria-disabled="true"' : '') + '>' + icon('cart') + '<span>' + cta + '</span></button>' +
      '</div></article>';
  };
  PG.dealCard = function (d) {
    var unav = d.availability === false;
    var noPrice = !validNumber(d.price);
    var badgeCls = (d.badge && d.badge.color === 'red') ? 'badge-red' : 'badge-gold';
    var priceHtml = noPrice ? '<p class="card-price">Price unavailable</p>'
      : '<p class="card-price"><strong>' + esc(PG.fmtPKR(d.price)) + '</strong>' +
        (validNumber(d.originalPrice) && d.originalPrice > d.price ? '<s>' + esc(PG.fmtPKR(d.originalPrice)) + '</s>' : '') + '</p>';
    return '<article class="card deal-card' + (unav ? ' unavailable' : '') + '" data-deal="' + esc(d.id) + '">' +
      '<div class="card-media">' +
      (d.badge && d.badge.text ? '<span class="badge ' + badgeCls + '">' + esc(d.badge.text) + '</span>' : '') +
      '<img src="' + esc(d.image || '') + '" alt="' + esc(d.name) + '" loading="lazy" decoding="async">' +
      (unav ? '<span class="unavail-chip">Currently unavailable</span>' : '') +
      '</div><div class="card-body"><h3>' + esc(d.name) + '</h3>' +
      (d.contents ? '<p class="card-desc">' + esc(d.contents) + '</p>' : '') + priceHtml +
      '<button class="btn btn-primary btn-block add-btn" data-add="' + esc(d.id) + '" data-type="deal"' +
      ((unav || noPrice) ? ' disabled aria-disabled="true"' : '') + '>' + icon('cart') + '<span>Add to Cart</span></button>' +
      '</div></article>';
  };

  /* ================= Modal + size selector ================= */
  var lastFocus = null;
  var sizeSelId = null, sizeSelVal = null; // pending size selection (single delegated listener)
  function trapFocus(container) {
    function handler(e) {
      if (e.key !== 'Tab') return;
      var f = container.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
      f = Array.prototype.filter.call(f, function (el) { return !el.disabled && el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    container.addEventListener('keydown', handler);
    return function () { container.removeEventListener('keydown', handler); };
  }
  PG.openModal = function (html, opts) {
    opts = opts || {};
    lastFocus = document.activeElement;
    var back = document.querySelector('.modal-backdrop');
    var box = back.querySelector('.modal');
    box.innerHTML = '<div class="modal-wrap"><button class="icon-btn modal-close" data-modal-close aria-label="Close">' + icon('x') + '</button>' + html + '</div>';
    back.classList.add('open');
    document.body.style.overflow = 'hidden';
    var release = trapFocus(box);
    back._release = release;
    back._onEsc = function (e) { if (e.key === 'Escape') PG.closeModal(); };
    document.addEventListener('keydown', back._onEsc);
    var first = box.querySelector('[data-autofocus]') || box.querySelector('button:not(.modal-close),input');
    if (first) first.focus();
  };
  PG.closeModal = function () {
    var back = document.querySelector('.modal-backdrop');
    if (!back || !back.classList.contains('open')) return;
    back.classList.remove('open');
    document.body.style.overflow = '';
    if (back._release) back._release();
    if (back._onEsc) document.removeEventListener('keydown', back._onEsc);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  PG.openSizeSelector = function (id) {
    var p = PG.productById(id);
    if (!p) return;
    var info = PG.priceInfo(p);
    if (info.kind !== 'sized') { PG.addToCart(id, { type: 'product' }); return; }
    if (info.sizes.length < 2) { PG.addToCart(id, { type: 'product', sizeId: info.sizes[0].id }); return; }
    var defId = info.def.id;
    var opts = info.sizes.map(function (s, i) {
      return '<button class="size-opt" role="radio" aria-checked="' + (s.id === defId ? 'true' : 'false') + '" data-size="' + esc(s.id) + '"' +
        (i === 0 ? ' data-autofocus' : '') + '><strong>' + esc(s.name) + '</strong><span class="size-price">' + esc(PG.fmtPKR(s.price)) + '</span></button>';
    }).join('');
    PG.openModal('<h2>' + esc(p.name) + '</h2><p class="modal-sub">Choose a size</p>' +
      '<div role="radiogroup" aria-label="Choose a size">' + opts + '</div>' +
      '<div class="modal-actions"><button class="btn btn-outline" data-modal-close>Cancel</button>' +
      '<button class="btn btn-primary" data-size-confirm>Add to Cart</button></div>');
    sizeSelId = id; sizeSelVal = defId; // handled by the single global delegated listener
  };

  /* ================= Drawer ================= */
  PG.openDrawer = function () {
    lastFocus = document.activeElement;
    document.body.classList.add('drawer-open');
    var dr = document.getElementById('drawer');
    dr._release = trapFocus(dr);
    dr._onEsc = function (e) { if (e.key === 'Escape') PG.closeDrawer(); };
    document.addEventListener('keydown', dr._onEsc);
    var c = dr.querySelector('[data-drawer-close]'); if (c) c.focus();
  };
  PG.closeDrawer = function () {
    if (!document.body.classList.contains('drawer-open')) return;
    document.body.classList.remove('drawer-open');
    var dr = document.getElementById('drawer');
    if (dr._release) dr._release();
    if (dr._onEsc) document.removeEventListener('keydown', dr._onEsc);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  PG.getManifest = function () {
    var b = (PG.settings && PG.settings.branding) || {};
    var name = b.brandName || '', tag = b.brandTagline || '';
    return {
      name: tag ? name + ' — ' + tag : name,
      short_name: name,
      description: 'Browse the menu, order deals, and place your order on WhatsApp.',
      start_url: 'index.html', scope: './', display: 'standalone',
      background_color: '#FFFFFF', theme_color: '#E11B23',
      icons: [
        { src: b.icon192 || '', sizes: '192x192', type: 'image/png' },
        { src: b.icon512 || '', sizes: '512x512', type: 'image/png' },
        { src: b.iconMaskable || '', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    };
  };
  function applyBrandingAssets(branding) {
    if (branding.favicon) {
      document.querySelectorAll('link[rel="icon"]').forEach(function (el) { el.setAttribute('href', branding.favicon); });
    }
    if (branding.appleTouchIcon) {
      document.querySelectorAll('link[rel="apple-touch-icon"]').forEach(function (el) { el.setAttribute('href', branding.appleTouchIcon); });
    }
    try {
      var link = document.querySelector('link[rel="manifest"]');
      if (link && window.URL && window.URL.createObjectURL) {
        var blob = new Blob([JSON.stringify(PG.getManifest())], { type: 'application/manifest+json' });
        link.setAttribute('href', window.URL.createObjectURL(blob));
      }
    } catch (e) { /* static manifest.webmanifest fallback stays in place */ }
  }

  /* ================= Chrome hydration ================= */
  function hydrateChrome() {
    var s = PG.settings, c = PG.contact;
    var branding = s.branding || {};
    var brandName = branding.brandName || (s.brand && s.brand.name) || '';
    var brandTagline = branding.brandTagline || (s.brand && s.brand.tagline) || '';
    document.querySelectorAll('[data-brand-name]').forEach(function (el) { el.textContent = brandName; });
    document.querySelectorAll('[data-brand-tagline]').forEach(function (el) { el.textContent = brandTagline; });
    document.querySelectorAll('[data-brand-logo]').forEach(function (el) {
      if (branding.logoIcon) el.setAttribute('src', branding.logoIcon);
      el.setAttribute('alt', brandName + ' logo');
    });
    document.querySelectorAll('a.brand').forEach(function (el) { el.setAttribute('aria-label', brandName + ' — home'); });
    applyBrandingAssets(branding);
    document.querySelectorAll('[data-footer-credit]').forEach(function (el) { el.textContent = s.footerCredit; });
    document.querySelectorAll('[data-delivery-free]').forEach(function (el) { el.textContent = s.delivery.freeText; });
    document.querySelectorAll('[data-delivery-beyond]').forEach(function (el) { el.textContent = s.delivery.beyondText; });
    document.querySelectorAll('[data-address]').forEach(function (el) { el.textContent = c.address; });
    document.querySelectorAll('[data-wa-order]').forEach(function (el) {
      el.setAttribute('href', PG.waOrderLink()); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener');
    });
    document.querySelectorAll('[data-call-link]').forEach(function (el) {
      if (c.phone) { el.setAttribute('href', 'tel:' + c.phoneIntl.replace(/\s/g, '')); el.style.display = ''; }
      else el.style.display = 'none';
    });
    document.querySelectorAll('[data-phone-text]').forEach(function (el) { el.textContent = c.phone || ''; });
    document.querySelectorAll('[data-wa-text]').forEach(function (el) { el.textContent = s.whatsappPrimary || ''; });
    document.querySelectorAll('[data-directions-link]').forEach(function (el) {
      if (c.mapsUrl) { el.setAttribute('href', c.mapsUrl); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); el.style.display = ''; }
      else el.style.display = 'none';
    });
    // Socials: render only configured links, else hide row
    document.querySelectorAll('[data-socials]').forEach(function (row) {
      row.innerHTML = '';
      (c.socials || []).forEach(function (soc) {
        if (!soc || !soc.url || !/^https:\/\//i.test(soc.url)) return;
        var map = { facebook: 'facebook', instagram: 'instagram', tiktok: 'tiktok', youtube: 'youtube' };
        var ic = map[String(soc.platform || '').toLowerCase()] || 'info';
        var a = document.createElement('a');
        a.href = soc.url; a.target = '_blank'; a.rel = 'noopener';
        a.setAttribute('aria-label', String(soc.platform || 'Social link'));
        a.innerHTML = icon(ic);
        row.appendChild(a);
      });
      if (!row.children.length) row.style.display = 'none';
    });
    // Static icon slots
    document.querySelectorAll('[data-icon]').forEach(function (el) {
      if (el.dataset.done) return;
      var ic = icon(el.getAttribute('data-icon'));
      el.innerHTML = el.hasAttribute('data-append') ? el.innerHTML + ic : ic + el.innerHTML;
      el.dataset.done = '1';
    });
    // Active nav
    var page = document.body.getAttribute('data-page');
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var key = a.getAttribute('data-nav');
      var active = (key === page) || (key === 'menu' && page === 'menu');
      if (active) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
    });
    updateBadges(); refreshFavButtons();
  }
  PG.setDealsNav = function (on) {
    document.querySelectorAll('[data-nav="deals"]').forEach(function (a) {
      if (on) { a.classList.add('active'); } else { a.classList.remove('active'); }
    });
  };

  PG.fatal = function (msg) {
    var main = document.querySelector('main');
    if (!main) return;
    main.innerHTML = '<div class="container"><div class="error-card"><h2>Something went wrong</h2><p>' +
      esc(msg || 'Please check your connection and try again.') + '</p>' +
      '<button class="btn btn-primary" onclick="location.reload()">Retry</button></div></div>';
  };

  /* Image fallback -> branded placeholder (never a broken icon) */
  PG.imgFallback = function (img, cls) {
    if (!img || img.dataset.fbk) return;
    img.dataset.fbk = '1';
    var d = document.createElement('div');
    d.className = 'img-fallback ' + (cls || '');
    d.innerHTML = icon('chef') + '<span>' + esc(img.alt || "Papa Ginou's") + '</span>';
    if (img.parentNode) img.parentNode.replaceChild(d, img);
  };
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG') PG.imgFallback(t);
  }, true);

  /* ================= Global events ================= */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-theme-btn]'))) { PG.toggleTheme(); return; }
    if ((t = e.target.closest('[data-drawer-open]'))) { PG.openDrawer(); return; }
    if ((t = e.target.closest('[data-drawer-close]')) || e.target.classList.contains('drawer-backdrop')) { PG.closeDrawer(); return; }
    if ((t = e.target.closest('#drawer nav a'))) {
      if (t.hasAttribute('data-search-go')) { try { sessionStorage.setItem('pgFocusSearch', '1'); } catch (err) {} }
      PG.closeDrawer(); return;
    }
    if ((t = e.target.closest('[data-modal-close]')) || e.target.classList.contains('modal-backdrop')) { PG.closeModal(); sizeSelId = null; sizeSelVal = null; return; }
    if ((t = e.target.closest('[data-size]'))) {
      sizeSelVal = t.getAttribute('data-size');
      var rg = t.closest('[role="radiogroup"]');
      if (rg) rg.querySelectorAll('[data-size]').forEach(function (b) { b.setAttribute('aria-checked', b === t ? 'true' : 'false'); });
      return;
    }
    if ((t = e.target.closest('[data-size-confirm]'))) {
      var sid = sizeSelId, sval = sizeSelVal;
      sizeSelId = null; sizeSelVal = null;
      PG.closeModal();
      if (sid && sval) PG.addToCart(sid, { type: 'product', sizeId: sval });
      return;
    }
    if ((t = e.target.closest('[data-search-go]'))) {
      e.preventDefault();
      try { sessionStorage.setItem('pgFocusSearch', '1'); } catch (err) {}
      window.location.href = 'menu.html';
      return;
    }
    if ((t = e.target.closest('[data-fav]'))) {
      e.preventDefault();
      PG.catalogReady.then(function () { PG.toggleFav(t.getAttribute('data-fav')); });
      return;
    }
    if ((t = e.target.closest('[data-add]'))) {
      e.preventDefault();
      var id = t.getAttribute('data-add'), type = t.getAttribute('data-type') || 'product';
      PG.catalogReady.then(function () {
        if (type === 'deal') PG.addToCart(id, { type: 'deal' });
        else {
          var p = PG.productById(id);
          if (!p) return;
          var info = PG.priceInfo(p);
          if (info.kind === 'sized' && info.sizes.length >= 2) PG.openSizeSelector(id);
          else if (info.kind === 'sized') PG.addToCart(id, { type: 'product', sizeId: info.sizes[0].id });
          else PG.addToCart(id, { type: 'product' });
        }
      });
      return;
    }
  });

  window.addEventListener('storage', function (e) {
    if (e.key === CART_KEY) {
      cart = readStore(CART_KEY, { version: 1, items: [] });
      sanitizeCartItems();
      updateBadges(); emit('pg:cart', { items: cart.items });
    } else if (e.key === FAV_KEY) {
      favs = readStore(FAV_KEY, { version: 1, ids: [] });
      if (!Array.isArray(favs.ids)) favs.ids = [];
      refreshFavButtons(); emit('pg:favorites', { ids: favs.ids });
    } else if (e.key === THEME_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
      applyTheme(e.newValue, false);
    }
  });

  /* Re-read cart from storage when the page is (re)shown: covers bfcache
     restores and app-switch returns where the 'storage' event never fires. */
  function resyncCartFromStore() {
    cart = readStore(CART_KEY, { version: 1, items: [] });
    sanitizeCartItems();
    updateBadges(); emit('pg:cart', { items: cart.items });
  }
  window.addEventListener('pageshow', function () { resyncCartFromStore(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) resyncCartFromStore(); });

  function syncOffline() { document.body.classList.toggle('is-offline', !navigator.onLine); }
  window.addEventListener('online', syncOffline);
  window.addEventListener('offline', syncOffline);

  document.addEventListener('DOMContentLoaded', function () {
    initTheme(); syncOffline();
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').catch(function () {});
      });
    }
    document.querySelectorAll('[data-theme-btn]').forEach(function (b) {
      b.innerHTML = icon(currentTheme() === 'dark' ? 'sun' : 'moon');
    });
    PG.ready.catch(function () { PG.fatal('Could not load restaurant information. Please check your connection and retry.'); });
  });

  window.PG = PG;
})();
