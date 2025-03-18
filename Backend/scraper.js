// const axios = require('axios');
// const cheerio = require('cheerio');

// // Get random user agent
// const getUserAgent = () => {
//   const userAgents = [
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
//     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
//     'Mozilla/5.0 (Linux; Android 10; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Mobile Safari/537.36',
//     'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
//   ];
//   return userAgents[Math.floor(Math.random() * userAgents.length)];
// };

// // Main scraping function
// async function scrapeWebsite(url) {
//   try {
    
//     // Make the HTTP request
//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': getUserAgent()
//       },
//       timeout: 10000 // 10 seconds timeout
//     });

//     // Load HTML into cheerio
//     const $ = cheerio.load(response.data);
    
//     // Extract basic information
//     const title = $('title').text().trim();
//     const description = $('meta[name="description"]').attr('content') || '';
    
//     // Try to detect language
//     const htmlLang = $('html').attr('lang') || '';
//     const language = htmlLang || 'Not specified';
    
//     // Extract links
//     const links = [];
//     $('a[href]').each((i, element) => {
//       const href = $(element).attr('href');
//       if (href && href.startsWith('http')) {
//         links.push(href);
//       }
//     });
    
//     // Extract images
//     const images = [];
//     $('img').each((i, element) => {
//       const src = $(element).attr('src');
//       if (src) {
//         images.push({
//           src: src.startsWith('http') ? src : new URL(src, url).href,
//           alt: $(element).attr('alt') || ''
//         });
//       }
//     });
    
//     // Extract meta tags
//     const metaTags = {};
//     $('meta').each((i, element) => {
//       const name = $(element).attr('name') || $(element).attr('property');
//       const content = $(element).attr('content');
//       if (name && content) {
//         metaTags[name] = content;
//       }
//     });
    
//     // Return the results
//     return {
//       title,
//       description,
//       language,
//       url,
//       links,
//       images,
//       metaTags,
//       statusCode: response.status
//     };
//   } catch (error) {
//     throw new Error(`Site scrapping is not allowed`);
//   }
// }

// module.exports = {
//   scrapeWebsite
// };







// Enhanced scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

