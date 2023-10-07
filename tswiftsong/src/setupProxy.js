const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The path that triggers the proxy
    createProxyMiddleware({
      target: 'http://localhost:3001', // The URL of your Express.js server
      changeOrigin: true, // Set this to true if you are using a different origin
    })
  );
};
