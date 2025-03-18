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



// // App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import SEOAnalyzer from './components/SEOAnalyzer';
// import CompetitorAnalysis from './components/CompetitorAnalysis';
// // Import your other components

// function App() {
//   return (
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white shadow-sm">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16">
//               <div className="flex">
//                 <div className="flex-shrink-0 flex items-center">
//                   <h1 className="text-xl font-bold text-blue-600">SEO Analyzer</h1>
//                 </div>
//                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                   <Link 
//                     to="/" 
//                     className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                   >
//                     Home
//                   </Link>
//                   <Link
//                     to="/seo"
//                     className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                   >
//                     SEO Analysis
//                   </Link>
//                   <Link
//                     to="/competitor"
//                     className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                   >
//                     Competitor Analysis
//                   </Link>
//                 </div>
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:items-center">
//                 <a
//                   href="https://github.com/yourusername/seo-analyzer"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   GitHub
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <div className="py-10">
//           <Routes>
//             <Route path="/" element={<SEOAnalyzer />} />
//             <Route path="/seo" element={<SEOAnalyzer />} />
//             <Route path="/competitor" element={<CompetitorAnalysis />} />
//             {/* Add other routes as needed */}
//           </Routes>
//         </div>
//       </div>
//   );
// }

// export default App;