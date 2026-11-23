// Pagina dei giochi e pulizia del vecchio service worker del gioco.
const { test, expect } = require('@playwright/test');

test('la pagina dei giochi mostra la scheda di Espo-Nentia senza errori', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('./');
  const card = page.locator('a.card[href="espo-nentia/"]');
  await expect(card).toBeVisible();
  await expect(card).toContainText('Espo-Nentia');
  const imgOk = await card.locator('img').evaluate(img => img.complete && img.naturalWidth > 0);
  expect(imgOk).toBe(true);
  // Nessuno scorrimento orizzontale sul telefono.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test('il service worker vecchio viene sostituito: cache vecchie cancellate, le altre restano', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(async () => {
    await (await caches.open('esponentia-v13')).put('/vecchio/', new Response('ok'));
    await (await caches.open('espo-nentia-v14')).put('/espo-nentia/', new Response('ok'));
    await navigator.serviceWorker.register('sw.js');
  });
  await page.waitForFunction(async () => !(await navigator.serviceWorker.getRegistration()), null, { timeout: 10000 });
  await page.waitForLoadState('load');
  const keys = await page.evaluate(() => caches.keys());
  expect(keys).not.toContain('esponentia-v13');
  expect(keys).toContain('espo-nentia-v14');
  await expect(page.locator('a.card[href="espo-nentia/"]')).toBeVisible();
});
