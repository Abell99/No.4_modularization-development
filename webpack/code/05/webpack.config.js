const path = require('path')

// 导入需要使用的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
    // publicPath: 'dist/' // 当html也是自动生成的时候，就无需指定根目录了
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
  plugins: [ // 插件的集合
    new CleanWebpackPlugin(), // 通过new来运行插件
    // 用于生成index.html文件
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    })
    // 设置文件名生成其他的html文件
    new HtmlWebpackPlugin（{
      filename: 'about.html'
    },
    new CopyWebpackPlugin([
      'public'
    ])
  ]
}
