const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
let createJson = function () {
  let serveConfigJson = {
    data:{
      BASE_URL:"http://172.18.185.18:8511/api/",
    },
  }
  return JSON.stringify(serveConfigJson)
}


module.exports = {
  configureWebpack: {
    plugins:[
      new GenerateAssetPlugin({
        filename: 'serve.config.json', // 输出到test根目录下的serve.config.json
        fn: (compilation, cb) => {
          cb(null, createJson(compilation))
        },
      })
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // '@':'src',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'vendor':'@/vendor',
      }
    }
  },
  // productionSourceMap:false,
  // devServer: {
  //   host:'localhost',
  //   port:'8080',
  //   https:false,
  //
  //   proxy: {
  //     '/api': {
  //       target: 'http://172.18.10.71:1001/',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }, //配置跨域支持
  // }
}
