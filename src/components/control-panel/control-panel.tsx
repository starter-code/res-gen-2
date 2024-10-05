import c from 'classnames';
import { useCallback, useMemo } from 'react';

import pkg from '../../../package.json';
import AddLayoutDoubleButton from './add-layout-double-button';
import AddLayoutSingleButton from './add-layout-single-button';
import BaseMenu from './control-panel-base-menu';
import EditMenu from './control-panel-edit-menu';
import FileMenu from './control-panel-file-menu';
import ViewMenu from './control-panel-view';
import DownloadJsonButton from './download-json.button';
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
        flex: true,
        'flex-wrap': true,
        'gap-5': true,
        'items-center': true,
      }),
    [],
  );

  return (
    <div className={className}>
      <span className="text-xl bold self-center">ResGen 2.0</span>
      <FileMenu />
      <EditMenu />
      <ViewMenu />
      <span className="text-sm ml-auto bg-neutral-200 px-2 py-1 rounded self-center">v{pkg.version}</span>
    </div>
  );
}
