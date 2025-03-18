// CompetitorAnalysis.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FiSearch,
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

function CompetitorAnalysis() {
  const [url, setUrl] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/analyze-competitor`,
        {
          url,
          competitorUrl,
        }
      );

      setResults(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred during the analysis"
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to render comparison arrows
  const renderComparisonIndicator = (yourValue, competitorValue) => {
    if (yourValue > competitorValue) {
      return <FiTrendingUp className="text-green-500" />;
    } else if (yourValue < competitorValue) {
      return <FiTrendingDown className="text-red-500" />;
    }
    return <FiMinus className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Competitor Analysis
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL (e.g., example.com)"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
              disabled={loading}
              required
            />
          </div>

          <div className="relative">
            <input
              type="url"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              placeholder="Enter competitor URL (e.g., competitor.com)"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
              disabled={loading}
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center">
              <FiSearch className="mr-2" /> Compare Websites
            </span>
          )}
        </motion.button>
      </form>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Comparison Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-md font-medium text-gray-700 mb-3">
                Your Website
              </h4>
              <p className="text-sm text-gray-500 mb-1">URL</p>
              <p className="text-gray-800 mb-3 break-all">
                {results.yourSite.url}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">SEO Score</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.yourSite.seoScore}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Word Count</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.yourSite.wordCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Internal Links</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.yourSite.internalLinks}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">External Links</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.yourSite.externalLinks}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-md font-medium text-gray-700 mb-3">
                Competitor Website
              </h4>
              <p className="text-sm text-gray-500 mb-1">URL</p>
              <p className="text-gray-800 mb-3 break-all">
                {results.competitor.url}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">SEO Score</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.competitor.seoScore}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Word Count</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.competitor.wordCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Internal Links</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.competitor.internalLinks}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">External Links</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.competitor.externalLinks}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">
              Side-by-Side Comparison
            </h4>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Metric
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Your Website
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Comparison
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Competitor
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SEO Score
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.yourSite.seoScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex justify-center">
                        {renderComparisonIndicator(
                          results.yourSite.seoScore,
                          results.competitor.seoScore
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.competitor.seoScore}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Word Count
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.yourSite.wordCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex justify-center">
                        {renderComparisonIndicator(
                          results.yourSite.wordCount,
                          results.competitor.wordCount
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.competitor.wordCount}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Internal Links
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.yourSite.internalLinks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex justify-center">
                        {renderComparisonIndicator(
                          results.yourSite.internalLinks,
                          results.competitor.internalLinks
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.competitor.internalLinks}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      External Links
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.yourSite.externalLinks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex justify-center">
                        {renderComparisonIndicator(
                          results.yourSite.externalLinks,
                          results.competitor.externalLinks
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {results.competitor.externalLinks}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">
              Key Insights
            </h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="space-y-2">
                {results.insights.length === 0 ? (
                  <li className="text-gray-500">
                    No significant differences found
                  </li>
                ) : (
                  results.insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <FiBarChart2 className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">{insight}</span>
                    </li>
                  ))
                )}

                {/* Additional insights based on data */}
                {results.yourSite.seoScore >
                  results.competitor.seoScore + 10 && (
                  <li className="flex items-start">
                    <FiBarChart2 className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Your SEO score is significantly higher than your
                      competitor
                    </span>
                  </li>
                )}

                {results.competitor.seoScore >
                  results.yourSite.seoScore + 10 && (
                  <li className="flex items-start">
                    <FiBarChart2 className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Your competitor has a significantly higher SEO score
                    </span>
                  </li>
                )}

                {results.competitor.wordCount >
                  results.yourSite.wordCount * 1.5 && (
                  <li className="flex items-start">
                    <FiBarChart2 className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Your competitor has much more content - consider expanding
                      your content
                    </span>
                  </li>
                )}

                {results.yourSite.wordCount >
                  results.competitor.wordCount * 1.5 && (
                  <li className="flex items-start">
                    <FiBarChart2 className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Your page has significantly more content than your
                      competitor
                    </span>
                  </li>
                )}

                {results.competitor.internalLinks >
                  results.yourSite.internalLinks * 2 && (
                  <li className="flex items-start">
                    <FiBarChart2 className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Your competitor has many more internal links - consider
                      improving your site's internal linking structure
                    </span>
                  </li>
                )}

                {results.competitor.externalLinks >
                  results.yourSite.externalLinks * 2 && (
                  <li className="flex items-start">
                    <FiBarChart2 className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Your competitor links to more external sources, which may
                      improve their credibility
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">
              Recommendations
            </h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="space-y-2">
                {results.yourSite.seoScore < results.competitor.seoScore && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Focus on improving your SEO score to match or exceed your
                      competitor
                    </span>
                  </li>
                )}

                {results.yourSite.wordCount < results.competitor.wordCount && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Consider adding more high-quality content to your page
                    </span>
                  </li>
                )}

                {results.yourSite.internalLinks <
                  results.competitor.internalLinks && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Improve your internal linking structure to help with SEO
                      and user navigation
                    </span>
                  </li>
                )}

                {results.yourSite.externalLinks <
                  results.competitor.externalLinks && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">
                      Consider adding more links to authoritative external
                      sources to improve credibility
                    </span>
                  </li>
                )}

                {results.yourSite.seoScore >= results.competitor.seoScore &&
                  results.yourSite.wordCount >= results.competitor.wordCount &&
                  results.yourSite.internalLinks >=
                    results.competitor.internalLinks && (
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">
                        Your page is performing well compared to your
                        competitor! Continue to monitor and maintain your
                        advantage.
                      </span>
                    </li>
                  )}

                <li className="flex items-start">
                  <FiAlertCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-800">
                    Regularly analyze your competitor's content and SEO
                    strategies to stay competitive
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CompetitorAnalysis;