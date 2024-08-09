// @ts-check
const { test, expect } = require('@playwright/test');

test('test full catalog', async ({ page }) => {
  await page.goto('http://localhost:8080/catalog/');
  await page.type("#search-input-text", ''); 
  await page.keyboard.press("Enter");

  const Blocks = page.locator("#catalog-dynamic-list > div");
    await expect(Blocks).toHaveCount(31)//toHaveClass('col-sm-12 col-md-4');
  
    for (const Block of await Blocks.all()) {
      await expect(Block).toBeVisible();
    }
  });

  test('test one catalog (minio)', async ({ page }) => {
    await page.goto('http://localhost:8080/catalog/');
    await page.type("#search-input-text", 'minio'); 
    await page.keyboard.press("Enter");
  
    await expect(page.getByAltText('Multi-Cloud Object Storage')).toBeVisible({ timeout: 10000 });

    });

    test('test one catalog (couchdb)', async ({ page }) => {
      await page.goto('http://localhost:8080/catalog/');
      await page.type("#search-input-text", 'couchdb'); 
      await page.keyboard.press("Enter");
    
      await expect(page.getByAltText('Seamless, that scales, reliable with an Intuitive HTTP/JSON API')).toBeVisible({ timeout: 10000 });
  
      });

      test('test nothing catalog', async ({ page }) => {
        await page.goto('http://localhost:8080/catalog/');
        await page.type("#search-input-text", 'hgergbehi'); 
        await page.keyboard.press("Enter");
      
        const Blocks = page.locator("#catalog-dynamic-list > div");
          await expect(Blocks).toHaveCount(0)
        
          for (const Block of await Blocks.all()) {
            await expect(Block).toBeVisible();
          }
        });
  