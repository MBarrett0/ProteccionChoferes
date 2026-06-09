import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const WORKER_URL = 'https://cpch-forms.frosty-paper-dfd1.workers.dev';

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

function formMarkup(html, id) {
  const match = html.match(new RegExp(`<form\\b[^>]*\\bid="${id}"[\\s\\S]*?</form>`));
  assert.ok(match, `Expected form #${id}`);
  return match[0];
}

function fieldNames(form) {
  return [...form.matchAll(/\bname="([^"]+)"/g)].map((match) => match[1]);
}

test('homepage form targets the Worker without changing public field names', async () => {
  const html = await source('index.html');
  const form = formMarkup(html, 'contact-form');

  assert.match(form, new RegExp(`action="${WORKER_URL}"`));
  assert.match(form, /name="_form_type"\s+value="contact"/);
  assert.deepEqual(
    fieldNames(form).filter((name) => !name.startsWith('_')),
    ['nombre', 'apellido', 'email', 'telefono', 'asunto', 'mensaje'],
  );
});

test('homepage submit handler treats non-2xx Worker responses as errors', async () => {
  const js = await source('js/main.js');

  assert.match(js, /const response\s*=\s*await fetch\(form\.action,/);
  assert.match(js, /if\s*\(!response\.ok\)\s*throw new Error/);
});

test('association forms target the Worker and preserve every public field name', async () => {
  const expectedNames = [
    'nombre_completo',
    'cedula',
    'fecha_nacimiento',
    'domicilio',
    'email',
    'telefono',
    'asociarse_a',
    'lugar_cobro',
    'empresa_transporte',
    'numero_interno',
    'cat_libreta',
    'sexo',
    'ficha_entidad',
    'ficha_vencimiento',
    'ficha_medica',
    'mutualista',
    'antecedentes_medicos',
    'emergencia_contacto',
    'metodo_pago',
  ];

  for (const path of ['institucion/asociarse.html', 'institucion/asociarse/index.html']) {
    const html = await source(path);
    const form = formMarkup(html, 'asociarse-form');

    assert.match(form, new RegExp(`action="${WORKER_URL}"`));
    assert.match(form, /name="_form_type"\s+value="membership"/);
    assert.deepEqual(
      fieldNames(form).filter((name) => !name.startsWith('_')),
      expectedNames,
      path,
    );
    assert.match(html, /if\s*\(!response\.ok\)\s*throw new Error/);
  }
});

test('association route copies remain synchronized', async () => {
  assert.equal(
    await source('institucion/asociarse.html'),
    await source('institucion/asociarse/index.html'),
  );
});

test('Worker membership email renders the current association field contract', async () => {
  const { membershipEmail } = await import('../workers/cpch-forms.mjs');
  const email = membershipEmail({
    nombre_completo: 'Ana Perez',
    cedula: '1.234.567-8',
    fecha_nacimiento: '1990-01-02',
    domicilio: 'Soriano 1227',
    email: 'ana@example.com',
    telefono: '099 123 456',
    asociarse_a: 'cuota_social',
    lugar_cobro: 'descuento_sueldo',
    empresa_transporte: 'Empresa SA',
    numero_interno: '42',
    sexo: 'femenino',
    ficha_entidad: 'MSP',
    ficha_vencimiento: '2027-01-01',
    mutualista: 'CASMU',
    antecedentes_medicos: 'Ninguno',
    emergencia_contacto: 'Luis 098 111 222',
    metodo_pago: 'transferencia',
  });

  assert.equal(email.reply_to, 'ana@example.com');
  assert.match(email.subject, /Ana Perez/);
  for (const value of [
    '1.234.567-8',
    'Soriano 1227',
    'Cuota Social',
    'Descuento de sueldo',
    'Empresa SA',
    '42',
    'CASMU',
    'Luis 098 111 222',
  ]) {
    assert.match(email.html, new RegExp(value));
  }
});

test('Parque Social public WhatsApp page is not wired to the Worker', async () => {
  const html = await source('beneficios/parque-social.html');

  assert.doesNotMatch(html, new RegExp(WORKER_URL));
  assert.match(html, /id="wa-send-btn"/);
});
