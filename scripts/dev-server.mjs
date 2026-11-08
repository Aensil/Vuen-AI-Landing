import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), '../dist'));
const port = Number(process.argv[2] || process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Use a valid port between 1 and 65535.');
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp4': 'video/mp4',
  '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};
const insideRoot = (path) => path === root || path.startsWith(root + sep);

createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Invalid URL'); return; }
  let path = resolve(root, '.' + pathname);
  if (!insideRoot(path)) { response.writeHead(403).end('Forbidden'); return; }
  let info;
  try {
    info = await stat(path);
    if (info.isDirectory()) path = resolve(path, 'index.html');
    path = await realpath(path);
    if (!insideRoot(path)) { response.writeHead(403).end('Forbidden'); return; }
    info = await stat(path);
    if (!info.isFile()) throw new Error('Not a file');
  } catch { response.writeHead(404).end('Not found'); return; }

  const headers = {
    'Content-Type': types[extname(path).toLowerCase()] || 'application/octet-stream',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };
  let start = 0;
  let end = info.size - 1;
  let code = 200;
  if (request.headers.range) {
    const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
    let valid = Boolean(range && (range[1] || range[2]) && info.size > 0);
    if (valid && range[1]) {
      start = Number(range[1]);
      end = range[2] ? Math.min(Number(range[2]), end) : end;
    } else if (valid) {
      const suffix = Number(range[2]);
      valid = Number.isSafeInteger(suffix) && suffix > 0;
      start = Math.max(0, info.size - suffix);
    }
    valid &&= Number.isSafeInteger(start) && Number.isSafeInteger(end) && start <= end && start < info.size;
    if (!valid) {
      response.writeHead(416, { ...headers, 'Content-Range': `bytes */${info.size}`, 'Content-Length': 0 }).end();
      return;
    }
    code = 206;
    headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
  }
  headers['Content-Length'] = Math.max(0, end - start + 1);
  response.writeHead(code, headers);
  if (request.method === 'HEAD' || info.size === 0) { response.end(); return; }
  const stream = createReadStream(path, { start, end });
  stream.on('error', () => response.destroy());
  response.on('close', () => stream.destroy());
  stream.pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Mirror Mirror & Visual Data Agent preview: http://127.0.0.1:${port} (video byte ranges enabled)`);
});
