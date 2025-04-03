const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeAmazonProduct(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const productData = await page.evaluate(() => {
        const getText = (selector) => document.querySelector(selector)?.innerText.trim() || 'N/A';
        const getImages = (selector) => Array.from(document.querySelectorAll(selector)).map(img => img.src);
        
        return {
            productName: getText('#productTitle'),
            rating: getText('.a-icon-alt'),
            numberOfRatings: getText('#acrCustomerReviewText'),
            sellingPrice: getText('.a-price-whole') + getText('.a-price-fraction'),
            totalDiscount: getText('.a-size-large.a-color-price.savingPriceOverride'),
            bankOffers: Array.from(document.querySelectorAll('#itembox-InstantBankDiscount .a-truncate-full')).map(e => e.innerText.trim()),
            aboutThisItem: Array.from(document.querySelectorAll('#feature-bullets ul li span')).map(e => e.innerText.trim()),
            productInfo: Array.from(document.querySelectorAll('#productDetails_techSpec_section_1 tbody tr')).map(row => {
                const key = row.querySelector('th')?.innerText.trim() || 'N/A';
                const value = row.querySelector('td')?.innerText.trim() || 'N/A';
                return { [key]: value };
            }),
            amazonProductImages: getImages('#imgTagWrapperId img'),
            manufacturerImages: getImages('#aplus img'),
            aiGeneratedReviewSummary: getText("#product-summary p")
        };
    });

    await browser.close();

    fs.writeFileSync('amazon_product_data.json', JSON.stringify(productData, null, 2));
    console.log('Scraped data saved to amazon_product_data.json');
}

const amazonUrl = 'https://amzn.in/d/7CWfeUg'; 
scrapeAmazonProduct(amazonUrl).catch(console.error);
