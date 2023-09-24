import React from 'react';

import ControlPanel from '@/components/control-panel/control-panel';
import ResumeModal from '@/components/modals/resume-modal';
import LayoutManager from '@/managers/layout-manager';
import EditorManager from '@/managers/editor-manager';

import PdfPreview from '@/pdf/pdf-preview';

export default function App() {
  return (
    <>
      <ResumeModal>
        <PdfPreview />
      </ResumeModal>
      <ControlPanel />
      <div className="flex flex-column justify-center">
        <EditorManager />
        <LayoutManager />
      </div>
    </>
  );
}
