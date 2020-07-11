> modularization development阶段的随堂笔记

# 模块化开发

> 当下最重要的前端开发规范之一

- ##### 模块化是什么？

  - ###### 模块化是一种思想。

  - ###### 面对日益庞大的前端业务，将不同的内容区分开来的一个想法。

- ##### 内容概要

  - ###### 模块化演变过程

    - 演变历程
    - 存在的价值
    - 解决的问题

  - ###### 模块化规范

  - ###### 常用的模块化打包工具

  - ###### 基于模块化工具构建现代Web应用

  - ###### 打包工具的优化技巧

# Ⅰ ~ 模块化演变的过程

> 早期在没有工具和规范的情况下对模块化的落地方式
>
> - 约定是唯一标准

- ##### 基于文件划分方式

  > e.g. 
  >
  > ​	引入 js 文件，导出全局方法。

  - ###### 缺点

    > 早期模块化完全依靠约定

    - 污染全局作用域
    - 存在命名冲突
    - 无法管理模块依赖关系
    - 不存在模块私有空间
      - 模块成员可以被修改

- ##### 命名空间方式

  > e.g.
  >
  > ​	所有的模块只暴漏一个全局的对象，属性和方法暴漏到对象上面

  - ###### 缺点

    - 无法管理模块依赖关系
    - 不存在模块私有空间
      - 模块成员可以被修改

- ##### IIFE

  > 立即执行函数
  >
  > e.g.
  >
  > ​	每一个模块都是一个立即执行的函数，属性私有化和方法，同样使用对象挂载的方法，挂载到全局上面。
  >
  > 通过参数的方式，声明依赖关系

# Ⅱ ~ 模块化规范

> 模块化标准 + 模块化加载器

## Ⅱ · Ⅰ ~ 模块化规范的演变历史

- ##### CommonJS 规范

  > node.js **提出的一套标准**
  > 以**同步模式**加载模块，所以注定**不适用浏览器端**

  - 一个文件就是一个模块
  - 每个模块都有单独的作用域
  - 通过module.exports导出成员
  - 通过require函数载入模块

- ##### AMD(Asynchronous Module Definition)

  > 为了**浏览器端**而提出的规范
  >
  > **异步**的模块化规范

  - ###### Require.js

    > AMD规范的实践者
    >
    > 随之推出的JS库，模块加载器

    - 每一个模块都必须通过`define`函数来定义

      > define的参数说明

      - 模块名
      - 模块依赖
      - 函数方法，参数为函数依赖

    - 通过`return`导出成员

    - 通过`require`函数来选择性自动加载模块

      > require的参数说明

      - 路径
      - 函数方法，通过模块名运行需要依赖的模块名下的方法

  - ###### 目前绝大多数第三方库都支持AMD规范

    - 生态较为完善
    - 缺点
      - AMD使用起来相对复杂
      - 模块JS文件请求频繁

- ##### Sea.js + CMD

  > 与AMD同期，淘宝团队推出的一套标准

  - ###### 类似CommonJS规范

    - 通过`require`引入依赖
    - 通过`exports`或者`module.exports`对外暴漏成员

## Ⅱ · Ⅱ ~ 模块化标准规范

> 模块化的最佳实践
>
> - Node.js环境下
>   - CommonJS
> - 各大浏览器端环境下
>   - ES Modules

### ㈠. ES Modules 的基本特性

> 模块化的通用特性以及浏览器环境中模块化的独有特性

- ##### 自动采用严格模式，忽略‘use strict’

- ##### 每个ESM模块都是单独的私有作用域

- ##### ESM是通过CORS去请求外部JS模块的

- ##### ESM的script标签会延迟执行脚本

### ㈡. ES Modules 导入和导出

> 模块化的核心功能

- ##### 导出

  - 通过 `export `关键词修饰定义的变量 从而来导出成员

  - 可统一导出
  - 支持重命名
  - 可默认导出
  - 可以使用导入导出的方式，组织小的模块成为一个大的模块

- ##### 导入

  - 通过 `import` 关键词载入成员
  - 可重命名

  - 可默认导入

  - 导入的一些注意点
    - 导入的成员只是引用，并非是复制
    - 导入成员只读，不可作为修改

  - 关于导入的路径
    - 导入的路径不能省略扩展名
    - 不能自动载入目录下的index.js，打包后 可以
    - 不能省略路径中的`./`
    - 可直接引用网络路径地址，来加载引用模块
    - 可以直接import '路径' 来加载模块却不提取成员
    - 可以通过  * as `定于一个模块名对象` 来导出模块中的所有成员，并将所有成员作为mod中的属性出现
    - 可以通过import()函数方法：异步函数，来动态调用模块
    - 可以同时导入默认模块，以及模块中的成员

### ㈢. ES Modules 浏览器环境 Polygill

> 在浏览器中解决ES6语法不可避免的兼容性问题

- ##### 引入脚本

  > 灵活运行，script新属性，`nomodule`，将只会在不支持ESM的浏览器中执行脚本文件

  - https://unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js

    > 用于兼容promise，目前只有IE仍需使用这个脚本

  - https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js

  - https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js

### ㈣. ES Modules 在 Node.js 中的支持

> node.js 版本大于8.5即可

- 修改扩展名
  - `.js` ==> `.mjd`

- 启动js的时候加上参数
  - `node --experimental-modules index.mjs`

- 与CommonJS混合使用的注意点

  - CommonJS 模块始终只会导出一个默认成员

    > 因此，在ESM中导入的时候，只能按默认成员来导入

  - 在Node.js原生环境下，是不允许导入ESM模块的

- CommonJS下的几个伪全局对象在ESM下的使用

  > 前三个使用import即可使用

  - require

    > 模块函数

  - module

    > 模块对象

  - exports

    > 对象别名

  - __filename

    > 当前文件的绝对路径
    >
    > import.meta.url

    - `import { fileURLoPath } from 'url'  `
    - `const __filename = fileURLoPath(import.meta.url)`

  - __dirname

    > 当前文件所在目录

    - `import { dirname} from 'path'  `
    - `const __dirname = dirname(__filename)`

- 通过修改配置文件来使用ESM

  > 使用配置文件的情况下不用再修改后缀名

  - `{ “type": "module" }`

  - 在该配置下使用CommonJS
    - 修改后缀名
      - `js` ==> `cjs`