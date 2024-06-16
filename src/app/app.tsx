import React from 'react';

import ControlPanel from '@/components/control-panel/control-panel';
import ResumeModal from '@/components/modals/resume-modal';
import EditorManager from '@/managers/editor-manager';
import LayoutManager from '@/managers/layout-manager';
import PdfPreview from '@/pdf/pdf-preview';

export default function App() {
  return (
    <>
      <ResumeModal>
        <PdfPreview />
      </ResumeModal>
      <ControlPanel />
      <div className="flex flex-column justify-center flex-wrap">
        <EditorManager />
        <LayoutManager />
      </div>
    </>
  );
}
