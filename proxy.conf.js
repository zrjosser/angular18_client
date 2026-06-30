const PROXY_CONFIG = {
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "configure": (proxy, _options) => {
      proxy.on('proxyReq', (proxyReq, req, _res) => {
        console.log(`🚀 [Proxy] Redirigiendo: ${req.method} ${req.url} -> http://localhost:3000`);
      });
      proxy.on('error', (err, _req, _res) => {
        console.error('❌ [Proxy Error]:', err);
      });
    }
  }
};

module.exports = PROXY_CONFIG;