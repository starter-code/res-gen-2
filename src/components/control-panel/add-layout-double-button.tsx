import { v4 as uuidv4 } from 'uuid';

import { LAYOUTS } from '@/constants';
import { useAppContext } from '@/context/app-context';

export default function AddLayoutSingleButton() {
  const { addLayout, isEditorVisible } = useAppContext();

  const handleClick = () => {
    addLayout({
      layoutId: uuidv4(),
      layoutLeftId: uuidv4(),
      layoutRightId: uuidv4(),
      layoutType: LAYOUTS.DOUBLE,
    });
  };

  if (isEditorVisible) {
    return null;
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
      type="button"
      onClick={handleClick}
    >
      + Double Column Layout
    </button>
  );
}
