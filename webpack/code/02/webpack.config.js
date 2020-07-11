const path = require('path')

module.exports = {
  mode: 'development', // 打包模式: production/development/none
  entry: './src/main.js', // 设置入口文件 不设置默认为: './src/index.js'
  output: { // 设置输出文件路径
    filename: 'main.js', // 设置输出文件名称 不设置默认为: 'main.js'
    path: path.join(__dirname, 'dist'), // 设置输出文件路径 不设置默认为: 'dist'
    publicPath: 'dist/' // 设置网址根目录
  },
  // 其他资源文件
  module: {
    // 数组对象对应每一个类型的资源文件，对应使用相应的加载器处理
    rules: [
      {
        // test属性是一个正则表达式，用来匹配对应的资源文件
        test: /.css$/,
        // use属性用来选择合适的loader来处理匹配到的文件
        use: [ // 多个loader,从 后往前执行
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.png$/,
        // use: 'file-loader'
        loader: 'url-loader', // TODO: 最佳实践: 根据文件大小判断打包方式
        options: { // 判断打包方式的条件
          limit: 10 * 1024 //10kb
        }
      }
    ]
  }
}
