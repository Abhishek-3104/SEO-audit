const express = require('express');
const cors = require('cors');
const scraper = require('./scraper');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes

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
    res.status(500).json({ error: 'Failed to scrape website: ' + error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});