// Get random user agent
const getUserAgent = () => {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    'Mozilla/5.0 (Linux; Android 10; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

// Analyze keyword density
function analyzeKeywordDensity(content, mainKeyword) {
  if (!content || !mainKeyword) return { density: 0, count: 0 };
  
  const cleanContent = content.toLowerCase().replace(/\s+/g, ' ').trim();
  const keywordRegex = new RegExp(`\\b${mainKeyword.toLowerCase()}\\b`, 'g');
  const matches = cleanContent.match(keywordRegex) || [];
  
  const totalWords = cleanContent.split(' ').length;
  const keywordCount = matches.length;
  const density = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;
  
  return {
    density: parseFloat(density.toFixed(2)),
    count: keywordCount,
    totalWords
  };
}

// Analyze heading structure
function analyzeHeadingStructure($) {
  const headings = {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: []
  };
  
  for (let i = 1; i <= 6; i++) {
    $(`h${i}`).each((index, element) => {
      headings[`h${i}`].push($(element).text().trim());
    });
  }
  
  // Heading structure analysis
  const analysis = {
    headings,
    issues: []
  };
  
  // Check for missing H1
  if (headings.h1.length === 0) {
    analysis.issues.push('Missing H1 tag');
  }
  
  // Check for multiple H1s
  if (headings.h1.length > 1) {
    analysis.issues.push(`Multiple H1 tags (${headings.h1.length}) detected`);
  }
  
  // Check for proper heading hierarchy
  const hasH1 = headings.h1.length > 0;
  const hasH2 = headings.h2.length > 0;
  const hasH3 = headings.h3.length > 0;
  const hasH4 = headings.h4.length > 0;
  
  if (!hasH1 && (hasH2 || hasH3 || hasH4)) {
    analysis.issues.push('Headings are not in sequential order (missing H1)');
  }
  
  if (!hasH2 && (hasH3 || hasH4)) {
    analysis.issues.push('Headings are not in sequential order (H3 or H4 without H2)');
  }
  
  return analysis;
}

// Analyze meta data
function analyzeMetaData($, url) {
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  
  // Collect all meta tags
  const metaTags = {};
  $('meta').each((i, element) => {
    const name = $(element).attr('name') || $(element).attr('property');
    const content = $(element).attr('content');
    if (name && content) {
      metaTags[name] = content;
    }
  });
  
  // Analyze title
  const titleAnalysis = {
    content: title,
    length: title.length,
    issues: []
  };
  
  if (title.length === 0) {
    titleAnalysis.issues.push('Missing title tag');
  } else if (title.length < 30) {
    titleAnalysis.issues.push('Title tag is too short (less than 30 characters)');
  } else if (title.length > 60) {
    titleAnalysis.issues.push('Title tag is too long (more than 60 characters)');
  }
  
  // Analyze meta description
  const descriptionAnalysis = {
    content: description,
    length: description.length,
    issues: []
  };
  
  if (description.length === 0) {
    descriptionAnalysis.issues.push('Missing meta description');
  } else if (description.length < 120) {
    descriptionAnalysis.issues.push('Meta description is too short (less than 120 characters)');
  } else if (description.length > 160) {
    descriptionAnalysis.issues.push('Meta description is too long (more than 160 characters)');
  }
  
  // Canonical URL analysis
  const canonicalAnalysis = {
    url: canonical,
    issues: []
  };
  
  if (!canonical) {
    canonicalAnalysis.issues.push('Missing canonical tag');
  } else if (canonical !== url && !url.endsWith('/') && canonical !== url + '/') {
    canonicalAnalysis.issues.push('Canonical URL does not match the current URL');
  }
  
  return {
    title: titleAnalysis,
    description: descriptionAnalysis,
    canonical: canonicalAnalysis,
    allMetaTags: metaTags
  };
}

// Analyze structured data
function analyzeStructuredData($) {
  const structuredData = [];
  
  $('script[type="application/ld+json"]').each((i, element) => {
    try {
      const json = JSON.parse($(element).html());
      structuredData.push(json);
    } catch (error) {
      // Invalid JSON
    }
  });
  
  return {
    count: structuredData.length,
    data: structuredData,
    issues: structuredData.length === 0 ? ['No structured data found'] : []
  };
}

// Analyze content quality
function analyzeContentQuality($) {
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText.split(' ').length;
  
  // Check for paragraphs
  const paragraphs = $('p').length;
  
  // Check for images with alt text
  const images = $('img');
  let imagesWithAlt = 0;
  
  images.each((i, element) => {
    if ($(element).attr('alt')) {
      imagesWithAlt++;
    }
  });
  
  const analysis = {
    wordCount,
    paragraphCount: paragraphs,
    imageCount: images.length,
    imagesWithAlt,
    issues: []
  };
  
 // Content length analysis
 if (wordCount < 300) {
  analysis.issues.push('Content is too short (less than 300 words)');
}

// Image alt text analysis
if (images.length > 0 && imagesWithAlt < images.length) {
  analysis.issues.push(`${images.length - imagesWithAlt} image(s) missing alt text`);
}

// Paragraph analysis
if (paragraphs < 3 && wordCount > 100) {
  analysis.issues.push('Content has too few paragraphs for its length');
}

return analysis;
}

// Analyze internal and external links
function analyzeLinkStructure($, baseUrl) {
const internalLinks = [];
const externalLinks = [];
const brokenLinks = [];

$('a[href]').each((i, element) => {
  const href = $(element).attr('href');
  const text = $(element).text().trim();
  const linkObj = { url: href, text: text || 'No text' };
  
  // Skip anchor links, javascript links, etc.
  if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
    return;
  }
  
  try {
    const fullUrl = new URL(href, baseUrl);
    const isInternal = fullUrl.hostname === new URL(baseUrl).hostname;
    
    if (isInternal) {
      internalLinks.push(linkObj);
    } else {
      externalLinks.push(linkObj);
    }
  } catch (error) {
    brokenLinks.push(linkObj);
  }
});

return {
  internalLinks,
  externalLinks,
  brokenLinks,
  internalLinksCount: internalLinks.length,
  externalLinksCount: externalLinks.length,
  brokenLinksCount: brokenLinks.length,
  issues: brokenLinks.length > 0 ? [`${brokenLinks.length} potentially broken or malformed links detected`] : []
};
}

