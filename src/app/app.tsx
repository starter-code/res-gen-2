import React from 'react';

import { useAppContext } from '@/context/app-context';
import ControlPanel from '@/components/control-panel/control-panel';
import HeadingEditor from '@/components/json-editors/heading-editor';
import LayoutManager from '@/managers/layout-manager';

export default function App() {
  const { handleDrop } = useAppContext();

  return (
    <>
      <ControlPanel />
      <HeadingEditor onDrop={handleDrop} />
      <LayoutManager />
    </>
  );
}
