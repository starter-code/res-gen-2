import React from 'react';

import ControlPanel from '@/components/control-panel/control-panel';
import LayoutManager from '@/managers/layout-manager';
import EditorManager from '@/managers/editor-manager';

export default function App() {
  return (
    <>
      <ControlPanel />
      <EditorManager />
      <LayoutManager />
    </>
  );
}
