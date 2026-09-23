/* Homepage: hero carousel, popular, deals, coming soon, reviews */
(function () {
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function wireCarousel(track, prev, next) {
    if (!track) return;
    function update() {
      var canL = track.scrollLeft > 8, canR = track.scrollLeft < track.scrollWidth - track.clientWidth - 8;
      if (prev) { if (prev.hasAttribute('data-keep')) prev.hidden = !canL; else prev.hidden = !canL; }
      if (next) next.hidden = !canR;
    }
    function step(dir) { track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' }); }
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update(); setTimeout(update, 300);
  }

  function typeTagline(el, text) {
    if (!el) return;
    el.innerHTML = '';
    var label = document.createElement('span'); label.textContent = text;
    var cur = document.createElement('span'); cur.className = 'type-cursor'; cur.setAttribute('aria-hidden', 'true');
    if (reduced) { el.appendChild(label); el.appendChild(cur); return; }
    el.appendChild(label); el.appendChild(cur);
    label.textContent = '';
    var i = 0;
    (function tick() {
      if (i <= text.length) { label.textContent = text.slice(0, i++); setTimeout(tick, 42); }
    })();
  }

  function initHero(slides) {
    var hero = document.getElementById('hero');
    var track = document.getElementById('hero-track');
    var dotsBox = document.getElementById('hero-dots');
    if (!hero || !track || !slides.length) return;
    track.innerHTML = ''; dotsBox.innerHTML = '';
    slides.forEach(function (s, i) {
      var d = document.createElement('div');
      d.className = 'hero-slide' + (i === 0 ? ' active' : '');
      d.setAttribute('role', 'group');
      d.setAttribute('aria-roledescription', 'slide');
      d.setAttribute('aria-label', (i + 1) + ' of ' + slides.length);
      d.innerHTML = '<img src="' + PG.esc(s.image) + '" alt="" fetchpriority="' + (i === 0 ? 'high' : 'low') + '" decoding="async">' +
        '<div class="container hero-content"><h1>' + PG.esc(s.line1) + '<br><span class="gold">' + PG.esc(s.line2) + '</span></h1>' +
        '<p class="hero-sub">' + PG.esc(s.subtitle) + '</p>' +
        '<p class="hero-tag" data-tagline="' + PG.esc(s.tagline) + '"></p>' +
        '<div><a class="btn btn-primary" href="' + PG.esc(s.cta.href) + '">' + PG.esc(s.cta.text) + ' ' + PG.icon('arrow-right') + '</a></div></div>';
      track.appendChild(d);
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { go(i, true); });
      dotsBox.appendChild(dot);
    });
    var els = Array.prototype.slice.call(track.children);
    var dots = Array.prototype.slice.call(dotsBox.children);
    var cur = 0, timer = null;
    typeTagline(els[0].querySelector('.hero-tag'), slides[0].tagline);
    function go(i, manual) {
      cur = (i + els.length) % els.length;
      els.forEach(function (el, k) { el.classList.toggle('active', k === cur); });
      dots.forEach(function (dt, k) { dt.classList.toggle('active', k === cur); });
      typeTagline(els[cur].querySelector('.hero-tag'), slides[cur].tagline);
      if (manual) restart();
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!reduced && els.length > 1) timer = setInterval(function () { go(cur + 1); }, 6000);
    }
    var prev = document.getElementById('hero-prev'), next = document.getElementById('hero-next');
    if (els.length < 2) {
      if (prev) prev.hidden = true; if (next) next.hidden = true; dotsBox.hidden = true;
    } else {
      if (prev) prev.addEventListener('click', function () { go(cur - 1, true); });
      if (next) next.addEventListener('click', function () { go(cur + 1, true); });
      hero.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
      hero.addEventListener('mouseleave', restart);
      hero.addEventListener('focusin', function () { if (timer) clearInterval(timer); });
      hero.addEventListener('focusout', restart);
      var tx0 = null;
      hero.addEventListener('touchstart', function (e) { tx0 = e.changedTouches[0].clientX; }, { passive: true });
      hero.addEventListener('touchend', function (e) {
        if (tx0 == null) return;
        var dx = e.changedTouches[0].clientX - tx0;
        if (Math.abs(dx) > 45) go(cur + (dx < 0 ? 1 : -1), true);
        tx0 = null;
      }, { passive: true });
      restart();
    }
  }

  function initials(name) {
    var parts = String(name || '?').trim().split(/\s+/);
    return ((parts[0] && parts[0][0]) || '?').toUpperCase() + ((parts[1] && parts[1][0]) || '').toUpperCase();
  }
  function stars(n) {
    n = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
    var s = '';
    for (var i = 0; i < n; i++) s += PG.icon('star');
    return '<span class="stars" role="img" aria-label="' + n + ' out of 5 stars">' + s + '</span>';
  }

  PG.ready.then(function () { return PG.catalogReady; }).then(function () {
    return fetch('data/homepage.json').then(function (r) { return r.json(); }).then(function (home) {
      var soonP = fetch('data/coming-soon.json').then(function (r) { return r.json(); }).catch(function () { return { items: [] }; });
      var revP = fetch('data/reviews.json').then(function (r) { return r.json(); }).catch(function () { return { items: [] }; });
      return Promise.all([home, soonP, revP]);
    });
  }).then(function (res) {
    var home = res[0], soon = res[1], rev = res[2];
    initHero(home.hero || []);
    // Popular
    var pt = document.getElementById('popular-track');
    if (pt) {
      var html = '';
      (home.popularItems || []).forEach(function (id) {
        var p = PG.productById(id);
        if (p) html += PG.productCard(p, { badge: 'Popular' });
      });
      pt.innerHTML = html || '';
      document.getElementById('popular-sec').style.display = html ? '' : 'none';
      wireCarousel(pt, document.getElementById('popular-prev'), document.getElementById('popular-next'));
    }
    // Featured deals
    var dg = document.getElementById('home-deals');
    if (dg) {
      var dh = '';
      (home.featuredDeals || []).forEach(function (id) {
        var d = PG.dealById(id);
        if (d && d.availability !== false) dh += PG.dealCard(d);
      });
      dg.innerHTML = dh;
      document.getElementById('deals-sec').style.display = dh ? '' : 'none';
    }
    // Coming soon
    var items = ((soon && soon.items) || []).filter(function (it) { return it && it.enabled !== false; });
    var soonSec = document.getElementById('soon-sec');
    if (soonSec) {
      if (!items.length) { soonSec.style.display = 'none'; }
      else {
        var st = document.getElementById('soon-track');
        st.innerHTML = items.map(function (it) {
          var dateLine = '';
          if (it.releaseDate) {
            var rd = new Date(it.releaseDate + 'T00:00:00');
            if (!isNaN(rd) && rd > new Date()) {
              dateLine = '<span class="soon-date">' + PG.icon('calendar') + '<span>Expected ' +
                rd.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) + '</span></span>';
            }
          }
          if (!dateLine) dateLine = '<span class="soon-date">' + PG.icon('calendar') + '<span>Coming Soon</span></span>';
          return '<article class="card soon-card"><div class="card-media"><span class="badge badge-gold">Coming Soon</span>' +
            '<img src="' + PG.esc(it.image || '') + '" alt="' + PG.esc(it.name || 'Coming soon') + '" loading="lazy" decoding="async"></div>' +
            '<div class="card-body"><h3>' + PG.esc(it.name || '') + '</h3>' +
            (it.description ? '<p class="card-desc">' + PG.esc(it.description) + '</p>' : '') + dateLine + '</div></article>';
        }).join('');
        wireCarousel(st, document.getElementById('soon-prev'), document.getElementById('soon-next'));
        var viewAll = document.getElementById('soon-viewall');
        if (viewAll) viewAll.addEventListener('click', function () {
          var exp = st.classList.toggle('soon-grid-expanded');
          viewAll.innerHTML = (exp ? 'Show less ' : 'View All ') + PG.icon('chevron-right');
        });
      }
    }
    // Reviews
    var ritems = ((rev && (rev.items || rev.reviews)) || []).filter(function (r) { return r && r.enabled !== false && r.text && r.author; });
    var revSec = document.getElementById('reviews-sec');
    if (revSec) {
      if (!ritems.length) { revSec.style.display = 'none'; }
      else {
        var rt = document.getElementById('reviews-track');
        rt.innerHTML = ritems.map(function (r) {
          return '<article class="card review-card"><div class="review-top"><span class="avatar" aria-hidden="true">' +
            PG.esc(initials(r.author)) + '</span><div><strong>' + PG.esc(r.author) + '</strong>' +
            (r.rating ? stars(r.rating) : '') + '</div></div>' +
            '<p class="review-text">' + PG.esc(r.text) + '</p>' +
            (r.date ? '<span class="review-date">' + PG.icon('calendar') + '<span>' + PG.esc(PG.fmtDate(r.date)) + '</span></span>' : '') +
            '</article>';
        }).join('');
        var arrows = ritems.length > 1;
        document.getElementById('rev-prev').hidden = !arrows;
        document.getElementById('rev-next').hidden = !arrows;
        wireCarousel(rt, document.getElementById('rev-prev'), document.getElementById('rev-next'));
        var rva = document.getElementById('rev-viewall');
        if (rva) rva.addEventListener('click', function () {
          var exp = rt.classList.toggle('reviews-grid-expanded');
          rva.innerHTML = (exp ? 'Show less ' : 'View All ') + PG.icon('chevron-right');
        });
      }
    }
    PG.refreshFavButtons();
  }).catch(function (e) { PG.fatal('Could not load homepage content. Please check your connection and retry.'); });
})();
