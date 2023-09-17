import { v4 as uuidv4 } from 'uuid';

import { useAppContext } from '@/context/app-context';
import { LAYOUTS } from '@/constants';

export default function AddLayoutSingleButton() {
  const { addLayout } = useAppContext();

  const handleClick = () => {
    addLayout({
      layoutId: uuidv4(),
      layoutLeftId: uuidv4(),
      layoutRightId: uuidv4(),
      layoutType: LAYOUTS.DOUBLE,
    });
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={handleClick}
    >
      + Double Column
    </button>
  );
}