> 模块化打包工具的学习的随堂笔记

# 模块化打包

> 先最最流行的模块打包工具



- 模块打包工具主要解决的问题

  > 所有的前端资源都需要模块化

  - 在复杂代码中的代码组织问题
  - ES Modules存在环境兼容问题
  - 模块文件过多，网络请求频繁

- 现如今模块打包工具应该具有的能力

  - 新特性代码编译
  - 模块化 JavaScript 打包
  - 支持不同类型的资源模块



# Ⅰ ~ 模块打包工具的概要

> webpack能够做些什么
>
> 打包工具解决的是前端整体的模块化，不单指JavaScript模块化

- 模块打包器(Module bundler)
- 模块加载器(Loader)
- 代码拆分(Code Splitting)

- 资源模块(Asset Module)



# Ⅱ ~ Webpack加载器的基本使用

> 模块打包主要学习内容
>
> Loader专注实现资源模块加载

![image-20200703005901626](C:\Users\Abel\AppData\Roaming\Typora\typora-user-images\image-20200703005901626.png)

- Webpack的原理

  > Loader机制就是Webpack的核心

  - 找到指定的打包入口文件

    > 通常为js文件

  - 根据入口文件中的import/export来推断出其他的依赖文件

    ![image-20200703010714727](C:\Users\Abel\AppData\Roaming\Typora\typora-user-images\image-20200703010714727.png)

  - 根据依赖树，递归资源文件，再根据配置中的rules属性，来匹配所需的loader，然后将结果打包到一个js文件中

## Ⅱ · Ⅰ ~ Webpack的基础使用

> 最基础的使用方式

- 安装所需模块到开发依赖

  - `yarn add webpack webpack-cli --dev`

