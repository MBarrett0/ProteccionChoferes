# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Development Server

```bash
npx serve . -p 3456
```

Open at `http://localhost:3456`. No build step — pure static HTML/CSS/JS.

## Architecture & File Organization

**Static multi-page website** for Centro Protección Choferes de Montevideo (CPCH) — a Uruguayan professional drivers' mutual-aid society founded in 1909. No framework, no bundler, vanilla HTML/CSS/JS.

```
index.html                 # Homepage (hero, services, stats, carousel, parallax, convenios, contact)
horarios.html              # Sports schedule with filter/search, desktop grid, mobile tabbed view
multimedia.html            # Video gallery (12 YouTube embeds)
institucion/               # 4 pages: quienes-somos, historia, autoridades, asociarse
beneficios/                # 9 pages: complejo-deportivo, parque-social, sala-de-aparatos,
                           #   colonia-de-verano, convenios, juridico, secretaria, biblioteca,
                           #   auxilio-mecanico, area-salud
contacto/                  # 3 pages: contacto, informacion, links
eventos/                   # 6 pages: eventos (hub), eventos-cursos, eventos-reconocimientos,
                           #   eventos-elecciones, eventos-fiesta-inau, eventos-100
css/styles.css             # Single stylesheet (~2000 lines)
js/main.js                 # Single JS file (~700 lines)
images/                    # Logo.png + real facility photos (JPG/JFIF)
contenido-sitio-web.md     # Content source extracted from proteccionchoferes.org.uy
```

---

## Design System

### Color Palette

Blue-dominant palette.

| Token | Hex | Role |
|---|---|---|
| `--clr-primary` | `#2563EB` | Vivid blue — nav active state, buttons, links, card borders |
| `--clr-primary-dark` | `#1E3A5F` | Navy blue — stats section bg, hover states, dark sections |
| `--clr-primary-light` | `#B3D4F7` | Pale blue — carousel tags, stat labels, footer column titles |
| `--clr-secondary` | `#3B82F6` | Medium blue — complementary accent |
| `--clr-secondary-dark` | `#0F2847` | Deep navy — footer bottom bar, darkest sections |
| `--clr-teal` | `#38BDF8` | Sky blue — card accent variant |
| `--clr-amber` | `#F2AC2C` | Golden amber — CTA buttons ("Horarios", "Enviar Mensaje"), active timeline markers |
| `--clr-white` | `#ffffff` | Backgrounds |
| `--clr-off-white` | `#f5f7fa` | Subtle background sections |
| `--clr-text` | `#606060` | Default body text |
| `--clr-text-dark` | `#333333` | Headings |
| `--clr-border` | `#E4E4E8` | Table borders, form borders, dividers |

**Always use tokens, never hardcode hex values.**

### Typography

Single font family: **Titillium Web** (Google Fonts — weights 300, 400, 600, 700, 900).

```
--font-main: 'Titillium Web', sans-serif
```

| Element | Size | Weight | Line-height |
|---|---|---|---|
| `h1` | `clamp(1.8rem, 4vw, 3.2rem)` | 800 | 1.2 |
| `h2` | `clamp(1.5rem, 3vw, 2.4rem)` | 700 | — |
| `h3` | `clamp(1.2rem, 2.5vw, 1.6rem)` | 700 | — |
| `h4` | `clamp(1rem, 1.8vw, 1.15rem)` | 700 | — |
| `h5` | `0.95rem` | 700 | — |
| `p` | `clamp(0.95rem, 1.5vw, 1.05rem)` | 400 | 1.7 (body) |

Labels, nav links, and small text use uppercase + `letter-spacing: 0.06–0.18em`.

### Spacing & Layout

