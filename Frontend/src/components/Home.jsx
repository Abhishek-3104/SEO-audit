import React from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaChartBar,
  FaSearch,
  FaCode,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-800 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Unlock Website Data with{" "}
                  <span className="text-blue-400">Scrape Genie</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Powerful web scraping and SEO analysis tool to help you
                  extract valuable insights from any website.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <motion.a
                    href="#scraper"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaRocket className="mr-2" /> Try It Now
                  </motion.a>
                  <motion.a
                    href="#features"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaChartBar className="mr-2" /> See Features
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded font-mono text-sm text-blue-400 overflow-hidden">
                    <div className="flex">
                      <span className="text-gray-500 mr-2">$</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        scrape-genie --url https://example.com
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <span className="text-green-400">✓</span> Analyzing
                      website structure...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      <span className="text-green-400">✓</span> Extracting meta
                      data...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.0 }}
                    >
                      <span className="text-green-400">✓</span> Found 24 links,
                      8 images
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4 }}
                    >
                      <span className="text-yellow-400">→</span> Report
                      generated successfully!
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-gray-50 p-6 rounded-lg text-center shadow-sm border border-gray-100"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  5,000+
                </div>
                <div className="text-gray-600">Websites Analyzed</div>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg text-center shadow-sm border border-gray-100"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-gray-800 mb-2">1M+</div>
                <div className="text-gray-600">Data Points Extracted</div>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg text-center shadow-sm border border-gray-100"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  99.9%
                </div>
                <div className="text-gray-600">Accuracy Rate</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive toolkit helps you analyze websites, extract
                data, and gain valuable insights.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FaSearch className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Web Scraping
                </h3>
                <p className="text-gray-600">
                  Extract structured data from any website with our advanced
                  scraping engine. Pull links, images, text, and more.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FaChartBar className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  SEO Analysis
                </h3>
                <p className="text-gray-600">
                  Get comprehensive SEO insights with meta tag analysis, keyword
                  density, and content structure evaluation.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FaCode className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Data Export
                </h3>
                <p className="text-gray-600">
                  Export your data in multiple formats including JSON, CSV, and
                  Excel for further analysis and integration.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="scraper" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Try It Yourself
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Enter any website URL below to see Scrape Genie in action. Get
                instant insights about any web page.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trusted by developers, marketers, and SEO specialists around the
                world.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-gray-400 text-4xl absolute top-4 right-6">
                  "
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  Scrape Genie has completely transformed how we gather
                  competitor data. The SEO insights are invaluable for our
                  marketing strategy.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Sarah Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-500">
                      Marketing Director, TechFlow
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-gray-400 text-4xl absolute top-4 right-6">
                  "
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  As a developer, I appreciate the clean data extraction and
                  export options. It saved me weeks of custom scraper
                  development time.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Alex Chen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Alex Chen</div>
                    <div className="text-sm text-gray-500">
                      Senior Developer, CodeCraft
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-gray-400 text-4xl absolute top-4 right-6">
                  "
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  The SEO analysis feature has helped us climb to the first page
                  of Google results. Incredible tool with amazing accuracy.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Maya Patel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      Maya Patel
                    </div>
                    <div className="text-sm text-gray-500">
                      SEO Specialist, GrowthBound
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
