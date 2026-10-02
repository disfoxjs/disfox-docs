const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const MiniSearch = require('minisearch');
const options = require('../src/search/options.cjs');
const {extractRecords} = require('../plugins/local-search/index.cjs');

for (const locale of ['', 'pt/']) {
  const index = MiniSearch.loadJSON(fs.readFileSync(`build/${locale}search-index.json`, 'utf8'), options);
  for (const query of ['SlashService', 'NPM', 'registration', 'BehaviorTable', 'extract']) {
    assert(index.search(query).length, `No results for ${locale}${query}`);
  }
  assert.equal(index.search('zzzxxyyqqqnonexistent').length, 0);
  const pages = new Set();
  for (const fields of Object.values(index.toJSON().storedFields)) {
    const [url, hash] = fields.url.split('#');
    const filename = path.join('build', decodeURIComponent(url), 'index.html');
    assert(fs.existsSync(filename), `Missing search target ${filename}`);
    pages.add(url);
    if (hash) {
      const $ = cheerio.load(fs.readFileSync(filename, 'utf8'));
      assert($('[id]').toArray().some((node) => $(node).attr('id') === decodeURIComponent(hash)), `Missing anchor ${fields.url}`);
    }
  }
  assert.equal(pages.size, fs.readdirSync('docs', {recursive: true}).filter((name) => /\.mdx?$/.test(name)).length);
  console.log(`PASS ${locale || 'en/'}: all ${pages.size} pages indexed, all section links resolve, title/heading/content/prefix/no-result queries`);
}
const records = extractRecords('<title>Example</title><meta name="keywords" content="uniquealias"><article class="theme-doc-markdown"><h1>Example</h1><p>Intro</p><h2 id="a-b">Section</h2><p>Body text</p><button>Ignore me</button></article>', '/docs/example');
const fixture = new MiniSearch(options); fixture.addAll(records);
assert.equal(fixture.search('uniquealias').length, 2);
assert.equal(fixture.search('Body')[0].url, '/docs/example#a-b');
assert.equal(fixture.search('Ignore').length, 0);
console.log('PASS keyword metadata, section extraction, excluded controls');
