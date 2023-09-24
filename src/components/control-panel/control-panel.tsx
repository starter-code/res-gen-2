import AddLayoutSingleButton from './add-layout-single-button';
import AddLayoutDoubleButton from './add-layout-double-button';
import OpenPdfViewButton from './open-pdf-view-button';
import ToggleEditorPanelButton from './toggle-editor-panel-button';

export default function ControlPanel() {
  return (
    <div>
      <span>Control Panel</span>
      <AddLayoutSingleButton />
      <AddLayoutDoubleButton />
      <OpenPdfViewButton />
      <ToggleEditorPanelButton />
    </div>
  );
}
