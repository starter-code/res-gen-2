import { useAppContext } from '@/context/app-context';

export default function OpenPdfViewButton() {
  const { togglePdfModal } = useAppContext();

  return (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-2 rounded"
      onClick={() => {
        togglePdfModal();
      }}
    >
      Open PDF View
    </button>
  );
}
