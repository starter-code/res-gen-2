import c from 'classnames';
import { useMemo } from 'react';

import AddLayoutDoubleButton from './add-layout-double-button';
import AddLayoutSingleButton from './add-layout-single-button';
import OpenPdfViewButton from './open-pdf-view-button';
import RemoveBottomLayoutButton from './remove-bottom-layout-button';
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
      <OpenPdfViewButton />
      <ToggleEditorPanelButton />
      <AddLayoutSingleButton />
      <AddLayoutDoubleButton />
      <RemoveBottomLayoutButton />
    </div>
  );
}
