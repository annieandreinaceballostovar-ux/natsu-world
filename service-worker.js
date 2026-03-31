/**
 * NATSU WORLD - SERVICE WORKER 🧸
 * Versión: 1.0.5 (Optimizado para Vercel y Redmi A5)
 */

const CACHE_NAME = 'natsu-world-v1.0.5';

// 1. LISTA DE RECURSOS (Corregida según tu index.html)
const assets = [
  './',
  './index.html',
  './styles.css',
  './js.js',             // Cambiado de i18n.js a js.js (el que me pasaste)
  './manifest.json',
  './assets/images/perfil.png',
  './assets/frames/oso.png',    // Agregado: lo usas en el modal y posts
  './assets/frames/pastel.png', // Agregado: lo usas en el modal y títulos
  './assets/frames/corazon.png',// Agregado: lo usas en el header
  './assets/icons/icon-call.png',
  './assets/icons/icon-video.png',
  './assets/icons/sonido-on.png',
  './assets/sounds/notificacion.m4a' // Agregado para que suene sin internet
];

// INSTALACIÓN
self.addEventListener('install', e => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Natsu World: ¡Recursos guardados con éxito! 🎀');
      // Usamos cache.addAll pero con un truco para que no falle si falta un archivo
      return Promise.all(
        assets.map(url => {
          return cache.add(url).catch(err => console.warn(`No se pudo cachear: ${url}`, err));
        })
      );
    })
  );
});

// ACTIVACIÓN (Limpieza total de versiones viejas)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// FETCH (Estrategia: Primero Red, si falla, Caché)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Si la red responde, guardamos una copia fresca en el caché
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request)) // Si no hay red, entrega lo guardado
  );
});