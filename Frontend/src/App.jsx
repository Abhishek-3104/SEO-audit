import React from 'react';
import WebScraper from './components/WebScraper';
import { motion } from 'framer-motion';
import { FaCode, FaGithub } from 'react-icons/fa';

function App() {
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

        <WebScraper />
      </motion.div>
    </div>
  );
}

export default App;