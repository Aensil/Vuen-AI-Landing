import { spawnSync } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
await rm(resolve(root, 'dist'), { recursive: true, force: true });
for (const tool of ['tsc', 'vite']) {
  const args = tool === 'vite' ? ['build'] : [];
  const result = spawnSync(resolve(root, 'node_modules/.bin', tool), args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
// Keep each product's assets and styles in its own document and URL space.
await cp(resolve(root, 'mirror-mirror'), resolve(root, 'dist'), { recursive: true });
const visualRoot = resolve(root, 'dist/visual-data-agent');
const html = await readFile(resolve(visualRoot, 'index.html'), 'utf8');
const app = await readFile(resolve(root, 'src/App.tsx'), 'utf8');
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
  .map((match) => match[1]).filter((path) => path !== '*' && path !== '/');
// Real HTML files make direct navigation and refresh work on static hosting.
for (const route of routes) {
  const directory = resolve(visualRoot, '.' + route);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
await writeFile(resolve(visualRoot, '404.html'), html);
for (const file of ['CNAME', 'robots.txt', 'sitemap.xml']) {
  await rm(resolve(visualRoot, file), { force: true });
}
// Preserve the repository's existing GitHub Pages custom domain.
await cp(resolve(root, 'CNAME'), resolve(root, 'dist/CNAME'));
console.log(`Combined site built: Mirror Mirror at /; Visual Data Agent at /visual-data-agent/ (${routes.length} deep links).`);