| Token / Pattern | Value |
|---|---|
| `--nav-height` | `80px` (70px on ≤1024px) |
| `--container-max` | `1200px` |
| Container padding | `clamp(1rem, 4vw, 3rem)` |
| Section padding (vertical) | `clamp(3rem, 6vw, 5rem)` |
| Card grid gap | `1.25rem – 1.5rem` |
| Stats grid gap | `2rem` (1.5rem on tablet) |
| Form field gap | `0.75rem` |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `4px` | Buttons, form inputs |
| `--radius-md` | `8px` | Cards, dropdowns, timeline |
| `--radius-lg` | `16px` | Carousel images, large panels |

### Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.08)` | Subtle hover, cards at rest |
| `--shadow-md` | `0 8px 32px rgba(0,0,0,0.14)` | Cards, dropdowns |
| `--shadow-lg` | `0 20px 60px rgba(0,0,0,0.20)` | Hero, parallax |

### Transitions

| Token | Value | Use |
|---|---|---|
| `--tr-fast` | `0.2s ease` | Color changes, small interactions |
| `--tr-base` | `0.35s ease` | Dropdowns, nav state, menus |
| `--tr-slow` | `0.65s ease` | Image zoom on hover |

### Gradient Patterns

- **Hero overlay**: `linear-gradient(160deg, rgba(30,58,95,0.85), rgba(15,40,71,0.78))`
- **Parallax overlay**: `linear-gradient(135deg, rgba(30,58,95,0.85), rgba(15,40,71,0.78))`
- **Page hero**: Same navy-to-deep-navy gradient with bg image at 15% opacity
- **Timeline line**: `linear-gradient(to bottom, --clr-primary, --clr-primary-dark)`
- **Marquee fade mask**: `linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)`

---

## CSS Architecture

`css/styles.css` is structured in this order:

1. **Design tokens** (`:root` CSS variables) — colors, fonts, spacing, radii, shadows, transitions
2. **Global reset & typography** — box-sizing, font import, heading scale with `clamp()`
3. **Utility classes** — `.container`, `.section`, `.text-center`, `.section-title`, `.section-subtitle`, `.section-header`, `.table-wrap`, `.layout-two-col`
4. **Navigation** — `.site-nav`, `.nav__menu`, `.nav__item`, `.nav__link`, `.nav__dropdown`, `.nav__hamburger`, `.nav__mobile`, `.nav__cta`
5. **Homepage sections** in page order: hero → tagline → services grid → torn dividers → stats → carousel → parallax → convenios marquee → contact form
6. **Footer** — `.footer__top`, `.footer__grid`, `.footer__col`, `.footer__socials`, `.footer__bottom`
7. **Scroll animations** — `.reveal`, `.reveal--left`, `.reveal--right`, `.reveal--scale`, `.reveal-group`
8. **Scroll-to-top** — `.scroll-top`
9. **Inner page components** — `.page-hero`, `.breadcrumb`, `.page-content`, `.info-cards`, `.info-list`, `.content-list`, `.data-table`, `.person-cards`, `.timeline`, `.decalogo`, `.video-grid`, `.eventos-grid`, `.links-grid`, `.horarios-*`
10. **Responsive breakpoints** — 1200px → 1024px → 768px → 480px → 375px

### Naming Convention

BEM throughout: `.block__element--modifier`. State classes use `.is-` prefix:
- `.is-solid` — nav scrolled past threshold
- `.is-open` — mobile menu visible
- `.is-active` — timeline item expanded, carousel dot selected
- `.is-visible` — scroll-reveal triggered
- `.is-hidden` — element hidden

---

## Component Reference

### Navigation (`.site-nav`)

Fixed position, white background, 80px height. On scroll > 40px, gains `.is-solid` class → blue background (`--clr-primary`), white text, shadow, logo shrinks (104px → 65px).

**Desktop menu structure:**
- Home → `/`
- Institución → `/institucion/quienes-somos.html` (dropdown: Quiénes Somos, Historia, Autoridades, Asociarse)
- Complejo Deportivo → `/beneficios/complejo-deportivo.html`
- Parque Social → `/beneficios/parque-social.html`
- Beneficios (dropdown: Jurídico, Convenios, Secretaría, Biblioteca)
- CTA button (`.nav__cta`): "Horarios" → `/horarios.html` (amber background)

