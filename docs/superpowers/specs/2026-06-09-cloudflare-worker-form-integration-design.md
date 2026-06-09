# Cloudflare Worker Form Integration Design

## Goal

Route the existing homepage contact form and the `/institucion/asociarse` form through:

`https://cpch-forms.frosty-paper-dfd1.workers.dev`

The change must not alter either form's visible content, public field names, layout, validation rules, button labels, or success/error experience.

## Scope

Included:

- Homepage contact form in `index.html`
- Association form in:
  - `institucion/asociarse.html`
  - `institucion/asociarse/index.html`
- Existing submission JavaScript in `js/main.js` and the association page's inline script
- Automated contract checks for the two integrations

Excluded:

- `beneficios/parque-social.html`
- `beneficios/parque-social/index.html`
- The Parque Social WhatsApp flow
- The subscription form under `/contacto/informacion`
- Any visual, copy, validation, or public field-name changes
- Cloudflare Worker deployment or dashboard configuration

## Integration Approach

Both forms will continue submitting `multipart/form-data` with `fetch`.

The homepage form already uses field names accepted by the Worker's contact email builder. Its submission will append `_form_type=contact` to the outgoing `FormData`.

The association form has a larger, established field contract that does not match the Worker's current membership builder. Its outgoing `FormData` will therefore:

1. Preserve every enabled original field and file attachment.
2. Append `_form_type=membership`.
3. Append compatibility fields expected by the Worker:
   - `nombres`: current `nombre_completo`
   - `apellidos`: empty, because the public form has one combined name field
   - `ci`: current `cedula`
   - `categoria`: current `asociarse_a`
   - `mensaje`: a readable summary containing all enabled association fields

This compatibility data exists only in the outgoing request. No visible input, label, name attribute, or user interaction changes.

The summary excludes FormSubmit metadata fields and file contents. Files remain attached separately under their existing public field names.

## User Experience

The existing user-facing behavior remains:

- Homepage: button changes to `Enviando...`, then `Mensaje enviado`, or `Error al enviar`.
- Association: button changes to `Enviando...`; success replaces the form with the current success panel and plays the current sound; failure restores the button and shows the current alert.

The handlers will only show success after receiving an HTTP success response from the Worker. Responses such as `500` or `502` will follow the existing failure experience instead of being shown as successful submissions.

## Security And Compatibility

- The Worker URL is HTTPS.
- The production origin is already included in the Worker's CORS allowlist.
- Browser-generated multipart boundaries remain intact because JavaScript will not set `Content-Type` manually.
- Honeypot behavior remains available through the existing `_honey` field on the association form.
- Existing attachments continue to be sent as `File` values in `FormData`.

## Testing

Automated contract tests will verify:

- Only the homepage and association forms target the Worker.
- Parque Social files remain unchanged by this work.
- Homepage submission sends `_form_type=contact`.
- Association submission sends `_form_type=membership`.
- Association compatibility fields are generated without renaming public form fields.
- Both handlers reject non-success HTTP responses.
- Both association route copies remain synchronized.

Manual verification will confirm the forms' visible markup and field names are unchanged and JavaScript remains syntactically valid.
