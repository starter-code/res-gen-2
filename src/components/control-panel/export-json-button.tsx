import React from 'react';

import type { ContentAll } from '@/types/content-all';
import type { LayoutItem } from '@/types/layouts';

type ExportJsonButtonProps = {
  data: {
    items: ContentAll[];
    layouts: LayoutItem[];
  };
};

export default function ExportJsonButton(props: ExportJsonButtonProps) {
  const { data } = props;

  const handleExport = () => {
    // Convert the data to a JSON string
    const json = JSON.stringify(data, null, 2);

    // Create a Blob object containing the JSON string
    const blob = new Blob([json], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';

    // Trigger the click event on the anchor to initiate the download
    a.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleExport}>Export JSON</button>;
}
