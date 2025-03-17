const axios = require('axios');
const cheerio = require('cheerio');

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

// Main scraping function
async function scrapeWebsite(url) {
  try {
    
    // Make the HTTP request
    const response = await axios.get(url, {
      headers: {
        'User-Agent': getUserAgent()
      },
      timeout: 10000 // 10 seconds timeout
    });

    // Load HTML into cheerio
    const $ = cheerio.load(response.data);
    
    // Extract basic information
    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    
    // Try to detect language
    const htmlLang = $('html').attr('lang') || '';
    const language = htmlLang || 'Not specified';
    
    // Extract links
    const links = [];
    $('a[href]').each((i, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('http')) {
        links.push(href);
      }
    });
    
    // Extract images
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
    
    // Extract meta tags
    const metaTags = {};
    $('meta').each((i, element) => {
      const name = $(element).attr('name') || $(element).attr('property');
      const content = $(element).attr('content');
      if (name && content) {
        metaTags[name] = content;
      }
    });
    
    // Return the results
    return {
      title,
      description,
      language,
      url,
      links,
      images,
      metaTags,
      statusCode: response.status
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    throw new Error(`Failed to scrape website: ${error.message}`);
  }
}

module.exports = {
  scrapeWebsite
};