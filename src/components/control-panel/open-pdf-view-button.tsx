import { useAppContext } from '@/context/app-context';

export default function OpenPdfViewButton() {
  const { setIsModalOpen } = useAppContext();

  return (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-2 rounded"
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      Open PDF View
    </button>
  );
}
