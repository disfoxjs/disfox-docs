import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import DocsSelector from '../../../../components/DocsSelector';

// The package/version box sits above the menu and stays put while the menu scrolls.
export default function DocSidebarDesktopContent(props) {
  return (
    <>
      <DocsSelector />
      <Content {...props} />
    </>
  );
}
