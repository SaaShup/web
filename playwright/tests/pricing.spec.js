// @ts-check
const { test, expect } = require('@playwright/test');

for (const route of ['/pricing/', '/fr-fr/pricing/', '/de-de/pricing/']) {
  test(`pricing handles zero instances and restores unit prices: ${route}`, async ({ page }) => {
    await page.goto(`http://localhost:8080${route}`);
    await expect(page.locator('#bronze-btn')).toHaveAttribute('data-price', '10');
    const instances = page.locator('#slide-instance');
    const unit = page.locator('#pricing-unit');
    const total = page.locator('#pricing-value');
    for (const [plan, fixed, twoInstances] of [
      ['iron', '0.00', '10.00'],
      ['bronze', '10.00', '12.00'],
      ['silver', '30.00', '34.00'],
      ['gold', '90.00', '96.00'],
    ]) {
      await page.locator(`#${plan}-btn`).click();
      await instances.fill('0');
      await expect(total).toHaveText(fixed);
      await expect(unit).toBeHidden();
      await expect(unit).toHaveText('—');
      await instances.fill('2');
      await expect(total).toHaveText(twoInstances);
      await expect(unit).toBeVisible();
      await expect(unit).toHaveText((Number(twoInstances) / 2).toFixed(2));
    }
    await page.locator('#bronze-btn').click();
    await page.locator('#slide-memory').fill('1000');
    await instances.fill('0');
    await expect(total).toHaveText('10.00');
    await expect(unit).toBeHidden();
    await instances.fill('2');
    await expect(total).toHaveText('20.00');
    await expect(unit).toHaveText('10.00');
    await expect(unit).toBeVisible();
  });
}
