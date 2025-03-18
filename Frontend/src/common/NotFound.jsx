import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaSadTear } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-800 p-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-700 text-white mb-4"
          >
            <FaSadTear className="text-4xl text-blue-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">404</h1>
          <p className="text-gray-300 mt-2">Page Not Found</p>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 text-center mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/" 
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-300"
              >
                <FaHome className="mr-2" />
                Back to Home
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/scraper" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-300"
              >
                <FaSearch className="mr-2" />
                Try Scraper
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;