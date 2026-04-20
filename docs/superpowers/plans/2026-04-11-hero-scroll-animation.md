# Hero Scroll Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the text-based hero with a logo-centric hero where the shield logo appears large and centered on load, then travels diagonally to the navbar as the user scrolls.

**Architecture:** A `position: fixed` `#hero-logo-fly` div lives as a direct child of `<body>`, above all other elements, giving it viewport-relative positioning free of any `overflow: hidden` clip. Two JS functions drive it: `initHeroEntrance()` triggers a staggered CSS-class-based entrance animation on load, and `initHeroScrollAnimation()` updates `left`/`top`/`width`/`height` inline on every scroll frame via `requestAnimationFrame`. The hero text (brand name, sub, button) stays centered and fades on scroll. `initStickyNav()` is disabled on homepage so the scroll animation owns `.is-solid`.

**Tech Stack:** Vanilla HTML/CSS/JS. No libraries. CSS `@keyframes` for entrance, rAF scroll loop for scroll-driven animation.

---

### Task 1: Add `#hero-logo-fly` to `<body>` and restructure hero HTML

**Files:**
- Modify: `index.html:143-161` (hero section)
- Modify: `index.html:61` (body open tag area — add flying logo after `<body>`)

- [ ] **Step 1: Add the flying logo element as first child of `<body>` (before the nav)**

In `index.html`, find the line:
```html
<body class="is-home">
```
Add the flying logo div immediately after it (before the nav comment):
```html
<body class="is-home">

  <!-- Flying logo — position:fixed, controlled by initHeroScrollAnimation -->
  <div id="hero-logo-fly" aria-hidden="true">
    <img src="./images/logo.png" alt="">
  </div>
```

- [ ] **Step 2: Replace the hero content block**

Find and replace the entire `.hero__content` div (lines 152–161):
```html
    <div class="hero__content">
      <p class="hero__eyebrow">1909 &ndash; 2026</p>
      <h1 class="hero__title">117 años trabajando<br>para su tranquilidad</h1>
      <p class="hero__subtitle">De todos y para todos</p>
      <div class="hero__actions">
        <a href="/institucion/asociarse/" class="btn btn--amber">Pre Asociarse</a>
        <a href="#beneficios" class="btn btn--outline-white">Nuestros Beneficios</a>
      </div>
    </div>
```
Replace with:
```html
    <div class="hero__center-text">
      <h1 class="hero__brand-name">Centro Protección Choferes</h1>
      <p class="hero__brand-sub">de Montevideo</p>
      <div class="hero__actions">
        <a href="/institucion/asociarse/" class="btn btn--amber">Pre Asociarse</a>
      </div>
      <p class="hero__eyebrow">1909 &ndash; 2026</p>
      <div class="hero__scroll-hint" aria-hidden="true">
        <span class="hero__chevron"></span>
        <span class="hero__chevron"></span>
      </div>
    </div>
```

Also add class `is-hero-home` to the `<section>`:
```html
  <section class="hero is-hero-home" aria-label="Portada">
```

- [ ] **Step 3: Add tagline bar between hero and services sections**

After the closing `</section>` of the hero and before the services comment, insert:
```html
  <!-- ======================== TAGLINE ======================== -->
  <div class="tagline-bar">
    <p>117 años trabajando para su tranquilidad</p>
    <p class="tagline-bar__sub">De todos y para todos</p>
  </div>
```

- [ ] **Step 4: Verify HTML structure visually**