- 使用webpack打包

  > [官网说明三种打包模式的差异](https://webpack.js.org/configuration/mode/)

  - 根据配置文件的设置来打包

    > 未设置的时候是production

    - `yarn webpack`

  - 上线前的打包方式

    > 压缩优化

    - `yarn webpack --mode production`

  - 开发时的打包

    > 优化打包速度，不压缩

    - `yarn webpack --mode development`

  - 只打包不处理

    - `yarn webpack --mode none`

## Ⅱ · Ⅱ ~ Webpack配置文件

> 零配置下即可使用，有默认配置
>
> 内部的Webpack只有js的加载器

- 默认的打包文件路径
  
- `src/index.js` => `dist/main.js`
  
- 配置文件：`webpack.config.js`

  - 指定入口文件路径：`entry`

  - 指定输出文件路径：`output`

    > 这是一个对象

    - 设置主文件名称：`filename`
    - 设置路径：`path`



## Ⅱ · Ⅲ ~ Webpack加载器

> Loader就是webpack模块化的核心，通过不同的Loader就可以加载任何类型的资源

- 加载资源的方式

  > 非必要情况，避免混用

  - 遵循ES Modules标准的import声明
  - 遵循CommonJS标准的require函数
  - 遵循AMD标准的define函数和require函数

- Loader加载的非JavaScript也会触发资源加载

  - 样式代码中的@import指令和url函数
  - HTML代码中图片标签的src属性

### ㈠ ~ Webpack资源模块加载

> 资源模块的打包

- 安装不同的资源文件，对应的加载器

  - 样式文件

    - `yarn add css-loader --dev`

      > 加载，处理样式文件转换为js模块

    - `yarn add style-loader --dev`

      > 转换为stayle追加到页面中

- 判断资源类型，区别处理

  - 判断资源
    - `test`
  - 匹配加载器
    - `use`

### ㈡ ~ Webpack导入资源模块

> 虽然可以将css转换为打包入口，但是打包入口就是运行入口，还是需要JavaScript来作为主要驱动
>
> **JavaScript驱动整个前端应用的业务**

- 资源文件正确的打包姿势

  > 在JS文件中，使用import加载对应的资源文件

![image-20200702201955544](C:\Users\Abel\AppData\Roaming\Typora\typora-user-images\image-20200702201955544.png)

- **真正需要资源的不是应用，而是代码**

  > 为什么提倡在js中引入资源
  >
  > *新事物的思想才是突破点*

  - 逻辑合理，JS确实需要这些资源文件
  - 确保上线资源不确实，且都是必要的

- 配置加载规则

  ```js
  
  ```

### ㈢ ~ Webpack文件资源加载器

> css之类的资源文件可以转换为js代码，而图片，字体子类的资源就需要采用文件资源加载器来完成加载

- 通过文件地址加载

  > 单文件单独提取存放，提高加载速度

  - 文件资源正确的打包姿势

    > 通过文件路径，导入到模块中

    ![image-20200702213740436](C:\Users\Abel\AppData\Roaming\Typora\typora-user-images\image-20200702213740436.png)

  - 安装模块加载器

    - `yarn add file-loader --dev`

  - 配置加载规则

- 通过URL地址加载

  > 小文件使用Data URLs，减少请求次数

  - Data URLs

    > 一个特殊的URL协议，直接用来表示一个文件
    >
    > **base64编码**

    ![image-20200702214536707](C:\Users\Abel\AppData\Roaming\Typora\typora-user-images\image-20200702214536707.png)

    - e.g. : `data:image/png;base64,iVBORwOKGgoAAAANSUhE. SuQmCC`

    - 安装模块加载器

      - `yarn add url-loader --dev`

      - 配置加载规则

        ```js
        {
          test: /.png$/,
          // use: 'file-loader'
          loader: 'url-loader', // TODO: 最佳实践: 根据文件大小判断打包方式
          options: { // 判断打包方式的条件
            limit: 10 * 1024 //10kb
          }
        }
        ```

        

### ㈣ ~ Webpack页面资源加载器

> html中的页面资源加载

- 安装模块加载器
  
- `yanr add html-loader --dev`
  
- 配置加载规则

  ```js
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
  ```

## Ⅱ · Ⅳ ~ Webpack的开疆扩土

> Webpack不再仅仅是一个打包工具

### ㈠ ~ ES6特性的转换

> babel在webpack中的使用

- 安装模块加载器

  - `yarn add babel-loader`

- 配置加载规则

  ```js
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

  

## Webpack常用加载器分类

> 常用的Loader的大致分类

- 编译转换类
  - `css-loader style-loader `
  - `babel-loader ` 
    - `@babel/core @babel/preset-env` 
  - `html-loader`
- 文件操作类型
  - `file-loader`
  - `url-loader`
- 代码检查类
  - `eslint-loader`



# Ⅲ ~ Webpack开发一个加载器(Loader)

> 学习开发Loader，深入了解Webpack的核心内容
>
> ---自定义一个markdown加载器，实现在代码中直接导入md文件(转换过后的HTML)
>
> markdown-loader
>
> **源文件从输入到输出的转换**

- 通过参数接收输入

- 根据需求，安装md转html的插件模块

  > loader的工作流程类似于管道，对于同一个资源可以依次使用多个Loader，但是要求最终的结果必须是JavaScript

  - `yarn add marked --dev`
  - `yarn add html-loader --dev`

- 定义变量返回输出



# Ⅳ ~ Webpack插件的基本使用

> 插件(plugin)用于增强Webpack自动化的能力
>
> **通过插件机制，Webpack实现了大多前端工程化工作**

## ㈠ ~ 自动清理输出目录的插件

> 在每次打包之前清空之前的遗留文件

- 安装第三方插件模块
  
- `yarn add clean-webpack-plugin --dev`
  
- 配置加载规则

  > 第三方模块需要另外导入

  ```js
    plugins: [ // 插件的集合
      new CleanWebpackPlugin() // 通过new来运行插件
    ]
  ```

## ㈡ ~ 自动生成HTML插件

> 自动生成使用打包结果的HTML

- 默认配置生成
  - 安装第三方插件模块

    - `yarn add html-webpack-plugin --dev`

  - 配置加载规则

    ```js
    new HtmlWebpackPlugin()
    ```

- 对自动生成的HTML页面进行自定义

  > title、meta

  - 通过设置，实现自定义

    ```js
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      }
    })
    ```

  - 通过模板，实现自定义

    - 在模板中使用自定义字段
      - `htmlWebpackPlugin.options.字段名`

    ```js
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    })
    ```

- 同时输出多页面文件

  > 创建多个实例对象

  ```js
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
      }
  ```

## ㈢ ~ 静态文件的复制

> 不参与构建，直接复制
>
> 例如：ico

- 安装第三方插件
  
- `yarn add copy-webpack-plugin --dev`
  
- 设置插件运行规则

  ```js
  new CopyWebpackPlugin([
    'public'
  ])
  ```

  

# Ⅴ ~ Webpack开发一个插件(Plugin)

> 通过开发流程深入了解插件机制的工作原理
>
> **Plugin通过钩子机制实现**

- 插件的原理

  > 我们把webpack中的加载器形象比喻为管道，那么**插件就是**管道上实现定义好的**钩子上的任务**。
  >
  > **通过在生命周期的钩子中挂载函数实现扩展**

  ![image-20200703145351369](C:\Users\Abel\AppData\Roaming\Typora\typora-user-images\image-20200703145351369.png)

  - [钩子的集合](https://webpack.js.org/api/compiler-hooks/)

- 任务的定义

  > 自定义任务的内容：清除打包中没有意义的注释

  - 一个函数或者是一个包含apply方法的对象
  
    ```js
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
                size: () => withoutComments.length
              }
            }
          }
        })
      }
    }
    ```
  
    

# Ⅵ ~ 增强Webpack的开发体验

> 在已有的webpack的功能上提出新的需求
>
> - 自动编译，并刷新浏览器
> - Webpack下的server服务
> - 提供堆栈中的代码报错指向

## Ⅵ · Ⅰ ~ Webpack自动化

> 监视文件的改动，自动完成编译并刷新浏览器

### ㈠ ~ 自动编译的实现

> watch的使用

- Watch

  > 监听文件变化，自动重新打包

  - 使用方法
    - `yarn webpack --watch`

- 自动刷新浏览器
  
  - 推荐使用vscode插件

### ㈡ ~ Webpack Dev Server

> 提供用于开发的HTTP Server
>
> **集成自动编译和自动刷新浏览器等功能**

- 安装开发模块

  - `yarn add webpack-dev-server --dev`

- 运行

  - `yarn webpack-dev-server --open`

  - 特点

    >  **打包结果不写入磁盘，而是内存**

- 静态资源访问

  > 由于Webpack Dev Server不是最终的打包过程，所以需要特别的说明静态资源目录的位置
  >
  > **额外为开发服务器指定查找资源目录**

  - 修改配置文件

    ```js
    // 指定webpack-dev-server的配置选项
    devServer: {
        contentBase: ['./public']
      }
    ```

- Webpack Dev Server代理服务器

  > http://localhost:8080
  >
  > 解决跨域请求问题

  - 处理跨域请求问题

    - 跨域资源共享(CORS)

      > 使用CORS的前提使API必须支持
      >
      > 但并不是任何情况下API都应该支持

    - 同源部署

      > 如果上线后的前端项目就是和后端API是同源的，那么进行跨域贡献就是无意义的

      - 开发阶段使用使用代理API

        > 以此来解决仅开发阶段存在的跨域问题

  - Webpack Dev Server支持配置代理

    > 示例目标：将GitHub API代理到开发服务器

    ```js
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
    ```

### ㈢ ~ Source Map

> 解决的问题：运行代码与源代码之间完全不同，如何通过浏览器调试找到错误
>
> **Source Map源代码地图**，用来映射源代码与转换之后的代码的关系，通过Source Map可以逆向解析，找出源代码的错误地方
>
> **Source Map解决了源代码与运行代码不一致所产生的问题**

- map文件中的属性

  > json格式的文件

  - version

    - 当前文件所使用的Source Map标准的版本

  - sources

    - 转换之前源文件的名称

      > 数组，多文件合并

  - names

    - 源代码中使用的成员名称

  - mappings

    > 核心属性，Base64编码

    - 映射关系

      > 转换后的文件会根据这条信息(在末尾添加固定注释)，来请求源文件来标识错误地点

      - e.g.： `//# sourceMappingURL=jquery-3.44.1.min.map`

