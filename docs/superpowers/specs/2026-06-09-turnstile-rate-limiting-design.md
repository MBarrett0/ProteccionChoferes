# Turnstile and Rate Limiting Design

## Goal

Protect the homepage contact form and the `/institucion/asociarse` form from
automated spam without changing their public field names, visual design, or
existing success and error behavior.

## Selected Approach

Use a Cloudflare Turnstile Managed widget together with a Cloudflare Worker
rate-limit binding.

Turnstile will run when a user submits a form. In normal traffic it should
complete without interaction; Cloudflare may show a challenge when it detects
suspicious activity. The Worker will reject submissions that do not contain a
valid token and will separately limit repeated attempts from the same IP.

Turnstile alone would not control repeated valid submissions. Rate limiting
alone would not distinguish users from automated clients. Combining both
provides stronger protection while preserving the current user experience.

## Configuration

- Public Turnstile site key: `0x4AAAAAADhK6ydYrWF4CAGX`
- Worker secret name: `TURNSTILE_SECRET_KEY`
- Rate-limit binding name: `FORM_RATE_LIMITER`
- Rate limit: 5 requests per IP, per form type, per 60 seconds
- Production hostnames:
  - `proteccionchoferes.org.uy`
  - `www.proteccionchoferes.org.uy`
- Allowed form types:
  - `contact`
  - `membership`

The Turnstile secret is stored only as an encrypted Cloudflare Worker secret.
It is never written to the repository or sent to the browser.

## Client-Side Flow

Both forms load Cloudflare's Turnstile client script and render the Managed
widget explicitly with `appearance: "interaction-only"` and
`execution: "execute"`.

When the existing submit handler runs:

1. Preserve the existing browser validation and disabled-button behavior.
2. Request a fresh Turnstile token for the form action.
3. Add the token to the submitted `FormData` as
   `cf-turnstile-response`.
4. Submit the same public fields to the existing Worker URL.
5. Keep the current success or error feedback unchanged.
6. Reset the widget after success or failure so a token is never reused.

The homepage uses the Turnstile action `contact`. The association form uses
the action `membership`. No existing public form field is renamed, removed, or
visually restyled.

## Worker Flow

For each POST request, the Worker:

1. Accepts only the configured site origins.
2. Parses JSON or multipart form data using the current behavior.
3. Silently accepts a triggered honeypot without sending email.
4. Rejects unsupported form types.
5. Applies the rate limit using a key composed from the form type and
   `CF-Connecting-IP`.
6. Validates `cf-turnstile-response` with Cloudflare Siteverify, passing the
   client IP when available.
7. Requires a successful validation result, the expected action for the form
   type, and a configured production hostname. Local automated tests use
   Cloudflare's documented test credentials and test hostname behavior.
8. Calls Resend only after all protection checks pass.

Protection failures return JSON and an appropriate status:

- `403` for missing or invalid Turnstile verification
- `429` for rate-limited submissions
- `400` for unsupported form types
- Existing `500` and `502` behavior remains for internal or Resend failures

The client presents all these failures through the forms' existing generic
error state so no internal security detail is exposed to the user.

## Rate-Limit Binding

`wrangler.toml` defines a Worker rate-limit binding named
`FORM_RATE_LIMITER`, with a limit of 5 requests in 60 seconds. The key includes
both the IP address and form type so activity on one form does not consume the
other form's allowance.

If Cloudflare does not provide an IP header, the Worker uses a conservative
fallback key rather than bypassing the limiter.

## Deployment

Deployment is staged to avoid a form outage:

1. Add `TURNSTILE_SECRET_KEY` to the `cpch-forms` Worker.
2. Run static, unit, and local integration tests.
3. Deploy the frontend with Turnstile token generation. The current Worker
   ignores the additional token, so submissions continue to work.
4. Verify the production forms produce tokens.
5. Deploy the Worker with mandatory Turnstile validation and rate limiting.
6. Verify accepted submissions and blocked invalid submissions.

No deployment or push occurs before local tests pass.

## Testing

Automated tests cover:

- Both forms retain their existing public field names.
- Both forms use the configured public site key and correct action.
- Existing success and error UI behavior remains intact.
- Missing, invalid, expired, wrong-action, and wrong-hostname tokens are
  rejected before Resend.
- Valid tokens reach the existing email builders unchanged.
- The rate limiter returns `429` after the configured allowance.
- A honeypot submission does not call Turnstile or Resend.
- The two association route copies remain identical.
- The Parque Social WhatsApp flow remains untouched.

Local tests mock Siteverify, Resend, and the rate-limit binding. Production
verification uses non-emailing rejected requests first; any successful email
test is clearly labeled as a technical test.
