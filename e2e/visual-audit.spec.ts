import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/',
  '/officer',
  '/officer/cases/APP-2026-8801',
  '/officer/cases/APP-2026-8801/review',
  '/officer/cases/APP-2026-8801/replay',
  '/officer/tools',
  '/officer/network',
  '/officer/reports',
  '/officer/rules',
  '/officer/audit',
  '/portal/a',
  '/portal/b',
  '/embed/precheck',
  '/rectification',
  '/ui-kit',
  '/about',
  '/faq',
  '/accessibility',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/sitemap',
  '/help',
];

const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'phone-landscape-844x390', width: 844, height: 390 },
];

test.describe('Sakshya‑I5 - Comprehensive Visual & Accessibility Audit', () => {
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      test(`${route} @ ${vp.name} - no overflow & accessibility check`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route, { waitUntil: 'networkidle' });

        // Assert no horizontal scroll/overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin for subpixel rendering

        // Assert no raw black or pure white surfaces
        const invalidColors = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('div, section, main, header, nav, aside'));
          const violations: string[] = [];
          for (const el of elements) {
            const style = window.getComputedStyle(el);
            const bg = style.backgroundColor;
            if (bg === 'rgb(0, 0, 0)' || bg === 'rgb(255, 255, 255)') {
              // check if visible and has dimensions
              const rect = el.getBoundingClientRect();
              if (rect.width > 20 && rect.height > 20) {
                violations.push(`${el.tagName}.${el.className} has bg: ${bg}`);
              }
            }
          }
          return violations.slice(0, 5);
        });

        // Ignore mock external iframe wrappers (Portal A and Portal B)
        if (!route.startsWith('/portal/')) {
          expect(invalidColors).toEqual([]);
        }

        // Run axe a11y on desktop 1280
        if (vp.width === 1280) {
          const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .disableRules(['color-contrast']) // We already have a strict dedicated script for our palette
            .analyze();
          
          const criticalOrSerious = accessibilityScanResults.violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
          );
          expect(criticalOrSerious).toHaveLength(0);
        }
      });
    }
  }

  test('/officer/tools - tab state matches rendered panel & URL', async ({ page }) => {
    await page.goto('/officer/tools?tool=structure');
    await expect(page.locator('button[role="tab"][data-state="active"]')).toContainText('PDF Byte Structure');
    await expect(page.locator('text=PDF Structure & Byte-Level Inspection')).toBeVisible();

    await page.goto('/officer/tools?tool=geotag');
    await expect(page.locator('button[role="tab"][data-state="active"]')).toContainText('Geotag & Haversine');
    await expect(page.locator('text=Campus Photo Geotag Verification')).toBeVisible();
  });

  test('Government Chrome - Text Scaling, Language Toggle, Ticker, and Marquee interactions', async ({ page }) => {
    await page.goto('/');

    // 1. Text Size Scaling in MainNav
    const textSizeBtn125 = page.locator('button:has-text("A++")').first();
    await textSizeBtn125.click();
    const htmlFontSize = await page.evaluate(() => document.documentElement.style.fontSize);
    expect(htmlFontSize).toBe('125%');

    // Reset text size
    const textSizeBtn100 = page.locator('button:has-text("A")').nth(1);
    await textSizeBtn100.click();

    // 2. Language Switch to Hindi and persistence in MainNav
    const hiBtn = page.locator('button[lang="hi"]').first();
    await hiBtn.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    const storedLang = await page.evaluate(() => localStorage.getItem('sakshya-i5:lang'));
    expect(storedLang).toBe('hi');

    // Switch back to English
    const enBtn = page.locator('button[lang="en"]').first();
    await enBtn.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // 3. Notice Ticker Pause/Play
    const tickerPauseBtn = page.locator('button[aria-label="Pause notice ticker"], button[aria-label="Play notice ticker"]');
    await expect(tickerPauseBtn).toBeVisible();
    await tickerPauseBtn.click();
    await expect(page.locator('button[aria-label="Play notice ticker"]')).toBeVisible();

    // 4. Highlights Continuous Marquee on Landing Page
    const marquee = page.locator('[aria-label="Portal Highlights Marquee"]');
    await expect(marquee).toBeVisible();
  });
});