**Mobile menu** (`#nav-mobile`): Fullscreen dark overlay (rgba(0,0,0,0.93)). Z-index layering: nav=1000, overlay=1001, hamburger-when-open=1002. Accordion submenus use `max-height`+`opacity` CSS transition with close-then-open sequencing (350ms delay).

**Active link**: Add `class="active"` to the relevant `.nav__link` on inner pages.

### Page Hero (`.page-hero`)

Blue gradient banner with background image overlay at 15% opacity. Contains:
- `.breadcrumb` — `Home / Section / Current Page` with `<a>` links and `<span>` separators
- `<h1>` page title

### Service Cards (`.services__grid`)

Homepage 6-column grid with 3-top / 2-bottom asymmetric layout:
- Cards 1–3: columns 1/3, 3/5, 5/7
- Cards 4–5: columns 2/4, 4/6 (centered below)

Each `.service-card`: image (200px, object-fit cover, zoom 1.05 on hover), body with 3px top border (blue/sky-blue variants), title, description, link.

### Info Cards (`.info-cards`)

Auto-fit grid `minmax(240px, 1fr)`. White background, 4px top border (color variants: `--primary`, `--teal`, `--amber`, `--secondary`), padding 1.5rem, shadow-sm, hover translateY(-4px). Use `--2x2` modifier for forced 2-column.

**When NOT to use cards** — prefer these for simple data:
- `.info-list` (`<dl>`) — key/value pairs (addresses, phone numbers)
- `.content-list` (`<ul>`) — named items with short descriptions
- Plain `<p>` — prose that needs no visual separation

### Data Table (`.data-table`)

Full-width table, primary blue header row (white text, uppercase 0.8rem), alternating hover, border-bottom separators. Wrap in `.table-wrap` for mobile horizontal scroll.

### Person Cards (`.person-cards`)

Auto-fit grid for leadership/authority photos. Photo (aspect-ratio 3/4), name, role. Hover: translateY(-3px).

### Timeline (`.timeline`)

Interactive expandable timeline on `historia.html`. Vertical line (gradient), numbered markers (42px circles), clickable headers. Only one item open at a time. Active marker changes to amber. Content expands via `max-height: 0→600px` + `opacity: 0→1`.

### Carousel (`.carousel`)

```html
<div class="carousel" id="installations-carousel">
  <div class="carousel__viewport">
    <div class="carousel__track" id="carousel-track">…slides…</div>
  </div>
  <button class="carousel__btn carousel__btn--prev" id="carousel-prev">←</button>
  <button class="carousel__btn carousel__btn--next" id="carousel-next">→</button>
</div>
```

Slides use grid (1.2fr 1fr) with image + text content. Dot navigation below. Auto-advances every 5s, pauses on hover. Touch swipe support (50px threshold). Arrows positioned outside viewport (left: -3.5rem / right: -3.5rem), hidden on ≤1024px.

### Stats Section (`.stats-section`)

Dark navy (`--clr-primary-dark`) background, 4-column grid. Each `.stat-item`: icon (48px), animated number (`[data-count]`), label. Numbers animate over 2s with easeOut curve using `es-UY` locale formatting. Use `data-suffix="+"` for suffix.

### Torn Dividers

Hexagonal honeycomb-mask SVG pattern between sections (not clip-path polygons). Height 120px, `mask-image` with repeating hex pattern (150px repeat).

Variants:
- `.torn-divider--white-to-green` — white → primary-dark (60% split) [class name kept for compatibility]
- `.torn-divider--green-to-white` — primary-dark → white (40% split) [class name kept for compatibility]
- `.torn-divider--white-to-dark` — white → primary-dark (sharp)
- `.torn-divider--dark-to-white` — primary-dark → off-white
- `.torn-divider--white-to-secondary-dark` — off-white → secondary-dark

