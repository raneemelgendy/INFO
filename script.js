(function () {
  'use strict';

  var THEME_KEY = 'vanguard-theme';

  // ----- Theme toggle (light / dark) -----
  function getTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch (e) {
      return 'dark';
    }
  }
  function setTheme(theme) {
    var html = document.documentElement;
    html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }
  function applyTheme() {
    setTheme(getTheme());
  }
  (function initTheme() {
    applyTheme();
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = getTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    }
  })();

  // ----- Year in footer -----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Mobile nav toggle (left on mobile) -----
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Active section in nav -----
  var sections = document.querySelectorAll('.section[id], #problem');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveSection() {
    var scrollY = window.scrollY || window.pageYOffset;
    var headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80;
    var current = null;

    sections.forEach(function (section) {
      var top = section.offsetTop - headerHeight;
      var height = section.offsetHeight;
      if (section.id && scrollY >= top && scrollY < top + height) current = section.id;
    });

    navAnchors.forEach(function (a) {
      var href = a.getAttribute('href');
      var id = href === '#' ? 'home' : href.slice(1);
      a.setAttribute('data-active', id === current ? 'true' : 'false');
    });
  }

  window.addEventListener('scroll', setActiveSection);
  window.addEventListener('resize', setActiveSection);
  setActiveSection();

  // ----- About section: fade-in when in view -----
  var aboutSection = document.getElementById('about');
  if (aboutSection) {
    function revealAbout() {
      var rect = aboutSection.getBoundingClientRect();
      var inView = rect.top < window.innerHeight * 0.85;
      if (inView) {
        aboutSection.classList.add('about-in-view');
      }
    }
    window.addEventListener('scroll', revealAbout);
    window.addEventListener('load', revealAbout);
    revealAbout();
  }

  // ----- Features section: circles bounce up when in view -----
  var featuresSection = document.getElementById('features');
  if (featuresSection) {
    function revealFeatures() {
      var rect = featuresSection.getBoundingClientRect();
      var inView = rect.top < window.innerHeight * 0.85;
      if (inView) {
        featuresSection.classList.add('features-in-view');
      }
    }
    window.addEventListener('scroll', revealFeatures);
    window.addEventListener('load', revealFeatures);
    revealFeatures();
  }

  // ----- FAQ accordion (How It Works) -----
  var faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.faq-accordion-trigger');
    var panel = item.querySelector('.faq-accordion-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        var otherTrigger = other.querySelector('.faq-accordion-trigger');
        var otherPanel = other.querySelector('.faq-accordion-panel');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.setAttribute('hidden', '');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });
  });

  // ----- Footer: fade up when in view -----
  var footer = document.querySelector('.footer');
  if (footer) {
    function revealFooter() {
      var rect = footer.getBoundingClientRect();
      var inView = rect.top < window.innerHeight * 0.9;
      if (inView) footer.classList.add('footer-in-view');
    }
    window.addEventListener('scroll', revealFooter);
    window.addEventListener('load', revealFooter);
    revealFooter();
  }

  // ----- Contact form -----
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Message sent!';
        btn.style.background = 'var(--success)';
        form.reset();
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 2500);
      }, 800);
    });
  }
})();
