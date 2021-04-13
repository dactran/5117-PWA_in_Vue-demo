/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

workbox.core.setCacheNameDetails({prefix: "pwa-in-vue-demo"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));

workbox.routing.registerRoute(/^https:\/\/.+/, new workbox.strategies.NetworkFirst({ "cacheName":"api-cache","networkTimeoutSeconds":20, plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');


//Web Push Notifications//
let click_open_url;
self.addEventListener('push', function(event) {
  let push_message = event.data.text();
  // push notification can send event.data.json() as well
  click_open_url = "https://swina.github.io/2019/02/vue-service-worker-for-webpush-notifications/"
  const options = {
    body: "it's not interesting",
    icon: "../img/logo.82b9c7a5.png",
    vibrate: [200, 100, 200, 100, 200, 100, 200], 
    tag: 'vibration-sample'
  };
  event.waitUntil (
    self.registration.showNotification("my notification", options)
  )
});

self.addEventListener('notificationclick', function(event) {
  const clickedNotification = event.notification;
  clickedNotification.close();
  if ( click_open_url ){
    const promiseChain = clients.openWindow(click_open_url);
    event.waitUntil(promiseChain);
  }
});
