import MiniSearch from 'minisearch';
import options from './options.cjs';

// Both inputs share one request and one in-memory index per locale.
const indexes = new Map();
export function loadSearchIndex(url) {
  if (!indexes.has(url)) {
    indexes.set(url, fetch(url, {cache: 'no-cache'})
      .then((response) => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.text();
      })
      .then((json) => MiniSearch.loadJSON(json, options))
      .catch((error) => { indexes.delete(url); throw error; }));
  }
  return indexes.get(url);
}

export function searchDocumentation(index, query) {
  return query.trim() ? index.search(query.trim()).slice(0, 10) : [];
}

export function excerpt(content, query) {
  const term = query.trim().split(/\s+/).find((word) => content.toLowerCase().includes(word.toLowerCase()));
  const position = term ? content.toLowerCase().indexOf(term.toLowerCase()) : 0;
  const start = Math.max(0, position - 50);
  return `${start ? '…' : ''}${content.slice(start, start + 180)}${content.length > start + 180 ? '…' : ''}`;
}
