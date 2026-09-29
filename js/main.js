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
  var fadeEls = document.querySelectorAll('.fade');
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
})();
