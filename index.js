/* ═══════════════════════════════════════════════════
   ASTARTES IT — Interactive Layer
   Language toggle · Scroll effects · Form handling
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── State ──
  let currentLang = localStorage.getItem('lang') || 'en';

  // ── DOM refs ──
  const html = document.documentElement;
  const nav = document.getElementById('nav');
  const langToggle = document.getElementById('langToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const reveals = document.querySelectorAll('.reveal');
  const allI18n = document.querySelectorAll('[data-en]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  // ── Language ──
  function applyLang(lang) {
    currentLang = lang;
    html.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang);

    allI18n.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (!text) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        el.textContent = text;
      }
    });

    // Update page title
    const titles = {
      en: 'Scalable IT Infrastructure for AI, Data & Cloud Startups',
      es: 'Infraestructura IT escalable para startups de AI, data y cloud',
      blog_en: 'Blog & Insights | Astartes IT',
      blog_es: 'Blog y Perspectivas | Astartes IT'
    };

    const isBlog = window.location.pathname.includes('blog.html');
    const isPost = window.location.pathname.includes('/posts/');

    if (isBlog) {
      document.title = titles[lang === 'en' ? 'blog_en' : 'blog_es'];
    } else if (!isPost) {
      document.title = titles[lang] || titles.en;
    }
  }

  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'es' : 'en');
  });

  // Initialize on load
  applyLang(currentLang);

  // ── Mobile Menu ──
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Sticky Nav ──
  let lastScroll = 0;
  function handleScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    lastScroll = y;
    updateActiveSection();
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial

  // ── Active Section Highlight ──
  function updateActiveSection() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });
    navAnchors.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === `#${current}`);
    });
  }

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger animation within visible group
          const delay = Array.from(entry.target.parentElement.children)
            .filter(c => c.classList.contains('reveal'))
            .indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('#name').value.trim();
      const company = form.querySelector('#company').value.trim();
      const email = form.querySelector('#email').value.trim();
      const teamSize = form.querySelector('#teamSize').value;

      if (!name || !company || !email || !teamSize) {
        // Shake the button briefly
        const btn = form.querySelector('.btn-submit');
        btn.style.animation = 'shake 0.4s ease';
        setTimeout(() => btn.style.animation = '', 400);
        return;
      }

      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return;
      }

      // Show success
      if (formSuccess) formSuccess.classList.add('show');
      const submitBtn = form.querySelector('.btn-submit');
      if (submitBtn) submitBtn.style.display = 'none';

      // Reset form fields (keep success visible)
      setTimeout(() => {
        form.reset();
      }, 100);
    });
  }

  // ── Smooth anchor scrolling (fallback for browsers without CSS scroll-behavior) ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Only smooth scroll if on the same page
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ── Keyboard shortcut for language toggle (Alt+L) ──
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'l') {
      e.preventDefault();
      applyLang(currentLang === 'en' ? 'es' : 'en');
    }
  });

})();
