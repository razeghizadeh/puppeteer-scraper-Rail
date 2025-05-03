# Puppeteer Scraper for Railway

Simple scraper using Puppeteer + Express for deployment on Railway.

## Usage

After deployment:

```
GET /scrape?id=7470
```

Returns:

```json
{
  "id": "7470",
  "title": "نام محصول",
  "url": "https://javanelec.com/product/7470"
}
```
