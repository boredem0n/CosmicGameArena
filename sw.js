// Nama cache
const CACHE_NAME = 'cosmic-game-arena-cache-v1';
// Daftar file yang akan di-cache
const urlsToCache = [
  '/',
  '/index.html',
  // Jika kamu punya file CSS atau JS terpisah, tambahkan di sini.
  // Contoh: '/styles.css', '/app.js'
  '/CosmicGameArena/photo/cosmic.jpg' // Cache ikonmu juga
];

// Event 'install': Dipanggil saat service worker pertama kali diinstal
self.addEventListener('install', event => {
  // Tunggu hingga proses caching selesai
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': Dipanggil setiap kali ada request network (misal: memuat gambar, halaman)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika request ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak ada, fetch dari network
        return fetch(event.request);
      }
    )
  );
});
