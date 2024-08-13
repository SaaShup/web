// @ts-check
const {
  test,
  expect
} = require('@playwright/test');

test('test full catalog', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(7000);
  await page.type("#search-input-text", '');
  await page.getByRole('button', {
    name: 'Search'
  }).click({
    button: 'left'
  });

  const Block = await page.locator("#catalog-dynamic-list > div").count();
  expect(Block).toBeGreaterThan(1)
});

test('test one catalog (minio)', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  await page.type("#search-input-text", 'minio');
  await page.getByRole('button', {
    name: 'Search'
  }).click({
    button: 'left'
  });

  const Blocks = page.locator("#catalog-dynamic-list > div");
  await expect(Blocks).toHaveCount(1)

});

test('test one catalog (couchdb)', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  await page.type("#search-input-text", 'couchdb');
  await page.getByRole('button', {
    name: 'Search'
  }).click({
    button: 'left'
  });

  const Blocks = page.locator("#catalog-dynamic-list > div");
  await expect(Blocks).toHaveCount(1)

});

test('test nothing catalog', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  await page.type("#search-input-text", 'hgergbehi');
  await page.getByRole('button', {
    name: 'Search'
  }).click({
    button: 'left'
  });

  const Blocks = page.locator("#catalog-dynamic-list > div");
  await expect(Blocks).toHaveCount(0)

});

test('test one catalog with enter(couchdb)', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  await page.type("#search-input-text", 'couchdb');
  await page.keyboard.press("Enter");

  const Blocks = page.locator("#catalog-dynamic-list > div");
  await expect(Blocks).toHaveCount(1)

});

test('test dropdown category catalog', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  await page.locator('#search-input-select').click({
    button: 'left'
  });

  const Box = await page.locator("#search-input-select > option").count();
  expect(Box).toBeGreaterThan(10)

});

test('test dropdown category for web', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  const element = page.locator("#search-input-select");
  await element.click({
    button: 'left'
  });

  await element.selectOption('web')
  await page.getByAltText("Turn your audience into a business").isVisible();

});

test('test dropdown category for bot', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  const element = page.locator("#search-input-select");
  await element.click({
    button: 'left'
  });

  await element.selectOption('bot')
  await page.getByAltText("great sounding TS3- and Discord-Bot").isVisible();

});

test('test dropdown category for all', async ({
  page
}) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.waitForTimeout(5000);
  const element = page.locator("#search-input-select");
  await element.click({
    button: 'left'
  });

  await element.selectOption('all')
  const Box = await page.locator("#search-input-select > option").count();
  expect(Box).toBeGreaterThan(10)
});