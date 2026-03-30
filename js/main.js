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

  // Full detail data keyed by the card name shown in the marquee
  const DETAILS = {
    'BSE': {
      fullName: 'BSE — Banco de Seguros del Estado',
      detail: '<strong>¿Para quién?</strong> Socio, cónyuge e hijos.<br><br><strong>¿Qué se obtiene?</strong> Descuento del 17% al contratar o renovar el seguro de automóviles, manteniendo otras bonificaciones ya otorgadas por no siniestro (incluso de otras aseguradoras). A partir de Octubre de 2009, también la tarifa 1.<br><br><strong>¿Cómo?</strong> Pedir una constancia en el centro y entregarla a su corredor de confianza antes de la renovación/contratación del seguro. Obtenerla en forma personal con recibo social al día y cédula de identidad en nuestra oficina jurídica.<br><br><strong>Formas de pago:</strong> Débito en tarjeta de crédito y/o cuenta bancaria y en red de cobranza.<br><br><strong>Vehículos incluidos:</strong> Todo tipo, excepto: taxis, remises, vehículos de alquiler, ambulancias, coches de auxilio, ley de lisiados, vehículos con descuentos por flota o por integrar otro tipo de afinidad con el BSE, y asegurados con tarifa 8.'
    },
    'Porto Seguros': {
      fullName: 'Porto Seguros',
      detail: 'El Centro Protección Choferes de Montevideo ha firmado un convenio con Porto Seguro, mediante el cual nuestros asociados obtienen un <strong>8%</strong> de bonificación en el seguro automotriz. Consulte con su corredor de confianza.'
    },
    'Asoc. Española': {
      fullName: 'Asociación Española Primera en Salud',
      detail: 'El Centro ha firmado un convenio con la Asociación Española Primera en Salud.<br><br>Por mayor información consulte al <strong>1920 1234</strong>.'
    },
    'Española Móvil': {
      fullName: 'Española Móvil',
      detail: 'Dentro de todos nuestros locales, los asociados están cubiertos por la atención médica de la Española Móvil a través de un convenio firmado con dicha empresa.'
    },
    'Clínica Brackets': {
      fullName: 'Clínica Brackets del Uruguay',
      detail: 'Descuento en tratamientos odontológicos para socios y familiares.<br><br><strong>Contacto:</strong> 092 602 121 — 099 714 514'
    },
    '7 Ópticas': {
      fullName: 'Ópticas Convenidas',
      detail: '<strong>Enfoque Óptica Visual</strong> — Consulte por descuentos — Tel. 2408 5446<br><br><strong>Óptica Briozzio</strong> — Consulte por descuentos — Tel. 2902 5051 / 098 118 896<br><br><strong>Óptica Fornio</strong> — Consulte por descuentos — Tel. 2900 2000<br><br><strong>Óptica Italiana</strong> — 20% de descuento contado — Tel. 2408 7026<br><br><strong>Óptica Onix</strong> — 20% de descuento — Tel. 2409 9127 / 099 106 295<br><br><strong>Todo Óptica</strong> — 25% de descuento — Tel. 2356 1582<br><br><strong>Óptica Prada</strong> — 21 de Setiembre 2871 — Tel. 2711 4479<br>• 25% dto. en lentes de receta (armazón y cristales)<br>• 30% dto. en cristales multifocales<br>• 20% dto. en lentes de contacto no descartables<br>• 10% dto. en lentes de contacto descartables<br>• 10% dto. en lentes de sol'
    },
    'AUTOK': {
      fullName: 'AUTOK — Inspección Técnica Vehicular',
      detail: 'El Centro ha firmado un convenio con la firma AUTOK por el cual dicha empresa otorga un <strong>50% de descuento</strong> en la Inspección Técnica Vehicular.<br><br>Esta inspección es obligatoria para todos los vehículos a partir del quinto año de circulación contado desde el primer empadronamiento.<br><br><strong>Dirección:</strong> Dámaso A. Larrañaga 3347 esq. Monte Caseros<br><strong>Tel:</strong> 2481 9312'
    },
    'Cymaco Repuestos': {
      fullName: 'Cymaco Repuestos',
      detail: 'Presentando recibo al día, los asociados del Centro tienen un <strong>10% de descuento</strong> en cualquiera de las sucursales.<br><br>Además tendrán <strong>servicio gratuito</strong> en Bv. Batlle y Ordóñez 2334 o Galicia 1224 para:<br>• Mano de obra en cambio de aceite<br>• Control de baterías<br>• Chequeo de luces'
    },
    'Lavadero': {
      fullName: 'Lavadero Automotriz',
      detail: '<strong>25% de descuento</strong> para socios en lavado completo de interior: limpieza de tapizado, piso, butacas con descontaminador de plásticos y recuperador. Lavado por fuera común y descontaminador de plásticos y recuperador.<br><br><strong>Dirección:</strong> Comercio 2181<br><strong>Tel:</strong> 095 866 857'
    },
    'Academia CuatrOOjos': {
      fullName: 'Academia de Choferes CuatrOOjos',
      detail: '<strong>Beneficios para socios y familiares directos:</strong><br><br>• Curso de 15 clases prácticas de 1 hora, más 2 horas de regalo adicionales, así como todo el material de estudio.<br>• 15% de descuento por pago contado.<br><br><strong>Contacto:</strong> 098 671 333'
    },
    'Fox Parking': {
      fullName: 'Fox Parking — Estacionamiento',
      detail: 'Tarifas con descuentos para socios: por hora y todo el día (diurno).<br><br><strong>Dirección:</strong> Carlos Quijano (ex Yi) N.º 1230, entre Soriano y Canelones.'
    },
    'Parque de Minas': {
      fullName: 'Parque de Minas — Hotel Vacacional',
      detail: 'Descuento según temporada para socios y familiares.<br><br><strong>Dirección:</strong> Lavalleja - Minas / Ruta 12 Km 347.500<br><strong>Tel:</strong> 2200 3010 — 4443 0000<br><strong>WhatsApp:</strong> 092 446 200<br><strong>Email:</strong> parqueminasreservas@ute.com.uy<br><strong>Web:</strong> www.parquedeminas.uy'
    },
    'Scotiabank': {
      fullName: 'Scotiabank',
      detail: '<strong>Para todos los afiliados.</strong> Cuenta Personal Scotiabank con beneficios especiales:<br><br>• Débito automático de cuota social del centro (sin costo)<br>• Caja de Ahorro / Cuenta Corriente en pesos y/o dólares, sin exigencias de promedios mínimos ni cargos por movimiento<br>• Bonificación en el costo mensual de Tarjeta BanRed para cajeros automáticos<br>• Débito automático de servicios sin costo (tributos municipales, entes estatales y más de 30 empresas adheridas)<br>• Tarjetas de Crédito MasterCard y Visa con logo del Centro, sin costo durante el primer año (regional e internacional)<br>• Programa de beneficios: consumos en tarjetas acumulan unidades canjeables por vouchers, productos, pasajes aéreos o millas Smiles<br>• Servicio de emergencia vehicular y domiciliaria gratuita (al solicitar tarjeta de crédito)<br><br><strong>Info:</strong> 2908 1207 (C. P. Choferes) o 1958 Int. 4848 (Scotiabank) — www.scotiabank.com.uy'
    },
    'ANDA': {
      fullName: 'Socios de ANDA',
      detail: 'Descuento en cuota deportiva y parque social para socios de ANDA.<br><br><strong>Tel:</strong> 2400 0714'
    },
    'Fondo Social': {
      fullName: 'Fondo Social de la Construcción',
      detail: 'Descuento en cuota deportiva y parque social para socios del Fondo Social de la Industria de la Construcción.<br><br><strong>Tel:</strong> 2901 2222'
    },
    'UDELAR': {
      fullName: 'UDELAR — Estudiantes, trabajadores y familiares',
      detail: 'Descuento en cuota deportiva y parque social para estudiantes, trabajadores y familiares directos de la Universidad de la República.<br><br><strong>Info:</strong> 2408 5865 (Bienestar Universitario)'
    }
  };

  // Bind clicks on each card directly — most reliable approach
  const modal = document.getElementById('conv-modal');
  if (!modal) return;

  const modalImg         = document.getElementById('conv-modal-img');
  const modalPlaceholder = document.getElementById('conv-modal-placeholder');
  const modalName        = document.getElementById('conv-modal-name');
  const modalDetail      = document.getElementById('conv-modal-detail');
  const modalClose       = document.getElementById('conv-modal-close');
  const modalBackdrop    = document.getElementById('conv-modal-backdrop');

  function openConvenioModal(card) {
    const imgEl   = card.querySelector('.convenio-card__logo img');
    const cardKey = card.querySelector('.convenio-card__name')?.textContent.trim() || '';
    const data    = DETAILS[cardKey] || {};
    const name    = data.fullName || cardKey;
    const detail  = data.detail  || card.querySelector('.convenio-card__benefit')?.textContent.trim() || '';

    modalName.textContent        = name;
    modalDetail.innerHTML        = detail;
    modalPlaceholder.textContent = name;

    if (imgEl && imgEl.getAttribute('src')) {
      modalImg.src           = imgEl.getAttribute('src');
      modalImg.alt           = name;
      modalImg.style.display = '';
      modalPlaceholder.style.display = 'none';
    } else {
      modalImg.style.display         = 'none';
      modalPlaceholder.style.display = 'flex';
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click to every card (touch-action:manipulation in CSS ensures
  // mobile browsers fire click without scroll-cancellation interference)
  track.querySelectorAll('.convenio-card').forEach(card => {
    card.addEventListener('click', () => openConvenioModal(card));
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
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
    btn.style.background  = '#1E3A5F';
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

  // Profe en sala schedule per day: [start, end] ranges
  var PROFE = {
    0: [['08:30','12:00'],['16:00','17:00'],['18:45','21:00']],
    1: [['08:00','12:00'],['16:00','21:00']],
    2: [['08:30','12:00'],['16:00','17:00'],['18:45','21:00']],
    3: [['08:00','12:00'],['16:00','21:00']],
    4: [['08:30','12:00'],['16:00','17:00'],['18:45','21:00']]
  };

  function toMin(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function fromMin(m) { var h = Math.floor(m / 60), mm = m % 60; return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm; }

  function getNoProfeGaps(day, start, end) {
    var sMin = toMin(start), eMin = toMin(end);
    var ranges = PROFE[day] || [];
    var gaps = [], cursor = sMin;
    for (var i = 0; i < ranges.length; i++) {
      var ps = toMin(ranges[i][0]), pe = toMin(ranges[i][1]);
      if (pe <= cursor) continue;
      if (ps > eMin) break;
      if (ps > cursor) gaps.push([fromMin(cursor), fromMin(Math.min(ps, eMin))]);
      cursor = Math.max(cursor, pe);
    }
    if (cursor < eMin) gaps.push([fromMin(cursor), fromMin(eMin)]);
    return gaps;
  }

  function noProfeHtml(e, endTime) {
    if (e.s !== 'sala-entrenamiento') return '';
    var gaps = getNoProfeGaps(e.d, e.t, endTime);
    var h = '';
    for (var i = 0; i < gaps.length; i++) {
      h += '<span class="horarios-grid__no-profe">' + gaps[i][0] + ' - ' + gaps[i][1] + ' Sin profesor en sala</span>';
    }
    return h;
  }

  // Build table-like grid: hour column + 5 day columns
  function buildGrid() {
    // Collect unique hours that have entries
    var hourSet = {};
    DATA.forEach(function(e) { hourSet[e.t.split(':')[0]] = true; });
    var hours = Object.keys(hourSet).sort();

    var html = '';

    // Header row: 5 day headers
    for (var di = 0; di < 5; di++) {
      html += '<div class="horarios-grid__day-header">' + DAYS[di] + '</div>';
    }

    // One row per hour
    hours.forEach(function(hour) {
      for (var di = 0; di < 5; di++) {
        var entries = DATA.filter(function(e) {
          return e.d === di && e.t.split(':')[0] === hour;
        });
        entries.sort(function(a, b) { return a.t < b.t ? -1 : a.t > b.t ? 1 : 0; });
        html += '<div class="horarios-grid__cell">';
        entries.forEach(function(e) {
          var timeStr, endTime;
          if (e.e) { endTime = e.e; timeStr = e.t + ' - ' + endTime; }
          else if (DUR[e.s]) { endTime = addMin(e.t, DUR[e.s]); timeStr = e.t + ' - ' + endTime; }
          else { timeStr = e.t; endTime = e.t; }
          html += '<div class="horarios-grid__entry horarios-grid__entry--' + e.c + '" data-activity="' + e.s + '">';
          html += '<span class="horarios-grid__time">' + timeStr + '</span>';
          html += '<span class="horarios-grid__name">' + e.n + '</span>';
          html += noProfeHtml(e, endTime);
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
          var timeStr, endTime;
          if (e.e) { endTime = e.e; timeStr = e.t + ' - ' + endTime; }
          else if (DUR[e.s]) { endTime = addMin(e.t, DUR[e.s]); timeStr = e.t + ' - ' + endTime; }
          else { timeStr = e.t; endTime = e.t; }
          html += '<div class="horarios-grid__entry horarios-grid__entry--' + e.c + '" data-activity="' + e.s + '">';
          html += '<span class="horarios-grid__time">' + timeStr + '</span>';
          html += '<span class="horarios-grid__name">' + e.n + '</span>';
          html += noProfeHtml(e, endTime);
          html += '</div>';
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
// CONVENIOS PAGE — CATEGORY FILTER + HORIZONTAL SCROLL
// ============================================================
function initConveniosPage() {
  const filterScroll = document.getElementById('conv-filter-scroll');
  const sections = document.getElementById('conv-sections');
  if (!filterScroll || !sections) return;

  const chips = filterScroll.querySelectorAll('.conv-filter__chip');
  const catSections = sections.querySelectorAll('.conv-cat-section');
  const prevBtn = document.getElementById('conv-filter-prev');
  const nextBtn = document.getElementById('conv-filter-next');

  // Category filter
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const cat = chip.dataset.cat;

      catSections.forEach(sec => {
        if (cat === 'todos' || sec.dataset.section === cat) {
          sec.classList.remove('is-hidden');
        } else {
          sec.classList.add('is-hidden');
        }
      });
    });
  });

  // Filter bar scroll arrows
  function updateFilterArrows() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = filterScroll.scrollLeft <= 4;
    nextBtn.disabled = filterScroll.scrollLeft >= filterScroll.scrollWidth - filterScroll.clientWidth - 4;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      filterScroll.scrollBy({ left: -200, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      filterScroll.scrollBy({ left: 200, behavior: 'smooth' });
    });
    filterScroll.addEventListener('scroll', updateFilterArrows, { passive: true });
    updateFilterArrows();
  }

  // Modal
  const modal = document.getElementById('conv-modal');
  const modalImg = document.getElementById('conv-modal-img');
  const modalPlaceholder = document.getElementById('conv-modal-placeholder');
  const modalCategory = document.getElementById('conv-modal-category');
  const modalName = document.getElementById('conv-modal-name');
  const modalDetail = document.getElementById('conv-modal-detail');
  const modalClose = document.getElementById('conv-modal-close');
  const modalBackdrop = document.getElementById('conv-modal-backdrop');

  if (modal) {
    // Open modal on card click
    sections.querySelectorAll('.conv-logo-card').forEach(card => {
      card.addEventListener('click', () => {
        const imgSrc = card.dataset.img || '';
        const name = card.dataset.name || '';
        const category = card.dataset.category || '';
        const detail = card.dataset.detail || '';

        modalCategory.textContent = category;
        modalName.textContent = name;
        modalDetail.innerHTML = detail;
        modalPlaceholder.textContent = name;

        // Reset image state
        modalImg.style.display = '';
        modalPlaceholder.style.display = 'none';
        modalImg.src = imgSrc;
        modalImg.alt = name;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  // Row scroll arrows for each category section
  catSections.forEach(sec => {
    const row = sec.querySelector('.conv-cat-section__row');
    const prev = sec.querySelector('.conv-cat-section__arrow--prev');
    const next = sec.querySelector('.conv-cat-section__arrow--next');
    if (!row || !prev || !next) return;

    function updateRowArrows() {
      prev.disabled = row.scrollLeft <= 4;
      next.disabled = row.scrollLeft >= row.scrollWidth - row.clientWidth - 4;
    }

    prev.addEventListener('click', () => {
      row.scrollBy({ left: -300, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      row.scrollBy({ left: 300, behavior: 'smooth' });
    });
    row.addEventListener('scroll', updateRowArrows, { passive: true });
    updateRowArrows();
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
  initHorarios();
  initConveniosPage();
});
