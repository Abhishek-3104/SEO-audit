// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaSearch,
//   FaCode,
//   FaRobot,
//   FaChartBar,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <motion.header
//       className="bg-gray-800 py-3 px-4 shadow-lg relative z-50"
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center">
//           {/* Logo and Title */}
//           <motion.div
//             className="flex items-center"
//             whileHover={{ scale: 0.9 }}
//             transition={{ type: "spring", stiffness: 100 }}
//           >
//             <motion.div
//               className="bg-white p-1.5 rounded-full mr-2 shadow-md"
//               initial={{ rotate: 0 }}
//               animate={{ rotate: 360 }}
//               transition={{ duration: 0.8, ease: "easeInOut" }}
//             >
//               <FaCode className="text-gray-800 text-xl" />
//             </motion.div>
//             <div>
//               <Link to="/">
//                 <h1 className="text-white text-lg md:text-xl font-bold tracking-tight">
//                   Scrape Genie
//                 </h1>
//                 <p className="text-gray-300 text-xs hidden md:block">
//                   SEO Audit & Web Scraping Tool
//                 </p>
//               </Link>
//             </div>
//           </motion.div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <motion.button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               whileTap={{ scale: 0.95 }}
//               className="text-white p-2"
//             >
//               {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//             </motion.button>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-2">
//             <motion.div
//               whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 to="/scrape"
//                 className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
//               >
//                 <FaSearch className="mr-1 text-xs" /> Web Scraper
//               </Link>
//             </motion.div>

//             <motion.div
//               whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 to="/seo"
//                 className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
//               >
//                 <FaChartBar className="mr-1 text-xs" /> SEO Analysis
//               </Link>
//             </motion.div>

//             <motion.div
//               whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 to="/competitor"
//                 className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
//               >
//                 <FaRobot className="mr-1 text-xs" /> Competitor Analysis
//               </Link>
//             </motion.div>
//           </nav>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               className="md:hidden absolute left-0 right-0 bg-gray-900 shadow-lg mt-3 rounded-b-lg overflow-hidden"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="px-4 py-3 space-y-2">
//                 <Link to="/">
//                   <motion.div
//                     className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
//                     whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <FaSearch className="mr-2" /> Web Scraper
//                   </motion.div>
//                 </Link>

//                 <Link to="/seo">
//                   <motion.div
//                     className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
//                     whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <FaChartBar className="mr-2" /> SEO Analysis
//                   </motion.div>
//                 </Link>

//                 <Link to="/competitor">
//                   <motion.div
//                     className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
//                     whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <FaRobot className="mr-2" /> Competitor Analysis
//                   </motion.div>
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Animated underline */}
//       <motion.div
//         className="h-0.5 bg-white/60 mt-3 mx-auto rounded-full"
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: 1, delay: 0.5 }}
//       />
//     </motion.header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaCode,
  FaRobot,
  FaChartBar,
  FaBars,
  FaTimes,
  FaGoogle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/status`,
        { withCredentials: true }
      );
      if (response.data.isAuthenticated) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    checkAuthStatus();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.header
      className="bg-gray-800 py-3 px-4 shadow-lg relative z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="bg-white p-1.5 rounded-full mr-2 shadow-md"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <FaCode className="text-gray-800 text-xl" />
            </motion.div>
            <div>
              <Link to="/">
                <h1 className="text-white text-lg md:text-xl font-bold tracking-tight">
                  Scrape Genie
                </h1>
                <p className="text-gray-300 text-xs hidden md:block">
                  SEO Audit & Web Scraping Tool
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {!user ? (
              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mr-3 bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-medium flex items-center"
              >
                <FaGoogle className="mr-1" /> Login
              </motion.button>
            ) : (
              <motion.div className="mr-3 relative" whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-white"
                >
                  <FaUserCircle className="text-xl" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 py-2 text-sm text-gray-200 border-b border-gray-600">
                        {user.displayName || user.email}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                      >
                        <FaSignOutAlt className="inline mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="text-white p-2"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {user && (
              <>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/scrape"
                    className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaSearch className="mr-1 text-xs" /> Web Scraper
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/seo"
                    className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaChartBar className="mr-1 text-xs" /> SEO Analysis
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/competitor"
                    className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaRobot className="mr-1 text-xs" /> Competitor Analysis
                  </Link>
                </motion.div>
              </>
            )}

            {!user ? (
              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-800 px-4 py-1.5 rounded-md text-sm font-medium flex items-center ml-4"
              >
                <FaGoogle className="mr-2" /> Login with Google
              </motion.button>
            ) : (
              <motion.div className="relative ml-4" whileTap={{ scale: 0.98 }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-white bg-gray-700 px-3 py-1.5 rounded-md"
                >
                  <FaUserCircle className="mr-2" />
                  <span className="mr-1">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                    
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                      >
                        <FaSignOutAlt className="inline mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute left-0 right-0 bg-gray-900 shadow-lg mt-3 rounded-b-lg overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3 space-y-2">
                {user ? (
                  <>
                    <Link to="/scrape">
                      <motion.div
                        className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaSearch className="mr-2" /> Web Scraper
                      </motion.div>
                    </Link>

                    <Link to="/seo">
                      <motion.div
                        className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaChartBar className="mr-2" /> SEO Analysis
                      </motion.div>
                    </Link>

                    <Link to="/competitor">
                      <motion.div
                        className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaRobot className="mr-2" /> Competitor Analysis
                      </motion.div>
                    </Link>

                    <motion.div
                      className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
                      whileHover={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center justify-center bg-gray-700"
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleGoogleLogin();
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaGoogle className="mr-2" /> Login with Google
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated underline */}
      <motion.div
        className="h-0.5 bg-white/60 mt-3 mx-auto rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.header>
  );
};

export default Header;
