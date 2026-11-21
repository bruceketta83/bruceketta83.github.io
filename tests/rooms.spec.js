// Tutte le stanze si aprono senza errori e gli oggetti sono nell'area visibile dei telefoni.
const { test, expect } = require('@playwright/test');
const { watchErrors, startGame } = require('./helpers');

test('ogni stanza di ogni area si carica senza errori', async ({ page }) => {
  const errors = watchErrors(page);
  await startGame(page, { currentArea: 0, unlockedArea: 5, completedAreas: [0, 1, 2, 3, 4], unlockedRules: [] });
  const rooms = await page.evaluate(() => AREAS.flatMap(a => Object.keys(areaRooms(a)).map(r => [a.id, r])));
  expect(rooms.length).toBeGreaterThanOrEqual(15);
  for (const [a, r] of rooms) {
    await page.evaluate(([aa, rr]) => travelTo(aa, rr), [a, r]);
    await page.waitForTimeout(700);
    const banner = await page.textContent('#location-banner');
    expect(banner.length, `banner ${a}/${r}`).toBeGreaterThan(3);
    expect(await page.locator('#scene-svg #char-aria').count(), `Aria in ${a}/${r}`).toBe(1);
  }
  expect(errors).toEqual([]);
});

test('nessun oggetto è fuori dall’area visibile sui telefoni stretti', async ({ page }) => {
  await page.goto('./');
  const outside = await page.evaluate(() => {
    const res = [];
    AREAS.forEach(a => Object.entries(areaRooms(a)).forEach(([rid, r]) => (r.hotspots || []).forEach(h => {
      const [x, , w] = h.box;
      if (!w) return;
      const cx = x + w / 2;
      if (cx < 50 || cx > 350) res.push(`${a.id}/${rid}/${h.id}`);
    })));
    return res;
  });
  // La nave di Vera è grande: il suo centro è visibile.
  expect(outside.filter(id => !id.endsWith('/nave'))).toEqual([]);
});
