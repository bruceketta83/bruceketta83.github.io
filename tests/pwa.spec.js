// Gioco offline: dopo la prima visita il gioco si apre anche senza rete.
const { test, expect } = require('@playwright/test');

test('il gioco funziona offline dopo la prima visita', async ({ page, context }) => {
  await page.goto('./');
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return !!reg.active;
  });
  // Seconda visita: il service worker controlla la pagina e salva i file.
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await page.waitForTimeout(1000);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('#btn-start')).toBeVisible();
  await page.click('#btn-start');
  await page.waitForTimeout(2600);
  await expect(page.locator('#scene-svg #char-aria')).toHaveCount(1);
  await context.setOffline(false);
});

test('il manifest è valido e le icone esistono', async ({ request }) => {
  const res = await request.get('manifest.json');
  expect(res.ok()).toBe(true);
  const m = await res.json();
  expect(m.display).toBe('standalone');
  for (const icon of m.icons) {
    const r = await request.get(icon.src);
    expect(r.ok(), icon.src).toBe(true);
  }
});
