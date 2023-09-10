import React from 'react';

import { useAppContext } from '@/context/app-context';
import DropArea from '@/drag-and-drop/drop-area';
import HeadingEditor from '@/json-editors/heading-editor';
import MacroManager from '@/managers/macro-manager';

export default function App() {
  const { handleDrop, items } = useAppContext();

  return (
    <>
      <DropArea name="drop-area" />
      <HeadingEditor onDrop={handleDrop} />
      <MacroManager items={items} />
    </>
  );
}
