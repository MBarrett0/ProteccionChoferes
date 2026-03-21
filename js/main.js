/* ============================================================
   CENTRO PROTECCIÓN CHOFERES DE MONTEVIDEO
   Main JavaScript — Animations & Interactions
   ============================================================ */

'use strict';

// ============================================================
// 1. STICKY NAV (always white, add shadow on scroll)
// ============================================================
function initStickyNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-solid', window.scrollY > 40);
  }, { passive: true });
}

// ============================================================
// 2. MOBILE MENU + ACCORDION SUBMENUS
// ============================================================
function initMobileMenu() {
  const hamburger  = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('nav-mobile');
  if (!hamburger || !mobileMenu) return;

  // Toggle main mobile menu
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Accordion: links with data-toggle attribute
  mobileMenu.querySelectorAll('[data-toggle]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-toggle');
      const sub = document.getElementById(targetId);
      if (!sub) return;

      e.preventDefault();
      const isSubOpen = sub.classList.toggle('is-open');
      const indicator = link.querySelector('span');
      if (indicator) indicator.textContent = isSubOpen ? '−' : '+';
    });
  });

  // Close on mobile sub-link click (navigate)
  mobileMenu.querySelectorAll('.nav__mobile-sublink').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  // Close menu if clicked outside
  document.addEventListener('click', (e) => {
    if (
      hamburger.classList.contains('is-open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// 3. SCROLL REVEAL (Intersection Observer)
// ============================================================
function initScrollReveal() {
  if (!window.IntersectionObserver) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
// 4. STATS COUNTER ANIMATION
// ============================================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = prefix + value.toLocaleString('es-UY') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  if (!window.IntersectionObserver) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

// ============================================================
// 5. SCROLL TO TOP BUTTON
// ============================================================
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// 6. SMOOTH SCROLL for anchor links
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector('.site-nav')?.offsetHeight || 80;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ============================================================
// 7. INSTALLATIONS CAROUSEL
// ============================================================
function initInstallationsCarousel() {
  const track    = document.getElementById('carousel-track');
  const dots     = document.querySelectorAll('#carousel-dots .carousel__dot');
  const prevBtn  = document.getElementById('carousel-prev');
  const nextBtn  = document.getElementById('carousel-next');

  if (!track) return;

  const slides = track.querySelectorAll('.carousel__slide');
  const total  = slides.length;
  let current  = 0;
  let autoTimer = null;
  let touchStartX = 0;
  let isDragging  = false;

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // Touch / swipe support
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging  = true;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    isDragging = false;
    startAuto();
  }, { passive: true });

  // Pause on hover
  const carousel = document.getElementById('installations-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
  }

  startAuto();
}

// ============================================================
// 8. HISTORIA TIMELINE (clickable checkpoints)
// ============================================================
function initTimeline() {
  const items = document.querySelectorAll('.timeline__item');
  if (!items.length) return;

  // Open first item by default
  items[0].classList.add('is-active');

  items.forEach(item => {
    const header = item.querySelector('.timeline__header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');
      items.forEach(i => i.classList.remove('is-active'));
      if (!isActive) item.classList.add('is-active');
    });
  });
}

// ============================================================
// 9. CONVENIOS MARQUEE
// ============================================================
function initConveniosMarquee() {
  const track = document.querySelector('.convenios-marquee__track');
  if (!track) return;

  // Handle reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    track.style.animation = 'none';
    const wrapper = track.closest('.convenios-marquee');
    if (wrapper) {
      wrapper.style.overflowX = 'auto';
      wrapper.style.webkitMaskImage = 'none';
      wrapper.style.maskImage = 'none';
    }
  }
}

// ============================================================
// 10. CONTACT FORM (basic validation + feedback)
// ============================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn      = form.querySelector('[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Enviando...';
    btn.disabled    = true;

    await new Promise(r => setTimeout(r, 1200));

    btn.textContent       = 'Mensaje enviado';
    btn.style.background  = '#3F7652';
    btn.style.color       = '#fff';

    setTimeout(() => {
      btn.textContent      = original;
      btn.disabled         = false;
      btn.style.background = '';
      btn.style.color      = '';
      form.reset();
    }, 3000);
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initScrollTop();
  initSmoothScroll();
  initInstallationsCarousel();
  initContactForm();
  initTimeline();
  initConveniosMarquee();
});
