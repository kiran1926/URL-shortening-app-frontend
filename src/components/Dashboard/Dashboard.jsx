import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import * as urlService from "../../services/urlService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    originalUrl: "",
    shortUrl: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const urlData = {
        originalUrl: formData.originalUrl,
      };

      if (formData.shortUrl) {
        urlData.shortUrl = formData.shortUrl;
      }

      if (formData.note) {
        urlData.note = formData.note;
      }

      const newUrl = await urlService.createUrl(urlData);

      setUrls([newUrl, ...urls]);

      setFormData({
        originalUrl: "",
        shortUrl: "",
        note: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (e, shortUrl) => {
    e.stopPropagation();
    try {
      await urlService.deleteUrl(shortUrl);
      setUrls(urls.filter((url) => url.shortUrl !== shortUrl));
    } catch (err) {
      setError(err.message || "Failed to delete URL");
    }
  };

  // Navigate to URL details
  const navigateToUrl = (shortUrl) => {
    navigate(`/url/${shortUrl}`);
  };

  const copyToClipboard = (e, text) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy URL. Please try again.");
      });
  };

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      try {
        const data = await urlService.getUserUrls();
        setUrls(data);
      } catch (err) {
        setError("Failed to load your URLs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUrls();
  }, [user]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.email?.split("@")[0]}
          </h1>
          <p className="text-lg text-gray-600">
            Create and manage your shortened URLs.
          </p>
        </div>

        {/* URL Shortener Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Shorten a New URL</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
              <p className="flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <i className="fas fa-link text-indigo-600 mr-2"></i>
                <label
                  htmlFor="originalUrl"
                  className="text-gray-700 font-medium"
                >
                  Enter your long URL:
                </label>
              </div>
              <input
                type="url"
                id="originalUrl"
                name="originalUrl"
                value={formData.originalUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/your-very-long-url-goes-here"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <i className="fas fa-edit text-indigo-600 mr-2"></i>
                <label htmlFor="shortUrl" className="text-gray-700 font-medium">
                  Customize your short URL (optional):
                </label>
              </div>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                  yoursite.com/
                </span>
                <input
                  type="text"
                  id="shortUrl"
                  name="shortUrl"
                  value={formData.shortUrl}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="custom-name"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <i className="fas fa-sticky-note text-indigo-600 mr-2"></i>
                <label htmlFor="note" className="text-gray-700 font-medium">
                  Add a note (optional):
                </label>
              </div>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="What's this URL for?"
                rows="2"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cut mr-2"></i>
                    Shorten URL
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* URLs List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Shortened URLs</h2>

          {loading ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-indigo-600 text-4xl mb-4"></i>
              <p className="text-gray-600">Loading your URLs...</p>
            </div>
          ) : urls.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="inline-block p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <i className="fas fa-link-slash text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">No URLs yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't created any shortened URLs yet. Try creating one
                above!
              </p>
            </div>
          ) : (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Original URL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Short URL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Clicks
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {urls.map((url) => {
                    // Format the date
                    const createdDate = new Date(url.createdAt);
                    const formattedDate = createdDate.toLocaleDateString();

                    // Truncate long URLs for display
                    const truncateUrl = (url, maxLength = 40) => {
                      return url.length > maxLength
                        ? `${url.substring(0, maxLength)}...`
                        : url;
                    };

                    return (
                      <tr
                        key={url.shortUrl}
                        onClick={() => navigateToUrl(url.shortUrl)}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="py-4 pl-4 pr-3 text-sm">
                          <div
                            className="font-medium text-gray-900 truncate max-w-xs"
                            title={url.originalUrl}
                          >
                            {truncateUrl(url.originalUrl)}
                          </div>
                          {url.note && (
                            <div className="mt-1 text-gray-600 text-xs italic">
                              <i className="fas fa-sticky-note mr-1"></i>
                              {url.note.content}
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          <div className="text-indigo-600 font-medium">
                            {url.shortUrl}
                            <button
                              onClick={(e) =>
                                copyToClipboard(
                                  e,
                                  `yoursite.com/${url.shortUrl}`
                                )
                              }
                              className="ml-2 text-gray-400 hover:text-gray-600"
                              title="Copy to clipboard"
                            >
                              <i className="fas fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900">
                          {url.clicks}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {formattedDate}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button
                            onClick={(e) => handleDelete(e, url.shortUrl)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete URL"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
