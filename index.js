import * as cheerio from 'cheerio';
import axios from 'axios';
import xlsx from 'xlsx';

async function Product_Details() {
    try {
        const result = await axios.get("https://www.amazon.com/s?k=mobiles&crid=3C6HR088RD9NB&sprefix=mobiles%2Caps%2C540&ref=nb_sb_noss_1");
        //console.log(result);
        const prodDetails = cheerio.load(result.data);
        const Products = [];

        prodDetails(".a-section.a-spacing-base").each((index, element) => {
            const prodName = prodDetails(element).find(".a-size-base-plus.a-color-base.a-text-normal").text().trim();
            const price=prodDetails(element).find(".a-price-whole").first().text().trim();
            const rating=prodDetails(element).find(".a-icon-alt").text().trim();
            Products.push({
                ProductName: prodName,
                Price: price,
                Rating: rating 
            });
        });
        //console.log(Products);
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(Products);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');

        // Write the workbook to a file
        xlsx.writeFile(workbook, 'product_Details.xlsx');

    } catch (err) {
        console.log(err);
    }
}
Product_Details();
