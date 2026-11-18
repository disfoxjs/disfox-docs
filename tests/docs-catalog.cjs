const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {buildCatalog, compareSemver, parseDocId, parseDocUrl, resolveDoc} = require('../src/docs-catalog/logic.cjs');
const sidebars = require('../sidebars.js');

// Parsing ids: <package>/<version>/<locale>/<page>
assert.deepEqual(parseDocId('disfox/0.1.5/en/Get-Started/Install'),
  {pkg: 'disfox', version: '0.1.5', locale: 'en', page: 'Get-Started/Install'});
assert.deepEqual(parseDocId('@disfox/errors/latest/en/Introduction'),
  {pkg: '@disfox/errors', version: 'latest', locale: 'en', page: 'Introduction'});
assert.equal(parseDocId('disfox/en/Install'), null, 'no version folder');
assert.equal(parseDocId('disfox/latest/en'), null, 'no page');
assert.equal(parseDocId('/docs/disfox'), null, 'leading slash ids are not docs');

// URLs, including the Portuguese build prefix and encoded spaces
assert.equal(parseDocUrl('/pt/docs/disfox/latest/en/Disfox/Disfox%20Model#x').page, 'Disfox/Disfox Model');
assert.equal(parseDocUrl('/docs/disfox/latest/en/Install').version, 'latest');
assert.equal(parseDocUrl('/blog/hello'), null);

// Semver ordering
assert.ok(compareSemver('0.1.10', '0.1.9') > 0);
assert.ok(compareSemver('0.2.0', '0.1.9') > 0);

// Catalog from a fake doc list: versions newest first, locales with en first, pages sorted by depth
const fake = [
  {id: 'disfox/0.1.5/en/Get-Started/Install', path: '/docs/disfox/0.1.5/en/Get-Started/Install'},
  {id: 'disfox/0.1.5/en/Index', path: '/docs/disfox/0.1.5/en/Index'},
  {id: 'disfox/0.1.10/en/Index', path: '/docs/disfox/0.1.10/en/Index'},
  {id: 'disfox/latest/pt/Index', path: '/docs/disfox/latest/pt/Index'},
  {id: 'disfox/latest/en/Index', path: '/docs/disfox/latest/en/Index'},
  {id: 'disfox/latest/en/Get-Started/Install', path: '/docs/disfox/latest/en/Get-Started/Install'},
  {id: 'Loose/Page', path: '/docs/Loose/Page'},
];
const catalog = buildCatalog(fake);
const disfox = catalog.packages[0];
assert.equal(disfox.name, 'disfox');
assert.deepEqual(disfox.versions.map((v) => v.name), ['latest', '0.1.10', '0.1.5']);
assert.equal(disfox.versions[0].label, 'Latest');
assert.equal(disfox.versions[0].meta, '0.1.10', 'latest shows the newest numbered version');
assert.deepEqual(disfox.versions[0].locales.map((l) => l.code), ['en', 'pt']);
assert.equal(disfox.versions[0].locales[0].label, 'English');
assert.equal(disfox.versions[0].locales[0].docs[0].page, 'Index', 'shallow pages come first');

// Fallbacks: missing version -> newest, missing page -> first page of that group, missing locale -> first locale
assert.equal(resolveDoc(catalog, {pkg: 'disfox', version: '0.0.1', locale: 'en', page: 'Index'}).path,
  '/docs/disfox/latest/en/Index');
assert.equal(resolveDoc(catalog, {pkg: 'disfox', version: 'latest', locale: 'en', page: 'Nope'}).path,
  '/docs/disfox/latest/en/Index');
assert.equal(resolveDoc(catalog, {pkg: 'disfox', version: '0.1.5', locale: 'pt', page: 'Index'}).path,
  '/docs/disfox/0.1.5/en/Index', 'version without pt falls back to its first locale');
assert.equal(resolveDoc(catalog, {pkg: 'disfox', version: '0.1.5', locale: 'en', page: 'Get-Started/Install'}).path,
  '/docs/disfox/0.1.5/en/Get-Started/Install', 'same page is kept when switching version');

// The real docs folder: every markdown file is a doc, the catalog matches the sidebars one-to-one
const docsDir = path.join(__dirname, '..', 'docs');
const docs = fs.readdirSync(docsDir, {recursive: true})
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => {
    const id = file.split(path.sep).join('/').replace(/\.mdx?$/, '');
    return {id, path: `/docs/${id}`};
  });
const realCatalog = buildCatalog(docs);
for (const doc of docs) assert.ok(parseDocId(doc.id), `not in <package>/<version>/<locale>/: ${doc.id}`);

const groups = realCatalog.packages.flatMap((p) => p.versions.flatMap((v) => v.locales.map((l) => `${p.name}/${v.name}/${l.code}`)));
assert.deepEqual(Object.keys(sidebars).sort(), groups.sort(), 'one sidebar per package/version/locale folder');
assert.deepEqual(realCatalog.packages.map((p) => p.name), ['disfox', '@disfox/applications', '@disfox/behaviortables', '@disfox/errors']);

console.log(`PASS docs catalog: ${docs.length} docs, ${realCatalog.packages.length} packages, ${Object.keys(sidebars).length} sidebars match the folders`);
