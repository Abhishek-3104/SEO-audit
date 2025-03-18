// SEOResultsDisplay.jsx
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
  FiSearch,
  FiAlertCircle,
  FiCheckCircle,
  FiBarChart2,
} from "react-icons/fi";
import * as XLSX from "xlsx";

function SEOResultsDisplay({ results }) {
  const [activeTab, setActiveTab] = useState("overview");
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

    const exportFileDefaultName = `seo-analysis-${results.url.replace(
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
      csvRows.push(["SEO Score", results.seoScore || ""]);
      csvRows.push([]); // Empty row as separator

      // Issues
      if (results.seoAnalysis) {
        csvRows.push(["SEO Issues"]);
        const allIssues = [
          ...results.seoAnalysis.metaData.title.issues,
          ...results.seoAnalysis.metaData.description.issues,
          ...results.seoAnalysis.metaData.canonical.issues,
          ...results.seoAnalysis.headings.issues,
          ...results.seoAnalysis.content.issues,
          ...results.seoAnalysis.links.issues,
          ...results.seoAnalysis.structuredData.issues
        ];
        
        allIssues.forEach((issue, index) => {
          csvRows.push([`Issue ${index + 1}`, issue]);
        });
        csvRows.push([]); // Empty row as separator
      }

      return csvRows.map((row) => row.join(",")).join("\n");
    };

    csvContent += processData();

    const encodedUri = encodeURI(csvContent);
    const exportFileDefaultName = `seo-analysis-${results.url.replace(
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

    // Overview worksheet
    const overviewData = [
      ["URL", results.url || ""],
      ["Title", results.title || ""],
      ["Description", results.description || ""],
      ["SEO Score", results.seoScore || ""],
      ["Main Keyword", results.mainKeyword || ""],
      ["Word Count", results.seoAnalysis?.content?.wordCount || ""],
      ["Internal Links", results.seoAnalysis?.links?.internalLinksCount || ""],
      ["External Links", results.seoAnalysis?.links?.externalLinksCount || ""],
    ];
    const overviewWS = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, overviewWS, "Overview");

    // Issues worksheet
  if (results.seoAnalysis) {
    const allIssues = [
      ...results.seoAnalysis.metaData.title.issues,
      ...results.seoAnalysis.metaData.description.issues,
      ...results.seoAnalysis.metaData.canonical.issues,
      ...results.seoAnalysis.headings.issues,
      ...results.seoAnalysis.content.issues,
      ...results.seoAnalysis.links.issues,
      ...results.seoAnalysis.structuredData.issues
    ];
    
    const issuesData = [["Issue", "Category"]];
    allIssues.forEach(issue => {
      let category = "Other";
      
      if (results.seoAnalysis.metaData.title.issues.includes(issue)) {
        category = "Title Tag";
      } else if (results.seoAnalysis.metaData.description.issues.includes(issue)) {
        category = "Meta Description";
      } else if (results.seoAnalysis.metaData.canonical.issues.includes(issue)) {
        category = "Canonical URL";
      } else if (results.seoAnalysis.headings.issues.includes(issue)) {
        category = "Headings";
      } else if (results.seoAnalysis.content.issues.includes(issue)) {
        category = "Content";
      } else if (results.seoAnalysis.links.issues.includes(issue)) {
        category = "Links";
      } else if (results.seoAnalysis.structuredData.issues.includes(issue)) {
        category = "Structured Data";
      }
      
      issuesData.push([issue, category]);
    });
    
    const issuesWS = XLSX.utils.aoa_to_sheet(issuesData);
    XLSX.utils.book_append_sheet(wb, issuesWS, "Issues");
  }

  // Headings worksheet
  if (results.seoAnalysis?.headings?.headings) {
    const headingsData = [["Level", "Content"]];
    Object.entries(results.seoAnalysis.headings.headings).forEach(([level, headings]) => {
      headings.forEach(heading => {
        headingsData.push([level.toUpperCase(), heading]);
      });
    });
    
    const headingsWS = XLSX.utils.aoa_to_sheet(headingsData);
    XLSX.utils.book_append_sheet(wb, headingsWS, "Headings");
  }

  // Links worksheet
  if (results.seoAnalysis?.links) {
    const linksData = [["Type", "URL", "Text"]];
    
    results.seoAnalysis.links.internalLinks.forEach(link => {
      linksData.push(["Internal", link.url, link.text]);
    });
    
    results.seoAnalysis.links.externalLinks.forEach(link => {
      linksData.push(["External", link.url, link.text]);
    });
    
    results.seoAnalysis.links.brokenLinks.forEach(link => {
      linksData.push(["Broken", link.url, link.text]);
    });
    
    const linksWS = XLSX.utils.aoa_to_sheet(linksData);
    XLSX.utils.book_append_sheet(wb, linksWS, "Links");
  }

  // Generate filename
  const filename = `seo-analysis-${results.url.replace(
    /[^a-zA-Z0-9]/g,
    "-"
  )}.xlsx`;

  // Write and download
  XLSX.writeFile(wb, filename);
};

// Function to render issues
const renderIssues = (issues) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-green-600 flex items-center mt-2">
        <FiCheckCircle className="mr-2" /> No issues detected
      </div>
    );
  }

  return (
    <ul className="mt-2 space-y-1">
      {issues.map((issue, index) => (
        <li key={index} className="text-orange-600 flex items-start">
          <FiAlertCircle className="mr-2 mt-1 flex-shrink-0" /> 
          <span>{issue}</span>
        </li>
      ))}
    </ul>
  );
};

