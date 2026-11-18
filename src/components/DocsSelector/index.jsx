import React from 'react';
import clsx from 'clsx';
import {useHistory} from '@docusaurus/router';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import useDocsCatalog from '../../docs-catalog/useDocsCatalog';
import {resolveDoc} from '../../docs-catalog/logic.cjs';
import Dropdown from '../Dropdown';
import styles from './styles.module.css';

function PackageIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M8 1.2 14 4.4v7.2L8 14.8 2 11.6V4.4L8 1.2Zm0 1.6L3.7 5.1 8 7.4l4.3-2.3L8 2.8Zm-4.5 3.6v4.5L7.25 13V8.9L3.5 6.4Zm9 0L8.75 8.9V13l3.75-2.1V6.4Z" />
    </svg>
  );
}

// Package and version picker shown at the top of the docs sidebar. Picking one
// opens the same page in that package/version when it exists, otherwise the
// closest page there, so people don't get dropped on a 404.
export default function DocsSelector() {
  const {catalog, current} = useDocsCatalog();
  const history = useHistory();
  const mobileSidebar = useNavbarMobileSidebar();

  const pkg = current && catalog.packages.find((p) => p.name === current.pkg);
  if (!current || !pkg) return null;
  const version = pkg.versions.find((v) => v.name === current.version);

  function go(change) {
    const target = resolveDoc(catalog, {...current, ...change});
    if (!target) return;
    history.push(target.path);
    if (mobileSidebar.shown) mobileSidebar.toggle();
  }

  return (
    <div className={styles.box}>
      <div className={styles.group}>
        <span className={styles.label}>Package</span>
        <Dropdown
          ariaLabel="Package"
          icon={<PackageIcon />}
          variant="field"
          value={current.pkg}
          options={catalog.packages.map((p) => ({value: p.name, label: p.name}))}
          onChange={(name) => go({pkg: name})}
        />
      </div>

      <div className={styles.group}>
        <span className={styles.label}>Version</span>
        <Dropdown
          ariaLabel="Version"
          variant="field"
          value={current.version}
          options={pkg.versions.map((v) => ({value: v.name, label: v.label, meta: v.meta}))}
          onChange={(name) => go({version: name})}
        />
      </div>

      {version?.locales.length > 0 && (
        <div className={clsx(styles.group, styles.mobileOnly)}>
          <span className={styles.label}>Language</span>
          <Dropdown
            ariaLabel="Language"
            variant="field"
            value={current.locale}
            options={version.locales.map((l) => ({value: l.code, label: l.label, meta: l.code.toUpperCase()}))}
            onChange={(locale) => go({locale})}
          />
        </div>
      )}
    </div>
  );
}
