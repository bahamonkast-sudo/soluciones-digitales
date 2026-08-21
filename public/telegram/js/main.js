(function () {
  'use strict';

  document.documentElement.setAttribute('data-theme', 'dark');

  var isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (!isDev) {
    document.querySelectorAll('[data-prod]').forEach(function (el) {
      var prod = el.getAttribute('data-prod');
      if (prod) el.setAttribute('href', prod);
    });
  }

  var navbar = document.querySelector('.sd-navbar');
  window.addEventListener('scroll', function () {
    if (!navbar) return;
    var scrolled = window.scrollY > 10;
    navbar.classList.toggle('scrolled', scrolled);
  }, { passive: true });

  var parallaxImg = document.querySelector('.how__image-parallax img');
  window.addEventListener('scroll', function () {
    if (!parallaxImg) return;
    var rect = parallaxImg.parentElement.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    var offset = (window.innerHeight - rect.top - rect.height / 2) * 0.12;
    var maxOffset = rect.height * 0.16;
    offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
    parallaxImg.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
  }, { passive: true });

  var dd = document.querySelector('[data-dd]');
  var ddBtn = document.querySelector('[data-dd-btn]');
  var ddPanel = document.querySelector('[data-dd-panel]');
  var ddClose = document.querySelector('[data-dd-close]');

  function closeDd() {
    if (!ddPanel || !ddBtn) return;
    ddPanel.classList.remove('open');
    ddBtn.setAttribute('aria-expanded', 'false');
  }

  function openDd() {
    if (!ddPanel || !ddBtn) return;
    ddPanel.classList.add('open');
    ddBtn.setAttribute('aria-expanded', 'true');
  }

  if (ddBtn && ddPanel) {
    ddBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = ddPanel.classList.contains('open');
      if (open) closeDd();
      else openDd();
    });
    if (ddClose) ddClose.addEventListener('click', closeDd);
  }

  document.addEventListener('click', function (e) {
    if (ddPanel && ddPanel.classList.contains('open') && dd && !dd.contains(e.target)) {
      closeDd();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDd();
      closeMobile();
    }
  });

  var burger = document.querySelector('[data-burger]');
  var mobile = document.querySelector('[data-mobile]');
  var mobileClosers = document.querySelectorAll('[data-mobile-close]');

  function openMobile() {
    if (!mobile || !burger) return;
    mobile.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    if (!mobile || !burger) return;
    mobile.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger && mobile) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mobile.classList.contains('open')) closeMobile();
      else openMobile();
    });
    mobileClosers.forEach(function (el) {
      el.addEventListener('click', closeMobile);
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobile);
    });
  }

  var catBtns = document.querySelectorAll('[data-cat-btn]');
  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var body = btn.parentElement.querySelector('[data-cat-body]');
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (body) body.hidden = expanded;
    });
  });

  var observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }

  document.querySelectorAll('.reveal').forEach(function (el) {
    if (observer) observer.observe(el);
    else el.classList.add('visible');
  });

  var countObserver = null;
  var counters = document.querySelectorAll('.stat__value[data-count]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length && 'IntersectionObserver' in window) {
    countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-count');
    });
  }
})();