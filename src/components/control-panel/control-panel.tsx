import AddLayoutSingleButton from './add-layout-single-button';
import AddLayoutDoubleButton from './add-layout-double-button';
import OpenPdfViewButton from './open-pdf-view-button';

export default function ControlPanel() {
  return (
    <div>
      <span>Control Panel</span>
      <AddLayoutSingleButton />
      <AddLayoutDoubleButton />
      <OpenPdfViewButton />
    </div>
  );
}
