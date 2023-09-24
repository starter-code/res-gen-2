import { useMemo } from 'react';
import c from 'classnames';

import AddLayoutSingleButton from './add-layout-single-button';
import AddLayoutDoubleButton from './add-layout-double-button';
import OpenPdfViewButton from './open-pdf-view-button';
import ToggleEditorPanelButton from './toggle-editor-panel-button';

export default function ControlPanel() {
  const className = useMemo(
    () =>
      c({
        'control-panel': true,
        'bg-cyan-100': true,
        'p-2': true,
        'mb-2': true,
      }),
    [],
  );

  return (
    <div className={className}>
      <span className="text-xl bold">ResGen 2.0</span>
      <AddLayoutSingleButton />
      <AddLayoutDoubleButton />
      <ToggleEditorPanelButton />
      <OpenPdfViewButton />
    </div>
  );
}
