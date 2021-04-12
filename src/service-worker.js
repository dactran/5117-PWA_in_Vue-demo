// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

// import { registerRoute } from 'workbox-routing';
// import {
//   NetworkFirst,
//   StaleWhileRevalidate,
//   CacheFirst,
// } from 'workbox-strategies';

// // Used for filtering matches based on status code, header, or both
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// // Used to limit entries in cache, remove entries after a certain period of time
// import { ExpirationPlugin } from 'workbox-expiration';

// Sets up debugging msgs
workbox.setConfig({
    debug: true
});

// Sets prefix for cache name
workbox.core.setCacheNameDetails({prefix:  "pwa-demo"});

// Sets up static caching using a pre-built Manifest
 self.__precacheManifest = [].concat(self.__precacheManifest || []);
 workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
 
//  workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
 
// Sets up runtime caching
// Cache page navigations (html) with a Network First strategy
workbox.routing.registerRoute(
    /(.*)html$/,
    new workbox.strategies.NetworkFirst({
        cacheName: "dynamic-page",
        networkTimeoutSeconds: 20,
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.Plugin({
              statuses: [200],
            }),
          ]
    })
);
// Cache .js or .css files
workbox.routing.registerRoute(
    new RegExp('\\.+(?:js|css)$'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "dynamic-script",
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
        ],
    })
  );
  // Cache images with a Cache First strategy
  workbox.routing.registerRoute(
    new RegExp('\\.+(?:png|gif|jpg|svg)$'),
    new workbox.strategies.CacheFirst({
      cacheName: "dynamic-img",
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new workbox.cacheableResponse.Plugin({
          statuses: [200],
        }),
        // Don't cache more than 50 items, and expire them after 30 days
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
        }),
      ],
    }),
  );
