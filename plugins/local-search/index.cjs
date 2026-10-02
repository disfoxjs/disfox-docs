const fs = require('node:fs/promises');
const path = require('node:path');
const cheerio = require('cheerio');
const MiniSearch = require('minisearch');
const options = require('../../src/search/options.cjs');

const clean = (text) => text.replace(/\s+/g, ' ').trim();

function extractRecords(html, url) {
  const $ = cheerio.load(html);
  const article = $('.theme-doc-markdown');
  if (!article.length) throw new Error(`Search: documentation content missing at ${url}`);
  const title = clean(article.find('h1').first().text()) || $('title').text().split(' | ')[0];
  const keywords = $('meta[name="keywords"]').attr('content') || '';
  article.find('script, style, button, .hash-link').remove();
  const records = [];
  let heading = '';
  let anchor = '';
  let content = '';
  function flush() {
    if (!content.trim() && !heading) return;
    const target = url + (anchor ? `#${encodeURIComponent(anchor)}` : '');
    const existing = records.find((record) => record.url === target);
    if (existing) existing.content = clean(`${existing.content} ${heading} ${content}`);
    else records.push({id: target, url: target, title, heading, keywords, content: clean(content)});
    content = '';
  }
  function visit(node) {
    if (node.type === 'text') { content += node.data + ' '; return; }
    if (/^h[1-6]$/.test(node.name || '')) {
      flush();
      heading = clean($(node).text());
      anchor = $(node).attr('id') || '';
      return;
    }
    for (const child of node.children || []) visit(child);
  }
  for (const node of article[0].children) visit(node);
  flush();
  // A page can contain a title without any body.
  if (!records.length) records.push({id: url, url, title, heading: '', content: '', keywords});
  return records;
}

module.exports = function localSearch() {
  let docUrls = [];
  return {
    name: 'disfox-local-search',
    async allContentLoaded({allContent}) {
      docUrls = Object.values(allContent['docusaurus-plugin-content-docs'] || {})
        .flatMap((instance) => instance.loadedVersions.flatMap((version) =>
          version.docs.map((doc) => doc.permalink)));
    },
    async postBuild({outDir, baseUrl}) {
      const records = [];
      for (const url of [...new Set(docUrls)]) {
        const relative = decodeURIComponent(url.slice(baseUrl.length)).replace(/^\/+|\/+$/g, '');
        const candidates = [path.join(outDir, relative, 'index.html'), path.join(outDir, `${relative}.html`)];
        let html;
        for (const filename of candidates) {
          try { html = await fs.readFile(filename, 'utf8'); break; }
          catch (error) { if (error.code !== 'ENOENT') throw error; }
        }
        if (!html) throw new Error(`Search: no generated page for ${url}`);
        records.push(...extractRecords(html, url));
      }
      if (!records.length) throw new Error('Search: no documentation was indexed');
      const index = new MiniSearch(options);
      index.addAll(records);
      await fs.writeFile(path.join(outDir, 'search-index.json'), JSON.stringify(index));
      console.log(`[search] Indexed ${docUrls.length} documentation pages / ${records.length} sections`);
    },
  };
};
module.exports.extractRecords = extractRecords;
