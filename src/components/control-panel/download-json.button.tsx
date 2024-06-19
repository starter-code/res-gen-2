import localStorageUtil from '@/utils/localstorage-util';

export default function DownloadJsonButton() {
  const handleClick = () => {
    // Convert JSON data to string
    let jsonString = JSON.stringify(localStorageUtil.data, null, 2);

    // Create a Blob object
    let blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);

    // Create a link element, set its attributes for download
    let a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // File name
    a.textContent = 'Download JSON';

    // Append the link to the body
    document.body.appendChild(a);

    // Click the link programmatically to trigger the download
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
      type="button"
      onClick={handleClick}
    >
      Download Json
    </button>
  );
}
