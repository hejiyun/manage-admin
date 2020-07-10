const { createProxyMiddleware } = require('http-proxy-middleware');
// 配置本地开发服务器
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://10.65.6.201:8085/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}