import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UrlModal = ({ isOpen, onClose, url }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";
  const fullUrl = url ? `${baseUrl}/${url.shortUrl}` : '';
  const [copyNotification, setCopyNotification] = useState({
    visible: false,
    message: ""
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  if (!isOpen || !url) return null;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopyNotification({
          visible: true,
          message: "URL copied to clipboard!"
        });
        
        // Hide notification after 2 seconds
        setTimeout(() => {
          setCopyNotification({
            visible: false,
            message: ""
          });
        }, 2000);
      })
      .catch(() => {
        setCopyNotification({
          visible: true,
          message: "Failed to copy URL. Please try again."
        });
        
        // Hide notification after 2 seconds
        setTimeout(() => {
          setCopyNotification({
            visible: false,
            message: ""
          });
        }, 2000);
      });
  };

  const viewDetails = () => {
    navigate(`/url/${url.shortUrl}`);
    onClose();
  };

  // Truncate long URLs for display
  const truncateUrl = (urlString, maxLength = 40) => {
    return urlString.length > maxLength
      ? `${urlString.substring(0, maxLength)}...`
      : urlString;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all p-6"
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            URL Created Successfully!
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        <div className="space-y-4">
          {/* QR Code */}
          {url.qrCode && (
            <div className="flex justify-center mb-4">
              <div className="bg-white p-2 border rounded-lg">
                <img
                  src={url.qrCode}
                  alt="QR Code"
                  className="w-40 h-40"
                />
              </div>
            </div>
          )}

          {/* Short URL */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Short URL</h4>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg">
              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium mr-2 hover:underline truncate flex-1"
              >
                {fullUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-gray-600 p-1"
                title="Copy to clipboard"
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
            
            {/* Copy notification */}
            {copyNotification.visible && (
              <div className="mt-2 transition-opacity duration-300 opacity-100">
                <div className="bg-indigo-50 text-indigo-700 p-2 rounded-md text-sm flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  {copyNotification.message}
                </div>
              </div>
            )}
          </div>

          {/* Original URL */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Original URL</h4>
            <div className="bg-gray-100 p-3 rounded-lg break-all text-gray-600">
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {truncateUrl(url.originalUrl)}
              </a>
            </div>
          </div>

          {/* Note if exists */}
          {url.note && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Note</h4>
              <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                {url.note.content}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={viewDetails}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlModal; 