const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const path = require('path')
const env = process.env.NODE_ENV
// let target = process.env.VUE_APP_URL
let target = 'loaclhost:8088'

const devProxy = ['/api', '/'] // 代理

// 生成代理配置对象
let proxyObj = {};
devProxy.forEach((value, index) => {
  proxyObj[value] = {
    ws: false,
    target: target,
    // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    changeOrigin: true,
    pathRewrite: {
      [`^${value}`]: value
    }
  };
})

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  // 让样式找到源
  css: {
    sourceMap: true
  },
  configureWebpack: config => {
    // 确保静态资源
    config.resolve.extensions = ['.js', '.vue', '.json', '.css']
    config.plugins.push(
      new CopyWebpackPlugin([
        { from: 'public/', to: 'public' }
        ]),
    )
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    } else {
      // 为开发环境修改配置...
    }

  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('~models', resolve('src/models'))
      .set('~utils', resolve('src/models/utils'))
      .set('~components', resolve('src/components'))
      .set('~modules', resolve('src/models/services/modules'))
      .set('~config', resolve('src/config'))
      .set('~views', resolve('src/views'))
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    proxy: 'http://localhost:8088'
  }
}