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

  // Mega menu — one shared full-width panel opens on any of the three
  // content-page nav triggers, showing all of them together (Toss-style)
  var megaPanel = document.getElementById('megaPanel');
  var megaTriggers = document.querySelectorAll('.nav-trigger');
  if (megaPanel && megaTriggers.length) {
    var hideTimer;
    var openMega = function () {
      clearTimeout(hideTimer);
      megaPanel.classList.add('open');
    };
    var scheduleClose = function () {
      hideTimer = setTimeout(function () { megaPanel.classList.remove('open'); }, 150);
    };
    megaTriggers.forEach(function (t) {
      t.addEventListener('mouseenter', openMega);
      t.addEventListener('mouseleave', scheduleClose);
      t.addEventListener('focusin', openMega);
      t.addEventListener('focusout', scheduleClose);
    });
    megaPanel.addEventListener('mouseenter', openMega);
    megaPanel.addEventListener('mouseleave', scheduleClose);
  }
})();
