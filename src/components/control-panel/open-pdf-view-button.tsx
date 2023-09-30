import { useMemo } from 'react';

import { useAppContext } from '@/context/app-context';

export default function OpenPdfViewButton() {
  const { togglePdfModal, items, layouts } = useAppContext();

  const disabled = useMemo(() => {
    return !(items.length || layouts.length);
  }, [items, layouts]);

  return (
    <button
      type="button"
      disabled={disabled}
      className="disabled:bg-gray-400 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-2 rounded"
      onClick={() => {
        togglePdfModal();
      }}
    >
      Open PDF View
    </button>
  );
}
