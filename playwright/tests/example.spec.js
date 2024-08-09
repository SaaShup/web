// @ts-check
const { test, expect } = require('@playwright/test');

test('index', async ({ page }) => {
  await page.goto('https://saashup.com/');

  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  console.log(`The website index is in ${lang}`)
});

test('fr-en', async ({ page }) => {
  await page.goto('/http://0.0.0.0:8080/fr-fr');
  await page.getByAltText('flag').click();
  await page.getByAltText('English langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Do you have a SaaS ?', { exact: true })).toBeVisible({ timeout: 10000 });
    console.log(`The website is in ${lang}`)
});


test('en-de', async ({ page }) => {
  await page.goto('http://0.0.0.0:8080/');
  await page.getByAltText('flag').click();
  await page.getByAltText('Deutsch langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Haben Sie eine SaaS?', { exact: true })).toBeVisible({ timeout: 10000 });
    console.log(`The website is in ${lang}`)
});

test('de-fr', async ({ page }) => {
  await page.goto('http://0.0.0.0:8080/de-de');
  await page.getByAltText('flag').click();
  await page.getByAltText('French langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Avez-vous un SaaS ?', { exact: true })).toBeVisible({ timeout: 10000 });
    console.log(`The website is in ${lang}`)
});