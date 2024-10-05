import c from 'classnames';
import { useCallback, useRef } from 'react';

import { useAppContext } from '@/context/app-context';
import localStorageUtil from '@/utils/localstorage-util';

type UploadJsonButtonProps = {
  className?: string;
  role?: string;
  tabIndex?: 0 | -1;
};

export default function UploadJsonButton({ className, role, tabIndex }: UploadJsonButtonProps) {
  const { onImportFile } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleClick = useCallback((event: React.MouseEvent<HTMLLabelElement>) => {
    event.stopPropagation();
    inputRef.current?.click?.();
  }, []);

  const classNames = c('unstyled', className);

  return (
    <div className={classNames}>
      <label id="custom-label" htmlFor="res-gen-file-input" onClick={handleClick}>
        Upload
      </label>
      <input
        id="res-gen-file-input"
        className="hidden"
        type="file"
        accept=".json"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
}
