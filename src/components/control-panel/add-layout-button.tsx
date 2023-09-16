import { v4 as uuidv4 } from 'uuid';

import { useAppContext } from '@/context/app-context';

export default function AddLayoutButton() {
  const { addLayout } = useAppContext();

  const handleClick = () => {
    addLayout({ id: uuidv4(), name: uuidv4() });
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={handleClick}
    >
      Add Single Column Layout
    </button>
  );
}
