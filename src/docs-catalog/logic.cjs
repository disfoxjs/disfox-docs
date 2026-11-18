/*
 * Helpers for the docs layout (docs/<package>/<version>/<locale>/<page>.md).
 * Pure functions only, so they run in the browser bundle and in Node tests.
 */

const VERSION_FOLDER = /^(latest|\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)$/;

const LOCALE_NAMES = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ja: '日本語',
};

function compareSemver(a, b) {
  const left = a.split(/[.+-]/).map((part) => parseInt(part, 10) || 0);
  const right = b.split(/[.+-]/).map((part) => parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff) return diff;
  }
  return 0;
}

// "disfox/0.1.5/en/Get-Started/Install" -> {pkg, version, locale, page}
function parseDocId(id) {
  if (typeof id !== 'string' || id.startsWith('/')) return null;
  const parts = id.split('/');
  const index = parts.findIndex((part, i) => i > 0 && VERSION_FOLDER.test(part));
  if (index < 0 || parts.length < index + 3) return null;
  return {
    pkg: parts.slice(0, index).join('/'),
    version: parts[index],
    locale: parts[index + 1],
    page: parts.slice(index + 2).join('/'),
  };
}

// Same parsing, starting from a URL such as "/docs/disfox/latest/en/Install#anchor".
function parseDocUrl(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(String(url).split('#')[0]);
  } catch {
    return null;
  }
  const index = pathname.indexOf('/docs/');
  return index < 0 ? null : parseDocId(pathname.slice(index + '/docs/'.length));
}

function pageDepth(page) {
  return page.split('/').length;
}

function sortLocales(entries) {
  return entries.sort(([a], [b]) => {
    if (a === 'en') return -1;
    if (b === 'en') return 1;
    return a.localeCompare(b);
  });
}

function sortPackages(a, b) {
  // The main package first, then the scoped ones (@disfox/...).
  const scopedA = a.name.startsWith('@') ? 1 : 0;
  const scopedB = b.name.startsWith('@') ? 1 : 0;
  return scopedA - scopedB || a.name.localeCompare(b.name);
}

/*
 * Turns the flat list of docs into:
 *
 *   {packages: [{name, versions: [{name, label, meta, locales: [{code, label, docs}]}]}]}
 *
 * Versions come newest first with "latest" on top. "meta" on latest is the
 * highest numbered version folder, so the selector can show "Latest 0.1.5".
 */
function buildCatalog(docs) {
  const tree = new Map();
  for (const doc of docs) {
    const parsed = parseDocId(doc.id);
    if (!parsed) continue;
    if (!tree.has(parsed.pkg)) tree.set(parsed.pkg, new Map());
    const versions = tree.get(parsed.pkg);
    if (!versions.has(parsed.version)) versions.set(parsed.version, new Map());
    const locales = versions.get(parsed.version);
    if (!locales.has(parsed.locale)) locales.set(parsed.locale, []);
    locales.get(parsed.locale).push({
      id: doc.id,
      path: doc.path,
      page: parsed.page,
      depth: pageDepth(parsed.page),
    });
  }

  const packages = [...tree.entries()].map(([name, versions]) => {
    const numbered = [...versions.keys()].filter((v) => v !== 'latest');
    const newestNumbered = numbered.sort(compareSemver).reverse()[0] ?? null;
    const versionNames = [...versions.keys()].sort((a, b) => {
      if (a === 'latest') return -1;
      if (b === 'latest') return 1;
      return compareSemver(b, a);
    });
    return {
      name,
      versions: versionNames.map((versionName) => ({
        name: versionName,
        label: versionName === 'latest' ? 'Latest' : versionName,
        meta: versionName === 'latest' ? newestNumbered : null,
        locales: sortLocales([...versions.get(versionName).entries()]).map(([code, pages]) => ({
          code,
          label: LOCALE_NAMES[code] ?? code.toUpperCase(),
          docs: pages.sort((a, b) => a.depth - b.depth || a.page.localeCompare(b.page)),
        })),
      })),
    };
  });

  return {packages: packages.sort(sortPackages)};
}

/*
 * Picks the doc to open for a selection. Anything missing falls back to the
 * closest option: unknown package -> first package, unknown version -> newest,
 * unknown locale -> first locale, and a page that doesn't exist in the target
 * group -> that group's first page.
 */
function resolveDoc(catalog, wanted) {
  const pkg = catalog.packages.find((p) => p.name === wanted.pkg) ?? catalog.packages[0];
  if (!pkg) return null;
  const version = pkg.versions.find((v) => v.name === wanted.version) ?? pkg.versions[0];
  const locale = version.locales.find((l) => l.code === wanted.locale) ?? version.locales[0];
  return locale.docs.find((doc) => doc.page === wanted.page) ?? locale.docs[0];
}

module.exports = {
  LOCALE_NAMES,
  VERSION_FOLDER,
  buildCatalog,
  compareSemver,
  parseDocId,
  parseDocUrl,
  resolveDoc,
};
