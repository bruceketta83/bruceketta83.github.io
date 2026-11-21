/* ==========================================================================
   SERVICE WORKER: gioco offline
   Strategia "prima la rete": online scarica sempre la versione nuova e
   aggiorna la copia; offline usa la copia salvata sul dispositivo.
   Cambia CACHE quando cambia l'elenco dei file.
   ========================================================================== */
const CACHE = 'esponentia-v6';
const FILES = [
  './',
  'index.html',
  'style.css',
  'manifest.json',
  'icons/icon.svg',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'js/audio.js',
  'js/data.js',
  'js/generator.js',
  'js/exercises.js',
  'js/calculator.js',
  'js/reading.js',
  'img/bg/pontile.webp',
  'img/bg/spiaggia.webp',
  'img/bg/capanno.webp',
  'img/bg/strada.webp',
  'img/bg/taverna.webp',
  'img/bg/torre.webp',
  'img/bg/belvedere.webp',
  'img/bg/piazza.webp',
  'img/bg/piazza-chiusa.webp',
  'img/bg/biblioteca.webp',
  'img/bg/serra.webp',
  'img/bg/vivaio.webp',
  'img/bg/officina.webp',
  'img/bg/officina-chiusa.webp',
  'img/bg/magazzino.webp',
  'img/bg/scala.webp',
  'img/bg/faro-spento.webp',
  'img/bg/faro-acceso.webp',
  'img/bg/titolo.webp',
  'fonts/opendyslexic-latin-400-normal.woff2',
  'fonts/opendyslexic-latin-700-normal.woff2',
  'fonts/atkinson-hyperlegible-latin-400-normal.woff2',
  'fonts/atkinson-hyperlegible-latin-700-normal.woff2',
  'js/characters.js',
  'js/scenes.js',
  'js/world.js',
  'js/rooms.js',
  'js/rooms2.js',
  'js/meta.js',
  'js/game.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('index.html')))
  );
});
