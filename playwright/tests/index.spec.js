// @ts-check
const { test, expect } = require('@playwright/test');

test('index', async ({ page }) => {
  await page.goto('https://saashup.com/');

  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
});

test('fr-en', async ({ page }) => {
  await page.goto('http://localhost:8080/fr-fr/');
  await page.getByAltText('flag').click();
  await page.getByAltText('English langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Do you have a SaaS ?', { exact: true })).toBeVisible({ timeout: 10000 });
});


test('en-de', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByAltText('flag').click();
  await page.getByAltText('Deutsch langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Haben Sie eine SaaS?', { exact: true })).toBeVisible({ timeout: 10000 });
});

test('de-fr', async ({ page }) => {
  await page.goto('http://localhost:8080/de-de/');
  await page.getByAltText('flag').click();
  await page.getByAltText('French langage').click();
  const lang = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  await expect(page.getByText('Avez-vous un SaaS ?', { exact: true })).toBeVisible({ timeout: 10000 });
});

test('login language switch keeps login page', async ({ page }) => {
  await page.goto('http://localhost:8080/login/');
  await page.getByAltText('flag').click();
  await page.getByAltText('French langage').click();
  await page.waitForURL('**/fr-fr/login/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-fr');
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

  await page.getByAltText('flag').click();
  await page.getByAltText('Deutsch langage').click();
  await page.waitForURL('**/de-de/login/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'de-de');
  await expect(page.getByRole('heading', { name: 'Anmeldung' })).toBeVisible();
});

test('pricing pages share modern layout and calculator', async ({ browser }) => {
  const pages = [
    ['http://localhost:8080/pricing/', 'en', 'Pricing calculator'],
    ['http://localhost:8080/fr-fr/pricing/', 'fr-fr', 'Calculateur de tarifs'],
    ['http://localhost:8080/de-de/pricing/', 'de-de', 'Preisrechner'],
  ];

  for (const [url, lang, calculatorTitle] of pages) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript((storedLang) => {
      window.localStorage.setItem('lang', storedLang);
    }, lang);
    await page.goto(url);
    await expect(page.locator('.pricing-grid')).toBeVisible();
    await expect(page.locator('.pricing-card')).toHaveCount(4);
    await expect(page.getByRole('heading', { name: calculatorTitle })).toBeVisible();
    await expect(page.locator('#slide-memory')).toBeVisible();
    await expect(page.locator('#slide-instance')).toBeVisible();
    await expect(page.locator('#pricing-value')).toBeVisible();
    await context.close();
  }
});

test('logo ovh en', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.locator('.eyebrow', { hasText: 'Platform services' })).toBeVisible({ timeout: 10000 });
});

test('logo ovh fr', async ({ page }) => {
  await page.goto('http://localhost:8080/fr-fr/');
  await expect(page.locator('.eyebrow', { hasText: 'Services plateforme' })).toBeVisible({ timeout: 10000 });
});

test('logo ovh de', async ({ page }) => {
  await page.goto('http://localhost:8080/de-de/');
  await expect(page.locator('.eyebrow', { hasText: 'Plattform Services' })).toBeVisible({ timeout: 10000 });
});
