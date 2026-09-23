/* Cart page */
(function () {
  'use strict';
  function lineInfo(it, index) {
    var name = it.id, variant = '', img = '', unit = it.unitPrice;
    if (it.type === 'deal') {
      var d = PG.dealById(it.id);
      if (d) { name = d.name; variant = (d.badge && d.badge.text) || 'Deal'; img = d.image || ''; }
      else variant = 'Deal';
    } else {
      var p = PG.productById(it.id);
      if (p) {
        name = p.name; img = p.image || '';
        if (it.sizeId) variant = PG.sizeName(p, it.sizeId);
      } else if (it.sizeId) variant = String(it.sizeId);
    }
    var lineTotal = it.qty * it.unitPrice;
    return '<div class="cart-line" data-line="' + index + '">' +
      '<div class="cart-thumb"><img src="' + PG.esc(img) + '" alt="' + PG.esc(name) + '" loading="lazy" decoding="async"></div>' +
      '<div class="cart-info"><h3>' + PG.esc(name) + '</h3>' +
      (variant ? '<p class="variant">' + PG.esc(variant) + '</p>' : '') +
      '<p class="unit">' + PG.esc(PG.fmtPKR(unit)) + ' each</p></div>' +
      '<div class="cart-right"><span class="line-total">' + PG.esc(PG.fmtPKR(lineTotal)) + '</span>' +
      '<div class="stepper" role="group" aria-label="Quantity for ' + PG.esc(name) + '">' +
      '<button data-dec="' + index + '" aria-label="Decrease quantity">' + PG.icon('minus') + '</button>' +
      '<span class="qty" aria-live="polite">' + it.qty + '</span>' +
      '<button data-inc="' + index + '" aria-label="Increase quantity">' + PG.icon('plus') + '</button></div>' +
      '<button class="remove-btn" data-remove-line="' + index + '">' + PG.icon('trash') + '<span>Remove</span></button></div></div>';
  }

  function render() {
    var items = PG.cartItems();
    var layout = document.getElementById('cart-layout');
    var empty = document.getElementById('cart-empty');
    if (!layout || !empty) return;
    if (!items.length) { layout.hidden = true; empty.hidden = false; return; }
    empty.hidden = true; layout.hidden = false;
    document.getElementById('cart-lines').innerHTML = items.map(lineInfo).join('');
    var t = PG.totals();
    document.getElementById('sum-subtotal').textContent = PG.fmtPKR(t.subtotal);
    document.getElementById('sum-total').textContent = PG.fmtPKR(t.total);
  }

  PG.ready.then(function () { return PG.catalogReady; }).then(function () {
    render();
    PG.on('pg:cart', render);
    document.addEventListener('click', function (e) {
      var t;
      if ((t = e.target.closest('[data-inc]'))) { PG.setQty(+t.getAttribute('data-inc'), PG.cartItems()[+t.getAttribute('data-inc')].qty + 1); }
      else if ((t = e.target.closest('[data-dec]'))) {
        var i = +t.getAttribute('data-dec'), it = PG.cartItems()[i];
        if (it) { if (it.qty <= 1) PG.removeLine(i); else PG.setQty(i, it.qty - 1); }
      }
      else if ((t = e.target.closest('[data-remove-line]'))) { PG.removeLine(+t.getAttribute('data-remove-line')); PG.toast('Item removed.'); }
      else if ((t = e.target.closest('[data-clear-cart]'))) { PG.clearCart(); PG.toast('Cart cleared.'); }
    });
  }).catch(function () { PG.fatal('Could not load your cart. Please check your connection and retry.'); });
})();