- 配置Source Map

  > Webpack支持12种不同的方式
  >
  > 每种方式的效率和效果都各不相同
  >
  > 鱼和熊掌不能兼得
  >

  ```js
  // 配置开发过程中的辅助工具
    devtool: 'source-map'
  ```

  - 推荐的配置选择

    > 调试是开发阶段的事情
    >
    > 没有绝对的通用使用方法

    - 开发过程：`cheap-module-eval-source-map`
    - 生产模式：`none`
    - 最全面的精确的：`nosources-source-mapenen`

- Source Map的另类使用

  - eval()

    > 该方法可以直接在浏览器调试种打印东西，在答应的内容种加入Map注释，可以更改eval的运行文件

    - `eval('console.log(123) //# sourceURL=./foo/bar/js')`

### ㈣ ~ HMR

> **模块热替换**（热拔插）
>
> HMR是Webpack中最强大的功能之一，极大程度的提高了开发者的工作效率
>
> 页面不刷新的前提下，模块也可以即时更新
>
> 热替换只将修改的模块实时替换至应用中

- 开启HMR

  > 集成在webpack-dev-server中的HMR

  - 通过命令开启
    
  - `webpack-dev-server --hot`
    
  - 通过配置文件设置默认开启

    > 需要导入webpack的内置插件webpack

    ```js
    // 配置使用HMR
        new webpack.HotModuleReplacementPlugin()
    ```

