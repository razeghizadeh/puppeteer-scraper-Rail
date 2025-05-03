const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).send('Missing id parameter');

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const url = `https://javanelec.com/product/${id}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const title = await page.title();
    await browser.close();

    res.json({ id, title, url });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('👋 Scraper is running. Use /scrape?id=...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
