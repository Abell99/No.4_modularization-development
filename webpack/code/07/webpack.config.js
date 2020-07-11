const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 导入webpack的内置插件
const webpack = require('webpack')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  // 配置开发过程中的辅助工具
  devtool: 'source-map',
  // 指定webpack-dev-server的配置选项
  devServer: {
    contentBase: ['./public'], // 指定静态服务地址
    proxy: {
      // proxy对象用来指定代理服务器，每一个属性都是一则代理规则
      // 属性名:需要代理的请求路径前缀 属性值:需要代理到的地址
      '/api': {
        // http://localhost:8080/api/users ==> https://api.github.com/api/users
        target: 'https://api.github.com', // 替换的目标地址
        // http://localhost:8080/api/users ==> https://api.github.com/users
        pathRewrite: { 
          '^/api': '' // 这一步更换的原因是前端的api文件目录发起代理请求的时候，需要和服务器上api的目录保持一致
        },
        // 指定放发起代理请求的时候，修改主机名。不能使用localhost:8080作为请求GitHub的主机名
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10 KB
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Tutorials',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    }),
    // 开发阶段不推荐使用这个插件
    /* new CopyWebpackPlugin([
      // 'public/**'
      'public'
    ]) */
    // 配置使用HMR
    new webpack.HotModuleReplacementPlugin()
  ]
}
