import { useAppContext } from '@/context/app-context';

export default function ToggleEditorPanelButton() {
  const { toggleEditor } = useAppContext();

  return (
    <button
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 m-2 rounded"
      type="button"
      onClick={() => toggleEditor()}
    >
      Toggle Editor
    </button>
  );
}
