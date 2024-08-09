// @ts-check
const { test, expect } = require('@playwright/test');

test('test full catalog', async ({ page }) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.type("#search-input-text", ''); 
  await page.getByRole('button', { name: 'Search'}).click({ button: 'left' });

  const Block = await page.locator("#catalog-dynamic-list > div").count();
     expect(Block).toBeGreaterThan(1)
  });

  test('test one catalog (minio)', async ({ page }) => {
    await page.goto('http://localhost:8080/catalog/');
    await page.type("#search-input-text", 'minio'); 
    await page.getByRole('button', { name: 'Search'}).click({ button: 'left' });
  
    const Blocks = page.locator("#catalog-dynamic-list > div");
    await expect(Blocks).toHaveCount(1)
  
    });

    test('test one catalog (couchdb)', async ({ page }) => {
      await page.goto('http://localhost:8080/catalog/');
      await page.type("#search-input-text", 'couchdb'); 
      await page.getByRole('button', { name: 'Search'}).click({ button: 'left' });
    
      const Blocks = page.locator("#catalog-dynamic-list > div");
      await expect(Blocks).toHaveCount(1)
     
      });

      test('test nothing catalog', async ({ page }) => {
        await page.goto('http://localhost:8080/catalog/');
        await page.type("#search-input-text", 'hgergbehi'); 
        await page.getByRole('button', { name: 'Search'}).click({ button: 'left' });
      
        const Blocks = page.locator("#catalog-dynamic-list > div");
          await expect(Blocks).toHaveCount(0)
        
        });

        test('test one catalog with enter(couchdb)', async ({ page }) => {
          await page.goto('http://localhost:8080/catalog/');
          await page.type("#search-input-text", 'couchdb'); 
          await page.keyboard.press("Enter");
        
          const Blocks = page.locator("#catalog-dynamic-list > div");
          await expect(Blocks).toHaveCount(1)
         
          });
  