import { useAppContext } from '@/context/app-context';

export default function RemoveBottomLayoutButton() {
  const { popLayout, isEditorVisible } = useAppContext();

  const handleClick = () => {
    popLayout();
  };

  if (isEditorVisible) {
    return null;
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
      type="button"
      onClick={handleClick}
    >
      - Remove Layout
    </button>
  );
}
