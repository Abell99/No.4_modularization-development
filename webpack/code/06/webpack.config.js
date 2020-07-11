const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

class MyPlugin {
  // compiler 构建对象参数，包含了此次构建的所有配置信息
  apply (compiler) {
    console.log('MyPlugin 启动')
    // 通过compiler来注册钩子函数,通过这个对象下面的hooks属性可以找到所需要的钩子
    // 这里使用的钩子是 emit : 在输出资产到输出目录之前执行。
    // 通过tap方法来注册钩子函数
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文，打包的结果
      for (const name in compilation.assets) {
        // console.log(name) // 遍历所有的资源文件名称
        // console.log(compilation.assets[name].source()) // 遍历所有资源文件的内容
        if (name.endsWith('.js')) { // 设置处理的目标是以.js结尾的脚本文件
          const contents = compilation.assets[name].source()
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '') // 将空的注释内容转换为空字符串
          compilation.assets[name] = { // 将修改后的资源文件内容重新赋值给资源文件
            source: () => withoutComments,
            size: () => withoutComments.length // webpack要求的，修改文件内容必须返回的一个方法
          }
        }
      }
    })
  }
}

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    // publicPath: 'dist/'
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
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html'
    }),
    new CopyWebpackPlugin([
      // 'public/**'
      'public'
    ]),
    new MyPlugin()
  ]
}
