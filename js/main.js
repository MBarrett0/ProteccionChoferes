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
  const ANIM_MS = 350; // must match CSS max-height transition duration
  let openSub  = null;
  let openLink = null;

  function closeSub(sub, link) {
    sub.classList.remove('is-open');
    const ind = link && link.querySelector('span');
    if (ind) ind.textContent = '+';
  }

  function openSubMenu(sub, link) {
    sub.classList.add('is-open');
    const ind = link.querySelector('span');
    if (ind) ind.textContent = '−';
    openSub  = sub;
    openLink = link;
  }

  mobileMenu.querySelectorAll('[data-toggle]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-toggle');
      const sub = document.getElementById(targetId);
      if (!sub) return;
      e.preventDefault();

      if (sub.classList.contains('is-open')) {
        // Toggle close
        closeSub(sub, link);
        openSub  = null;
        openLink = null;
      } else if (openSub && openSub !== sub) {
        // Close current, then open new after animation finishes
        closeSub(openSub, openLink);
        openSub  = null;
        openLink = null;
        setTimeout(() => openSubMenu(sub, link), ANIM_MS);
      } else {
        openSubMenu(sub, link);
      }
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
// 11. HORARIOS FILTER + WEEKLY GRID
// ============================================================
function initHorarios() {
  var gridEl      = document.getElementById('horarios-grid');
  var container   = document.getElementById('horarios-checkboxes');
  var emptyMsg    = document.getElementById('horarios-empty');
  var selectAll   = document.getElementById('horarios-select-all');
  var deselectAll = document.getElementById('horarios-deselect-all');
  var searchInput = document.getElementById('horarios-search');
  var dropdown    = document.getElementById('horarios-dropdown');
  var filterWrap  = document.getElementById('horarios-filter');
  var countEl     = document.getElementById('horarios-count');

  if (!gridEl || !container) return;

  var STORAGE_KEY = 'cpch-horarios-filter';
  var DAYS = ['Lunes','Martes','Miércoles','Jueves','Viernes'];
  var TOTAL = 12;

  // Duration in minutes per activity (from PDF)
  var DUR = {
    'hidrogimnasia': 45,
    'natacion-infantil': 45,
    'natacion-adultos': 45,
    'pilates': 30,
    'gimnasia-correctiva': 45,
    'gimnasia-localizada': 45,
    'juegos-infantil': 45,
    'indoor-cycling': 45,
    'entrenamiento-funcional': 60,
    'voleibol': 90
  };

  function addMin(t, m) {
    var p = t.split(':'), h = +p[0], mm = +p[1] + m;
    h += Math.floor(mm / 60); mm = mm % 60;
    return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm;
  }

  var DATA = [
    // Hidrogimnasia
    {s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:0,t:'08:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:1,t:'08:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:2,t:'08:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:3,t:'07:45'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:4,t:'08:00'},
    {s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:0,t:'16:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:2,t:'16:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:4,t:'16:00'},
    {s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:0,t:'17:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:1,t:'17:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:2,t:'17:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:3,t:'17:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:4,t:'17:00'},
    {s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:0,t:'18:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:1,t:'18:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:2,t:'18:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:3,t:'18:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:4,t:'18:00'},
    {s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:1,t:'19:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:3,t:'19:00'},
    {s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:0,t:'20:20'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:1,t:'20:00'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:2,t:'20:20'},{s:'hidrogimnasia',n:'Hidrogimnasia',c:'piscina',d:3,t:'20:00'},
    // Natación Infantil 3-12
    {s:'natacion-infantil',n:'Natación Infantil',c:'piscina',d:0,t:'11:15'},{s:'natacion-infantil',n:'Natación Infantil',c:'piscina',d:2,t:'11:15'},{s:'natacion-infantil',n:'Natación Infantil',c:'piscina',d:4,t:'11:15'},
    {s:'natacion-infantil',n:'Natación Infantil',c:'piscina',d:0,t:'18:40'},{s:'natacion-infantil',n:'Natación Infantil',c:'piscina',d:2,t:'18:40'},{s:'natacion-infantil',n:'Natación Infantil',c:'piscina',d:4,t:'18:40'},
    // Natación +13
    {s:'natacion-adultos',n:'Natación +13',c:'piscina',d:0,t:'08:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:1,t:'08:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:2,t:'08:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:3,t:'07:45'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:4,t:'08:00'},
    {s:'natacion-adultos',n:'Natación +13',c:'piscina',d:0,t:'11:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:2,t:'11:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:3,t:'11:10'},
    {s:'natacion-adultos',n:'Natación +13',c:'piscina',d:0,t:'16:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:1,t:'16:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:2,t:'16:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:3,t:'16:00'},
    {s:'natacion-adultos',n:'Natación +13',c:'piscina',d:0,t:'17:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:1,t:'17:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:2,t:'17:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:3,t:'17:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:4,t:'17:00'},
    {s:'natacion-adultos',n:'Natación +13',c:'piscina',d:0,t:'18:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:1,t:'18:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:2,t:'18:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:3,t:'18:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:4,t:'18:00'},
    {s:'natacion-adultos',n:'Natación +13',c:'piscina',d:0,t:'19:30'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:1,t:'19:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:2,t:'19:30'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:3,t:'19:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:4,t:'19:30'},
    {s:'natacion-adultos',n:'Natación +13',c:'piscina',d:0,t:'20:20'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:1,t:'20:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:2,t:'20:20'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:3,t:'20:00'},{s:'natacion-adultos',n:'Natación +13',c:'piscina',d:4,t:'20:20'},
    // Nado Libre
    {s:'nado-libre',n:'Nado Libre',c:'piscina',d:0,t:'08:00',e:'09:30'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:1,t:'08:00',e:'10:50'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:2,t:'08:00',e:'10:25'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:3,t:'07:45',e:'08:30'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:4,t:'08:00',e:'12:30'},
    {s:'nado-libre',n:'Nado Libre',c:'piscina',d:0,t:'10:15',e:'12:30'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:1,t:'11:30',e:'12:30'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:2,t:'11:15',e:'12:30'},
    {s:'nado-libre',n:'Nado Libre',c:'piscina',d:0,t:'16:00',e:'21:00'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:1,t:'16:00',e:'18:40'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:2,t:'16:00',e:'21:00'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:3,t:'16:00',e:'18:40'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:4,t:'16:00',e:'18:40'},
    {s:'nado-libre',n:'Nado Libre',c:'piscina',d:1,t:'19:25',e:'21:00'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:3,t:'19:25',e:'21:00'},{s:'nado-libre',n:'Nado Libre',c:'piscina',d:4,t:'19:25',e:'21:00'},
    // Pilates (30 min)
    {s:'pilates',n:'Pilates',c:'gimnasio',d:0,t:'08:00'},{s:'pilates',n:'Pilates',c:'gimnasio',d:2,t:'08:00'},{s:'pilates',n:'Pilates',c:'gimnasio',d:4,t:'08:00'},
    {s:'pilates',n:'Pilates',c:'gimnasio',d:0,t:'17:00'},{s:'pilates',n:'Pilates',c:'gimnasio',d:2,t:'17:00'},{s:'pilates',n:'Pilates',c:'gimnasio',d:4,t:'17:00'},
    // Gimnasia Correctiva (45 min)
    {s:'gimnasia-correctiva',n:'Gimn. Correctiva',c:'gimnasio',d:0,t:'16:00'},{s:'gimnasia-correctiva',n:'Gimn. Correctiva',c:'gimnasio',d:2,t:'16:00'},{s:'gimnasia-correctiva',n:'Gimn. Correctiva',c:'gimnasio',d:4,t:'16:00'},
    // Gimnasia Localizada
    {s:'gimnasia-localizada',n:'Gimn. Localizada',c:'gimnasio',d:0,t:'17:00'},{s:'gimnasia-localizada',n:'Gimn. Localizada',c:'gimnasio',d:2,t:'17:00'},{s:'gimnasia-localizada',n:'Gimn. Localizada',c:'gimnasio',d:4,t:'17:00'},
    // Módulo de Juegos
    {s:'juegos-infantil',n:'Juegos Infantil',c:'infantil',d:0,t:'18:00'},{s:'juegos-infantil',n:'Juegos Infantil',c:'infantil',d:2,t:'18:00'},{s:'juegos-infantil',n:'Juegos Infantil',c:'infantil',d:4,t:'18:00'},
    // Indoor Cycling
    {s:'indoor-cycling',n:'Indoor Cycling',c:'gimnasio',d:0,t:'18:00'},{s:'indoor-cycling',n:'Indoor Cycling',c:'gimnasio',d:1,t:'19:00'},{s:'indoor-cycling',n:'Indoor Cycling',c:'gimnasio',d:2,t:'18:00'},{s:'indoor-cycling',n:'Indoor Cycling',c:'gimnasio',d:3,t:'19:00'},{s:'indoor-cycling',n:'Indoor Cycling',c:'gimnasio',d:4,t:'18:00'},
    // Entrenamiento Funcional
    {s:'entrenamiento-funcional',n:'Ent. Funcional',c:'gimnasio',d:1,t:'20:00'},{s:'entrenamiento-funcional',n:'Ent. Funcional',c:'gimnasio',d:3,t:'20:00'},
    // Voleibol
    {s:'voleibol',n:'Voleibol',c:'cancha',d:0,t:'20:00'},{s:'voleibol',n:'Voleibol',c:'cancha',d:2,t:'20:00'},{s:'voleibol',n:'Voleibol',c:'cancha',d:4,t:'20:00'},
    // Sala de Entrenamiento
    {s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:0,t:'08:00',e:'12:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:1,t:'08:00',e:'12:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:2,t:'08:00',e:'12:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:3,t:'08:00',e:'12:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:4,t:'08:00',e:'12:00'},
    {s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:0,t:'16:00',e:'21:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:1,t:'16:00',e:'21:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:2,t:'16:00',e:'21:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:3,t:'16:00',e:'21:00'},{s:'sala-entrenamiento',n:'Sala Entrenamiento',c:'gimnasio',d:4,t:'16:00',e:'21:00'}
  ];

  // Build table-like grid: hour column + 5 day columns
  function buildGrid() {
    // Collect unique hours that have entries
    var hourSet = {};
    DATA.forEach(function(e) { hourSet[e.t.split(':')[0]] = true; });
    var hours = Object.keys(hourSet).sort();

    var html = '';

    // Header row: corner + 5 day headers
    html += '<div class="horarios-grid__corner">Hora</div>';
    for (var di = 0; di < 5; di++) {
      html += '<div class="horarios-grid__day-header">' + DAYS[di] + '</div>';
    }

    // One row per hour
    hours.forEach(function(hour) {
      html += '<div class="horarios-grid__hour">' + hour + ':00</div>';
      for (var di = 0; di < 5; di++) {
        var entries = DATA.filter(function(e) {
          return e.d === di && e.t.split(':')[0] === hour;
        });
        entries.sort(function(a, b) { return a.t < b.t ? -1 : a.t > b.t ? 1 : 0; });
        html += '<div class="horarios-grid__cell">';
        entries.forEach(function(e) {
          var timeStr;
          if (e.e) { timeStr = e.t + ' - ' + e.e; }
          else if (DUR[e.s]) { timeStr = e.t + ' - ' + addMin(e.t, DUR[e.s]); }
          else { timeStr = e.t; }
          html += '<div class="horarios-grid__entry horarios-grid__entry--' + e.c + '" data-activity="' + e.s + '">';
          html += '<span class="horarios-grid__time">' + timeStr + '</span>';
          html += '<span class="horarios-grid__name">' + e.n + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }
    });

    gridEl.innerHTML = html;
  }

  // Build mobile swipe carousel: one full-width card per day
  function buildSwipe() {
    var swipeEl = document.getElementById('horarios-swipe');
    if (!swipeEl) return;

    var hourSet = {};
    DATA.forEach(function(e) { hourSet[e.t.split(':')[0]] = true; });
    var hours = Object.keys(hourSet).sort();
    var SHORT = ['Lun','Mar','Mié','Jue','Vie'];

    var html = '<div class="horarios-swipe__tabs" id="horarios-swipe-tabs">';
    for (var i = 0; i < 5; i++) {
      html += '<button class="horarios-swipe__tab' + (i === 0 ? ' is-active' : '') + '" data-day="' + i + '">' + SHORT[i] + '</button>';
    }
    html += '</div><div class="horarios-swipe__track" id="horarios-swipe-track">';

    for (var di = 0; di < 5; di++) {
      html += '<div class="horarios-swipe__day">';
      hours.forEach(function(hour) {
        var entries = DATA.filter(function(e) { return e.d === di && e.t.split(':')[0] === hour; });
        if (!entries.length) return;
        entries.sort(function(a, b) { return a.t < b.t ? -1 : a.t > b.t ? 1 : 0; });
        html += '<div class="horarios-swipe__hour-group"><div class="horarios-swipe__hour-label">' + hour + ':00</div><div class="horarios-swipe__hour-entries">';
        entries.forEach(function(e) {
          var timeStr;
          if (e.e) { timeStr = e.t + ' - ' + e.e; }
          else if (DUR[e.s]) { timeStr = e.t + ' - ' + addMin(e.t, DUR[e.s]); }
          else { timeStr = e.t; }
          html += '<div class="horarios-grid__entry horarios-grid__entry--' + e.c + '" data-activity="' + e.s + '">';
          html += '<span class="horarios-grid__time">' + timeStr + '</span>';
          html += '<span class="horarios-grid__name">' + e.n + '</span></div>';
        });
        html += '</div></div>';
      });
      html += '</div>';
    }
    html += '</div>';
    swipeEl.innerHTML = html;

    // Wire tabs ↔ scroll
    var track = document.getElementById('horarios-swipe-track');
    var tabs = swipeEl.querySelectorAll('.horarios-swipe__tab');
    if (!track) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var idx = parseInt(this.dataset.day, 10);
        track.scrollTo({ left: track.children[idx].offsetLeft, behavior: 'smooth' });
      });
    });

    track.addEventListener('scroll', function() {
      var idx = Math.round(track.scrollLeft / track.offsetWidth);
      tabs.forEach(function(t, i) { t.classList.toggle('is-active', i === idx); });
    }, { passive: true });
  }

  buildGrid();
  buildSwipe();

  var checkboxes = container.querySelectorAll('input[type="checkbox"]');
  var items      = container.querySelectorAll('.horarios-dropdown__item');

  function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // Dropdown open/close
  function openDropdown()  { dropdown.classList.add('is-open'); }
  function closeDropdown() { dropdown.classList.remove('is-open'); if (searchInput) { searchInput.value = ''; applySearch(); } }

  if (searchInput) {
    searchInput.addEventListener('focus', openDropdown);
    searchInput.addEventListener('input', function() { openDropdown(); applySearch(); });
  }

  // Close when clicking outside
  document.addEventListener('mousedown', function(ev) {
    if (filterWrap && !filterWrap.contains(ev.target)) closeDropdown();
  });

  // Prevent dropdown from closing when clicking inside it
  if (dropdown) dropdown.addEventListener('mousedown', function(ev) { ev.preventDefault(); });

  function updateCount() {
    var n = 0;
    checkboxes.forEach(function(cb) { if (cb.checked) n++; });
    if (countEl) countEl.textContent = n + ' de ' + TOTAL;
  }

  function restoreState() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved === 'object') {
        checkboxes.forEach(function(cb) {
          if (saved.hasOwnProperty(cb.value)) cb.checked = saved[cb.value];
        });
      }
    } catch (e) { /* ignore */ }
  }

  function saveState() {
    var state = {};
    checkboxes.forEach(function(cb) { state[cb.value] = cb.checked; });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function applyFilter() {
    var active = new Set();
    checkboxes.forEach(function(cb) { if (cb.checked) active.add(cb.value); });
    // Update both table grid and swipe carousel entries
    document.querySelectorAll('.horarios-grid__entry[data-activity]').forEach(function(entry) {
      entry.classList.toggle('is-hidden', !active.has(entry.dataset.activity));
    });
    var empty = active.size === 0;
    if (emptyMsg) emptyMsg.classList.toggle('is-visible', empty);
    gridEl.style.display = empty ? 'none' : '';
    var swipeEl = document.getElementById('horarios-swipe');
    if (swipeEl) {
      var swipeTrack = swipeEl.querySelector('.horarios-swipe__track');
      var swipeTabs = swipeEl.querySelector('.horarios-swipe__tabs');
      if (swipeTrack) swipeTrack.style.display = empty ? 'none' : '';
      if (swipeTabs) swipeTabs.style.display = empty ? 'none' : '';
    }
    updateCount();
    saveState();
  }

  function applySearch() {
    if (!searchInput) return;
    var query = normalize(searchInput.value.trim());
    items.forEach(function(item) {
      var text = normalize(item.querySelector('.horarios-dropdown__label').textContent);
      item.classList.toggle('is-filtered', query.length > 0 && text.indexOf(query) === -1);
    });
  }

  checkboxes.forEach(function(cb) { cb.addEventListener('change', applyFilter); });

  if (selectAll) {
    selectAll.addEventListener('click', function() {
      checkboxes.forEach(function(cb) {
        if (!cb.closest('.horarios-dropdown__item').classList.contains('is-filtered')) cb.checked = true;
      });
      applyFilter();
    });
  }

  if (deselectAll) {
    deselectAll.addEventListener('click', function() {
      checkboxes.forEach(function(cb) {
        if (!cb.closest('.horarios-dropdown__item').classList.contains('is-filtered')) cb.checked = false;
      });
      applyFilter();
    });
  }

  restoreState();
  applyFilter();
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
  initHorarios();
});
