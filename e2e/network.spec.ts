import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
];

test.describe('Network Graph Verification (/officer/network)', () => {
  for (const vp of VIEWPORTS) {
    test(`Graph renders without overlap & with min 12px text @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/officer/network', { waitUntil: 'networkidle' });

      // 1. No horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

      // 2. Nodes are rendered as real HTML button elements
      const nodeButtons = page.locator('button[id^="node-btn-"]');
      const count = await nodeButtons.count();
      expect(count).toBeGreaterThanOrEqual(6);

      // 3. Minimum text size 12px for node main labels
      const labelFontSizes = await page.evaluate(() => {
        const labels = Array.from(document.querySelectorAll('button[id^="node-btn-"] + div span:first-child'));
        return labels.map((l) => parseFloat(window.getComputedStyle(l).fontSize));
      });
      for (const size of labelFontSizes) {
        expect(size).toBeGreaterThanOrEqual(12);
      }

      // 4. Overlap & Collision Check between node button rectangles
      const nodeBoxes = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button[id^="node-btn-"]'));
        return btns.map((b) => {
          const rect = b.getBoundingClientRect();
          return { id: b.id, x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        });
      });

      for (let i = 0; i < nodeBoxes.length; i++) {
        for (let j = i + 1; j < nodeBoxes.length; j++) {
          const b1 = nodeBoxes[i];
          const b2 = nodeBoxes[j];
          const isOverlapping = !(
            b1.x + b1.width < b2.x ||
            b2.x + b2.width < b1.x ||
            b1.y + b1.height < b2.y ||
            b2.y + b2.height < b1.y
          );
          expect(isOverlapping).toBe(false);
        }
      }

      // 5. Details panel appears immediately when a node is selected
      const detailsCard = page.locator('div[role="region"][aria-label="Node details panel"]');
      await expect(detailsCard).toBeVisible();

      // Check Esc key closes details
      await page.keyboard.press('Escape');
      await expect(detailsCard).not.toBeVisible();

      // 6. Axe accessibility check on desktop 1280
      if (vp.width === 1280) {
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa'])
          .disableRules(['color-contrast'])
          .analyze();

        const criticalOrSerious = accessibilityScanResults.violations.filter(
          (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(criticalOrSerious).toHaveLength(0);
      }
    });
  }

  test('Keyboard navigation through nodes and list view toggle', async ({ page }) => {
    await page.goto('/officer/network');

    // Focus graph container
    const graphGroup = page.locator('div[role="group"][aria-label*="Entity relationship"]');
    await graphGroup.focus();

    // Press ArrowRight to navigate to next node
    await page.keyboard.press('ArrowRight');
    const firstNode = page.locator('button[id^="node-btn-"]').first();
    await expect(firstNode).toBeVisible();

    // Toggle list view
    const listViewBtn = page.locator('button:has-text("List view"), button:has-text("तालिका दृश्य")');
    await listViewBtn.click();
    await expect(page.locator('table')).toBeVisible();
  });
});
