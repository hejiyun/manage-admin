const { createProxyMiddleware } = require('http-proxy-middleware');
// 配置本地开发服务器
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://xx.xx.xx.xx:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}