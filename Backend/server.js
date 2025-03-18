// const express = require('express');
// const cors = require('cors');
// const scraper = require('./scraper');
// const dotenv = require('dotenv');
// dotenv.config();
// const app = express();


// // Middleware
// app.use(cors({
//   origin: "*"
// }));
// app.use(express.json());

// app.post('/api/scrape', async (req, res) => {
//   try {
//     const { url } = req.body;
    
//     if (!url) {
//       return res.status(400).json({ error: 'URL is required' });
//     }
    
//     // Validate URL format
//     if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
//       return res.status(400).json({ error: 'Invalid URL format' });
//     }
    
//     const results = await scraper.scrapeWebsite(url);
//     res.json(results);
//   } catch (error) {
//     console.error('Scraping error:', error);
//     res.status(500).json({ error:error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

















const express = require('express');
const cors = require('cors');
const scraper = require('./scraper');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Validate URL format
    if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    const results = await scraper.scrapeWebsite(url);
    res.json(results);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: error.message });
  }
});

// New endpoint for competitor analysis
app.post('/api/analyze-competitor', async (req, res) => {
  try {
    const { url, competitorUrl } = req.body;
    
    if (!url || !competitorUrl) {
      return res.status(400).json({ error: 'Both URL and competitor URL are required' });
    }
    
    // Validate URL formats
    if (!url.match(/^(http|https):\/\/[^ "]+$/) || !competitorUrl.match(/^(http|https):\/\/[^ "]+$/)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
   // Scrape both sites
   const [siteResults, competitorResults] = await Promise.all([
    scraper.scrapeWebsite(url),
    scraper.scrapeWebsite(competitorUrl)
  ]);
  
  // Compare results
  const comparison = {
    yourSite: {
      url: url,
      seoScore: siteResults.seoScore,
      wordCount: siteResults.seoAnalysis.content.wordCount,
      internalLinks: siteResults.seoAnalysis.links.internalLinksCount,
      externalLinks: siteResults.seoAnalysis.links.externalLinksCount
    },
    competitor: {
      url: competitorUrl,
      seoScore: competitorResults.seoScore,
      wordCount: competitorResults.seoAnalysis.content.wordCount,
      internalLinks: competitorResults.seoAnalysis.links.internalLinksCount,
      externalLinks: competitorResults.seoAnalysis.links.externalLinksCount
    },
    insights: []
  };
  
  // Generate insights
  if (siteResults.seoScore < competitorResults.seoScore) {
    comparison.insights.push('Your competitor has a higher SEO score');
  } else if (siteResults.seoScore > competitorResults.seoScore) {
    comparison.insights.push('Your site has a higher SEO score');
  }
  
  if (siteResults.seoAnalysis.content.wordCount < competitorResults.seoAnalysis.content.wordCount) {
    comparison.insights.push('Your competitor has more content');
  }
  
  if (siteResults.seoAnalysis.links.internalLinksCount < competitorResults.seoAnalysis.links.internalLinksCount) {
    comparison.insights.push('Your competitor has more internal links');
  }
  
  if (siteResults.seoAnalysis.links.externalLinksCount < competitorResults.seoAnalysis.links.externalLinksCount) {
    comparison.insights.push('Your competitor has more external links');
  }
  
  res.json(comparison);
} catch (error) {
  console.error('Competitor analysis error:', error);
  res.status(500).json({ error: error.message });
}
});

const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});