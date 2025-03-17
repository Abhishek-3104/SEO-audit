// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiSearch, FiGlobe } from 'react-icons/fi';

// function ScraperForm({ onSubmit, disabled }) {
//   const [url, setUrl] = useState('');
//   const [isValid, setIsValid] = useState(true);

//   const validateUrl = (value) => {
//     // Basic URL validation
//     const pattern = new RegExp(
//       '^(https?:\\/\\/)?' +
//       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
//       '((\\d{1,3}\\.){3}\\d{1,3}))' +
//       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
//       '(\\?[;&a-z\\d%_.~+=-]*)?' +
//       '(\\#[-a-z\\d_]*)?$',
//       'i'
//     );
//     return pattern.test(value);
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setUrl(value);
    
//     if (value) {
//       setIsValid(validateUrl(value));
//     } else {
//       setIsValid(true);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (url && validateUrl(url)) {
//       // Add https:// if not present
//       let processedUrl = url;
//       if (!/^https?:\/\//i.test(url)) {
//         processedUrl = 'https://' + url;
//       }
//       onSubmit(processedUrl);
//     } else {
//       setIsValid(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6">
//       <div className="flex flex-col space-y-2">
//         <label htmlFor="url-input" className="text-gray-700 font-medium">
//           Enter a website URL to analyze
//         </label>
        
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FiGlobe className="text-gray-400" />
//           </div>
//           <input
//             id="url-input"
//             type="text"
//             value={url}
//             onChange={handleChange}
//             placeholder="https://example.com"
//             disabled={disabled}
//             className={`w-full pl-10 pr-16 py-3 border ${
//               isValid ? 'border-gray-300' : 'border-red-500'
//             } rounded-lg focus:outline-none focus:ring-2 ${
//               isValid ? 'focus:ring-primary/50' : 'focus:ring-red-500/50'
//             } transition-colors`}
//           />
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <motion.button
//               type="submit"
//               disabled={disabled}
//               className="h-full px-4 bg-primary text-white rounded-r-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
//               whileHover={{ backgroundColor: '#005bb9' }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ duration: 0.2 }}
//             >
//               <FiSearch className="mr-2" />
//               {disabled ? 'Analyzing...' : 'Analyze'}
//             </motion.button>
//           </div>
//         </div>
        
//         {!isValid && (
//           <motion.p 
//             className="text-red-500 text-sm mt-1"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Please enter a valid URL
//           </motion.p>
//         )}
        
//         <div className="text-gray-500 text-sm mt-1">
//           Example: https://wikipedia.org, github.com
//         </div>
//       </div>
//     </form>
//   );
// }

// export default ScraperForm;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiGlobe } from 'react-icons/fi';

function ScraperForm({ onSubmit, disabled }) {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (value) => {
    // Basic URL validation regex
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return urlRegex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValid(value === '' || validateUrl(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!url) {
      setIsValid(false);
      return;
    }

    if (validateUrl(url)) {
      let processedUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        processedUrl = 'https://' + url;
      }
      
      onSubmit(processedUrl);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Web Scraper</h2>
        <p className="text-gray-600 text-sm">Enter a URL to analyze and extract data from any website.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiGlobe className={`${isValid ? 'text-gray-400' : 'text-red-400'}`} />
            </div>
            <input
              type="text"
              value={url}
              onChange={handleChange}
              disabled={disabled}
              placeholder="Enter website URL (e.g., example.com)"
              className={`block w-full pl-10 pr-3 py-3 border ${
                isValid ? 'border-gray-300 focus:border-primary' : 'border-red-300 focus:border-red-500'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 ${
                isValid ? 'focus:ring-primary' : 'focus:ring-red-500'
              } transition duration-200`}
            />
          </div>
          {!isValid && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Please enter a valid URL
            </motion.p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={disabled}
          className="w-full flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
        >
          <FiSearch className="mr-2" />
          {disabled ? 'Analyzing...' : 'Analyze Website'}
        </motion.button>
        
      </form>
    </div>
  );
}

export default ScraperForm;