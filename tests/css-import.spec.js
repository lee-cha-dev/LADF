import { test, expect } from '@playwright/test';

test('LADF styles are applied from package CSS', async ({ page }) => {
  await page.goto('/');

  const panel = page.locator('.ladf-panel').first();
  await expect(panel).toBeVisible();

  const borderRadius = await panel.evaluate((el) =>
    window.getComputedStyle(el).borderRadius
  );

  expect(borderRadius).toBe('16px');
});
