import { useAppContext } from '@/context/app-context';

export default function TopBar() {
  const { setIsModalOpen } = useAppContext();

  return (
    <div className="bg-blue-500 p-4 flex justify-end items-center">
      <button className="text-white hover:text-gray-300" onClick={() => setIsModalOpen(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
