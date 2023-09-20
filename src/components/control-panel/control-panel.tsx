import AddLayoutSingleButton from './add-layout-single-button';
import AddLayoutDoubleButton from './add-layout-double-button';
import OpenResumeModalButton from './open-resume-modal-button';

export default function ControlPanel() {
  return (
    <div>
      <span>Control Panel</span>
      <AddLayoutSingleButton />
      <AddLayoutDoubleButton />
      <OpenResumeModalButton />
    </div>
  );
}
