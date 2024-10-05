import c from 'classnames';
import { useCallback } from 'react';

import { useAppContext } from '@/context/app-context';
import localStorageUtil from '@/utils/localstorage-util';

type DownloadJsonButtonProps = {
  className?: string;
  role?: string;
  tabIndex?: 0 | -1;
};

export default function DownloadJsonButton({ className, role, tabIndex }: DownloadJsonButtonProps) {
  const { onImportFile } = useAppContext();

  const handleClick = () => {
    // Convert JSON data to string
    let jsonString = JSON.stringify(localStorageUtil.data, null, 2);

    // Create a Blob object
    let blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);

    // Create a link element, set its attributes for download
    let a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // File name
    a.textContent = 'Download JSON';

    // Append the link to the body
    document.body.appendChild(a);

    // Click the link programmatically to trigger the download
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      if (!event.target.files) {
        return;
      }

      const file = event.target.files[0];

      if (file?.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = e => {
          const contents = e?.target?.result as string;

          try {
            const json = JSON.parse(contents);
            onImportFile(json);
          } catch (err) {
            console.error('Error parsing JSON:', err);
          }
        };
        reader.readAsText(file);
      }
    },
    [onImportFile],
  );

  const classNames = c('unstyled', className);

  return (
    <button className={classNames} type="button" onClick={handleClick} role={role} tabIndex={tabIndex}>
      Download
    </button>
  );
}

{
  /* <div className="flex items-center">
        <input id="res-gen-file-input" type="file" accept=".json" onChange={handleChange} />
      </div> */
}