// Main scraping function
async function scrapeWebsite(url) {
try {
  // Make the HTTP request
  const response = await axios.get(url, {
    headers: {
      'User-Agent': getUserAgent()
    },
    timeout: 15000 // 15 seconds timeout
  });

  // Load HTML into cheerio
  const $ = cheerio.load(response.data);
  
  // Extract basic information
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  
  // Try to detect language
  const htmlLang = $('html').attr('lang') || '';
  const language = htmlLang || 'Not specified';
  
  // Extract all page content for keyword analysis
  const pageContent = $('body').text().replace(/\s+/g, ' ').trim();
  
  // Extract main keyword (simple estimation - most common meaningful word in title)
  const titleWords = title.toLowerCase().split(/\W+/).filter(word => 
    word.length > 3 && !['and', 'the', 'that', 'this', 'with', 'from'].includes(word)
  );
  
  let mainKeyword = '';
  if (titleWords.length > 0) {
    // Simple approach - take the first significant word
    mainKeyword = titleWords[0];
  }
  
  // Perform SEO analysis
  const seoAnalysis = {
    metaData: analyzeMetaData($, url),
    headings: analyzeHeadingStructure($),
    content: analyzeContentQuality($),
    links: analyzeLinkStructure($, url),
    keywords: analyzeKeywordDensity(pageContent, mainKeyword),
    structuredData: analyzeStructuredData($)
  };
  
  // Extract links (for backward compatibility)
  const links = [];
  $('a[href]').each((i, element) => {
    const href = $(element).attr('href');
    if (href && href.startsWith('http')) {
      links.push(href);
    }
  });
  
  // Extract images (for backward compatibility)
  const images = [];
  $('img').each((i, element) => {
    const src = $(element).attr('src');
    if (src) {
      images.push({
        src: src.startsWith('http') ? src : new URL(src, url).href,
        alt: $(element).attr('alt') || ''
      });
    }
  });
  
  // Extract meta tags (for backward compatibility)
  const metaTags = {};
  $('meta').each((i, element) => {
    const name = $(element).attr('name') || $(element).attr('property');
    const content = $(element).attr('content');
    if (name && content) {
      metaTags[name] = content;
    }
  });
  
  // Calculate overall SEO score (simple algorithm)
  let seoScore = 100;
  
  // Deduct points for each issue found
  const allIssues = [
    ...seoAnalysis.metaData.title.issues,
    ...seoAnalysis.metaData.description.issues,
    ...seoAnalysis.metaData.canonical.issues,
    ...seoAnalysis.headings.issues,
    ...seoAnalysis.content.issues,
    ...seoAnalysis.links.issues,
    ...seoAnalysis.structuredData.issues
  ];
  
  // Deduct 5 points per issue, up to a maximum of 70 points
  seoScore = Math.max(30, seoScore - (allIssues.length * 5));
  
  // Return the results
  return {
    title,
    description,
    language,
    url,
    links,
    images,
    metaTags,
    statusCode: response.status,
    seoAnalysis,
    seoScore,
    mainKeyword
  };
} catch (error) {
  throw new Error(`Site scrapping is not allowed`);
}
}

module.exports = {
scrapeWebsite
};