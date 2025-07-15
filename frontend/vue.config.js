/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    transpileDependencies: [],
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
            }),
            new GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/seu-magento\.com\.br\/rest\//,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'magento-api',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                            },
                        },
                    },
                ],
            }),
        ],
    },
    devServer: {
        allowedHosts: ['localhost', '127.0.0.1'],
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/rest': {
                target: 'https://seu-magento.com.br',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/rest': '/rest' },
                logLevel: 'debug',
                onProxyReq: (proxyReq, req, res) => {
                    console.log('Proxy Request:', req.method, req.url);
                },
                onProxyRes: (proxyRes, req, res) => {
                    console.log('Proxy Response:', proxyRes.statusCode, req.url);
                },
                onError: (err, req, res) => {
                    console.error('Proxy Error:', err);
                },
            },
        },
    },
};
