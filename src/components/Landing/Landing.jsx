import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Landing = () => {
  const { user } = useContext(UserContext);
  const [longUrl, setLongUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { longUrl, customUrl });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
            Simplify Your Links. Amplify Your Reach.
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
          Shorten long URLs in seconds and track performance with real-time analytics.
          Perfect for businesses, creators, and anyone who shares links.
          </p>

          {/* URL Shortener Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-link text-indigo-500 mr-2"></i>
                  <label
                    htmlFor="longUrl"
                    className="text-gray-700 font-medium text-left"
                  >
                    Enter your long URL:
                  </label>
                </div>
                <input
                  type="url"
                  id="longUrl"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="https://example.com/your-very-long-url-goes-here"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  disabled={!user}
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <i className="fas fa-edit text-indigo-500 mr-2"></i>
                  <label
                    htmlFor="customUrl"
                    className="text-gray-700 font-medium text-left"
                  >
                    Customize your short URL (optional):
                  </label>
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                    yoursite.com/
                  </span>
                  <input
                    type="text"
                    id="customUrl"
                    className="flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="custom-name"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    disabled={!user}
                  />
                </div>
              </div>

              <div className="text-center">
                {user ? (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <i className="fas fa-cut mr-2"></i>
                    Shorten URL
                  </button>
                ) : (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <i className="fas fa-lock mr-2"></i>
                      Please sign in to shorten URLs
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Link
                        to="/sign-in"
                        className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/sign-up"
                        className="px-4 py-2 border border-indigo-500 text-indigo-500 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Use Our URL Shortener?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full mb-4 mx-auto">
                <i className="fas fa-bolt text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple & Fast</h3>
              <p className="text-gray-600">
                Create short URLs in seconds with our easy-to-use interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full mb-4 mx-auto">
                <i className="fas fa-chart-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track clicks and analyze traffic sources for your shortened
                URLs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full mb-4 mx-auto">
                <i className="fas fa-qrcode text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">QR Code Generation</h3>
              <p className="text-gray-600">
                Generate QR codes for your shortened URLs to use in print
                materials.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full mb-4 mx-auto">
                <i className="fas fa-lock text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your links are secured and available 24/7 with high uptime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full mb-4 mx-auto">
                <i className="fas fa-pencil-alt text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom URLs</h3>
              <p className="text-gray-600">
                Create branded, custom shortlinks that reflect your content.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full mb-4 mx-auto">
                <i className="fas fa-sticky-note text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Notes</h3>
              <p className="text-gray-600">
                Attach notes to your URLs to remember why you shortened them.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to shorten your URLs?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our service for their link
            shortening needs.
          </p>

          {!user && (
            <Link
              to="/sign-up"
              className="px-8 py-4 bg-indigo-500 text-white font-medium text-lg rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Get Started - It's Free!
            </Link>
          )}
        </div>
      </section>
    </main>
  );
};

export default Landing;
