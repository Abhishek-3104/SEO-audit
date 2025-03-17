import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScraperForm from './ScraperForm';
import ResultsDisplay from './ResultsDisplay';
import axios from 'axios';
import { FiAlertCircle, FiLoader } from 'react-icons/fi';

function WebScraper() {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div className="p-5">
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
  );
}

export default WebScraper;