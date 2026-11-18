import {useMemo} from 'react';
import {useActiveDocContext, useDocsData} from '@docusaurus/plugin-content-docs/client';
import {buildCatalog, parseDocId} from './logic.cjs';

// Everything the package, version and language pickers need, derived from the
// docs that Docusaurus already loaded. Returns current=null outside of docs.
export default function useDocsCatalog() {
  const pluginData = useDocsData('default');
  const activeDoc = useActiveDocContext('default')?.activeDoc;

  const catalog = useMemo(() => {
    const version = pluginData.versions.find((v) => v.isLast) ?? pluginData.versions[0];
    return buildCatalog(version?.docs ?? []);
  }, [pluginData]);

  const current = useMemo(() => parseDocId(activeDoc?.id), [activeDoc?.id]);

  return {catalog, current};
}
