/**
 * Cloudflare Worker - CPCH form handler.
 *
 * Required environment variable:
 *   RESEND_API_KEY
 */

const TO_EMAIL = 'info@proteccionchoferes.org.uy';
const FROM_EMAIL = 'formularios@proteccionchoferes.org.uy';

const ALLOWED_ORIGINS = [
  'https://proteccionchoferes.org.uy',
  'https://www.proteccionchoferes.org.uy',
  'http://localhost:3456',
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function jsonRes(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

function bufToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(bin);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return jsonRes({ success: false }, 405, origin);
    }

    try {
      const ct = request.headers.get('Content-Type') || '';
      const fields = {};
      const attachments = [];

      if (ct.includes('multipart/form-data')) {
        const fd = await request.formData();
        for (const [key, val] of fd.entries()) {
          if (val instanceof File && val.size > 0) {
            attachments.push({
              filename: val.name,
              content: bufToBase64(await val.arrayBuffer()),
            });
          } else {
            fields[key] = val;
          }
        }
      } else {
        Object.assign(fields, await request.json());
      }

      if (fields._honey) return jsonRes({ success: true }, 200, origin);

      const payload = buildEmail(fields, attachments);
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!resendResponse.ok) {
        console.error(
          'Resend error:',
          resendResponse.status,
          await resendResponse.text(),
        );
        return jsonRes({ success: false }, 502, origin);
      }

      return jsonRes({ success: true }, 200, origin);
    } catch (err) {
      console.error('Worker error:', err);
      return jsonRes({ success: false }, 500, origin);
    }
  },
};

export function buildEmail(fields, attachments = []) {
  const base = {
    from: `CPCH Formularios <${FROM_EMAIL}>`,
    to: [TO_EMAIL],
    ...(attachments.length ? { attachments } : {}),
  };

  switch (fields._form_type) {
    case 'membership':
      return { ...base, ...membershipEmail(fields) };
    case 'subscribe':
      return { ...base, ...subscribeEmail(fields) };
    default:
      return { ...base, ...contactEmail(fields) };
  }
}

export function contactEmail(fields) {
  return {
    ...(fields.email ? { reply_to: fields.email } : {}),
    subject: `Contacto: ${fields.asunto || 'Sin asunto'} - ${fields.nombre || ''} ${fields.apellido || ''}`.trim(),
    html: card('Nuevo mensaje de contacto', [
      ['Nombre', `${fields.nombre || ''} ${fields.apellido || ''}`.trim()],
      ['Email', fields.email],
      ['Telefono', fields.telefono],
      ['Asunto', fields.asunto],
      ['Mensaje', multiline(fields.mensaje)],
    ]),
  };
}

export function membershipEmail(fields) {
  const membershipTypes = {
    cuota_social: 'Cuota Social',
    complejo_deportivo: 'Complejo Deportivo',
  };
  const collectionMethods = {
    transferencia: 'Transferencia',
    domicilio: 'Domicilio (en Montevideo)',
    presencial: 'Presencial',
    descuento_sueldo: 'Descuento de sueldo',
  };
  const paymentMethods = {
    transferencia: 'Transferencia bancaria o deposito',
    presencial: 'Presencial',
  };
  const sexOptions = {
    masculino: 'Masculino',
    femenino: 'Femenino',
    otro: 'Otro',
  };

  return {
    ...(fields.email ? { reply_to: fields.email } : {}),
    subject: `Solicitud de socio: ${fields.nombre_completo || 'Sin nombre'}`,
    html: card('Nueva solicitud de pre asociacion', [
      ['Nombre completo', fields.nombre_completo],
      ['Cedula', fields.cedula],
      ['Fecha de nacimiento', fields.fecha_nacimiento],
      ['Domicilio / Direccion', fields.domicilio],
      ['Email', fields.email],
      ['Telefono / Celular', fields.telefono],
      [
        'Asociarse a',
        membershipTypes[fields.asociarse_a] || fields.asociarse_a,
      ],
      [
        'Lugar de cobro',
        collectionMethods[fields.lugar_cobro] || fields.lugar_cobro,
      ],
      ['Empresa de transporte', fields.empresa_transporte],
      ['Numero interno', fields.numero_interno],
      ['Sexo', sexOptions[fields.sexo] || fields.sexo],
      ['Ficha medica - Entidad', fields.ficha_entidad],
      ['Ficha medica - Vencimiento', fields.ficha_vencimiento],
      ['Mutualista / Emergencia movil', fields.mutualista],
      ['Antecedentes medicos', multiline(fields.antecedentes_medicos)],
      ['Contacto de emergencia', fields.emergencia_contacto],
      [
        'Metodo de pago',
        paymentMethods[fields.metodo_pago] || fields.metodo_pago,
      ],
    ]),
  };
}

export function subscribeEmail(fields) {
  return {
    subject: `Nueva suscripcion: ${fields.nombre || fields.email}`,
    html: card('Nueva suscripcion a novedades', [
      ['Nombre', fields.nombre],
      ['Email', fields.email],
    ]),
  };
}

function esc(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function multiline(value) {
  if (!value) return '';
  return `<span style="white-space:pre-wrap">${esc(value)}</span>`;
}

function card(title, rows) {
  const body = rows
    .filter(([, value]) => value != null && value !== '')
    .map(([label, value]) => `<tr>
      <td style="padding:8px 16px;font-weight:600;color:#1E3A5F;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee">${esc(label)}</td>
      <td style="padding:8px 16px;color:#333;border-bottom:1px solid #eee">${value.startsWith?.('<span ') ? value : esc(value)}</td>
    </tr>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#f5f7fa;font-family:'Segoe UI',Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1)">
    <div style="background:#2563EB;padding:18px 24px">
      <h2 style="margin:0;color:#fff;font-size:1rem;font-weight:600">${esc(title)}</h2>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:.9rem"><tbody>${body}</tbody></table>
    <p style="margin:0;padding:12px 16px;background:#f5f7fa;font-size:.75rem;color:#999">
      Enviado desde el sitio web de CPCH &middot; proteccionchoferes.org.uy
    </p>
  </div>
</body></html>`;
}
