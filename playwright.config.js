// Configurazione dei test automatici (Playwright).
// Avvio: npm test   (il server locale parte da solo sulla porta 4173)
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173/',
    ...devices['iPhone 13'],
    browserName: 'chromium',
    deviceScaleFactor: 1,
    trace: 'off'
  },
  webServer: {
    command: 'python3 -m http.server 4173',
    url: 'http://localhost:4173/',
    reuseExistingServer: !process.env.CI
  }
});
