# Cloudflare Worker Form Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Route the homepage contact form and association form through the CPCH Cloudflare Worker without changing visible fields or behavior.

**Architecture:** Version the Worker as an ES module and make its membership email builder consume the association form's existing field names directly. Point only the homepage and association forms at the Worker, add hidden form-type routing fields, and make both fetch handlers reject non-2xx responses.

**Tech Stack:** Static HTML, browser JavaScript, Cloudflare Workers, Resend API, Node.js built-in test runner.

---

### Task 1: Lock the form and Worker contracts with failing tests

**Files:**
- Create: `tests/forms-integration.test.mjs`
- Test: `index.html`
- Test: `institucion/asociarse.html`
- Test: `institucion/asociarse/index.html`
- Test: `js/main.js`
- Test: `workers/cpch-forms.mjs`

- [x] Write tests asserting the two form actions, `_form_type` values, unchanged public field names, HTTP error handling, synchronized association copies, and membership email output.
- [x] Run `node tests/forms-integration.test.mjs`.
- [x] Confirm failure because the Worker source and new integration wiring do not exist.

### Task 2: Add the Worker source with the existing association field contract

**Files:**
- Create: `workers/cpch-forms.mjs`

- [x] Copy the provided Worker behavior into a versioned ES module.
- [x] Update `membershipEmail()` to render `nombre_completo`, `cedula`, `fecha_nacimiento`, `domicilio`, `email`, `telefono`, `asociarse_a`, `lugar_cobro`, `empresa_transporte`, `numero_interno`, `sexo`, `ficha_entidad`, `ficha_vencimiento`, `mutualista`, `antecedentes_medicos`, `emergencia_contacto`, and `metodo_pago`.
- [x] Preserve multipart attachments and existing Resend configuration.
- [x] Run the focused Worker payload tests and confirm they pass.

### Task 3: Wire the homepage form

**Files:**
- Modify: `index.html`
- Modify: `js/main.js`

- [x] Change only the homepage form action and add hidden `_form_type=contact`.
- [x] Check `response.ok` before showing the existing success state.
- [x] Run the homepage integration tests and confirm they pass.

### Task 4: Wire both association route files

**Files:**
- Modify: `institucion/asociarse.html`
- Modify: `institucion/asociarse/index.html`

- [x] Change only the form action and add hidden `_form_type=membership`.
- [x] Check `response.ok` before showing the existing success state.
- [x] Keep both route files byte-for-byte synchronized.
- [x] Run the association integration tests and confirm they pass.

### Task 5: Verify and assess deployment

**Files:**
- Test: all modified files

- [x] Run `node tests/forms-integration.test.mjs`.
- [x] Run `node --check js/main.js`.
- [x] Run `node --check workers/cpch-forms.mjs`.
- [x] Run `git diff --check`.
- [x] Confirm Parque Social files have no diff.
- [ ] Authenticate Wrangler, deploy `cpch-forms`, verify the live endpoint, and then push the site changes.
