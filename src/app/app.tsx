import React from 'react';

import { useAppContext } from '@/context/app-context';
import ControlPanel from '@/components/control-panel/control-panel';
import HeadingEditor from '@/components/json-editors/heading-editor';
import MacroManager from '@/managers/macro-manager';
import DropAreaManager from '@/managers/drop-area-manager';

export default function App() {
  const { handleDrop, items } = useAppContext();

  return (
    <>
      <ControlPanel />
      <DropAreaManager />
      <HeadingEditor onDrop={handleDrop} />
      <MacroManager items={items} />
    </>
  );
}
