const puppeteer = require("puppeteer");

(async () => {
  const extractPartners = async url => {
    const page = await browser.newPage();
    await page.goto(url);
    console.log(`Scrapping page: ${url}`);
    const scrappedParners = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.compact")).map(parnter => ({
        title: parnter.querySelector("h3.title").innerText.trim(),
        logo: parnter.querySelector(".logo img").src
      }))
    );

    await page.close();

    // Stop the recursion
    if (scrappedParners.length === 0) {
      console.log(`Ended recursion at url: ${url}`);
      return scrappedParners;
    } else {
      const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
      const nextUrl = `https://marketingplatform.google.com/about/partners/find-a-partner?page=${nextPageNumber}`;
      return scrappedParners.concat(await extractPartners(nextUrl));
    }
  };

  const browser = await puppeteer.launch();
  const startUrl = "https://marketingplatform.google.com/about/partners/find-a-partner?page=44";

  const partners = await extractPartners(startUrl);
  console.log(partners);

  await browser.close();
})();
