/* Menu page: search + category filter + MENU/DEALS switch + deep links */
(function () {
  'use strict';
  var state = { tab: 'menu', cat: 'all', q: '' };
  var els = {};
  var KNOWN_CATS = {};

  function norm(s) { return String(s == null ? '' : s).toLowerCase(); }
  function matchQ(text, q) { return !q || norm(text).indexOf(q) !== -1; }
  function catOf(p) { return KNOWN_CATS[p.category] ? p.category : 'other'; }

  function filteredProducts() {
    return PG.menu.products.filter(function (p) {
      if (state.cat !== 'all' && catOf(p) !== state.cat) return false;
      if (!matchQ((p.name || '') + ' ' + (p.description || ''), state.q)) return false;
      return true;
    }).sort(function (a, b) {
      return ((a.displayOrder == null ? 9999 : a.displayOrder) - (b.displayOrder == null ? 9999 : b.displayOrder));
    });
  }
  function filteredDeals() {
    return PG.deals.deals.filter(function (d) {
      if (!matchQ((d.name || '') + ' ' + (d.contents || ''), state.q)) return false;
      return true;
    }).sort(function (a, b) {
      return ((a.displayOrder == null ? 9999 : a.displayOrder) - (b.displayOrder == null ? 9999 : b.displayOrder));
    });
  }

  function renderCats() {
    var cats = PG.sortedCategories();
    var html = '<button data-cat="all" aria-pressed="' + (state.cat === 'all') + '">All</button>';
    cats.forEach(function (c) {
      html += '<button data-cat="' + PG.esc(c.id) + '" aria-pressed="' + (state.cat === c.id) + '">' + PG.esc(c.name) + '</button>';
    });
    els.catRow.innerHTML = html;
  }

  function render() {
    var isMenu = state.tab === 'menu';
    els.tabMenu.setAttribute('aria-selected', isMenu ? 'true' : 'false');
    els.tabDeals.setAttribute('aria-selected', !isMenu ? 'true' : 'false');
    els.catRow.style.display = isMenu ? '' : 'none';
    els.menuPanel.hidden = !isMenu;
    els.dealsPanel.hidden = isMenu;
    PG.setDealsNav(!isMenu);
    if (isMenu) {
      var list = filteredProducts();
      els.grid.innerHTML = list.length ? list.map(function (p) { return PG.productCard(p); }).join('')
        : emptyHtml('No items found', 'Try a different search or category.');
      els.meta.textContent = list.length === 1 ? '1 item' : list.length + ' items';
    } else {
      var dl = filteredDeals().filter(function (d) { return d.availability !== false; });
      var all = filteredDeals();
      var show = all; // unavailable deals render disabled in place
      els.dealsGrid.innerHTML = show.length ? show.map(function (d) { return PG.dealCard(d); }).join('')
        : emptyHtml('No deals found', 'Try a different search.');
      els.dealsMeta.textContent = show.length === 1 ? '1 deal' : show.length + ' deals';
    }
    PG.refreshFavButtons();
  }
  function emptyHtml(title, sub) {
    return '<div class="empty-results" style="grid-column:1/-1"><p><strong>' + PG.esc(title) + '</strong><br>' +
      PG.esc(sub) + '</p><button class="btn btn-outline btn-sm" data-clear-search>Clear search</button></div>';
  }

  function syncURL() {
    var params = new URLSearchParams();
    if (state.q) params.set('search', state.q);
    if (state.tab === 'menu' && state.cat !== 'all') params.set('category', state.cat);
    var hash = state.tab === 'deals' ? '#deals' : '#menu';
    var url = 'menu.html' + (params.toString() ? '?' + params.toString() : '') + hash;
    try { history.replaceState(null, '', url); } catch (e) {}
  }

  function setTab(tab, scroll) {
    state.tab = tab === 'deals' ? 'deals' : 'menu';
    render(); syncURL();
    if (scroll) {
      var target = state.tab === 'deals' ? els.dealsPanel : els.menuPanel;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  var debounce = null;
  function init() {
    els.search = document.getElementById('menu-search');
    els.clear = document.getElementById('search-clear');
    els.catRow = document.getElementById('cat-row');
    els.grid = document.getElementById('product-grid');
    els.meta = document.getElementById('result-meta');
    els.tabMenu = document.getElementById('tab-menu');
    els.tabDeals = document.getElementById('tab-deals');
    els.menuPanel = document.getElementById('menu-panel');
    els.dealsPanel = document.getElementById('deals-panel');
    els.dealsGrid = document.getElementById('deals-grid');
    els.dealsMeta = document.getElementById('deals-meta');

    (PG.menu.categories || []).forEach(function (c) { KNOWN_CATS[c.id] = true; });

    // Deep links (plain text only)
    try {
      var params = new URLSearchParams(location.search);
      var q = (params.get('search') || '').slice(0, 100);
      var cat = (params.get('category') || '').slice(0, 60);
      state.q = q.trim().toLowerCase();
      els.search.value = q.trim();
      var validCat = cat === 'all' || PG.sortedCategories().some(function (c) { return c.id === cat; });
      state.cat = validCat ? cat : 'all';
      if (location.hash === '#deals') state.tab = 'deals';
    } catch (e) {}

    renderCats(); render(); syncURL();

    if (location.hash === '#deals') {
      setTimeout(function () { els.dealsPanel.scrollIntoView({ block: 'start' }); }, 60);
    }

    els.tabMenu.addEventListener('click', function () { setTab('menu', true); });
    els.tabDeals.addEventListener('click', function () { setTab('deals', true); });
    window.addEventListener('hashchange', function () {
      if (location.hash === '#deals' && state.tab !== 'deals') setTab('deals', false);
      else if (location.hash === '#menu' && state.tab !== 'menu') setTab('menu', false);
    });

    els.catRow.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]');
      if (!b) return;
      state.cat = b.getAttribute('data-cat');
      renderCats(); render(); syncURL();
    });

    els.search.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        state.q = els.search.value.trim().toLowerCase().slice(0, 100);
        els.clear.classList.toggle('show', !!els.search.value);
        render(); syncURL();
      }, 200);
    });
    els.clear.classList.toggle('show', !!els.search.value);
    els.clear.addEventListener('click', function () {
      els.search.value = ''; state.q = '';
      els.clear.classList.remove('show');
      render(); syncURL(); els.search.focus();
    });

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-clear-search]')) {
        els.search.value = ''; state.q = '';
        els.clear.classList.remove('show');
        render(); syncURL();
      }
    });

    try {
      if (sessionStorage.getItem('pgFocusSearch') === '1') {
        sessionStorage.removeItem('pgFocusSearch');
        setTimeout(function () {
          els.search.scrollIntoView({ block: 'center' });
          els.search.focus({ preventScroll: true });
        }, 120);
      }
    } catch (e) {}
  }

  PG.ready.then(function () { return PG.catalogReady; }).then(init)
    .catch(function () { PG.fatal('Could not load the menu. Please check your connection and retry.'); });
})();
