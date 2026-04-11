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
  // Homepage scroll animation owns .is-solid on this page
  if (document.body.classList.contains('is-home')) return;
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

    try {
      await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      btn.textContent      = 'Mensaje enviado';
      btn.style.background = '#1E3A5F';
      btn.style.color      = '#fff';
      form.reset();
    } catch (_) {
      btn.textContent = 'Error al enviar';
    }

    setTimeout(() => {
      btn.textContent      = original;
      btn.disabled         = false;
      btn.style.background = '';
      btn.style.color      = '';
    }, 3000);
  });
}

// ============================================================
// 11. HORARIOS — SECTION PICKER + WEEKLY GRID
// ============================================================
function initHorarios() {
  var gridEl      = document.getElementById('horarios-grid');
  var gridWrapper = document.getElementById('horarios-grid-wrapper');
  var picker      = document.getElementById('horarios-picker');
  var sectionHdr  = document.getElementById('horarios-section-header');
  var sectionTitle= document.getElementById('horarios-section-title');
  var backBtn     = document.getElementById('horarios-back');

  if (!gridEl || !picker) return;

  var DAYS = ['Lunes','Martes','Miércoles','Jueves','Viernes'];

  // Section definitions: which categories belong to each section
  var SECTIONS = {
    piscina: { cats: ['piscina'], label: 'Piscina' },
    sala:    { cats: ['gimnasio'], label: 'Sala' },
    piso:    { cats: ['infantil','cancha'], label: 'Piso' }
  };

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
      h += '<span class="horarios-grid__no-profe">' + gaps[i][0] + ' - ' + gaps[i][1] + ' S/prof</span>';
    }
    return h;
  }

  // Activity display names for the filter
  var ACTIVITY_NAMES = {
    'hidrogimnasia': 'Hidrogimnasia',
    'natacion-infantil': 'Natación Infantil (3-12)',
    'natacion-adultos': 'Natación +13 años',
    'nado-libre': 'Piscina Nado Libre',
    'pilates': 'Pilates',
    'gimnasia-correctiva': 'Gimnasia Correctiva',
    'gimnasia-localizada': 'Gimnasia Localizada',
    'indoor-cycling': 'Indoor Cycling',
    'entrenamiento-funcional': 'Entrenamiento Funcional',
    'sala-entrenamiento': 'Sala de Entrenamiento',
    'juegos-infantil': 'Módulo de Juegos (3-12)',
    'voleibol': 'Voleibol Social y Deportivo'
  };

  var NO_WA = ['sala-entrenamiento', 'nado-libre'];

  window._cpchWaToggle = function(el) {
    var entry = el.closest ? el.closest('.horarios-grid__entry--expandable') : el.parentNode;
    if (!entry) return;
    var isOpen = entry.classList.contains('is-expanded');
    document.querySelectorAll('.horarios-grid__entry.is-expanded').forEach(function(e) { e.classList.remove('is-expanded'); });
    if (!isOpen) entry.classList.add('is-expanded');
  };

  function entryHtml(e) {
    var timeStr, endTime;
    if (e.e) { endTime = e.e; timeStr = e.t + ' - ' + endTime; }
    else if (DUR[e.s]) { endTime = addMin(e.t, DUR[e.s]); timeStr = e.t + ' - ' + endTime; }
    else { timeStr = e.t; endTime = e.t; }
    var hasWa = NO_WA.indexOf(e.s) === -1;
    var cls = 'horarios-grid__entry horarios-grid__entry--' + e.c + (hasWa ? ' horarios-grid__entry--expandable' : '');
    var onclick = hasWa ? ' onclick="window._cpchWaToggle(this)"' : '';
    var h = '<div class="' + cls + '" data-activity="' + e.s + '"' + onclick + '>';
    h += '<span class="horarios-grid__time">' + timeStr + '</span>';
    h += '<span class="horarios-grid__name">' + e.n + '</span>';
    h += noProfeHtml(e, endTime);
    if (hasWa) {
      var msg = encodeURIComponent('Hola, me comunico para consultar disponibilidad para "' + e.n + '" a las ' + e.t);
      var waUrl = 'https://wa.me/59898514097?text=' + msg;
      h += '<div class="horarios-grid__wa">';
      h += '<a class="horarios-grid__wa-btn" href="' + waUrl + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">';
      h += '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 2C6.495 2 2 6.495 2 12.05c0 1.888.516 3.657 1.413 5.181L2 22l4.878-1.383A10.014 10.014 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.505 2 11.95 2h.1zm0 1.8c4.86 0 8.8 3.94 8.8 8.8 0 4.86-3.94 8.8-8.8 8.8-1.695 0-3.278-.476-4.625-1.301l-.33-.198-3.422.97.984-3.354-.215-.346A8.747 8.747 0 0 1 3.25 11.95c0-4.86 3.94-8.8 8.8-8.8z"/></svg>';
      h += 'Consultar disponibilidad</a></div>';
    }
    h += '</div>';
    return h;
  }

  // Filter DATA by section and active activities
  function filterData(sectionKey, activeSet) {
    var cats = SECTIONS[sectionKey].cats;
    return DATA.filter(function(e) {
      return cats.indexOf(e.c) !== -1 && (!activeSet || activeSet.has(e.s));
    });
  }

  // Get unique activities for a section
  function getSectionActivities(sectionKey) {
    var cats = SECTIONS[sectionKey].cats;
    var seen = {};
    var list = [];
    DATA.forEach(function(e) {
      if (cats.indexOf(e.c) !== -1 && !seen[e.s]) {
        seen[e.s] = true;
        list.push({ slug: e.s, cat: e.c });
      }
    });
    return list;
  }

  // Filter elements
  var filterWrap  = document.getElementById('horarios-filter');
  var searchInput = document.getElementById('horarios-search');
  var dropdown    = document.getElementById('horarios-dropdown');
  var countEl     = document.getElementById('horarios-count');
  var checkboxWrap= document.getElementById('horarios-checkboxes');
  var selectAll   = document.getElementById('horarios-select-all');
  var deselectAll = document.getElementById('horarios-deselect-all');
  var currentSection = null;

  function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function openDropdown()  { dropdown.classList.add('is-open'); }
  function closeDropdown() { dropdown.classList.remove('is-open'); if (searchInput) { searchInput.value = ''; applySearch(); } }

  if (searchInput) {
    searchInput.addEventListener('focus', openDropdown);
    searchInput.addEventListener('input', function() { openDropdown(); applySearch(); });
  }

  document.addEventListener('mousedown', function(ev) {
    if (filterWrap && !filterWrap.contains(ev.target)) closeDropdown();
  });

  if (dropdown) dropdown.addEventListener('mousedown', function(ev) { ev.preventDefault(); });

  function getCheckboxes() { return checkboxWrap.querySelectorAll('input[type="checkbox"]'); }
  function getItems() { return checkboxWrap.querySelectorAll('.horarios-dropdown__item'); }

  function getActiveSet() {
    var active = new Set();
    getCheckboxes().forEach(function(cb) { if (cb.checked) active.add(cb.value); });
    return active;
  }

  function updateCount() {
    var cbs = getCheckboxes();
    var n = 0;
    cbs.forEach(function(cb) { if (cb.checked) n++; });
    if (countEl) countEl.textContent = n + ' de ' + cbs.length;
  }

  function applyFilter() {
    if (!currentSection) return;
    var active = getActiveSet();

    // Hide/show entries in both grid and swipe
    document.querySelectorAll('.horarios-grid__entry[data-activity]').forEach(function(entry) {
      entry.classList.toggle('is-hidden', !active.has(entry.dataset.activity));
    });

    updateCount();
  }

  function applySearch() {
    if (!searchInput) return;
    var query = normalize(searchInput.value.trim());
    getItems().forEach(function(item) {
      var text = normalize(item.querySelector('.horarios-dropdown__label').textContent);
      item.classList.toggle('is-filtered', query.length > 0 && text.indexOf(query) === -1);
    });
  }

  if (selectAll) {
    selectAll.addEventListener('click', function() {
      getCheckboxes().forEach(function(cb) {
        if (!cb.closest('.horarios-dropdown__item').classList.contains('is-filtered')) cb.checked = true;
      });
      applyFilter();
    });
  }

  if (deselectAll) {
    deselectAll.addEventListener('click', function() {
      getCheckboxes().forEach(function(cb) {
        if (!cb.closest('.horarios-dropdown__item').classList.contains('is-filtered')) cb.checked = false;
      });
      applyFilter();
    });
  }

  // Build the checkboxes for a section's activities
  function buildFilterCheckboxes(sectionKey) {
    var activities = getSectionActivities(sectionKey);
    var html = '';
    activities.forEach(function(a) {
      html += '<label class="horarios-dropdown__item">';
      html += '<input type="checkbox" value="' + a.slug + '" checked>';
      html += '<span class="horarios-dropdown__dot horarios-dropdown__dot--' + a.cat + '"></span>';
      html += '<span class="horarios-dropdown__label">' + (ACTIVITY_NAMES[a.slug] || a.slug) + '</span>';
      html += '</label>';
    });
    checkboxWrap.innerHTML = html;

    // Wire change events
    getCheckboxes().forEach(function(cb) { cb.addEventListener('change', applyFilter); });
    updateCount();
  }

  // Build column-based grid (no empty cells): each day is an independent column
  function buildGrid(sectionKey) {
    var filtered = filterData(sectionKey);
    var html = '<div class="horarios-cols">';

    for (var di = 0; di < 5; di++) {
      var dayEntries = filtered.filter(function(e) { return e.d === di; });
      dayEntries.sort(function(a, b) { return a.t < b.t ? -1 : a.t > b.t ? 1 : 0; });

      html += '<div class="horarios-cols__day">';
      html += '<div class="horarios-cols__header horarios-cols__header--' + sectionKey + '">' + DAYS[di] + '</div>';
      html += '<div class="horarios-cols__entries">';
      dayEntries.forEach(function(e) { html += entryHtml(e); });
      html += '</div></div>';
    }

    html += '</div>';
    gridEl.innerHTML = html;
  }

  // Build mobile swipe for a section
  function buildSwipe(sectionKey) {
    var swipeEl = document.getElementById('horarios-swipe');
    if (!swipeEl) return;

    var filtered = filterData(sectionKey);
    var SHORT = ['Lun','Mar','Mié','Jue','Vie'];

    var html = '<div class="horarios-swipe__tabs" id="horarios-swipe-tabs">';
    for (var i = 0; i < 5; i++) {
      html += '<button class="horarios-swipe__tab horarios-swipe__tab--' + sectionKey + (i === 0 ? ' is-active' : '') + '" data-day="' + i + '">' + SHORT[i] + '</button>';
    }
    html += '</div><div class="horarios-swipe__track" id="horarios-swipe-track">';

    for (var di = 0; di < 5; di++) {
      var dayEntries = filtered.filter(function(e) { return e.d === di; });
      dayEntries.sort(function(a, b) { return a.t < b.t ? -1 : a.t > b.t ? 1 : 0; });

      html += '<div class="horarios-swipe__day">';
      dayEntries.forEach(function(e) { html += entryHtml(e); });
      html += '</div>';
    }
    html += '</div>';
    swipeEl.innerHTML = html;

    // Wire tabs
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

  var downloadWrap = document.getElementById('horarios-download-wrap');
  var downloadBtn  = document.getElementById('horarios-download');

  // Show section picker, hide grid
  function showPicker() {
    picker.style.display = '';
    sectionHdr.style.display = 'none';
    filterWrap.style.display = 'none';
    if (downloadWrap) downloadWrap.style.display = 'none';
    gridWrapper.style.display = 'none';
    document.getElementById('horarios-swipe').innerHTML = '';
    gridEl.innerHTML = '';
    currentSection = null;
  }

  // Show a section's schedule
  function showSection(sectionKey) {
    currentSection = sectionKey;
    picker.style.display = 'none';
    sectionHdr.style.display = '';
    sectionHdr.className = 'horarios-section-header horarios-section-header--' + sectionKey;
    sectionTitle.textContent = SECTIONS[sectionKey].label;
    filterWrap.style.display = '';
    if (downloadWrap) downloadWrap.style.display = '';
    gridWrapper.style.display = '';
    buildFilterCheckboxes(sectionKey);
    buildGrid(sectionKey);
    buildSwipe(sectionKey);
    closeDropdown();
  }

  // PNG export — desktop: direct download / mobile: show image in modal
  var DL_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar Horarios';

  function isMobile() { return window.innerWidth <= 768; }

  // Create image preview modal (once)
  var imgModal = document.createElement('div');
  imgModal.className = 'horarios-img-modal';
  imgModal.innerHTML = '<div class="horarios-img-modal__overlay"></div>' +
    '<div class="horarios-img-modal__content">' +
      '<p class="horarios-img-modal__hint">Mantené presionada la imagen para guardarla</p>' +
      '<img class="horarios-img-modal__img" id="horarios-img-preview" alt="Horarios">' +
      '<button class="horarios-img-modal__close" id="horarios-img-close">Cerrar</button>' +
    '</div>';
  document.body.appendChild(imgModal);

  var imgPreview = document.getElementById('horarios-img-preview');
  var imgClose   = document.getElementById('horarios-img-close');

  imgModal.querySelector('.horarios-img-modal__overlay').addEventListener('click', function() {
    imgModal.classList.remove('is-open');
  });
  imgClose.addEventListener('click', function() {
    imgModal.classList.remove('is-open');
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      if (!currentSection || typeof html2canvas === 'undefined') return;

      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Generando...';

      var mobile = isMobile();

      // On mobile the grid is CSS-hidden — force-show it offscreen to capture
      if (mobile) {
        gridWrapper.style.cssText = 'display:block !important; position:fixed; left:-9999px; top:0; width:1100px; z-index:-1;';
      }

      var target = gridEl.querySelector('.horarios-cols');
      if (!target) {
        if (mobile) gridWrapper.style.cssText = '';
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = DL_SVG;
        return;
      }

      // Small delay for mobile layout to settle
      setTimeout(function() {
        html2canvas(target, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          logging: false
        }).then(function(canvas) {
          if (mobile) {
            // Show in modal as <img> — user long-presses to save
            imgPreview.src = canvas.toDataURL('image/png');
            imgModal.classList.add('is-open');
          } else {
            // Desktop: direct download
            var link = document.createElement('a');
            link.download = 'horarios-' + currentSection + '.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }).catch(function() {
          // silent fail
        }).finally(function() {
          if (mobile) gridWrapper.style.cssText = '';
          downloadBtn.disabled = false;
          downloadBtn.innerHTML = DL_SVG;
        });
      }, mobile ? 300 : 0);
    });
  }

  // Wire picker cards
  picker.querySelectorAll('.horarios-picker__card').forEach(function(card) {
    card.addEventListener('click', function() {
      showSection(this.dataset.section);
    });
  });

  // Wire back button
  if (backBtn) {
    backBtn.addEventListener('click', showPicker);
  }

  // Start on picker
  showPicker();
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
// INSTALACIONES ACCORDION (Parque Social)
// ============================================================
function initInstAccordion() {
  var cards = document.querySelectorAll('.inst-card');
  if (!cards.length) return;

  // Accordion toggle
  cards.forEach(function(card) {
    var header = card.querySelector('.inst-card__header');
    if (!header) return;

    header.addEventListener('click', function() {
      var wasActive = card.classList.contains('is-active');
      // Close all
      cards.forEach(function(c) {
        c.classList.remove('is-active');
        var h = c.querySelector('.inst-card__header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      // Open clicked (if wasn't already open)
      if (!wasActive) {
        card.classList.add('is-active');
        header.setAttribute('aria-expanded', 'true');
      }
    });

    // Thumbnail gallery
    var thumbs = card.querySelectorAll('.inst-card__gallery-thumbs img');
    var mainImg = card.querySelector('.inst-card__gallery-main img');
    if (mainImg && thumbs.length) {
      thumbs.forEach(function(thumb) {
        thumb.addEventListener('click', function() {
          thumbs.forEach(function(t) { t.classList.remove('is-active'); });
          thumb.classList.add('is-active');
          mainImg.src = thumb.src;
          mainImg.alt = thumb.alt;
        });
      });
    }
  });

  // Lightbox with navigation
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');
  var lightboxCounter = document.getElementById('lightbox-counter');
  if (lightbox && lightboxImg) {
    var lbImages = [];
    var lbIndex = 0;

    function lbShow(index) {
      lbIndex = (index + lbImages.length) % lbImages.length;
      lightboxImg.src = lbImages[lbIndex].src;
      lightboxImg.alt = lbImages[lbIndex].alt;
      lightboxCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
    }

    function openLightbox(card, startSrc) {
      var thumbs = card.querySelectorAll('.inst-card__gallery-thumbs img');
      lbImages = [];
      thumbs.forEach(function(t) {
        lbImages.push({ src: t.src, alt: t.alt });
      });
      // Find starting index
      lbIndex = 0;
      for (var i = 0; i < lbImages.length; i++) {
        if (lbImages[i].src === startSrc) { lbIndex = i; break; }
      }
      lbShow(lbIndex);
      lightbox.classList.add('is-active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Click on main gallery image to open
    document.querySelectorAll('.inst-card__gallery-main img').forEach(function(img) {
      img.addEventListener('click', function() {
        var card = img.closest('.inst-card');
        if (card) openLightbox(card, img.src);
      });
    });

    // Also allow clicking thumbnails to open lightbox
    document.querySelectorAll('.inst-card__gallery-thumbs img').forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        var card = thumb.closest('.inst-card');
        if (card) openLightbox(card, thumb.src);
      });
    });

    lightboxPrev.addEventListener('click', function(e) { e.stopPropagation(); lbShow(lbIndex - 1); });
    lightboxNext.addEventListener('click', function(e) { e.stopPropagation(); lbShow(lbIndex + 1); });

    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
      if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
    });

    // Swipe support
    var touchStartX = 0;
    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        lbShow(diff > 0 ? lbIndex + 1 : lbIndex - 1);
      }
    });
  }

  // Pre-reservar buttons: scroll to form and set select value
  document.querySelectorAll('.inst-card__reserva-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var instalacion = btn.getAttribute('data-instalacion');
      var select = document.getElementById('pr-instalacion');
      if (select && instalacion) {
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].value === instalacion) {
            select.selectedIndex = i;
            break;
          }
        }
      }
      var target = document.getElementById('prereserva');
      if (target) {
        target.style.display = '';
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================
// PRE-RESERVA FORM
// ============================================================
function initPreReservaForm() {
  var form = document.getElementById('prereserva-form');
  if (!form) return;

  // Set min date to today
  var fechaInput = document.getElementById('pr-fecha');
  if (fechaInput) {
    var today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
  }

  // Show success message if redirected back after submission
  var section = document.getElementById('prereserva');
  if (window.location.search.indexOf('prereserva=ok') !== -1) {
    if (section) section.style.display = '';
    form.style.display = 'none';
    var success = document.createElement('div');
    success.className = 'prereserva-success is-visible';
    success.innerHTML = '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      + '<h3>Solicitud enviada</h3>'
      + '<p>Tu solicitud de pre-reserva fue recibida correctamente. El equipo del Parque Social la revisará y se comunicará contigo para confirmar la disponibilidad y coordinar el pago.</p>'
      + '<p><strong>Recordá que la reserva no está confirmada hasta recibir la aprobación y realizar el pago.</strong></p>';
    form.parentNode.insertBefore(success, form);
    // Scroll to success message
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Show "Enviando..." on submit
  form.addEventListener('submit', function() {
    var btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Enviando solicitud...';
    btn.disabled = true;
  });
}

// ============================================================
// FACILITY GALLERIES (complejo-deportivo)
// ============================================================
function initFacilityGalleries() {
  var sliders = document.querySelectorAll('[data-facility-gallery]');
  if (!sliders.length) return;

  var ARROW_L = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
  var ARROW_R = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';

  // ── Pixel-based centering helper ──
  // Measures the real DOM to compute exact translateX so slide[idx] is centered
  function centerOffset(container, track, slides, idx) {
    var cW = container.offsetWidth;
    var slide = slides[idx];
    // slide's left edge relative to track start
    var sLeft = slide.offsetLeft;
    var sW = slide.offsetWidth;
    // We want the slide center at the container center
    return (cW / 2) - sLeft - (sW / 2);
  }

  function makeSlider(container, track, slides, opts) {
    var total = slides.length;
    var current = 0;

    function goTo(idx) {
      if (idx < 0) idx = 0;
      if (idx >= total) idx = total - 1;
      current = idx;
      var px = centerOffset(container, track, slides, idx);
      track.style.transform = 'translateX(' + px + 'px)';
      for (var i = 0; i < total; i++) slides[i].classList.toggle('is-active', i === idx);
      if (opts.onSlide) opts.onSlide(idx, total);
    }

    if (opts.prev) opts.prev.addEventListener('click', function(e) { e.stopPropagation(); goTo(current - 1); });
    if (opts.next) opts.next.addEventListener('click', function(e) { e.stopPropagation(); goTo(current + 1); });

    // Swipe
    var swEl = opts.swipeEl || container;
    var tx = 0, ty = 0, tt = 0, dragging = false, locked = false;
    swEl.addEventListener('touchstart', function(e) {
      tx = e.touches[0].clientX; ty = e.touches[0].clientY;
      tt = Date.now(); dragging = true; locked = false;
      track.style.transition = 'none';
    }, { passive: true });
    swEl.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      var dx = Math.abs(e.touches[0].clientX - tx);
      var dy = Math.abs(e.touches[0].clientY - ty);
      // Once we know the direction, lock it
      if (!locked && (dx > 8 || dy > 8)) {
        locked = true;
        if (dy > dx) { dragging = false; return; } // vertical scroll, bail out
      }
      if (!locked) return;
      e.preventDefault(); // block page scroll during horizontal swipe
      var diff = tx - e.touches[0].clientX;
      var base = centerOffset(container, track, slides, current);
      track.style.transform = 'translateX(' + (base - diff) + 'px)';
    }, { passive: false });
    swEl.addEventListener('touchend', function(e) {
      if (!dragging) return;
      dragging = false;
      track.style.transition = '';
      var diff = tx - e.changedTouches[0].clientX;
      var fast = Date.now() - tt < 300;
      if (Math.abs(diff) > 35 || (Math.abs(diff) > 20 && fast)) {
        goTo(diff > 0 ? current + 1 : current - 1);
      } else {
        goTo(current);
      }
    }, { passive: true });

    // Recenter on resize
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() { goTo(current); }, 100);
    });

    // Auto-advance every 5s (loops back to first)
    var autoTimer = null;
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function() {
        goTo(current + 1 >= total ? 0 : current + 1);
      }, 5000);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    // Pause on hover, restart on leave
    var visible = false;
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', function() { if (visible) startAuto(); });

    // Only auto-advance when visible in viewport
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function(entries) {
        visible = entries[0].isIntersecting;
        if (visible) startAuto(); else stopAuto();
      }, { threshold: 0.4 });
      obs.observe(container);
    }

    // Restart after any interaction
    var origGoTo = goTo;
    goTo = function(idx) { origGoTo(idx); if (visible) startAuto(); };

    goTo(0);
    return { goTo: goTo, getCurrent: function() { return current; }, stopAuto: stopAuto, startAuto: startAuto };
  }

  // ── Fullscreen viewer (created once, shared) ──
  var viewer = document.createElement('div');
  viewer.className = 'fviewer';
  viewer.innerHTML =
    '<button class="fviewer__close" aria-label="Cerrar">&times;</button>' +
    '<div class="fviewer__stage">' +
      '<div class="fviewer__track"></div>' +
      '<button class="fviewer__arrow fviewer__arrow--prev" aria-label="Anterior">' + ARROW_L + '</button>' +
      '<button class="fviewer__arrow fviewer__arrow--next" aria-label="Siguiente">' + ARROW_R + '</button>' +
    '</div>' +
    '<div class="fviewer__hud"></div>';
  document.body.appendChild(viewer);

  var vStage = viewer.querySelector('.fviewer__stage');
  var vTrack = viewer.querySelector('.fviewer__track');
  var vHud   = viewer.querySelector('.fviewer__hud');
  var vPrev  = viewer.querySelector('.fviewer__arrow--prev');
  var vNext  = viewer.querySelector('.fviewer__arrow--next');
  var vClose = viewer.querySelector('.fviewer__close');
  var vCtrl  = null;

  function openViewer(images, startIdx) {
    vTrack.innerHTML = '';
    vHud.innerHTML = '';
    images.forEach(function(img) {
      var s = document.createElement('div');
      s.className = 'fviewer__slide';
      s.innerHTML = '<img src="' + img.src + '" alt="' + (img.alt || '') + '">';
      vTrack.appendChild(s);
      var t = document.createElement('img');
      t.className = 'fviewer__thumb';
      t.src = img.src;
      t.alt = img.alt || '';
      vHud.appendChild(t);
    });

    viewer.classList.add('is-active');
    viewer._scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + viewer._scrollY + 'px';
    document.body.style.width = '100%';

    // Wait one frame so DOM is laid out, then init slider
    requestAnimationFrame(function() {
      var vSlides = Array.prototype.slice.call(vTrack.querySelectorAll('.fviewer__slide'));
      var vThumbs = Array.prototype.slice.call(vHud.querySelectorAll('.fviewer__thumb'));

      vCtrl = makeSlider(vStage, vTrack, vSlides, {
        prev: vPrev, next: vNext, swipeEl: vStage,
        onSlide: function(idx, total) {
          for (var i = 0; i < vThumbs.length; i++) vThumbs[i].classList.toggle('is-active', i === idx);
          vPrev.disabled = (idx === 0);
          vNext.disabled = (idx === total - 1);
        }
      });

      vThumbs.forEach(function(t, i) {
        t.addEventListener('click', function() { vCtrl.goTo(i); });
      });

      vCtrl.goTo(startIdx || 0);
      vCtrl.stopAuto(); // no auto-advance in fullscreen
    });
  }

  function closeViewer() {
    viewer.classList.remove('is-active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, viewer._scrollY || 0);
    vCtrl = null;
  }

  vClose.addEventListener('click', closeViewer);
  viewer.addEventListener('click', function(e) {
    if (e.target === viewer || e.target === vStage) closeViewer();
  });
  document.addEventListener('keydown', function(e) {
    if (!viewer.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeViewer();
    if (vCtrl) {
      if (e.key === 'ArrowLeft')  vCtrl.goTo(vCtrl.getCurrent() - 1);
      if (e.key === 'ArrowRight') vCtrl.goTo(vCtrl.getCurrent() + 1);
    }
  });

  // ── Init each in-page slider ──
  sliders.forEach(function(slider) {
    var track   = slider.querySelector('.fslider__track');
    var slides  = Array.prototype.slice.call(slider.querySelectorAll('.fslider__slide'));
    var prevBtn = slider.querySelector('.fslider__arrow--prev');
    var nextBtn = slider.querySelector('.fslider__arrow--next');
    var counter = slider.querySelector('.fslider__counter');
    if (!track || slides.length < 1) return;

    var total = slides.length;
    var images = [];
    slides.forEach(function(s) {
      var img = s.querySelector('img');
      if (img) images.push({ src: img.src, alt: img.alt });
    });

    var ctrl = makeSlider(slider, track, slides, {
      prev: prevBtn, next: nextBtn, swipeEl: slider,
      onSlide: function(idx) {
        if (counter) counter.textContent = (idx + 1) + ' / ' + total;
        if (prevBtn) prevBtn.disabled = (idx === 0);
        if (nextBtn) nextBtn.disabled = (idx === total - 1);
      }
    });

    // Click active slide → open viewer
    slides.forEach(function(slide, i) {
      slide.addEventListener('click', function() {
        if (i !== ctrl.getCurrent()) { ctrl.goTo(i); return; }
        openViewer(images, i);
      });
    });
  });
}

// ============================================================
// CANVAS HEX DIVIDERS
// ============================================================
function initHexDividers() {
  var dividers = document.querySelectorAll('.hex-divider');
  if (!dividers.length) return;

  var SIZE = 52;
  var STROKE = 3;

  function drawHexDivider(canvas, bg, fill, stroke) {
    var parent = canvas.parentElement;
    var W = parent.offsetWidth || 800;
    var H = 160;
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');

    var hexHalfH = (Math.sqrt(3) / 2) * SIZE;
    var fullY = H - hexHalfH;
    var halfY = H;
    var clipY = halfY - hexHalfH;

    function drawHex(cx, cy) {
      ctx.beginPath();
      for (var i = 0; i < 6; i++) {
        var angle = (Math.PI / 180) * (60 * i);
        var x = cx + SIZE * Math.cos(angle);
        var y = cy + SIZE * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = STROKE;
      ctx.stroke();
    }

    var spacingX = SIZE * 1.6;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    var cols = Math.ceil(W / spacingX) + 2;

    for (var i = -1; i < cols; i++) {
      if (i % 2 !== 0) drawHex(i * spacingX, halfY);
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, clipY, W, H - clipY);
    ctx.clip();
    for (var i = -1; i < cols; i++) {
      if (i % 2 === 0) drawHex(i * spacingX, fullY);
    }
    ctx.restore();
  }

  function renderAll() {
    dividers.forEach(function(div) {
      var canvas = div.querySelector('canvas');
      if (!canvas) return;
      drawHexDivider(
        canvas,
        div.dataset.bg || '#ffffff',
        div.dataset.fill || '#1E3A5F',
        div.dataset.stroke || '#ffffff'
      );
    });
  }

  renderAll();
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderAll, 150);
  }, { passive: true });
}