Open `http://localhost:3456` (dev server: `npx serve . -p 3456`).  
Expected: page renders with no visible logo in hero (it's hidden until JS runs), existing nav visible, tagline bar shows two lines of text below hero.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: restructure hero HTML for logo-fly animation"
```

---

### Task 2: CSS — flying logo, hero center text, entrance animations, chevron, tagline bar

**Files:**
- Modify: `css/styles.css` — after the existing `@keyframes heroZoom` block (~line 591) add new rules

- [ ] **Step 1: Add CSS for `#hero-logo-fly` (fixed, JS-controlled)**

After the `@keyframes heroZoom` block (around line 594), insert:
```css
/* === HERO LOGO FLY (fixed, position driven by JS) === */
#hero-logo-fly {
  position: fixed;
  z-index: 1001;          /* above nav (1000) */
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  opacity: 0;             /* JS/entrance animation reveals it */
  will-change: top, left, width, height;
  box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3);
  background: #ffffff;
  transition: box-shadow var(--tr-base);
}
#hero-logo-fly img {
  width: 84%;
  height: 84%;
  object-fit: contain;
  display: block;
}

/* On homepage, hide the nav's own logo img — flying logo takes its place */
.is-home .nav__logo img {
  visibility: hidden;
}
```

- [ ] **Step 2: Add CSS for `.hero__center-text` and its children**

```css
/* === HERO CENTER TEXT === */
.hero__center-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(42% + var(--hero-logo-half, 70px) + 1.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  text-align: center;
  z-index: 5;
  width: min(85%, 600px);
  opacity: 0;             /* JS/entrance reveals children individually */
}

.hero__brand-name {
  font-size: clamp(1.4rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: var(--clr-white);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 16px rgba(0,0,0,0.5);
  margin: 0;
  opacity: 0;
}

.hero__brand-sub {
  font-size: clamp(0.8rem, 1.8vw, 1.1rem);
  font-weight: 600;
  color: rgba(255,255,255,0.65);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  text-shadow: 0 1px 8px rgba(0,0,0,0.4);
  opacity: 0;
}

/* Re-style eyebrow for its new position (below button) */
.hero__center-text .hero__eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  text-shadow: none;
  margin-top: 0.1rem;
  opacity: 0;
}

/* hero actions: single centered button */
.hero__center-text .hero__actions {
  margin-top: 0.25rem;
  opacity: 0;
}
```

- [ ] **Step 3: Add chevron scroll hint CSS**

```css
/* === SCROLL HINT CHEVRON === */
.hero__scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  margin-top: 1rem;
  opacity: 0;
}

.hero__chevron {
  display: block;
  width: 12px;
  height: 12px;
  border-right: 2px solid rgba(255,255,255,0.45);
  border-bottom: 2px solid rgba(255,255,255,0.45);
  transform: rotate(45deg);
  animation: chevronBounce 1.5s ease-in-out infinite;
}
.hero__chevron:nth-child(2) {
  animation-delay: 0.22s;
  opacity: 0.55;
}

@keyframes chevronBounce {
  0%, 100% { transform: rotate(45deg) translate(0, 0);   opacity: 0.7; }
  50%       { transform: rotate(45deg) translate(3px, 3px); opacity: 1;   }
}
```

- [ ] **Step 4: Add entrance `@keyframes` and triggered classes**

```css
/* === HERO ENTRANCE ANIMATIONS === */
@keyframes heroLogoIn {
  from { opacity: 0; transform: scale(0.72); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* JS adds .is-animated to hero section and #hero-logo-fly to trigger entrance */
#hero-logo-fly.is-animated {
  animation: heroLogoIn 0.6s ease-out 0ms both;
}
.is-hero-home.is-animated .hero__center-text {
  opacity: 1; /* reveal the wrapper */
}
.is-hero-home.is-animated .hero__brand-name {
  animation: heroFadeUp 0.55s ease-out 280ms both;
}
.is-hero-home.is-animated .hero__brand-sub {
  animation: heroFadeUp 0.55s ease-out 450ms both;
}
.is-hero-home.is-animated .hero__center-text .hero__actions {
  animation: heroFadeUp 0.55s ease-out 580ms both;
}
.is-hero-home.is-animated .hero__center-text .hero__eyebrow {
  animation: heroFadeUp 0.55s ease-out 680ms both;
}
.is-hero-home.is-animated .hero__scroll-hint {
  animation: heroFadeUp 0.55s ease-out 900ms both;
}

/* prefers-reduced-motion: skip entrance, show everything immediately */
@media (prefers-reduced-motion: reduce) {
  #hero-logo-fly.is-animated,
  .is-hero-home.is-animated .hero__brand-name,
  .is-hero-home.is-animated .hero__brand-sub,
  .is-hero-home.is-animated .hero__center-text .hero__actions,
  .is-hero-home.is-animated .hero__center-text .hero__eyebrow,
  .is-hero-home.is-animated .hero__scroll-hint {
    animation: none;
    opacity: 1;
  }
  .hero__chevron { animation: none; }
}
```

- [ ] **Step 5: Add tagline bar sub-text style**

Find `.tagline-bar p` rule (around line 603) and add after it:
```css
.tagline-bar__sub {
  font-size: clamp(0.75rem, 1.3vw, 0.9rem);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-top: 0.3rem;
}
```

- [ ] **Step 6: Add responsive sizes for the flying logo (CSS vars, read by JS)**

```css
/* These vars tell JS what start/end sizes to use per breakpoint.
   JS reads them with getComputedStyle on document.documentElement. */
:root {
  --hero-logo-start: 140px;
  --hero-logo-end:    65px;
  --hero-logo-half:   70px; /* updated by JS after measuring */
}
@media (max-width: 1024px) {
  :root {
    --hero-logo-start: 110px;
    --hero-logo-end:    55px;
    --hero-logo-half:   55px;
  }
}
@media (max-width: 768px) {
  :root {
    --hero-logo-start:  96px;
    --hero-logo-end:    40px;
    --hero-logo-half:   48px;
  }
}
```

- [ ] **Step 7: Verify styles at dev server**

Open `http://localhost:3456`. Expected:
- Hero section is blank (no text visible, logo not yet visible — JS not wired)
- Tagline bar shows two text lines in blue bar
- No JS errors in console

- [ ] **Step 8: Commit**

```bash
git add css/styles.css
git commit -m "feat: add hero logo-fly and entrance animation CSS"
```

---

### Task 3: JS — `initHeroEntrance()`

**Files:**
- Modify: `js/main.js` — add new function before the `// INIT` block

- [ ] **Step 1: Add `initHeroEntrance()` function**

In `js/main.js`, just before the `// INIT` comment block at the end of the file, insert:

```js
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
```

Note: `prefers-reduced-motion` is handled in CSS (`animation: none; opacity: 1`), so no JS branching needed.

- [ ] **Step 2: Register `initHeroEntrance` in `DOMContentLoaded`**

In the `document.addEventListener('DOMContentLoaded', () => { ... })` block, add as the **first call** only (scroll animation registered in Task 4):

```js
document.addEventListener('DOMContentLoaded', () => {
  initHeroEntrance();          // ADD
  initStickyNav();
  // ... rest unchanged
```

- [ ] **Step 3: Verify entrance plays**

Open `http://localhost:3456`. Expected: logo fades/scales in from center of hero, then name, sub, button, eyebrow, chevron each fade up in sequence over ~1.5s. Console: no errors.

---

### Task 4: JS — `initHeroScrollAnimation()` and update `initStickyNav()`

**Files:**
- Modify: `js/main.js` — add function + patch `initStickyNav`

- [ ] **Step 1: Add helper `getHeroLogoMetrics()`**

Before `initHeroEntrance`, add:
```js
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
```

- [ ] **Step 2: Add `initHeroScrollAnimation()`**

```js
function initHeroScrollAnimation() {
  const heroEl   = document.querySelector('.hero.is-hero-home');
  const flyLogo  = document.getElementById('hero-logo-fly');
  const nav      = document.getElementById('site-nav');
  if (!heroEl || !flyLogo || !nav) return;

  const centerText = heroEl.querySelector('.hero__center-text');
  const brandName  = heroEl.querySelector('.hero__brand-name');
  const brandSub   = heroEl.querySelector('.hero__brand-sub');
  const heroBtn    = heroEl.querySelector('.hero__center-text .btn');
  const eyebrow    = heroEl.querySelector('.hero__center-text .hero__eyebrow');
  const scrollHint = heroEl.querySelector('.hero__scroll-hint');

  let metrics  = getHeroLogoMetrics();
  let ticking  = false;

  function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function applyLogoPosition(p) {
    const ep = ease(p);
    const { start, end, navPad, navH } = metrics;
    const size = lerp(start, end, ep);

    // Start: centered in viewport at 42% height
    const startX = (window.innerWidth  - start) / 2;
    const startY = (window.innerHeight * 0.42) - (start / 2);

    // End: nav left padding, nav vertical center
    const endX = navPad;
    const endY = (navH - end) / 2;

    flyLogo.style.left   = lerp(startX, endX, ep) + 'px';
    flyLogo.style.top    = lerp(startY, endY, ep) + 'px';
    flyLogo.style.width  = size + 'px';
    flyLogo.style.height = size + 'px';

    // Shrink box-shadow as logo gets smaller
    const blur = lerp(48, 8, ep);
    flyLogo.style.boxShadow =
      `0 ${lerp(12, 2, ep).toFixed(1)}px ${blur.toFixed(1)}px rgba(0,0,0,${lerp(0.5, 0.1, ep).toFixed(2)})`;
  }

  function update() {
    const p  = clamp(window.scrollY / (heroEl.offsetHeight * 0.75), 0, 1);
    const ep = ease(p);

    applyLogoPosition(p);

    // Nav solid state (replaces initStickyNav on homepage)
    nav.classList.toggle('is-solid', p >= 0.35);

    // Fade hero text elements at different rates
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
    // Keep CSS var in sync so center text stays below logo
    document.documentElement.style.setProperty(
      '--hero-logo-half', (metrics.start / 2) + 'px'
    );
    update();
  }, { passive: true });

  // Set initial CSS var and run once to position logo immediately
  document.documentElement.style.setProperty(
    '--hero-logo-half', (metrics.start / 2) + 'px'
  );
  update();
}
```

- [ ] **Step 3: Update `initStickyNav()` to skip homepage**

Find the existing `initStickyNav` function (line 11) and add an early return:

```js
function initStickyNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  // Homepage scroll animation owns .is-solid on this page
  if (document.body.classList.contains('is-home')) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-solid', window.scrollY > 40);
  }, { passive: true });
}
```

- [ ] **Step 4: Register `initHeroScrollAnimation` in `DOMContentLoaded`**

Update the DOMContentLoaded block to add the second new call (now both functions are defined):

```js
document.addEventListener('DOMContentLoaded', () => {
  initHeroEntrance();
  initHeroScrollAnimation();   // ADD — after initHeroEntrance
  initStickyNav();
  // ... rest unchanged
```

- [ ] **Step 5: Bump cache-busting version in `index.html`**

Find in `index.html`:
```html
<script src="js/main.js?v=5"></script>
```
Change to:
```html
<script src="js/main.js?v=6"></script>
```

- [ ] **Step 6: Verify scroll animation**

Open `http://localhost:3456`. Expected:
- Page loads: logo large and centered, fades in via entrance animation
- Scroll down slowly: logo moves diagonally toward top-left navbar position, shrinks
- At ~35% scroll: navbar turns blue solid, brand text fades in
- At 75% of hero height: logo is in navbar position, all hero text gone
- Scroll back to top: logo returns to center, nav back to transparent, hero text reappears
- Console: no errors

- [ ] **Step 7: Commit**

```bash
git add js/main.js index.html
git commit -m "feat: add hero scroll-driven logo animation and entrance sequence"
```

---

### Task 5: Responsive verification and mobile polish

**Files:**
- Modify: `css/styles.css` — add mobile-specific hero overrides if needed

- [ ] **Step 1: Check mobile layout at 375px**

In browser devtools (or resize window to 375px wide). Expected:
- Logo starts at 96px (controlled by `--hero-logo-start` at ≤768px breakpoint)
- Brand name and sub readable at `clamp(1.4rem, 3.5vw, 2.4rem)` → ~13px at 375px — too small. Check visually.
- If brand name is too small, find `.hero__brand-name` in `css/styles.css` and add:

```css
@media (max-width: 480px) {
  .hero__brand-name {
    font-size: clamp(1.1rem, 5.5vw, 1.6rem);
    letter-spacing: 0.02em;
  }
  .hero__brand-sub {
    font-size: clamp(0.65rem, 3.5vw, 0.85rem);
  }
}
```

- [ ] **Step 2: Verify tagline bar on mobile**

At 375px, verify the tagline bar text doesn't overflow. The existing `.tagline-bar p` uses `clamp(1rem, 2vw, 1.3rem)` — at 375px that's `clamp(1rem, 7.5px, 1.3rem)` → 1rem. Fine.

- [ ] **Step 3: Verify chevron is visible on mobile**

Chevron is 12×12px. On dark hero background it should be visible. If too subtle, increase border width to 2.5px:
```css
@media (max-width: 768px) {
  .hero__chevron {
    width: 10px;
    height: 10px;
  }
}
```

- [ ] **Step 4: Final cross-device check**

Test at these widths: 375px, 768px, 1024px, 1440px.  
For each: scroll slowly through hero. Logo should travel diagonally to nav. No layout breaks.

- [ ] **Step 5: Commit responsive fixes**

```bash
git add css/styles.css
git commit -m "feat: responsive polish for hero logo-fly animation"
```

---

### Task 6: Cleanup and final verification

**Files:**
- Modify: `css/styles.css` — verify old unused `.hero__title`, `.hero__subtitle`, `.hero__content` rules don't cause side effects

- [ ] **Step 1: Check old CSS rules don't interfere**

Search `css/styles.css` for `.hero__title`, `.hero__content`, `.hero__subtitle`. These selectors remain in the CSS but no HTML uses them on any page — they're safe to leave as dead rules. No action needed unless they somehow match new elements (they don't).

- [ ] **Step 2: Verify other pages unaffected**

Open `http://localhost:3456/beneficios/complejo-deportivo/`. Expected:
- Normal `.page-hero` banner at top
- No flying logo
- Nav solid (normal `initStickyNav` behavior at 40px scroll threshold)
- Console: no errors

- [ ] **Step 3: Verify homepage full scroll**

Open `http://localhost:3456/`. Scroll from top to bottom. Expected:
- Hero animation works
- Tagline bar appears immediately below hero
- Services grid, stats, carousel — all normal
- Footer — normal
- No visual regressions

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: hero logo-fly animation — complete implementation"
```
