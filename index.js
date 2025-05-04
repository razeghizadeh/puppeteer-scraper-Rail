const express = require('express');
const { chromium } = require('playwright');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing "url" query parameter');
  }

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });

    const content = await page.content();
    await browser.close();

    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error scraping the page: ${err.message}`);
  }
});

app.get('/', (req, res) => {
  res.send('👋 Scraper is ready. Use /scrape?url=...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
