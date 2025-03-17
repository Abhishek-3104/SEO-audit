import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart, FaCode, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      className="bg-gray-800 py-6 px-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated top divider */}
        <motion.div 
          className="h-0.5 bg-white/60 mb-6 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-3">
              <motion.div 
                className="bg-white p-1.5 rounded-full mr-2 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <FaCode className="text-gray-800 text-lg" />
              </motion.div>
              <h3 className="text-lg font-bold">Scrape Genie</h3>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed mb-2">
              Powerful web scraping and SEO auditing tool to help you analyze and optimize your online presence.
            </p>
            <p className="text-xs text-gray-400">
              © {currentYear} Scrape Genie. All rights reserved.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:mx-auto md:w-4/5"
          >
            <h3 className="text-base font-bold mb-3">Quick Links</h3>
            <ul className="space-y-1.5 text-sm">
              {[
                { href: "#features", label: "Web Scraper" },
                { href: "#seo", label: "SEO Audit" },
                { href: "#about", label: "About Us" },
                { href: "#pricing", label: "Pricing" },
                { href: "#privacy", label: "Privacy Policy" }
              ].map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-1 text-xs">›</span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact & Social */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-base font-bold mb-3">Connect With Us</h3>
            <motion.a
              href="mailto:contact@scrapegenie.com"
              className="text-gray-300 text-xs mb-3 flex items-center hover:text-white transition-colors duration-300"
              whileHover={{ x: 3 }}
            >
              <FaEnvelope className="mr-1" /> contact@scrapegenie.com
            </motion.a>
            
            <div className="flex space-x-3 mb-4">
              {[
                { icon: <FaGithub />, href: "https://github.com/scrapegenie" },
                { icon: <FaTwitter />, href: "https://twitter.com/scrapegenie" },
                { icon: <FaLinkedin />, href: "https://linkedin.com/company/scrapegenie" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="bg-gray-700 hover:bg-white p-2 rounded-full text-white hover:text-gray-800 transition-all duration-300 text-sm"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <motion.div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white placeholder-gray-400 px-3 py-1.5 rounded-md text-xs w-full focus:outline-none focus:ring-1 focus:ring-white/50"
              />
              <motion.button
                className="bg-white text-gray-800 hover:bg-gray-300 hover:text-gray-900 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-300 shadow-md mt-2 w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe to Newsletter
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-5 pt-3 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-xs text-gray-400">
            <a href="#terms" className="hover:text-white mr-3 transition-colors duration-300">Terms</a>
            <a href="#privacy" className="hover:text-white transition-colors duration-300">Privacy</a>
          </div>
          
          <p className="text-center text-gray-400 text-xs flex items-center justify-center">
            Made with <FaHeart className="text-red-400 mx-1 animate-pulse" /> for web developers and SEO specialists
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;