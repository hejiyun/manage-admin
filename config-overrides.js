/* config-overrides.js */
const { override, fixBabelImports,addWebpackExternals, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');
const path = require("path")

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const myPlugin = [
  new UglifyJsPlugin(
    {
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }
  )
]
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,  
  }),
  addDecoratorsLegacy(), // 支持装饰器
  addWebpackAlias({ //路径别名
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@util': path.resolve(__dirname, 'src/util'),
    '@router': path.resolve(__dirname, 'src/router'),
    '@axios': path.resolve(__dirname, 'src/axios'),
    '@store': path.resolve(__dirname, 'src/store')
  }),
  // 添加主题色
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }
  }),
  // 插件以cdn的方式引入
  addWebpackExternals({ //不做打包处理配置，如直接以cdn引入的
    echarts: "window.echarts",
    // highcharts:"window.highcharts"
  }),
  (config) => { //暴露webpack的配置 config ,evn
    // 去掉打包生产map 文件
    // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    if(process.env.NODE_ENV==="production") config.devtool=false;
    if(process.env.NODE_ENV!=="development") config.plugins = [...config.plugins,...myPlugin]
    //1.修改、添加loader 配置 :
    // 所有的loaders规则是在config.module.rules(数组)的第二项
    // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
    // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    loaders[5].use.push({
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, 'src/asset/base.scss')//全局引入公共的scss 文件
      }
    })
    return config
  }
)