- 处理JS模块到热替换

  > Webpack中的HMR需要手动处理模块热替换逻辑

  ```js
  // 手动处理js模块的热更新逻辑
  import createEditor from './editor'
  
  const editor = createEditor()
  document.body.appendChild(editor)
  
  if (module.hot) {
    let lastEditor = editor
    module.hot.accept('./editor', () => { // 监控指定的模块
      // console.log('editor 模块更新了，需要这里手动处理热更新逻辑')
      // 热更新的逻辑，创建新的元素，覆盖原来的，实现热替换
      // console.log(createEditor)
  
      const value = lastEditor.innerHTML
      document.body.removeChild(lastEditor)
      const newEditor = createEditor()
      newEditor.innerHTML = value
      document.body.appendChild(newEditor)
      lastEditor = newEditor
    })
  }
  ```
  
  

- 处理图片的热替换

  > 监控图片的改动，将图片重新赋值渲染，

  ```js
  import background from './better.png'
  import './global.css'
  
  const img = new Image()
  img.src = background
  document.body.appendChild(img)
  
  if (module.hot) {
    module.hot.accept('./better.png', () => {
      img.src = background
      console.log(background)
    })
  }
  ```

## Ⅳ · Ⅱ ~ Webpack不同环境的配置文件

> 不同环境下的最优解

- 配置文件根据不同环境导出不同配置

  - 一个环境对应一个配置文件
  - 设置不同的配置文件，通过 运行命令来选择
    - `yarn webpack --config webpack.prod.js`
    - 在scripts下定义构建命令

  - 添加判断，来导出配置

# Ⅴ ~ Webpack内部优化功能的深入研究

> webpack4中新增了很多开箱即用的内部功能，这里做一个深入研究

## Ⅴ · Ⅰ ~ DefinePlugin

> 插件-为代码注入全局成员

- 在开发阶段默认使用

- 功能描述
  - 自动向代码中注入一个常量：`process.env.NODE_ENV`
    - 默认用于传递运行环境
    - 自定义可以用来一个变量

## Ⅴ · Ⅱ ~ Tree Shaking

> 摇树- 清理为引用代码(dead-code)

- 在开发阶段默认使用
- 功能描述
  - 自动'摇掉'代码中未引用的部分

## Ⅴ · Ⅲ ~ ConcatenateModules

> 合并多个小的模块，使其成为一个可以提供完整功能的模块

- 在开发阶段默认使用

- 功能描述
  - 尽可能将所有模块合并到一起

## Ⅴ · Ⅳ ~ sideEffects

> 副作用，常用于开发npm模块

- 在开发阶段默认使用

- 功能描述

  - 标识我们的代码是否有副作用

    > 副作用指从除了导出成员之外，是否做了其他的事情

# Ⅵ ~ Webpack的打包方式

> webpack将所有的小模块集合到了一起，会形成一个很大的文件，这里介绍几种方法，来实现按需导入。
>
> **模块整合下的代码分割**

## Ⅵ · Ⅰ ~ 多入口打包

> 常见于多应用程序，一个页面对应一个入口，公共部分单独提取

- 使用HtmlWebpaclPlugin()插件，为多页面，匹配不同的chunks,指定模板
- 公共模块部分
  - 在配置模块中配置optimization.splitChunks.chunks: all 即可

## Ⅵ · Ⅱ ~  动态导入

> 按需加载

- 动态导入，使用promise来实现在需要的时候导入指定模块

- 魔法注释
  - 在动态导入自动处理分包的时候，表明是哪一模块的内容

## Ⅵ · Ⅲ ~ MiniCssExtractPlugin

> 提取CSS到单个文件

- 第三方插件
  - 安装
  - 导入
  - 通过new一个实例来使用

- OptimizeCssAssetsWebpackPlugin

  > 压缩输出的CSS文件

## Ⅵ · Ⅳ ~ 输出文件名Hash

> 输出一个含有动态值的文件名

- 生产模式下，文件名使用Hash，来解决缓存问题
  - [hash]
  - [chunkhash]
  - [contenthash:8]

