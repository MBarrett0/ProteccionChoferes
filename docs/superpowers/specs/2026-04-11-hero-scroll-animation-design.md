# Hero Scroll Animation — Design Spec

**Date:** 2026-04-11  
**Branch:** caddy  
**Status:** Approved

---

## Overview

Replace the current text-based hero (title "117 años trabajando para su tranquilidad") with a logo-centric hero. The CPCH shield logo appears large and centered on page load, with an animated entrance sequence. As the user scrolls, the logo travels diagonally to its position in the navbar while the surrounding text fades out.

---

## Entrance Animation (on page load)

Sequence triggered once on `DOMContentLoaded`, skipped if `prefers-reduced-motion`:

| Element | Animation | Delay |
|---|---|---|
| Logo (shield) | `scale(0.6) + opacity 0` → `scale(1) + opacity 1` | 0ms |
| "Centro Protección Choferes" | `opacity 0 + translateY(10px)` → normal | 280ms |
| "de Montevideo" | `opacity 0 + translateY(8px)` → normal | 450ms |
| Pre-asociate button | `opacity 0 + translateY(8px)` → normal | 580ms |
| "1909 – 2026" eyebrow | `opacity 0` → normal | 680ms |
| Scroll chevron | `opacity 0` → normal (then loops bounce) | 900ms |

All entrance transitions: `0.55s ease-out`.

---

## Hero Structure (new)

```html
<section class="hero is-hero-home" aria-label="Portada">
  <img class="hero__bg" src="./images/hero-bus.jpg" ...>
  <div class="hero__overlay"></div>

  <!-- Flying logo — positioned absolute, moved by JS -->
  <div class="hero__logo-fly" id="hero-logo-fly">
    <img src="./images/logo.png" alt="CPCH">
  </div>

  <!-- Centered text — stays in place, fades on scroll -->
  <div class="hero__center-text" id="hero-center-text">
    <p class="hero__eyebrow">1909 – 2026</p>
    <h1 class="hero__brand-name">Centro Protección Choferes</h1>
    <p class="hero__brand-sub">de Montevideo</p>
    <div class="hero__actions">
      <a href="./institucion/asociarse.html" class="btn btn--amber">Pre-asociate</a>
    </div>
    <div class="hero__scroll-hint" aria-hidden="true">
      <span class="hero__chevron"></span>
      <span class="hero__chevron"></span>
    </div>
  </div>
</section>
```

**Removed from hero:** old `hero__title` ("117 años..."), `hero__subtitle`, "Nuestros Beneficios" button.

**"117 años trabajando para su tranquilidad"** moves to the existing `.tagline-bar` section immediately below the hero.

---

## Scroll-Driven Animation

Driven by a `scroll` event listener in `js/main.js` using `requestAnimationFrame`. A single CSS custom property `--hero-p` (clamped 0–1) controls all transforms.

**Progress calculation:**
```js
const progress = clamp(window.scrollY / (heroEl.offsetHeight * 0.75), 0, 1);
```
Animation completes at 75% of hero height scrolled — logo reaches navbar before the hero is fully out of view.

**What animates:**

| Element | At p=0 | At p=1 | Easing |
|---|---|---|---|
| `.hero__logo-fly` position | Center of hero | Nav logo slot (top-left) | ease-in-out |
| `.hero__logo-fly` size | 140px (desktop) / 96px (mobile) | 65px (desktop) / 40px (mobile) | ease-in-out |
| `.hero__brand-name` opacity | 1 | 0 | linear, completes at p=0.7 |
| `.hero__brand-sub` opacity | 1 | 0 | linear, completes at p=0.55 |
| `.btn--amber` (hero) opacity | 1 | 0 | linear, completes at p=0.4 |
| `.hero__eyebrow` opacity | 1 | 0 | linear, completes at p=0.45 |
| `.hero__scroll-hint` opacity | 1 | 0 | linear, completes at p=0.25 |
| `.site-nav` solid state | transparent | `.is-solid` (blue) | triggered at p=0.35 |
| Nav brand text (`.nav__logo-text`) | opacity 0 | opacity 1 | triggered at p=0.35 |

**Logo position interpolation:**
```js
// Start: horizontally centered, vertically at 42% of hero height
const startX = heroW / 2;
const startY = heroH * 0.42;
// End: left padding (clamp(1rem,4vw,3rem)) + half logo size, vertically at nav center (40px)
const endX = navLeftPad + endLogoSize / 2;
const endY = navHeight / 2;
```

The flying logo element is `position: absolute` inside the hero, `z-index: 20`, and uses `left`/`top` directly (no transform for position, to avoid stacking context issues). Size is set via `width`/`height`.

---

## Responsive Sizes

| Breakpoint | Start size | End size (nav) |
|---|---|---|
| Desktop (>1024px) | 140px | 65px |
| Tablet (768–1024px) | 110px | 55px |
| Mobile (<768px) | 96px | 40px |

On mobile, the nav brand text (`.nav__logo-text`) remains hidden even when scrolled — the nav is too narrow. Only the logo image appears in the mobile navbar.

---

## Chevron Scroll Indicator

Two staggered chevron elements below the Pre-asociate button:

```css
.hero__scroll-hint {
  display: flex; flex-direction: column; align-items: center;
  gap: 2px; margin-top: 1.25rem;
}
.hero__chevron {
  width: 14px; height: 14px;
  border-right: 2px solid rgba(255,255,255,0.5);
  border-bottom: 2px solid rgba(255,255,255,0.5);
  transform: rotate(45deg);
  animation: chevronBounce 1.4s ease-in-out infinite;
}
.hero__chevron:nth-child(2) { animation-delay: 0.2s; opacity: 0.6; }

@keyframes chevronBounce {
  0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.7; }
  50%       { transform: rotate(45deg) translateY(5px); opacity: 1; }
}
```

Fades out at p=0.25 of scroll progress.

---

## JS Changes (`js/main.js`)

- **New function:** `initHeroScrollAnimation()` — handles the scroll-driven logo movement and text fade. Guards: only runs on pages with `.is-hero-home`.
- **New function:** `initHeroEntrance()` — adds `.is-entered` class to hero elements with staggered delays on `DOMContentLoaded`. Skipped if `prefers-reduced-motion: reduce`.
- **Modified:** `initStickyNav()` — on homepage, defer `.is-solid` class to `initHeroScrollAnimation` (avoid double-triggering at the 40px threshold).
- **`body.is-home`** class already present — used to keep nav transparent.

---

## CSS Changes (`css/styles.css`)

- Remove: `.hero__title`, `.hero__subtitle` styles (keep selectors as stubs to avoid breaking other pages).
- Add: `.hero__logo-fly`, `.hero__center-text`, `.hero__brand-name`, `.hero__brand-sub`, `.hero__scroll-hint`, `.hero__chevron`, `@keyframes chevronBounce`, `.hero__logo-fly.is-entering` entrance keyframe.
- Modify: `.hero__eyebrow` — reused as "1909–2026" below the button.
- Modify: `.hero__actions` — centered, single button.

---

## "117 años" Text Placement

The existing `.tagline-bar` section (currently just "De todos y para todos") is updated to:

```html
<div class="tagline-bar">
  <p>117 años trabajando para su tranquilidad</p>
  <p class="tagline-bar__sub">De todos y para todos</p>
</div>
```

---

## What Does NOT Change

- Background image (`hero-bus.jpg`) — kept, gives transportation context.
- Hero overlay gradient — kept.
- All other pages — unaffected (`.hero__logo-fly` only exists on homepage).
- Nav HTML structure — no changes, the existing `.nav__logo img` and `.nav__logo-text` elements are the animation targets.
