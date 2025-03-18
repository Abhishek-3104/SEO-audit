// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import ScraperForm from './ScraperForm';
// import ResultsDisplay from './ResultsDisplay';
// import axios from 'axios';
// import { FiAlertCircle, FiLoader } from 'react-icons/fi';

// function WebScraper() {
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleScrape = async (url) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Change this URL to match your backend server
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/scrape`, { url });
//       setResults(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || err.message || 'Failed to scrape website');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
//       <div className="p-5">
//         <ScraperForm onSubmit={handleScrape} disabled={loading} />
        
//         <AnimatePresence>
//           {loading && (
//             <motion.div 
//               className="flex justify-center items-center py-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className="flex flex-col items-center">
//                 <div className="w-10 h-10 border-3 border-gray-800 border-t-transparent rounded-full animate-spin mb-3"></div>
//                 <p className="text-gray-600 text-sm">Analyzing website...</p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         <AnimatePresence>
//           {error && (
//             <motion.div 
//               className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 flex items-start"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//             >
//               <FiAlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
//               <span className="text-sm">{error}</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         <AnimatePresence>
//           {results && !loading && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3 }}
//               className="mt-2"
//             >
//               <ResultsDisplay results={results} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default WebScraper;





import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiAlertCircle } from 'react-icons/fi';
import { FaCode, FaGithub } from 'react-icons/fa';
import ScraperForm from './ScraperForm';
import ResultsDisplay from './ResultsDisplay';

function WebScraper() {
  // WebScraper state
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScrape = async (url) => {
    setLoading(true);
    setError(null);
    
    try {
      // Change this URL to match your backend server
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/scrape`, { url });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to scrape website');
    } finally {
      setLoading(false);
    }
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
            <FaCode className="text-5xl text-primary" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Web Scraper Tool
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Extract and analyze content from any website with ease
          </motion.p>
        </header>

        {/* WebScraper component integrated directly */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="p-5">
            {/* ScraperForm integrated directly */}
            <ScraperForm onSubmit={handleScrape} disabled={loading} />
            
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
            
            <AnimatePresence>
              {results && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <ResultsDisplay results={results} />
                </motion.div>
              )}
            </AnimatePresence>
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
            href="https://github.com/yourusername/web-scraper-tool" 
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

export default WebScraper