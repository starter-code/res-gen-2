import React from 'react';

import BaseMenu from './control-panel-base-menu';
import DownloadJsonButton from './download-json.button';
import UploadJsonButton from './upload-json-button';

export default function FileMenu() {
  return (
    <BaseMenu name="File">
      <div>New {`(Coming Soon)`}</div>
      <DownloadJsonButton />
      <UploadJsonButton />
    </BaseMenu>
  );
}