// Get SEO score color
const getSEOScoreColor = (score) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

if (!results.seoAnalysis) {
  return <div>No SEO analysis data available</div>;
}

return (
  <div className="mt-6">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-5 flex justify-between items-center"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          SEO Analysis Results
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

{/* SEO Score Display */}
<div className="mb-6 bg-white rounded-lg shadow-md p-4">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-800">SEO Score</h3>
    <div className={`text-3xl font-bold ${getSEOScoreColor(results.seoScore)}`}>
      {results.seoScore}/100
    </div>
  </div>
  <div className="mt-3 bg-gray-200 h-3 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${results.seoScore}%` }}
      transition={{ duration: 1 }}
      className={`h-full rounded-full ${
        results.seoScore >= 80 
          ? 'bg-green-500' 
          : results.seoScore >= 60 
            ? 'bg-yellow-500' 
            : 'bg-red-500'
      }`}
    />
  </div>
</div>

{/* Navigation Tabs */}
<div className="mb-6 border-b border-gray-200">
  <nav className="flex space-x-6">
    {['overview', 'meta', 'content', 'links', 'structured'].map((tab) => (
      <motion.button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`pb-3 relative ${
          activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
        } transition-colors duration-200 capitalize`}
        initial="inactive"
        animate={activeTab === tab ? "active" : "inactive"}
        variants={tabVariants}
      >
        {tab === 'overview' && <FiInfo className="inline-block mr-1" />}
        {tab === 'meta' && <FiTag className="inline-block mr-1" />}
        {tab === 'content' && <FiBarChart2 className="inline-block mr-1" />}
        {tab === 'links' && <FiLink className="inline-block mr-1" />}
        {tab === 'structured' && <FiSearch className="inline-block mr-1" />}
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-600"
          variants={tabUnderlineVariants}
        />
      </motion.button>
    ))}
  </nav>
</div>

{/* Tab Content */}
<motion.div
  key={activeTab}
  initial="hidden"
  animate="visible"
  variants={contentVariants}
  className="bg-white rounded-lg shadow-md p-6"
