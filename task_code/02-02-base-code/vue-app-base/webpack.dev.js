const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: '.env.' + env }) // load .env.production
dotenv.config() // load .env

const envs = Object.keys(process.env).reduce((e, i) => {
  if (i.startsWith('MY_')) {
    e[i] = JSON.stringify(process.env[i])
  }
  return e
}, {})

console.log(envs)

/* 
    TODO: 配置文件的智能提示技巧------------------------
    - 欺骗vscode的使用方法
    - jsdo、ts的结合
        - @type 是 jsdoc
        - import('webpack').Configuration 是 ts
*/
/** @type { import('webpack').Configuration }*/
module.exports = {
    mode: 'none', // 设置打包模式
    entry: './src/main.js', // 指定打包的入口文件
    output: { // 指定打包后的的路径以及文件名称
        path: path.join(__dirname, 'dist'), 
        filename: 'js/bundle.js' // 通过哈希设置动态地址
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: { // 开发服务器
        contentBase: './public',
        hot: true
    },
    module: { // 配置资源(只有js拥有默认打包方式)模块的打包方式
        rules: [ // 打包处理规则,test匹配,use选择对应的loader
            // {
            //     test: /\.js$/, // 取代webpack的默认加载器
            //     use: {
            //         loader: 'babel-loader',
            //         options: { // 可选项，选择插件集合
            //             presets: ['@babel/preset-env'] // 最新特性
            //         }
            //     },
            //     exclude: /node_modules/
            // },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[contenthash:6].[ext]',
                        limit: 8 * 1024, // kb
                        esModule: false // 通过改变模块输出方式，解决图片路径的加载问题
                    }
                }
            }
        ]
    },
    plugins: [ // 使用插件
        new VueLoaderPlugin(), // 将上面模块资源的打包配置映射到vue文件内部去
        new HtmlWebpackPlugin({ // 自动生成html文件
            template: './public/index.html', // 设置模板文件
            title: 'Vue App' // 设置标题
        }),
        new webpack.DefinePlugin({ // 用来定义环境变量，以便我们在自己的程序中引用它。
            BASE_URL: '"/"' // 设置基准地址
        }),
        new webpack.HotModuleReplacementPlugin() // 热更新
    ]
}