/* Favorites page */
(function () {
  'use strict';
  function render() {
    var grid = document.getElementById('fav-grid');
    var empty = document.getElementById('fav-empty');
    if (!grid || !empty) return;
    var ids = [];
    try {
      var raw = localStorage.getItem('papaGinousFavorites');
      var j = raw ? JSON.parse(raw) : null;
      ids = (j && j.ids) || [];
    } catch (e) { ids = []; }
    var items = [];
    ids.forEach(function (id) {
      var p = PG.productById(id);
      if (p) items.push(p); // unknown IDs already pruned; skip silently
    });
    if (!items.length) { grid.innerHTML = ''; grid.hidden = true; empty.hidden = false; }
    else {
      empty.hidden = true; grid.hidden = false;
      grid.innerHTML = items.map(function (p) { return PG.productCard(p); }).join('');
    }
    PG.refreshFavButtons();
  }
  PG.ready.then(function () { return PG.catalogReady; }).then(function () {
    render();
    PG.on('pg:favorites', render);
  }).catch(function () { PG.fatal('Could not load favorites. Please check your connection and retry.'); });
})();
