import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { shortUrl } = useParams();
  const backendUrl = import.meta.env.VITE_BACK_END_SERVER_URL;

  useEffect(() => {
    // Directly redirect to the backend URL to avoid counting clicks twice
    window.location.href = `${backendUrl}/${shortUrl}`;
  }, [shortUrl, backendUrl]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Redirecting...</h2>
        <p className="text-gray-600">
          You are being redirected to your destination. Please wait a moment.
        </p>
      </div>
    </div>
  );
};

export default Redirect; 