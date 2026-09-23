/* Checkout page: validation + WhatsApp order (cart never auto-cleared) */
(function () {
  'use strict';
  var lastLink = '';

  function renderReview() {
    var items = PG.cartItems();
    var box = document.getElementById('review-lines');
    var empty = document.getElementById('checkout-empty');
    var main = document.getElementById('checkout-main');
    if (!items.length) { if (main) main.hidden = true; if (empty) empty.hidden = false; return false; }
    if (main) main.hidden = false; if (empty) empty.hidden = true;
    box.innerHTML = items.map(function (it) {
      var name = it.id, sub = '';
      if (it.type === 'deal') { var d = PG.dealById(it.id); if (d) name = d.name; sub = 'Deal'; }
      else {
        var p = PG.productById(it.id);
        if (p) { name = p.name; if (it.sizeId) sub = PG.sizeName(p, it.sizeId); }
        else if (it.sizeId) sub = String(it.sizeId);
      }
      return '<div class="review-line"><span class="rl-name">' + it.qty + ' &times; ' + PG.esc(name) +
        (sub ? '<small>' + PG.esc(sub) + '</small>' : '') + '</span>' +
        '<span class="rl-total">' + PG.esc(PG.fmtPKR(it.qty * it.unitPrice)) + '</span></div>';
    }).join('');
    var t = PG.totals();
    document.getElementById('co-subtotal').textContent = PG.fmtPKR(t.subtotal);
    document.getElementById('co-total').textContent = PG.fmtPKR(t.total);
    return true;
  }

  function setErr(id, msg) {
    var f = document.getElementById('f-' + id);
    var input = document.getElementById('in-' + id);
    if (!f || !input) return true;
    var bad = !!msg;
    f.classList.toggle('invalid', bad);
    var err = f.querySelector('.err');
    if (err) err.textContent = msg || '';
    input.setAttribute('aria-invalid', bad ? 'true' : 'false');
    return !bad;
  }

  function openWhatsApp(url) {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function validate() {
    var name = document.getElementById('in-name').value.trim();
    var phone = document.getElementById('in-phone').value.trim();
    var addr = document.getElementById('in-address').value.trim();
    var note = document.getElementById('in-note').value.trim();
    var ok = true, firstBad = null;
    if (!(setErr('name', name.length >= 3 ? '' : 'Please enter your name (at least 3 characters).'))) { ok = false; firstBad = firstBad || 'in-name'; }
    if (!(setErr('phone', PG.validPhone(phone) ? '' : 'Please enter a valid mobile number (e.g. 03xx-xxxxxxx).'))) { ok = false; firstBad = firstBad || 'in-phone'; }
    if (!(setErr('address', addr.length >= 10 ? '' : 'Please enter your full delivery address (at least 10 characters).'))) { ok = false; firstBad = firstBad || 'in-address'; }
    if (!(setErr('note', note.length <= 300 ? '' : 'Note must be under 300 characters.'))) { ok = false; firstBad = firstBad || 'in-note'; }
    if (!ok && firstBad) document.getElementById(firstBad).focus();
    return ok ? { name: name, phone: phone, address: addr, note: note } : null;
  }

  PG.ready.then(function () { return PG.catalogReady; }).then(function () {
    PG.on('pg:cart', function () {
      if (document.getElementById('checkout-success').hidden) renderReview();
    });
    renderReview();
    ['name', 'phone', 'address', 'note'].forEach(function (id) {
      var input = document.getElementById('in-' + id);
      if (input) input.addEventListener('input', function () { setErr(id, ''); });
    });
    document.getElementById('checkout-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!navigator.onLine) { PG.toast("You're offline — reconnect to place your order via WhatsApp."); return; }
      var c = validate();
      if (!c) return;
      lastLink = PG.waOrderLink(PG.buildOrderMessage(c));
      var ro = document.getElementById('reopen-wa');
      if (ro) ro.setAttribute('href', lastLink);
      var fb = document.getElementById('wa-fallback');
      if (fb) fb.setAttribute('href', lastLink);
      openWhatsApp(lastLink);
      document.getElementById('checkout-main').hidden = true;
      document.getElementById('checkout-success').hidden = false;
      document.getElementById('checkout-success').scrollIntoView({ block: 'start' });
    });
    /* #reopen-wa is a real anchor now: native new-tab behavior, no JS needed. */
    document.getElementById('success-clear').addEventListener('click', function () {
      PG.clearCart();
      window.location.href = 'menu.html';
    });
  }).catch(function () { PG.fatal('Could not load checkout. Please check your connection and retry.'); });
})();
