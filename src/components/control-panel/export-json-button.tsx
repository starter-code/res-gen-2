import c from 'classnames';
import React from 'react';

import type { ContentAll } from '@/types/content-all';
import type { LayoutItem } from '@/types/layouts';

type ExportJsonButtonProps = {
  className?: string;
  role?: string;
  tabIndex?: 0 | -1;
  data: {
    items: ContentAll[];
    layouts: LayoutItem[];
  };
};

export default function ExportJsonButton({ data, className, role, tabIndex }: ExportJsonButtonProps) {
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

  const classNames = c('unstyled', className);

  return (
    <button
      className={classNames}
      aria-label="Export Json Button"
      onClick={handleExport}
      role={role}
      tabIndex={tabIndex}
    >
      Export JSON
    </button>
  );
}