>
{/* Overview Tab */}
{activeTab === 'overview' && (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Overview</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Page Title</h4>
          <p className="text-gray-800 font-medium">{results.title || 'No title found'}</p>
          {renderIssues(results.seoAnalysis.metaData.title.issues)}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Meta Description</h4>
          <p className="text-gray-800">{results.description || 'No description found'}</p>
          {renderIssues(results.seoAnalysis.metaData.description.issues)}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Main Keyword</h4>
          <div className="flex items-center">
            <span className="text-gray-800 font-medium">{results.mainKeyword || 'Not detected'}</span>
            {results.mainKeyword && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
                Density: {results.seoAnalysis.keywords.density}%
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Content Stats</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500">Word Count</p>
              <p className="text-gray-800 font-medium">{results.seoAnalysis.content.wordCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Paragraphs</p>
              <p className="text-gray-800 font-medium">{results.seoAnalysis.content.paragraphCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Images</p>
              <p className="text-gray-800 font-medium">{results.seoAnalysis.content.imageCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Headings</p>
              <p className="text-gray-800 font-medium">
                {Object.values(results.seoAnalysis.headings.headings).flat().length}
              </p>
            </div>
          </div>
          {renderIssues(results.seoAnalysis.content.issues)}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Link Analysis</h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-gray-500">Internal</p>
              <p className="text-gray-800 font-medium">{results.seoAnalysis.links.internalLinksCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">External</p>
              <p className="text-gray-800 font-medium">{results.seoAnalysis.links.externalLinksCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Broken</p>
              <p className="text-gray-800 font-medium">{results.seoAnalysis.links.brokenLinksCount}</p>
            </div>
          </div>
          {renderIssues(results.seoAnalysis.links.issues)}
        </div>
      </div>
    </div>
    
    {/* All Issues */}
    <div className="mt-6">
      <h4 className="text-md font-semibold text-gray-800 mb-3">All Issues</h4>
      <div className="bg-gray-50 p-4 rounded-md">
        {renderIssues([
          ...results.seoAnalysis.metaData.title.issues,
          ...results.seoAnalysis.metaData.description.issues,
          ...results.seoAnalysis.metaData.canonical.issues,
          ...results.seoAnalysis.headings.issues,
          ...results.seoAnalysis.content.issues,
          ...results.seoAnalysis.links.issues,
          ...results.seoAnalysis.structuredData.issues
        ])}
      </div>
    </div>
  </div>
)}

{/* Meta Data Tab */}
{activeTab === 'meta' && (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Meta Data Analysis</h3>
    
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Title Tag</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${
            results.seoAnalysis.metaData.title.issues.length === 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {results.seoAnalysis.metaData.title.issues.length === 0 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-800 mb-1">{results.title || 'No title found'}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>Length: {results.seoAnalysis.metaData.title.length} characters</span>
            <span className="mx-2">•</span>
            <span className={results.seoAnalysis.metaData.title.length > 60 ? 'text-orange-600' : 'text-green-600'}>
              {results.seoAnalysis.metaData.title.length > 60 ? 'Too long' : 'Good length'}
            </span>
          </div>
          {renderIssues(results.seoAnalysis.metaData.title.issues)}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Meta Description</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${
            results.seoAnalysis.metaData.description.issues.length === 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {results.seoAnalysis.metaData.description.issues.length === 0 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-800 mb-1">{results.description || 'No description found'}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>Length: {results.seoAnalysis.metaData.description.length} characters</span>
            <span className="mx-2">•</span>
            <span className={
              results.seoAnalysis.metaData.description.length < 120 ? 'text-orange-600' :
              results.seoAnalysis.metaData.description.length > 160 ? 'text-orange-600' : 'text-green-600'
            }>
              {results.seoAnalysis.metaData.description.length < 120 ? 'Too short' :
               results.seoAnalysis.metaData.description.length > 160 ? 'Too long' : 'Good length'}
            </span>
          </div>
          {renderIssues(results.seoAnalysis.metaData.description.issues)}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Canonical URL</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${
            results.seoAnalysis.metaData.canonical.issues.length === 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {results.seoAnalysis.metaData.canonical.issues.length === 0 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-800 mb-1 break-all">
            {results.seoAnalysis.metaData.canonical.url || 'No canonical URL found'}
          </p>
          {renderIssues(results.seoAnalysis.metaData.canonical.issues)}
        </div>
      </div>
      
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">All Meta Tags</h4>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name/Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(results.seoAnalysis.metaData.allMetaTags).map(([key, value], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {key}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-all">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{/* Content Tab */}
{activeTab === 'content' && (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Analysis</h3>
    
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">Content Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">{results.seoAnalysis.content.wordCount}</p>
            <p className="text-sm text-gray-500 mt-1">Words</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">{results.seoAnalysis.content.paragraphCount}</p>
            <p className="text-sm text-gray-500 mt-1">Paragraphs</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">{results.seoAnalysis.content.imageCount}</p>
            <p className="text-sm text-gray-500 mt-1">Images</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">{results.seoAnalysis.content.imagesWithAlt}</p>
            <p className="text-sm text-gray-500 mt-1">Images with Alt</p>
          </div>
        </div>
        {renderIssues(results.seoAnalysis.content.issues)}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Keyword Analysis</h4>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Main Keyword</p>
              <p className="text-gray-800 font-medium">{results.mainKeyword || 'Not detected'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Keyword Density</p>
              <p className="text-gray-800 font-medium">
                {results.seoAnalysis.keywords.density}% ({results.seoAnalysis.keywords.count} occurrences)
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-1">Recommendation</p>
            <p className="text-gray-800">
              {results.seoAnalysis.keywords.density < 0.5 
                ? 'Consider increasing keyword density (aim for 0.5% - 2%)' 
                : results.seoAnalysis.keywords.density > 3
                  ? 'Keyword density may be too high (keyword stuffing)'
                  : 'Keyword density is in a good range'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Heading Structure</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${
            results.seoAnalysis.headings.issues.length === 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {results.seoAnalysis.headings.issues.length === 0 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6].map(level => (
              <div key={level} className="text-center">
                <div className="text-xl font-bold text-blue-600">
                  {results.seoAnalysis.headings.headings[`h${level}`].length}
                </div>
                <div className="text-xs text-gray-500">H{level}s</div>
              </div>
            ))}
          </div>
          {renderIssues(results.seoAnalysis.headings.issues)}
          
          <div className="mt-4">
            <button 
              onClick={() => toggleSection('headings')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {expandedSection === 'headings' ? (
                <>
                  <FiChevronUp className="mr-1" /> Hide Headings
                </>
              ) : (
                <>
                  <FiChevronDown className="mr-1" /> Show All Headings
                </>
              )}
            </button>
            
            {expandedSection === 'headings' && (
              <div className="mt-3 border-t border-gray-200 pt-3">
                {[1, 2, 3, 4, 5, 6].map(level => (
                  <div key={level} className="mb-4">
                    {results.seoAnalysis.headings.headings[`h${level}`].length > 0 && (
                      <>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">H{level} Headings</h5>
                        <ul className="space-y-1 pl-2">
                          {results.seoAnalysis.headings.headings[`h${level}`].map((heading, idx) => (
                            <li key={idx} className="text-gray-800 text-sm">
                              • {heading}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">Content Recommendations</h4>
        <div className="bg-gray-50 p-4 rounded-md">
          <ul className="space-y-2">
            {results.seoAnalysis.content.wordCount < 300 && (
              <li className="flex items-start">
                <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Increase content length to at least 300 words for better SEO performance</span>
              </li>
            )}
            {results.seoAnalysis.headings.headings.h1.length === 0 && (
              <li className="flex items-start">
                <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Add an H1 heading that includes your main keyword</span>
              </li>
            )}
            {results.seoAnalysis.content.imageCount === 0 && (
              <li className="flex items-start">
                <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Add images to make your content more engaging</span>
              </li>
            )}
            {results.seoAnalysis.content.imageCount > 0 && results.seoAnalysis.content.imagesWithAlt < results.seoAnalysis.content.imageCount && (
              <li className="flex items-start">
                <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Add alt text to all images for better accessibility and SEO</span>
              </li>
            )}
            {results.seoAnalysis.keywords.density < 0.5 && results.mainKeyword && (
              <li className="flex items-start">
                <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Increase the usage of your main keyword '{results.mainKeyword}' (current density: {results.seoAnalysis.keywords.density}%)</span>
              </li>
            )}
            {results.seoAnalysis.keywords.density > 3 && results.mainKeyword && (
              <li className="flex items-start">
                <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Reduce keyword density to avoid keyword stuffing (current density: {results.seoAnalysis.keywords.density}%)</span>
              </li>
            )}
            {results.seoAnalysis.content.wordCount >= 300 && results.seoAnalysis.headings.headings.h1.length === 1 && 
             results.seoAnalysis.content.imageCount > 0 && results.seoAnalysis.content.imagesWithAlt === results.seoAnalysis.content.imageCount &&
             results.seoAnalysis.keywords.density >= 0.5 && results.seoAnalysis.keywords.density <= 3 && (
              <li className="flex items-start">
                <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Your content meets the basic SEO requirements!</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
)}

{/* Links Tab */}
{activeTab === 'links' && (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Link Analysis</h3>
    
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">Link Overview</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">{results.seoAnalysis.links.internalLinksCount}</p>
            <p className="text-sm text-gray-500 mt-1">Internal Links</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-600">{results.seoAnalysis.links.externalLinksCount}</p>
            <p className="text-sm text-gray-500 mt-1">External Links</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className={`text-2xl font-bold ${results.seoAnalysis.links.brokenLinksCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {results.seoAnalysis.links.brokenLinksCount}
            </p>
            <p className="text-sm text-gray-500 mt-1">Broken Links</p>
          </div>
        </div>
        {renderIssues(results.seoAnalysis.links.issues)}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Internal Links</h4>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {results.seoAnalysis.links.internalLinksCount} links
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <button 
            onClick={() => toggleSection('internalLinks')}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            {expandedSection === 'internalLinks' ? (
              <>
                <FiChevronUp className="mr-1" /> Hide Internal Links
              </>
            ) : (
              <>
                <FiChevronDown className="mr-1" /> Show Internal Links
              </>
            )}
          </button>
          
          {expandedSection === 'internalLinks' && (
      <div className="mt-3 border-t border-gray-200 pt-3 max-h-96 overflow-y-auto">
        {results.seoAnalysis.links.internalLinks.length === 0 ? (
          <p className="text-gray-500 text-sm">No internal links found</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link Text
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.seoAnalysis.links.internalLinks.map((link, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {link.text === 'No text' ? <i className="text-gray-500">No text</i> : link.text}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-all">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {link.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
  </div>
</div>

<div>
  <div className="flex justify-between items-center mb-2">
    <h4 className="text-md font-medium text-gray-700">External Links</h4>
    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
      {results.seoAnalysis.links.externalLinksCount} links
    </span>
  </div>
  <div className="bg-gray-50 p-4 rounded-md">
    <button 
      onClick={() => toggleSection('externalLinks')}
      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
    >
      {expandedSection === 'externalLinks' ? (
        <>
          <FiChevronUp className="mr-1" /> Hide External Links
        </>
      ) : (
        <>
          <FiChevronDown className="mr-1" /> Show External Links
        </>
      )}
    </button>
    
    {expandedSection === 'externalLinks' && (
      <div className="mt-3 border-t border-gray-200 pt-3 max-h-96 overflow-y-auto">
        {results.seoAnalysis.links.externalLinks.length === 0 ? (
          <p className="text-gray-500 text-sm">No external links found</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link Text
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.seoAnalysis.links.externalLinks.map((link, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {link.text === 'No text' ? <i className="text-gray-500">No text</i> : link.text}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-all">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      {link.url}
                      <FiExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
  </div>
</div>

{results.seoAnalysis.links.brokenLinksCount > 0 && (
  <div>
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-md font-medium text-gray-700">Broken Links</h4>
      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
        {results.seoAnalysis.links.brokenLinksCount} links
      </span>
    </div>
    <div className="bg-gray-50 p-4 rounded-md">
      <div className="mt-3 max-h-96 overflow-y-auto">
        {results.seoAnalysis.links.brokenLinks.length === 0 ? (
          <p className="text-gray-500 text-sm">No broken links found</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link Text
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.seoAnalysis.links.brokenLinks.map((link, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {link.text === 'No text' ? <i className="text-gray-500">No text</i> : link.text}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-red-500 break-all">
                    {link.url}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
)}

<div>
<h4 className="text-md font-medium text-gray-700 mb-2">Link Recommendations</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="space-y-2">
                {results.seoAnalysis.links.brokenLinksCount > 0 && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Fix the {results.seoAnalysis.links.brokenLinksCount} broken links to improve user experience and SEO</span>
                  </li>
                )}
                {results.seoAnalysis.links.internalLinksCount === 0 && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Add internal links to help users navigate your site and improve SEO</span>
                  </li>
                )}
                {results.seoAnalysis.links.externalLinksCount === 0 && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Consider adding external links to authoritative sources to improve credibility</span>
                  </li>
                )}
                {results.seoAnalysis.links.internalLinksCount < 3 && results.seoAnalysis.links.internalLinksCount > 0 && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Add more internal links to improve site structure and user navigation</span>
                  </li>
                )}
                {results.seoAnalysis.links.brokenLinksCount === 0 && results.seoAnalysis.links.internalLinksCount >= 3 && (
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Your link structure looks good!</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Structured Data Tab */}
    {activeTab === 'structured' && (
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Structured Data Analysis</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-medium text-gray-700">Structured Data Overview</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                results.seoAnalysis.structuredData.count > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {results.seoAnalysis.structuredData.count > 0 ? 'Found' : 'Not Found'}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700">
                {results.seoAnalysis.structuredData.count > 0 
                  ? `Found ${results.seoAnalysis.structuredData.count} structured data items on the page.` 
                  : 'No structured data was found on the page.'}
              </p>
              {renderIssues(results.seoAnalysis.structuredData.issues)}
              
              {results.seoAnalysis.structuredData.count > 0 && (
                <div className="mt-4">
                  <button 
                    onClick={() => toggleSection('structuredData')}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    {expandedSection === 'structuredData' ? (
                      <>
                        <FiChevronUp className="mr-1" /> Hide Structured Data
                      </>
                    ) : (
                      <>
                        <FiChevronDown className="mr-1" /> Show Structured Data
                      </>
                    )}
                  </button>
                  
                  {expandedSection === 'structuredData' && (
                    <div className="mt-3 border-t border-gray-200 pt-3">
                      {results.seoAnalysis.structuredData.data.map((item, index) => (
                        <div key={index} className="mb-4 bg-white p-3 rounded border border-gray-200">
                          <h6 className="text-sm font-medium text-gray-700 mb-2">
                            Structured Data Item {index + 1}
                            {item['@type'] && <span className="ml-2 text-blue-600">({item['@type']})</span>}
                          </h6>
                          <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                            {JSON.stringify(item, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Structured Data Recommendations</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="space-y-2">
                {results.seoAnalysis.structuredData.count === 0 && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Add structured data markup to help search engines understand your content better</span>
                  </li>
                )}
                {results.seoAnalysis.structuredData.count > 0 && !results.seoAnalysis.structuredData.data.some(item => item['@type'] === 'Organization' || item['@type'] === 'LocalBusiness') && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Consider adding Organization or LocalBusiness schema markup</span>
                  </li>
                )}
                {results.seoAnalysis.structuredData.count > 0 && !results.seoAnalysis.structuredData.data.some(item => item['@type'] === 'BreadcrumbList') && (
                  <li className="flex items-start">
                    <FiAlertCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Consider adding BreadcrumbList schema markup for better navigation display in search results</span>
                  </li>
                )}
                {results.seoAnalysis.structuredData.count > 0 && (
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Use Google's Structured Data Testing Tool to validate your markup</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}
  </motion.div>
</div>
);
}

export default SEOResultsDisplay;