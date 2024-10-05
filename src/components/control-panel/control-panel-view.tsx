import React from 'react';

import BaseMenu from './control-panel-base-menu';
import OpenPdfViewButton from './open-pdf-view-button';

export default function ViewMenu() {
  return (
    <BaseMenu name="View">
      <OpenPdfViewButton />
    </BaseMenu>
  );
}
