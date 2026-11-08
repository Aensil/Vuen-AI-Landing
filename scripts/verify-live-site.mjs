import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

const domain = (await readFile(new URL('../CNAME', import.meta.url), 'utf8')).trim();
const origin = new URL(process.argv[2] || `https://${domain}/`);
const attempts = Number(process.env.VERIFY_ATTEMPTS || 12);

async function fetchPage(path) {
  const url = new URL(path, origin);
  url.searchParams.set('deployment-check', Date.now().toString());
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, `${path} must return HTTP 200`);
  return response.text();
}

async function verifyAssets(html) {
  const assets = new Set([
    ...[...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]),
    ...[...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"/g)].map(match => match[1]),
  ]);
  for (const asset of assets) {
    const url = new URL(asset, origin);
    if (url.origin !== origin.origin) continue;
    const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, `Asset ${asset} must return HTTP 200`);
    const type = response.headers.get('content-type') || '';
    assert(!type.includes('text/html'), `Asset ${asset} must not return a fallback HTML page`);
  }
}

async function verify() {
  const mirror = await fetchPage('/');
  assert.match(mirror, /<title[^>]*>Mirror Mirror/, 'The main address must serve the built Mirror Mirror page');
  assert.match(mirror, /class="product-switcher"/, 'Mirror Mirror must include the product switch');
  assert.match(mirror, /href="\/visual-data-agent\/"/, 'The switch must link to Visual Data Agent');
  assert(!mirror.includes('/src/main.tsx'), 'The main address must never serve uncompiled source');

  const visual = await fetchPage('/visual-data-agent/');
  assert.match(visual, /src="\/visual-data-agent\/assets\/[^\"]+\.js"/, 'Visual Data Agent must load its compiled bundle');
  assert(!visual.includes('/src/main.tsx'), 'Visual Data Agent must never serve uncompiled source');
  const privacy = await fetchPage('/visual-data-agent/legal/privacy/');
  assert.match(privacy, /src="\/visual-data-agent\/assets\/[^\"]+\.js"/, 'Direct legal links must load the compiled app');
  await verifyAssets(mirror);
  await verifyAssets(visual);
  console.log(`Verified ${origin.origin}: Mirror Mirror, Visual Data Agent, product route, legal deep link, and script/style assets.`);
}

for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    await verify();
    break;
  } catch (error) {
    console.error(`Published-site check ${attempt}/${attempts}: ${error.message}`);
    if (attempt === attempts) throw error;
    await setTimeout(5000);
  }
}
