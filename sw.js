/* ==========================================================================
   SERVICE WORKER DI PULIZIA
   Prima il gioco Espo-Nentia era sulla radice del sito, con un service worker
   che salvava i file per l'uso offline. Adesso il gioco è in /espo-nentia/
   e ha il suo service worker. Questo file sostituisce quello vecchio:
   1. cancella solo le cache vecchie ("esponentia-vN");
   2. si disattiva da solo;
   3. ricarica le pagine della radice, che così mostrano la pagina dei giochi.
   Tienilo finché ci sono telefoni che hanno aperto la versione vecchia.
   ========================================================================== */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => /^esponentia-v\d+$/.test(k)).map(k => caches.delete(k)));
    await self.registration.unregister();
    const root = new URL('./', self.registration.scope).pathname;
    const wins = await self.clients.matchAll({ type: 'window' });
    for (const w of wins) {
      const path = new URL(w.url).pathname;
      if (path === root || path === root + 'index.html') w.navigate(w.url);
    }
  })());
});
