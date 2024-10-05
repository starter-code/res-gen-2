import React from 'react';

import AddLayoutDoubleButton from './add-layout-double-button';
import AddLayoutSingleButton from './add-layout-single-button';
import BaseMenu from './control-panel-base-menu';
import RemoveBottomLayoutButton from './remove-bottom-layout-button';

export default function EditMenu() {
  return (
    <BaseMenu name="Edit">
      <AddLayoutSingleButton />
      <AddLayoutDoubleButton />
      <RemoveBottomLayoutButton />
    </BaseMenu>
  );
}
