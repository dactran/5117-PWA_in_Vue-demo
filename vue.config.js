module.exports = {
    // ...other vue-cli plugin options...
    pwa: {  
    //   configure the workbox plugin (either 'InjectManifest' or 'Generate SW')
        // workboxPluginMode: 'GenerateSW', 
        // workboxOptions: {
        //     navigateFallback: '/index.html',
        //     runtimeCaching: [
        //         {
        //             urlPattern: new RegExp('^https://.+'),
        //             handler: 'networkFirst',
        //             options: {
        //                 networkTimeoutSeconds: 20,
        //                 cacheName: 'api-cache',
        //                 cacheableResponse: {
        //                     statuses: [0,200]
        //                 }
        //             }
        //         }
        //     ]
        // },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
        //     // swSrc is required in InjectManifest mode.
        swSrc: 'src/service-worker.js',
        //     // ...other Workbox options...
        }
    }
  }

