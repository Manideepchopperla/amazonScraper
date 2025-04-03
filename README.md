# Amazon Product Scraper

This project is a web scraper for Amazon products using Puppeteer. It extracts product details such as name, rating, price, offers, specifications, images, and AI-generated review summaries. The scraped data is saved in `amazon_product_data.json`.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v22)
- npm (comes with Node.js)

## Installation

1. **Clone the Repository:**
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

## Usage

1. **Run the Scraper:**
   ```sh
   node scraper.js
   ```

2. **Output:**
   - The scraped product data will be saved in `amazon_product_data.json` immediately after execution.

## Configuration

- Update the `amazonUrl` variable in `scraper.js` with the desired Amazon product URL.
- Modify the selectors in `page.evaluate()` if Amazon changes its website structure.

## Troubleshooting

- If Puppeteer fails to launch the browser, try running with `headless: false` for debugging:
  ```js
  const browser = await puppeteer.launch({ headless: false });
  ```
- Ensure the Amazon URL provided is accessible and correct.

