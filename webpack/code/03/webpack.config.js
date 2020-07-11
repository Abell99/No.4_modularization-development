const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.js$/, // 取代webpack的默认加载器
        use: {
          loader: 'babel-loader',
          options: { // 可选项，选择插件集合
            presets: ['@babel/preset-env'] // 最新特性
          }
        }
      },
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
      },
      {
        test: /.html$/, // 页面资源的加载
        use: {
          loader: 'html-loader',
          options: { // 指定html页面中资源请求的触发条件
            attributes: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'a',
                  attribute: 'href',
                  type: 'src'
                }
              ]
            }
          }
        }
      }
    ]
  }
}
