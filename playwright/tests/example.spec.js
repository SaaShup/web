// @ts-check
const { test, expect } = require('@playwright/test');

/*test('catalog button', async ({ page }) => {
  await page.goto('https://saashup.com/fr-fr/');

  // Click the get started link.
  await page.getByRole('link', { name: 'catalogue' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('button', { name: 'Rechercher' })).toBeVisible();

  await page.getByAltText('saashup application catalog')//.screenshot({ animations: 'disabled', path: 'link.png' });
  
});

test('translate', async ({ page }) => {
  await page.goto('https://saashup.com/fr-fr/');

  await page.getByAltText('flag').click();
  await page.getByAltText('English langage').click();

  //const locator = page.locator('lang')
  //console.log(await expect(locator).toHaveAttribute('lang','en'))

  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
    console.log(lang)
});*/

test('fr-en', async ({ page }) => {
  await page.goto('https://saashup.com/fr-fr/');
  await page.getByAltText('flag').click();
  await page.getByAltText('English langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Do you have a SaaS ?', { exact: true })).toBeVisible({ timeout: 10000 });
    console.log(`The website is in ${lang}`)
});


test('en-de', async ({ page }) => {
  await page.goto('https://saashup.com/');
  await page.getByAltText('flag').click();
  await page.getByAltText('Deutsch langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Haben Sie eine SaaS?', { exact: true })).toBeVisible({ timeout: 10000 });
    console.log(`The website is in ${lang}`)
});

test('de-fr', async ({ page }) => {
  await page.goto('https://saashup.com/de-de');
  await page.getByAltText('flag').click();
  await page.getByAltText('French langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Avez-vous un SaaS ?', { exact: true })).toBeVisible({ timeout: 10000 });
    console.log(`The website is in ${lang}`)
});