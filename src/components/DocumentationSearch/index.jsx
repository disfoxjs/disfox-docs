import React, {useEffect, useId, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useHistory} from '@docusaurus/router';
import {excerpt, loadSearchIndex, searchDocumentation} from '../../search/client';
import styles from './styles.module.css';

export default function DocumentationSearch({children, homepage = false}) {
  const id = useId();
  const root = useRef(null);
  const history = useHistory();
  const {i18n} = useDocusaurusContext();
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? '' : `/${i18n.currentLocale}`;
  const indexUrl = useBaseUrl(`${localePrefix}/search-index.json`);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    setActive(-1);
    setResults([]);
    if (!query.trim()) { setStatus('idle'); return; }
    setStatus('loading');
    loadSearchIndex(indexUrl).then((index) => {
      if (cancelled) return;
      setResults(searchDocumentation(index, query));
      setStatus('ready');
    }).catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; };
  }, [query, indexUrl]);

  useEffect(() => history.listen(() => { setOpen(false); setQuery(''); }), [history]);
  useEffect(() => {
    root.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({block: 'nearest'});
  }, [active]);

  const visible = open && Boolean(query.trim());
  function onKeyDown(event) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Escape') { setOpen(false); setActive(-1); }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (results.length) setActive((previous) =>
        previous < 0 ? (event.key === 'ArrowDown' ? 0 : results.length - 1)
          : (previous + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length);
    }
    if (event.key === 'Enter' && visible && results.length) {
      event.preventDefault();
      history.push(results[active < 0 ? 0 : active].url);
      setOpen(false);
    }
  }
  const inputProps = {
    role: 'combobox', 'aria-label': 'Find Documentation',
    'aria-autocomplete': 'list', 'aria-expanded': visible,
    'aria-controls': `${id}-results`,
    'aria-activedescendant': visible && active >= 0 ? `${id}-${active}` : undefined,
    value: query,
    onChange: (event) => { setQuery(event.target.value); setOpen(true); },
    onFocus: () => { setOpen(true); loadSearchIndex(indexUrl).catch(() => {}); },
    onKeyDown,
  };
  return (
    <div ref={root} className={`${styles.root} ${homepage ? styles.home : styles.nav}`}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      {children ? children(inputProps) : (
        <input {...inputProps} className={`navbar__search-input ${styles.input}`}
          type="search" placeholder="Search docs…" autoComplete="off" />
      )}
      {visible && <div className={styles.panel}>
        <div className={styles.status} role="status" aria-live="polite">
          {status === 'loading' ? 'Searching…' : status === 'error'
            ? 'Search unavailable. Please try again shortly.'
            : results.length ? `${results.length} results` : 'No matching documentation.'}
        </div>
        <ul id={`${id}-results`} role="listbox" aria-label="Documentation results" className={styles.list}>
          {results.map((result, i) => <li key={result.id} role="option" id={`${id}-${i}`}
            aria-selected={i === active} className={styles.item}>
            <Link to={result.url} className={styles.result} tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onMouseMove={() => setActive(i)} onClick={() => setOpen(false)}>
              <strong>{result.title}</strong>
              {result.heading && result.heading !== result.title && <span>{result.heading}</span>}
              <small>{excerpt(result.content, query)}</small>
            </Link>
          </li>)}
        </ul>
      </div>}
    </div>
  );
}
