import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as urlService from "../../services/urlService";

const UrlDetails = () => {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);

  useEffect(() => {
    const fetchUrlDetails = async () => {
      setLoading(true);
      try {
        const data = await urlService.getUrlByShortUrl(shortUrl);
        setUrl(data);
        setNoteInput(data.note?.content || "");
      } catch (err) {
        setError(err.message || "Failed to load URL details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrlDetails();
  }, [shortUrl]);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUrl = await urlService.updateNote(shortUrl, noteInput);
      setUrl(updatedUrl);
      setIsEditingNote(false);
    } catch (err) {
      setError(err.message || "Failed to update note");
    }
  };

  const handleDeleteNote = async () => {
    try {
      await urlService.deleteNote(shortUrl);
      setUrl({ ...url, note: null });
      setNoteInput("");
    } catch (err) {
      setError(err.message || "Failed to delete note");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy URL. Please try again.");
      });
  };

  const fullShortUrl = `yoursite.com/${shortUrl}`;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-900"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Dashboard
        </button>

        {loading ? (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-indigo-600 text-4xl mb-4"></i>
            <p className="text-gray-600">Loading URL details...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-lg">
            <p className="flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </p>
          </div>
        ) : url ? (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {/* Header with URL info */}
            <div className="px-4 py-5 sm:px-6 bg-indigo-50">
              <h2 className="text-2xl font-bold text-gray-900">URL Details</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Created on {new Date(url.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Main content */}
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Short URL */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Short URL
                  </h3>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-indigo-600 font-medium mr-2">
                      {fullShortUrl}
                    </span>
                    <button
                      onClick={() => copyToClipboard(fullShortUrl)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Copy to clipboard"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                </div>

                {/* Original URL */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Original URL
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg break-all">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {url.originalUrl}
                    </a>
                  </div>
                </div>

                {/* QR Code */}
                {url.qrCode && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      QR Code
                    </h3>
                    <div className="bg-white p-3 border rounded-lg inline-block">
                      <img
                        src={url.qrCode}
                        alt="QR Code"
                        className="w-40 h-40"
                      />
                    </div>
                  </div>
                )}

                {/* Note */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Note
                  </h3>
                  {!isEditingNote ? (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {url.note ? (
                        <div>
                          <p className="text-gray-700">{url.note.content}</p>
                          <div className="mt-2 flex space-x-2">
                            <button
                              onClick={() => setIsEditingNote(true)}
                              className="text-indigo-600 hover:text-indigo-900 text-sm"
                            >
                              <i className="fas fa-edit mr-1"></i> Edit
                            </button>
                            <button
                              onClick={handleDeleteNote}
                              className="text-red-600 hover:text-red-900 text-sm"
                            >
                              <i className="fas fa-trash-alt mr-1"></i> Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-500 italic">
                            No note added yet.
                          </p>
                          <button
                            onClick={() => setIsEditingNote(true)}
                            className="mt-2 text-indigo-600 hover:text-indigo-900 text-sm"
                          >
                            <i className="fas fa-plus mr-1"></i> Add Note
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleNoteSubmit}>
                      <textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        placeholder="Add a note about this URL"
                      ></textarea>
                      <div className="mt-2 flex space-x-2">
                        <button
                          type="submit"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save Note
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingNote(false);
                            setNoteInput(url.note?.content || "");
                          }}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Analytics */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Analytics
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Total Clicks
                      </h4>
                      <div className="text-3xl font-bold text-indigo-600">
                        {url.clicks}
                      </div>
                    </div>

                    {/* Future Analytics Preview */}
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <span>Coming Soon</span>
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Preview
                        </span>
                      </h4>

                      {/* Placeholder Chart */}
                      <div className="mt-4">
                        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <i className="fas fa-chart-line text-4xl text-gray-400 mb-2"></i>
                              <p className="text-gray-600">
                                Click analytics over time
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                This feature will be available soon!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Future Features List */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-md p-3 bg-white">
                          <div className="flex items-center text-gray-500">
                            <i className="fas fa-globe text-indigo-400 mr-2"></i>
                            <span>Geographic Distribution</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3 bg-white">
                          <div className="flex items-center text-gray-500">
                            <i className="fas fa-desktop text-indigo-400 mr-2"></i>
                            <span>Device Analytics</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3 bg-white">
                          <div className="flex items-center text-gray-500">
                            <i className="fas fa-clock text-indigo-400 mr-2"></i>
                            <span>Time of Day Insights</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3 bg-white">
                          <div className="flex items-center text-gray-500">
                            <i className="fas fa-user-friends text-indigo-400 mr-2"></i>
                            <span>Referrer Tracking</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <i className="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">URL Not Found</h3>
            <p className="text-gray-600">
              The URL you are looking for doesn't exist or you don't have
              permission to view it.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default UrlDetails;
