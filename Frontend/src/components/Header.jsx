import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaCode,
  FaRobot,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="md:hidden">
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

            <motion.div
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/scraper"
                className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
              >
                <FaChartBar className="mr-1 text-xs" /> SEO Audit
              </Link>
            </motion.div>

            {/* <motion.div
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/features"
                className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
              >
                <FaSearch className="mr-1 text-xs" /> Scraper
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="text-white hover:text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
              >
                <FaRobot className="mr-1 text-xs" /> About
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="bg-white text-gray-800 hover:bg-gray-300 hover:text-gray-900 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 shadow-md block"
              >
                Contact Us
              </Link>
            </motion.div> */}
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
                <motion.a
                  href="#features"
                  className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaSearch className="mr-2" /> Scraper
                </motion.a>
                <motion.a
                  href="#seo"
                  className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaChartBar className="mr-2" /> SEO Audit
                </motion.a>
                <motion.a
                  href="#about"
                  className="text-white hover:text-gray-300 py-2 px-3 block rounded-md text-sm font-medium flex items-center"
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaRobot className="mr-2" /> About
                </motion.a>
                <motion.button
                  className="bg-white text-gray-800 hover:bg-gray-300 hover:text-gray-900 py-2 px-3 w-full rounded-md text-sm font-medium transition-colors duration-300 flex justify-center items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.button>
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
