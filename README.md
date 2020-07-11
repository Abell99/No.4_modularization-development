# 一、 简答题

## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

> Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
>
> 1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
> 2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
> 3. 确定入口：根据配置中的 entry 找出所有的入口文件；
> 4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
> 5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
> 6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
> 7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
>
> 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

> Loader像一个"翻译官"把读到的源文件内容转义成新的文件内容，并且每个Loader通过链式操作，将源文件一步步翻译成想要的样子。
>
> 编写Loader时要遵循单一原则，每个Loader只做一种"转义"工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。 此外webpack还为开发者准备了开发loader的工具函数集——loader-utils。
>
> 相对于Loader而言，Plugin的编写就灵活了许多。 webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

# 二、使用Webpack实现Vue项目打包任务

> 使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
>
> 思路讲解：https://github.com/Abell99/No.4_modularization-development/blob/master/%E6%80%9D%E8%B7%AF%E8%AE%B2%E8%A7%A3.wmv
>
> 效果图：
>
> ![image-20200711100405843](https://pics.images.ac.cn/image/5f091e77af7bc.html)

- `npm install`安装项目预设的所需模块

- 确定入口文件`main.js`

- Webpack配置文件的小技巧

  > 使vscode能够在配置文件中自动提示，更加智能

  - `/** @type { import('webpack').Configuration }*/`

## Ⅰ ~  配置文件package.json

### Ⅰ · Ⅰ ~ "scripts"的编写

> 根据要求配置三个命令
>
> e.g.
>
> ​	- `npm run build`

- serve
  - `webpack-dev-server --config webpack.dev.js`
- build
  - `webpack --config webpack.prod.js`

- lint
  - 集成到了webpack中，打包时自动运行

## Ⅱ ~ 不同情形下的打包配置

> 根据不同的情形，打包配置也不一样。

### Ⅱ · Ⅰ ~ 通用配置

> 公共的打包配置

- 设置打包模式，打包的入口以及出口

  - 打包后的文件通过哈希设置动态地址

- 安装webpack以及webpack-cli

  > webpack4之后，webpack将cli提取出来了，所以需要单独安装

  - `npm i webpack webpack-cli --save-dev`

- 处理特殊资源的打包

  > webpack默认会将所有文件都当作js文件来处理打包，所以除了js文件都可以称为特殊文件

  - 样式文件打包
    - 安装依赖模块
      - `npm i css-loader style-loader less-loader --save-dev`
    - 样式文件的配置

  - Vue文件打包

    - 安装依赖模块

      - `npm i vue-loader vue-template-compiler --save-dev`

      - 调用依赖包插件
        - `const VueLoaderPlugin = require('vue-loader/lib/plugin')`
      - 使用插件
        - `new VueLoaderPlugin()`

  - 图片文件打包

    - 安装依赖模块
      - `npm i url-loader file-loader --save-dev`

    - 图片文件的配置

- Html文件生成

  > 利用插件，生成html页面

  - 安装依赖模块

    - `npm i html-webpack-plugin dotenv --save-dev`

  - 调用插件

    - `const HtmlWebpackPlugin = require('html-webpack-plugin')`
    - `const dotenv = require('dotenv')`

  - 配置使用插件

    - ```js
      const env = process.env.NODE_ENV || 'production'
      dotenv.config({ path: '.env.' + env }) // load .env.production
      dotenv.config() // load .env
      
      const envs = Object.keys(process.env).reduce((e, i) => {
        if (i.startsWith('MY_')) {
          e[i] = JSON.stringify(process.env[i])
        }
        return e
      }, {})
      ```

    - ```js
      new HtmlWebpackPlugin({ // 自动生成html文件
          template: './public/index.html', // 设置模板文件
          title: 'Vue App' // 设置标题
      }),
      new webpack.DefinePlugin({ //用来定义环境变量，以便我们在自己的程序中引用它。
          BASE_URL: '"/"' // 设置基准地址
      })
      ```

### Ⅱ · Ⅱ ~ 开发模式下的配置

> 在开发中运行服务器，实时查看效果

- 服务器的启动

  - 安装依赖模块

    - `npm i webpack-dev-server --save-dev`

  - 静态资源的访问配置

    - `devServer: {contentBase: './public'}`

  - HMR的基础使用

    > 样式文件的热更新

- Source Map的使用
  - `devtool: 'cheap-module-eval-source-map'`

### Ⅱ · Ⅲ ~ 生产模式下的配置

> 最终上线前的打包过程

- 自动清理输出目录的插件
  - 安装插件
    - `npm i clean-webpack-plugin --save-dev`
  - 导入插件
    - `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`
  - 使用插件
    - `new CleanWebpackPlugin()`

- 静态文件的拷贝

  - 安装插件

    - `npm i copy-webpack-plugin --save-dev`

  - 导入插件

    - `const CopyWebpackPlugin = require('copy-webpack-plugin')`

  - 使用插件

    - `new CopyWebpackPlugin(['public']`

      

## Ⅲ ~ ESlint的使用

> 代码的检验以及转换,集成到webpack打包时一起使用

- 安装ESlint
  - `npm i install eslint eslint-loader --save-dev`

- 初始化`.eslintrc.js`配置文件

- 配置ESlint，并使用babel-loader实现js代码的浏览器兼容

  - 安装babel所需依赖
    - `npm i babel-loader --save-dev   `
    - `npm i @babel/core @babel/preset-env --save-dev`

  -  配置babel,以及ESlint代码检验

    ```js
    {
        enforce: 'pre',
        test: /\.js$/,
        use: {
            loader: 'eslint-loader'
        },
        exclude: /node_modules/
    },
    {
      test: /.js$/, // 取代webpack的默认加载器
      use: {
        loader: 'babel-loader',
        options: { // 可选项，选择插件集合
          presets: ['@babel/preset-env'] // 最新特性
        }
      }
    }
    ```

    

