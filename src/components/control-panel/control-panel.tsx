import AddLayoutSingleButton from './add-layout-single-button';
import AddLayoutDoubleButton from './add-layout-double-button';

export default function ControlPanel() {
  return (
    <div>
      <span>Control Panel</span>
      <AddLayoutSingleButton />
      <AddLayoutDoubleButton />
    </div>
  );
}
