const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://marketingplatform.google.com/about/partners/find-a-partner?utm_source=marketingplatform.google.com&utm_medium=et&utm_campaign=marketingplatform.google.com%2Fabout%2Fpartners%2F";
  await page.goto(url);
  //await page.screenshot({ path: "example.png" });

  const partners = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.compact"))
    .map(parnter => ({
        title: parnter.querySelector('h3.title').innerText.trim(),
        logo: parnter.querySelector('.logo img').src,
    }))
  );

  console.log(partners);

  await browser.close();
})();
