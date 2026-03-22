# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

```bash
npx serve . -p 3456
```

Open at `http://localhost:3456`. No build step — pure static HTML/CSS/JS.

## Architecture

This is a **static multi-page website** (41 HTML pages, no framework, no bundler).

```
index.html              # Homepage
[page-name].html        # Each page is a standalone HTML file
css/styles.css          # Single stylesheet for the entire site (~1600 lines)
js/main.js              # Single JS file for all interactivity
images/                 # logo.png (missing — client must supply), placeholder photos from Unsplash
docs/                   # Screenshots used in README.md
contenido-sitio-web.md  # Content source extracted from the live proteccionchoferes.org.uy site
```

## CSS Architecture

`css/styles.css` is structured in order:
1. **Design tokens** (`:root` CSS variables) — always use these, never hardcode colors
2. **Global reset & typography**
3. **Navigation** (`.site-nav`, `.nav__*`, `.nav__mobile-*`)
4. **Homepage sections** in page order: hero → tagline → services → torn dividers → stats → carousel → parallax → convenios → contact
5. **Footer** (`.footer__*`)
6. **Scroll animations** (`.reveal`, `.reveal--left`, `.reveal--right`, `.reveal--scale`)
7. **Inner page components** (`.page-hero`, `.page-content`, `.info-cards`, `.data-table`, `.person-cards`, `.decalogo`, `.video-grid`, `.transito-grid`, `.eventos-grid`, `.links-grid`)
8. **Responsive breakpoints**: 1200px → 1024px (hamburger) → 768px → 480px → 375px

## Color Palette (from proteccionchoferes.org.uy — do NOT use navy/gold)

| Token | Hex | Use |
|---|---|---|
| `--clr-primary` | `#62AA23` | Main brand green, nav active, buttons |
| `--clr-primary-dark` | `#3F7652` | Dark sections, stats bg, hover |
| `--clr-secondary-dark` | `#065C81` | Footer bottom, darkest sections |
| `--clr-amber` | `#F2AC2C` | CTA buttons (e.g. "Enviar Mensaje") |
| `--clr-teal` | `#33A1A3` | Card accents |

## Page Template

Every inner page (non-homepage) shares this structure:
1. Same `<nav>` block (copy from any existing inner page — all identical)
2. `<section class="page-hero">` — green gradient banner with `.breadcrumb` + `<h1>`
3. `<main class="page-content"><div class="container">` — content area
4. Same `<footer>` block (copy from any existing inner page — all identical)
5. Same `<script src="js/main.js">` at the end

To mark a nav link as active on an inner page, add `class="active"` to the relevant `.nav__link`.

## Mobile Menu

The mobile menu (`#nav-mobile`) is a **fullscreen dark overlay** (`rgba(0,0,0,0.93)`), not a slide-in panel. It fades in via `opacity`/`visibility` transition. Z-index layering: nav bar = 1000, overlay = 1001, hamburger-when-open = 1002 (so the X stays clickable above the overlay).

Accordion submenus use `max-height` + `opacity` CSS transition (not `display:none/block`) so they animate smoothly. The JS (`initMobileMenu`) tracks the currently open submenu and does **close-then-open** sequencing: when a new section is tapped while another is open, the open one closes first (350ms), then the new one opens.

## Text Layout Utilities (alternatives to cards)

Prefer these over `.info-cards` for simple data:

- `.info-list` (`<dl>`) — key/value pairs: addresses, phone numbers, contact details
- `.content-list` (`<ul>`) — named items with short descriptions (services, features)
- Plain `<p>` — prose that needs no visual separation

Reserve `.info-cards` only for items rich enough to justify a card (image + title + multi-line description).

## Carousel Structure

The carousel requires a `.carousel__viewport` wrapper inside `.carousel` to handle `overflow: hidden`. The `<button>` arrows sit directly inside `.carousel` (outside `.carousel__viewport`) so they're not clipped:

```html
<div class="carousel" id="installations-carousel">
  <div class="carousel__viewport">
    <div class="carousel__track" id="carousel-track">…slides…</div>
  </div>
  <button class="carousel__btn carousel__btn--prev" id="carousel-prev">←</button>
  <button class="carousel__btn carousel__btn--next" id="carousel-next">→</button>
</div>
```

## JS Modules (`js/main.js`)

All functions are initialized in `DOMContentLoaded`:

- `initStickyNav()` — adds shadow to nav on scroll > 40px
- `initMobileMenu()` — hamburger toggle + accordion submenus via `data-toggle` attributes; close-then-open sequencing (350ms)
- `initScrollReveal()` — IntersectionObserver at 12% threshold adds `.is-visible` to `.reveal` elements
- `initCounters()` — animates `[data-count]` elements when scrolled into view; use `data-suffix` for "+" etc.
- `initInstallationsCarousel()` — translateX-based carousel with dot nav, auto-advance 5s, touch swipe
- `initContactForm()` — basic submit feedback (no real backend)
- `initSmoothScroll()`, `initScrollTop()`
- `initTimeline()` — clickable timeline items on `historia.html`
- `initConveniosMarquee()` — auto-scrolling logo strip; respects `prefers-reduced-motion`

## Scroll Animations

Add `.reveal` to any element to fade-in on scroll. Variants:
- `.reveal--left` / `.reveal--right` — slide from side
- `.reveal--scale` — scale up
- Stagger card groups with inline `style="transition-delay: 0.15s"` etc.

## Torn Paper Dividers

CSS `clip-path` polygons between sections. Classes: `.torn-divider--white-to-green`, `.torn-divider--green-to-white`, `.torn-divider--white-to-green-dark`, `.torn-divider--green-dark-to-white`.

## Known Gaps (client must supply)

- `images/logo.png` — missing; nav logo hidden via `onerror="this.style.display='none'"`
- All images are Unsplash placeholders — replace with real CPCH photos
- Contact form and asociarse form have no backend (JS-only feedback simulation)