// ============================================================
// HERO SCROLL ANIMATION
// ============================================================
function getHeroLogoMetrics() {
  const style   = getComputedStyle(document.documentElement);
  const start   = parseFloat(style.getPropertyValue('--hero-logo-start')) || 140;
  const end     = parseFloat(style.getPropertyValue('--hero-logo-end'))   || 65;
  const navEl   = document.getElementById('site-nav');
  const navCont = navEl ? navEl.querySelector('.nav__container') : null;
  const navPad  = navCont ? parseFloat(getComputedStyle(navCont).paddingLeft) : 16;
  const navH    = navEl ? navEl.offsetHeight : 80;
  return { start, end, navPad, navH };
}

function initHeroScrollAnimation() {
  const heroEl   = document.querySelector('.hero.is-hero-home');
  const flyLogo  = document.getElementById('hero-logo-fly');
  const nav      = document.getElementById('site-nav');
  if (!heroEl || !flyLogo || !nav) return;

  const brandName  = heroEl.querySelector('.hero__brand-name');
  const brandSub   = heroEl.querySelector('.hero__brand-sub');
  const heroBtn    = heroEl.querySelector('.hero__center-text .btn');
  const eyebrow    = heroEl.querySelector('.hero__center-text .hero__eyebrow');
  const scrollHint = heroEl.querySelector('.hero__scroll-hint');

  let metrics = getHeroLogoMetrics();
  let ticking = false;

  function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function applyLogoPosition(p) {
    const ep = ease(p);
    const { start, end, navPad, navH } = metrics;
    const size = lerp(start, end, ep);

    const startX = (window.innerWidth  - start) / 2;
    const startY = (window.innerHeight * 0.42) - (start / 2);
    const endX   = navPad;
    const endY   = (navH - end) / 2;

    flyLogo.style.left   = lerp(startX, endX, ep) + 'px';
    flyLogo.style.top    = lerp(startY, endY, ep) + 'px';
    flyLogo.style.width  = size + 'px';
    flyLogo.style.height = size + 'px';

    flyLogo.style.boxShadow =
      `0 ${lerp(12, 2, ep).toFixed(1)}px ${lerp(48, 8, ep).toFixed(1)}px rgba(0,0,0,${lerp(0.5, 0.1, ep).toFixed(2)})`;
  }

  function update() {
    const p  = clamp(window.scrollY / (heroEl.offsetHeight * 0.75), 0, 1);
    const ep = ease(p);

    applyLogoPosition(p);

    nav.classList.toggle('is-solid', p >= 0.35);

    if (brandName)  brandName.style.opacity  = Math.max(0, 1 - ep * 1.7).toFixed(3);
    if (brandSub)   brandSub.style.opacity   = Math.max(0, 1 - ep * 2.3).toFixed(3);
    if (heroBtn)    heroBtn.style.opacity    = Math.max(0, 1 - ep * 2.6).toFixed(3);
    if (eyebrow)    eyebrow.style.opacity    = Math.max(0, 1 - ep * 2.0).toFixed(3);
    if (scrollHint) scrollHint.style.opacity = Math.max(0, 1 - ep * 4.0).toFixed(3);

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    metrics = getHeroLogoMetrics();
    document.documentElement.style.setProperty(
      '--hero-logo-half', (metrics.start / 2) + 'px'
    );
    update();
  }, { passive: true });

  document.documentElement.style.setProperty(
    '--hero-logo-half', (metrics.start / 2) + 'px'
  );
  update();
}

// ============================================================
// HERO ENTRANCE ANIMATION
// ============================================================
function initHeroEntrance() {
  const heroEl  = document.querySelector('.hero.is-hero-home');
  const flyLogo = document.getElementById('hero-logo-fly');
  if (!heroEl || !flyLogo) return;

  // Trigger staggered CSS entrance animations
  requestAnimationFrame(() => {
    flyLogo.classList.add('is-animated');
    heroEl.classList.add('is-animated');
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroEntrance();
  initHeroScrollAnimation();
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
  initHexDividers();
  initHorarios();
  initConveniosPage();
  initInstAccordion();
  initPreReservaForm();
  initFacilityGalleries();
});
