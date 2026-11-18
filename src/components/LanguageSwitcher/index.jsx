import React from 'react';
import {useHistory} from '@docusaurus/router';
import useDocsCatalog from '../../docs-catalog/useDocsCatalog';
import {resolveDoc} from '../../docs-catalog/logic.cjs';
import Dropdown from '../Dropdown';
import styles from './styles.module.css';

function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M8 1.2a6.8 6.8 0 1 0 0 13.6A6.8 6.8 0 0 0 8 1.2Zm5.2 6.1h-2.4a11.4 11.4 0 0 0-.9-3.9 5.3 5.3 0 0 1 3.3 3.9ZM8 2.7c.6.8 1.1 2 1.4 3.6H6.6C6.9 4.7 7.4 3.5 8 2.7ZM2.8 7.3h2.4a11.4 11.4 0 0 0 0 1.4H2.8a5.2 5.2 0 0 1 0-1.4Zm0 2.7h2.4c.1.5.2 1 .4 1.4a11.4 11.4 0 0 0 .5 2.5 5.3 5.3 0 0 1-3.3-3.9Zm2.6-3.3h4.4A10.3 10.3 0 0 1 8.5 8H7.5a10.3 10.3 0 0 1-2.1-1.3Zm0 2.7A10.3 10.3 0 0 0 7.5 9.5h1a10.3 10.3 0 0 0 2.1-1.4H5.4Zm0 1.4h5.2c-.4.5-.9 1-1.6 1.4-.4.2-.9.4-1 .4-.1 0-.6-.2-1-.4-.7-.4-1.2-.9-1.6-1.4Zm5.2 2.6c.3-.8.5-1.8.6-2.6h2.4a5.3 5.3 0 0 1-3 2.6Zm.1-2.6" />
    </svg>
  );
}

// Language button in the top bar. It only shows on docs pages and lists the
// language folders (en/, pt/, ...) that exist for the current package and version.
export default function LanguageSwitcher() {
  const {catalog, current} = useDocsCatalog();
  const history = useHistory();

  const pkg = current && catalog.packages.find((p) => p.name === current.pkg);
  const version = pkg?.versions.find((v) => v.name === current.version);
  if (!current || !version || !version.locales.length) return null;

  function changeLanguage(locale) {
    const target = resolveDoc(catalog, {...current, locale});
    if (target) history.push(target.path);
  }

  return (
    <div className={styles.wrapper}>
      <Dropdown
        ariaLabel="Language"
        variant="pill"
        align="right"
        icon={<GlobeIcon />}
        value={current.locale}
        options={version.locales.map((l) => ({
          value: l.code,
          label: l.label,
          meta: l.code.toUpperCase(),
          short: l.code.toUpperCase(),
        }))}
        onChange={changeLanguage}
      />
    </div>
  );
}