### Convenios Marquee

Auto-scrolling horizontal logo strip (48s linear infinite animation). Fade mask gradient on edges. Pauses on hover. Falls back to `overflow-x: auto` when `prefers-reduced-motion` is active.

### Contact Form

`.contact-form` with `.form-row` (2-column grid). Fields: name, email, subject, textarea. On dark backgrounds: inputs use rgba white backgrounds. On inner pages (`.inner-form`): white background, dark text, `--clr-border` borders. Submit shows "Enviando..." → "Mensaje enviado" feedback (no real backend).

### Buttons

| Class | Style |
|---|---|
| `.btn` | Base: inline-flex, padding 0.75rem 1.8rem, uppercase, hover translateY(-2px) |
| `.btn--primary` | Blue bg → dark blue hover |
| `.btn--amber` | Amber bg → #d99c1e hover |
| `.btn--secondary` | Steel blue bg |
| `.btn--outline` | Transparent + 2px white border |
| `.btn--outline-white` | Hero variant (rgba white border) |
| `.btn--full` | width: 100% |

### Scroll Animations

Add `.reveal` to any element for fade-in on scroll (IntersectionObserver at 12% threshold, -40px root margin).

| Class | Animation |
|---|---|
| `.reveal` | Fade up (translateY 30px → 0) |
| `.reveal--left` | Slide from left (translateX -40px → 0) |
| `.reveal--right` | Slide from right (translateX 40px → 0) |
| `.reveal--scale` | Scale up (0.93 → 1) |
| `.reveal-group > *` | Auto-staggered delays (0s, 0.12s, 0.24s…) |

Duration: 0.7s ease. Elements unobserve after animating (one-shot).

### Scroll-to-Top (`.scroll-top`)

Fixed button, bottom-right, 44px circle, primary blue. Appears when scrollY > 400px. Smooth scrolls to top.

---

## Page Template

Every inner page (non-homepage):

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- meta charset, viewport, title, meta description -->
  <!-- Open Graph: og:title, og:description, og:image, og:url, og:type, og:locale="es_UY" -->
  <!-- Twitter card tags -->
  <!-- Canonical URL -->
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css"> <!-- or ../css/styles.css for subdirectories -->
</head>
<body>
  <nav class="site-nav">…</nav>          <!-- identical across all pages -->
  <section class="page-hero">
    <nav class="breadcrumb">…</nav>
    <h1>Page Title</h1>
  </section>
  <main class="page-content">
    <div class="container">
      <!-- page-specific content -->
    </div>
  </main>
  <footer class="footer">…</footer>      <!-- identical across all pages -->
  <button class="scroll-top" id="scroll-top">↑</button>
  <script src="/js/main.js"></script>     <!-- or ../js/main.js for subdirectories -->
