(function () {
  'use strict';

  /* ---- Typing Effect ---- */
  const typingEl = document.getElementById('typing-text');
  const roles = [
    'WordPress Developer',
    'Shopify Developer',
    'Front-End Developer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingEl) return;

    const current = roles[roleIndex];
    const display = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    typingEl.textContent = display;

    if (!isDeleting) {
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }

  typeEffect();

  /* ---- Sticky Header ---- */
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile Navigation ---- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Active Nav Link on Scroll ---- */
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector('.nav__link[href="#' + id + '"]');

      if (link && scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Scroll Reveal ---- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---- Contact Form Validation ---- */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + '-error');
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
  }

  function clearErrors() {
    ['name', 'email', 'subject', 'message'].forEach(function (field) {
      const errorEl = document.getElementById(field + '-error');
      const inputEl = document.getElementById(field);
      if (errorEl) errorEl.textContent = '';
      if (inputEl) inputEl.removeAttribute('aria-invalid');
    });
    if (formSuccess) formSuccess.hidden = true;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      let valid = true;

      if (!name) {
        showError('name', 'Please enter your name.');
        valid = false;
      }

      if (!email) {
        showError('email', 'Please enter your email.');
        valid = false;
      } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      }

      if (!subject) {
        showError('subject', 'Please enter a subject.');
        valid = false;
      }

      if (!message) {
        showError('message', 'Please enter your message.');
        valid = false;
      }

      if (!valid) return;

      const mailtoLink =
        'mailto:naganandinisri999@gmail.com' +
        '?subject=' + encodeURIComponent(subject + ' — from ' + name) +
        '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);

      window.location.href = mailtoLink;

      if (formSuccess) {
        formSuccess.hidden = false;
      }

      form.reset();
    });
  }

  /* ---- Footer Year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
