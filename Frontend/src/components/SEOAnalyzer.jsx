// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { FiSearch, FiBarChart2, FiAlertCircle } from "react-icons/fi";
// import { FaCode } from "react-icons/fa";
// import SEOResultsDisplay from "./SEOResultsDisplay";
// import ResultsDisplay from "./ResultsDisplay";

// function SEOAnalyzer() {
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState(null);
//   const [activeTab, setActiveTab] = useState("seo");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/scrape`, { url });
//       setResults(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || err.message || 'An error occurred during the analysis');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
//       <motion.div
//         className="max-w-4xl mx-auto"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <header className="mb-10 text-center">
//           <motion.div 
//             className="flex items-center justify-center mb-3"
//             initial={{ scale: 0 }}
//             animate={{ scale: 1, rotate: 360 }}
//             transition={{ duration: 0.5, type: 'spring' }}
//           >
//             <FaCode className="text-5xl text-primary" />
//           </motion.div>
//           <motion.h1 
//             className="text-4xl font-bold text-gray-800 mb-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             SEO Analyzer Tool
//           </motion.h1>
//           <motion.p 
//             className="text-gray-600"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             Analyze your website's SEO performance and improve rankings
//           </motion.p>
//         </header>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
//           <div className="p-5">
//             {!results && (
//               <form onSubmit={handleSubmit} className="mb-6">
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <div className="flex-grow">
//                     <input
//                       type="url"
//                       value={url}
//                       onChange={(e) => setUrl(e.target.value)}
//                       placeholder="Enter website URL (e.g., https://example.com)"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       required
//                       disabled={loading}
//                     />
//                   </div>
//                   <motion.button
//                     type="submit"
//                     className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={loading}
//                     whileHover={{ scale: loading ? 1 : 1.03 }}
//                     whileTap={{ scale: loading ? 1 : 0.98 }}
//                   >
//                     {loading ? 'Processing...' : 'Analyze Website'}
//                   </motion.button>
//                 </div>
//               </form>
//             )}
            
//             <AnimatePresence>
//               {loading && (
//                 <motion.div 
//                   className="flex justify-center items-center py-8"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <div className="flex flex-col items-center">
//                     <div className="w-10 h-10 border-3 border-gray-800 border-t-transparent rounded-full animate-spin mb-3"></div>
//                     <p className="text-gray-600 text-sm">Analyzing website...</p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
            
//             <AnimatePresence>
//               {error && (
//                 <motion.div 
//                   className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 flex items-start"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                 >
//                   <FiAlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
//                   <span className="text-sm">{error}</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
            
//             <AnimatePresence>
//               {results && !loading && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-lg font-semibold text-gray-800">Results for: {results.url}</h2>
//                     <button 
//                       onClick={() => {
//                         setResults(null);
//                         setError(null);
//                         setUrl("");
//                       }}
//                       className="text-sm text-blue-600 hover:text-blue-800 underline"
//                     >
//                       Analyze Another Website
//                     </button>
//                   </div>
                  
//                   {/* Simple Tabs */}
//                   <div className="mb-6 border-b border-gray-200">
//                     <div className="flex space-x-6">
//                       <button
//                         onClick={() => setActiveTab("seo")}
//                         className={`pb-2 font-medium ${
//                           activeTab === "seo" 
//                             ? "text-blue-600 border-b-2 border-blue-600" 
//                             : "text-gray-500 hover:text-gray-700"
//                         }`}
//                       >
//                         <FiBarChart2 className="inline-block mr-1" /> 
//                         SEO Analysis
//                       </button>
                      
//                       <button
//                         onClick={() => setActiveTab("basic")}
//                         className={`pb-2 font-medium ${
//                           activeTab === "basic" 
//                             ? "text-blue-600 border-b-2 border-blue-600" 
//                             : "text-gray-500 hover:text-gray-700"
//                         }`}
//                       >
//                         <FiSearch className="inline-block mr-1" /> 
//                         Basic Analysis
//                       </button>
//                     </div>
//                   </div>
                  
//                  {/* Tab Content */}
//                  <motion.div
//                     key={activeTab}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="mt-4"
//                   >
//                     {activeTab === "seo" && <SEOResultsDisplay results={results} />}
//                     {activeTab === "basic" && <ResultsDisplay results={results} />}
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
        
//       </motion.div>
//     </div>
//   );
// }

// export default SEOAnalyzer;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FiSearch, FiBarChart2, FiAlertCircle } from "react-icons/fi";
import { FaCode, FaGithub } from "react-icons/fa";
import SEOResultsDisplay from "./SEOResultsDisplay";
import ResultsDisplay from "./ResultsDisplay";

function SEOAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("seo");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/scrape`, { url });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred during the analysis');
    } finally {
      setLoading(false);
    }
  };

  const validateUrl = (value) => {
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return urlRegex.test(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-10 text-center">
          <motion.div 
            className="flex items-center justify-center mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <FaCode className="text-5xl text-gray-800" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SEO Analyzer Tool
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Analyze your website's SEO performance and improve rankings
          </motion.p>
        </header>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="p-5">
            {!results && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">SEO Analysis</h2>
                  <p className="text-gray-600 text-sm">Enter a URL to analyze your website's SEO performance.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div className="relative">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter website URL (e.g., example.com)"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                        disabled={loading}
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
                    <FiSearch className="mr-2" />
                    {loading ? 'Analyzing...' : 'Analyze Website'}
                  </motion.button>
                </form>
              </div>
            )}

            <AnimatePresence>
              {loading && (
                <motion.div 
                  className="flex justify-center items-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-3 border-gray-800 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-600 text-sm">Analyzing website...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 flex items-start"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiAlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {results && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Results</h2>
                  <motion.button
                    onClick={() => {
                      setResults(null);
                      setError(null);
                      setUrl("");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    New Analysis
                  </motion.button>
                </div>

                <div className="mb-6">
                  <div className="flex space-x-4 border-b border-gray-200">
                    <motion.button
                      onClick={() => setActiveTab("seo")}
                      className={`pb-2 relative ${
                        activeTab === "seo" 
                          ? "text-gray-800 border-b-2 border-gray-800"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiBarChart2 className="inline-block mr-2" />
                      SEO Analysis
                    </motion.button>
                    <motion.button
                      onClick={() => setActiveTab("basic")}
                      className={`pb-2 relative ${
                        activeTab === "basic" 
                          ? "text-gray-800 border-b-2 border-gray-800" 
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiSearch className="inline-block mr-2" />
                      Basic Analysis
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "seo" && <SEOResultsDisplay results={results} />}
                    {activeTab === "basic" && <ResultsDisplay results={results} />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        {/* GitHub link at bottom */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a 
            href="https://github.com/yourusername/seo-analyzer-tool" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaGithub className="mr-2" />
            View on GitHub
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SEOAnalyzer;