import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiInfo,
  FiLink,
  FiImage,
  FiTag,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiDownload,
} from "react-icons/fi";
import * as XLSX from "xlsx";

function ResultsDisplay({ results }) {
  const [activeTab, setActiveTab] = useState("info");
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: { opacity: 1 },
  };

  const tabUnderlineVariants = {
    inactive: { width: 0 },
    active: { width: "100%" },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Export functions
  const exportToJSON = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `scrape-genie-${results.url.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Function to convert nested data to CSV format
    const processData = () => {
      let csvRows = [];

      // Basic info
      csvRows.push(["URL", results.url || ""]);
      csvRows.push(["Title", results.title || ""]);
      csvRows.push(["Description", results.description || ""]);
      csvRows.push(["Language", results.language || ""]);
      csvRows.push(["HTTP Status", results.statusCode || ""]);
      csvRows.push([]); // Empty row as separator

      // Links
      if (results.links && results.links.length > 0) {
        csvRows.push(["Links"]);
        results.links.forEach((link, index) => {
          csvRows.push([`Link ${index + 1}`, link]);
        });
        csvRows.push([]); // Empty row as separator
      }

      // Images
      if (results.images && results.images.length > 0) {
        csvRows.push(["Images"]);
        csvRows.push(["Index", "Source", "Alt Text"]);
        results.images.forEach((image, index) => {
          csvRows.push([index + 1, image.src, image.alt || "No alt text"]);
        });
        csvRows.push([]); // Empty row as separator
      }

      // Meta Tags
      if (results.metaTags && Object.keys(results.metaTags).length > 0) {
        csvRows.push(["Meta Tags"]);
        csvRows.push(["Name/Property", "Content"]);
        Object.entries(results.metaTags).forEach(([key, value]) => {
          csvRows.push([key, value]);
        });
      }

      return csvRows.map((row) => row.join(",")).join("\n");
    };

    csvContent += processData();

    const encodedUri = encodeURI(csvContent);
    const exportFileDefaultName = `scrape-genie-${results.url.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}.csv`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", encodedUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const exportToExcel = () => {
    // Create workbook and worksheets
    const wb = XLSX.utils.book_new();

    // Basic Info worksheet
    const basicInfoData = [
      ["URL", results.url || ""],
      ["Title", results.title || ""],
      ["Description", results.description || ""],
      ["Language", results.language || ""],
      ["HTTP Status", results.statusCode || ""],
    ];
    const basicInfoWS = XLSX.utils.aoa_to_sheet(basicInfoData);
    XLSX.utils.book_append_sheet(wb, basicInfoWS, "Basic Info");

    // Links worksheet
    if (results.links && results.links.length > 0) {
      const linksData = [["Index", "URL"]];
      results.links.forEach((link, index) => {
        linksData.push([index + 1, link]);
      });
      const linksWS = XLSX.utils.aoa_to_sheet(linksData);
      XLSX.utils.book_append_sheet(wb, linksWS, "Links");
    }

    // Images worksheet
    if (results.images && results.images.length > 0) {
      const imagesData = [["Index", "Source", "Alt Text"]];
      results.images.forEach((image, index) => {
        imagesData.push([index + 1, image.src, image.alt || "No alt text"]);
      });
      const imagesWS = XLSX.utils.aoa_to_sheet(imagesData);
      XLSX.utils.book_append_sheet(wb, imagesWS, "Images");
    }

    // Meta Tags worksheet
    if (results.metaTags && Object.keys(results.metaTags).length > 0) {
      const metaTagsData = [["Name/Property", "Content"]];
      Object.entries(results.metaTags).forEach(([key, value]) => {
        metaTagsData.push([key, value]);
      });
      const metaTagsWS = XLSX.utils.aoa_to_sheet(metaTagsData);
      XLSX.utils.book_append_sheet(wb, metaTagsWS, "Meta Tags");
    }

    // Generate filename
    const filename = `scrape-genie-${results.url.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}.xlsx`;

    // Write and download
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="mt-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-5 flex justify-between items-center"
      >
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Analysis Results
          </h2>
          <p className="text-gray-600">
            Analyzed URL:{" "}
            <a
              href={results.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:underline font-medium"
            >
              {results.url}
            </a>
          </p>
        </div>

        {/* Export Options */}
        <div className="relative group">
          <motion.button
            className="flex items-center bg-gray-800 text-white py-2 px-3 rounded-md text-sm shadow-sm hover:bg-gray-700 transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiDownload className="mr-2" /> Export
          </motion.button>

          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
            <div className="py-1">
              <button
                onClick={exportToJSON}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <svg
                  className="h-4 w-4 mr-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Export as JSON
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <svg
                  className="h-4 w-4 mr-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Export as CSV
              </button>

              <button
                onClick={exportToExcel}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <svg
                  className="h-4 w-4 mr-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Export as Excel
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-5">
        <div className="flex space-x-6 overflow-x-auto pb-1">
          <motion.button
            className="flex items-center pb-3 relative"
            onClick={() => setActiveTab("info")}
            variants={tabVariants}
            animate={activeTab === "info" ? "active" : "inactive"}
            whileHover={{ opacity: 1 }}
          >
            <FiInfo className="mr-2 text-gray-600" /> Basic Info
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gray-800"
              variants={tabUnderlineVariants}
              animate={activeTab === "info" ? "active" : "inactive"}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="flex items-center pb-3 relative"
            onClick={() => setActiveTab("links")}
            variants={tabVariants}
            animate={activeTab === "links" ? "active" : "inactive"}
            whileHover={{ opacity: 1 }}
          >
            <FiLink className="mr-2 text-gray-600" /> Links
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gray-800"
              variants={tabUnderlineVariants}
              animate={activeTab === "links" ? "active" : "inactive"}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="flex items-center pb-3 relative"
            onClick={() => setActiveTab("images")}
            variants={tabVariants}
            animate={activeTab === "images" ? "active" : "inactive"}
            whileHover={{ opacity: 1 }}
          >
            <FiImage className="mr-2 text-gray-600" /> Images
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gray-800"
              variants={tabUnderlineVariants}
              animate={activeTab === "images" ? "active" : "inactive"}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="flex items-center pb-3 relative"
            onClick={() => setActiveTab("meta")}
            variants={tabVariants}
            animate={activeTab === "meta" ? "active" : "inactive"}
            whileHover={{ opacity: 1 }}
          >
            <FiTag className="mr-2 text-gray-600" /> Meta Tags
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gray-800"
              variants={tabUnderlineVariants}
              animate={activeTab === "meta" ? "active" : "inactive"}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {activeTab === "info" && (
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <FiInfo className="mr-2 text-gray-600" /> Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Title
                </h4>
                <p className="text-gray-800 text-sm">
                  {results.title || "No title found"}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Description
                </h4>
                <p className="text-gray-800 text-sm">
                  {results.description || "No description found"}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Language
                </h4>
                <p className="text-gray-800 text-sm">
                  {results.language || "Not detected"}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  HTTP Status
                </h4>
                <p className="text-gray-800 text-sm">
                  {results.statusCode || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "links" && (
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <FiLink className="mr-2 text-gray-600" /> Links Analysis
            </h3>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Total Links Found
              </h4>
              <p className="text-xl font-bold text-gray-800">
                {results.links?.length || 0}
              </p>
            </div>

            {results.links && results.links.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="max-h-80 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {results.links.map((link, index) => (
                      <li key={index} className="flex items-start group">
                        <FiExternalLink className="text-gray-400 mt-1 mr-2 flex-shrink-0 group-hover:text-gray-600" />
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900 hover:underline text-sm break-all"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100">
                No links found on this page
              </div>
            )}
          </div>
        )}

        {activeTab === "images" && (
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <FiImage className="mr-2 text-gray-600" /> Images Analysis
            </h3>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Total Images Found
              </h4>
              <p className="text-xl font-bold text-gray-800">
                {results.images?.length || 0}
              </p>
            </div>

            {results.images && results.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {results.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-100"
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="h-28 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt || "Image"}
                        className="object-contain h-full w-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/150?text=Image+Error";
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <p
                        className="text-xs text-gray-500 truncate"
                        title={image.alt || "No alt text"}
                      >
                        {image.alt || "No alt text"}
                      </p>
                      <a
                        href={image.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 text-xs hover:text-gray-900 hover:underline mt-1 inline-block"
                      >
                        View original
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100">
                No images found on this page
              </div>
            )}
          </div>
        )}

        {activeTab === "meta" && (
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <FiTag className="mr-2 text-gray-600" /> Meta Tags
            </h3>

            {results.metaTags && Object.keys(results.metaTags).length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="max-h-96 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 border-b border-gray-200"
                        >
                          Name/Property
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 border-b border-gray-200"
                        >
                          Content
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(results.metaTags).map(
                        ([key, value], index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-white hover:bg-gray-50"
                                : "bg-gray-50 hover:bg-gray-100"
                            }
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500 break-all">
                              {value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100">
                No meta tags found on this page
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Export Data Summary */}
      {/* <motion.div
        className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-3 md:mb-0">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">
              Need the full data?
            </h3>
            <p className="text-xs text-blue-600">
              Export your results in multiple formats for further analysis or
              integration with other tools.
            </p>
          </div>
          <div className="flex space-x-2">
            <motion.button
              onClick={exportToJSON}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded text-xs font-medium shadow-sm flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                className="h-3 w-3 mr-1 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
              JSON
            </motion.button>
            <motion.button
              onClick={exportToCSV}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded text-xs font-medium shadow-sm flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                className="h-3 w-3 mr-1 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
              CSV
            </motion.button>
            <motion.button
              onClick={exportToExcel}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded text-xs font-medium shadow-sm flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                className="h-3 w-3 mr-1 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
              Excel
            </motion.button>
          </div>
        </div>
      </motion.div> */}
    </div>
  );
}

export default ResultsDisplay;