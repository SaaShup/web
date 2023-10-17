import { test, expect } from '@playwright/test';

test('french url', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('button', { name: 'flag' }).click();
  await page.getByRole('link', { name: 'French langage' }).click();
  await expect(page).toHaveURL('http://localhost:8080/fr-fr/');
});

test('english url', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('button', { name: 'flag' }).click();
  await page.getByRole('link', { name: 'English langage' }).click();
  await expect(page).toHaveURL('http://localhost:8080/');
});

test('deutsch url', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('button', { name: 'flag' }).click();
  await page.getByRole('link', { name: 'Deutsch langage' }).click();
  await expect(page).toHaveURL('http://localhost:8080/de-de/');
});