</body>
</html>
```

### Footer Structure

4-column grid (1.5fr 1fr 1fr 1.4fr):
1. Logo + description + social icons (Instagram, Facebook, TikTok)
2. Navigation links
3. About/info links
4. Contact info

Bottom bar (`.footer__bottom`): copyright + credits on `--clr-secondary-dark` background.

---

## JS Modules (`js/main.js`)

All functions initialize in `DOMContentLoaded`. Each is guarded — only runs if its target elements exist on the page.

| Function | Purpose | Key Config |
|---|---|---|
| `initStickyNav()` | `.is-solid` class on nav when scrolled | threshold: 40px |
| `initMobileMenu()` | Hamburger toggle + accordion submenus | ANIM_MS: 350ms, close-then-open |
| `initScrollReveal()` | IntersectionObserver → `.is-visible` | threshold: 0.12, rootMargin: '0px 0px -40px 0px' |
| `initCounters()` | Animate `[data-count]` numbers | duration: 2000ms, easeOut, locale: 'es-UY' |
| `initInstallationsCarousel()` | translateX carousel with dots/arrows/swipe | auto: 5000ms, swipe: 50px threshold |
| `initContactForm()` | Submit feedback simulation | delay: 1200ms + 3000ms total |
| `initSmoothScroll()` | Anchor links with nav offset | 16px extra padding |
| `initScrollTop()` | Show/hide scroll-to-top button | threshold: 400px |
| `initTimeline()` | Expandable timeline items | mutual-exclusive, first item open |
| `initConveniosMarquee()` | Auto-scrolling logo strip | respects `prefers-reduced-motion` |
| `initHorarios()` | Schedule filter, grid, mobile tabs | localStorage key: 'cpch-horarios-filter' |

### Data Attributes

| Attribute | Use |
|---|---|
| `data-count="123"` | Target value for counter animation |
| `data-suffix="+"` | Text appended after counter number |
| `data-prefix="$"` | Text prepended before counter number |
| `data-toggle="elementId"` | Mobile menu submenu toggle target |
| `data-activity="slug"` | Horarios filter activity identifier |
| `data-day="0-4"` | Horarios day index (Mon=0, Fri=4) |
| `data-cat="category"` | Horarios category (piscina, gimnasio, infantil, cancha) |

---

## Responsive Breakpoints

| Breakpoint | Key Changes |
|---|---|
| **≤1200px** | Footer grid → 3 columns (first child full-width) |
| **≤1024px** | Nav switches to hamburger menu, `--nav-height: 70px`, service grid → 2 columns, carousel stacks (arrows hidden), stats → 2×2, layout-two-col stacks |
| **≤768px** | Hero → 60vh min 380px, hero buttons stack vertically, form rows stack, parallax loses fixed attachment, convenios → 2 columns |
| **≤480px** | Stats numbers shrink, info-cards/video-grid/eventos-grid → 1 column, person-cards → 2 columns, scroll-top moves to bottom 1rem right 1rem |
| **≤375px** | Hero title → 1.5rem, person-cards → 1 column, carousel padding minimal |

---

## Accessibility & SEO

### Accessibility
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- ARIA: `role="menubar"`, `aria-label`, `aria-expanded`, `aria-hidden`
- Keyboard: Escape closes mobile menu
- Touch targets: 44px minimum
- Respects `prefers-reduced-motion`
- Focus states on form inputs (primary border color)
- Alt text on all images

### SEO
- Unique `<title>` and `<meta name="description">` per page
- Open Graph + Twitter Card meta tags on every page
- `og:locale="es_UY"`
- Schema.org JSON-LD `Organization` on homepage
- `sitemap.xml` and `robots.txt` present
- Canonical `<link rel="canonical">` URLs

---

## Conventions

- **Language**: All content in Spanish (`lang="es"`), locale `es_UY`
- **BEM naming**: `.block__element--modifier` throughout
- **State classes**: `.is-*` prefix (`.is-solid`, `.is-open`, `.is-active`, `.is-visible`, `.is-hidden`)
- **CSS variables only**: Never hardcode color/spacing values — always use tokens
- **Clamp for fluid sizing**: All font sizes and spacing use `clamp(min, preferred, max)`
- **Lazy loading**: All images use `loading="lazy"`
- **Passive listeners**: Scroll events are passive for performance
- **One-shot animations**: Scroll reveal unobserves after firing
- **No external dependencies**: Zero npm packages, zero CDN JS libraries
- **Image fallback**: Logo uses `onerror="this.style.display='none'"` when missing

---

## Known Gaps

- `images/Logo.png` exists but was previously missing — verify it displays correctly
- Some images are still Unsplash placeholders — replace with real CPCH photos as available
- Contact form and asociarse form have no backend (JS-only feedback simulation)
- No service worker or offline support
- Images are unoptimized (some 2–4MB JPEGs — should be compressed for production)
