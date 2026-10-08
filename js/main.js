(function () {
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('mobileMenu');
  if (burger) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fadeEls = document.querySelectorAll('.fade, .fade-group');
  if (reduceMotion) {
    fadeEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var fader = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
    fadeEls.forEach(function (el) { fader.observe(el); });
  }

  // Nav gains a subtle elevation once the page scrolls — a quiet, Toss-style polish cue
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Subtle scroll-linked drift on hero/philosophy imagery — the image panel
  // lags a few px behind the page scroll, independent of the fade/hover motion
  if (!reduceMotion) {
    var parallaxEls = Array.prototype.slice.call(
      document.querySelectorAll('.hero-img, .phil-img, .page-hero-img')
    );
    if (parallaxEls.length) {
      var ticking = false;
      var updateParallax = function () {
        var vh = window.innerHeight;
        parallaxEls.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          var center = rect.top + rect.height / 2;
          var progress = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
          el.style.setProperty('--py', (progress * -18).toFixed(1) + 'px');
        });
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
      window.addEventListener('resize', updateParallax);
      updateParallax();
    }
  }

  // Process/ecosystem step numbers count up from 0 the first time they
  // scroll into view — a small tell that the steps are a real sequence
  if (!reduceMotion) {
    var countEls = document.querySelectorAll('.process-step-num, .eco-step-num');
    if (countEls.length) {
      var counter = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          obs.unobserve(el);
          var target = parseInt(el.textContent, 10);
          if (isNaN(target)) return;
          var duration = 550;
          var start = null;
          var step = function (ts) {
            if (start === null) start = ts;
            var progress = Math.min(1, (ts - start) / duration);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.round(eased * target)).padStart(2, '0');
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      countEls.forEach(function (el) { counter.observe(el); });
    }
  }

  // Curriculum filter — tag buttons toggle which .curr-card entries show
  var currFilter = document.querySelector('.curr-filter');
  if (currFilter) {
    var currCards = document.querySelectorAll('.curr-card:not(.featured)');
    currFilter.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      currFilter.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.filter;
      currCards.forEach(function (card) {
        var show = cat === '전체' || card.dataset.cat === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  }

  // Reviews filter — no data yet, just gives the tag row working press-state
  var reviewsFilter = document.querySelector('.reviews-filter');
  if (reviewsFilter) {
    reviewsFilter.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      reviewsFilter.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  }
})();
