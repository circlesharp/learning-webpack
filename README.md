# Webpack 学习笔记

## P0 description
1. https://www.bilibili.com/video/BV1a4411e7Bz?p=3
2. 感谢 zfpx

## P2 webpack 基础配置
1. mode, entry, output
2. 要用到 `path.resolve(__dirname, xxx)`

## P3 webpack 打包出来的文件解析
1. 是一个 立即执行函数（IIFE）
2. 参数 `modules` 是一个对象，key 为模块路径，value 为函数
3. `installedModules` -> The module cache
4. `__webpack_require__` -> The require function
5. IIFE 首先返回 `__webpack_require__(入口文件)`，检测是否在缓存中（`installedModules`）
6. 然后，`__webpack_require__` 会返回 `module.exports`

## P4 HTML插件
1. 安装 webpack-dev-server，`npx webpack-dev-server`
2. 不会真正生成打包文件，只在内存中打包
3. 安装 html-webpack-plugin
4. 在 plugins 中，`new html-webpack-plugin({ template, filename, hash, minify })`
5. 哈希戳 [hash:n]
6. (补充 打包前删除上一次的 dist 目录) clean-webpack-plugin

## P5 样式处理-1
1. `module: { rules: [ { test, use }, { test, use } ] }`
2. use 的顺序是从右到左，stylus -> css -> style
3. stylus-loader 需要 stylus, 但不需要写在 use 里面
4. 当前都是插入到 html 文档里面

## P6 样式处理-2
1. 抽离 css 样式 -> 插件：`mini-css-extract-plugin`
2. 自动加前缀 -> loading `postcss-loader`, `autoprefixer`, 需要额外配置 postcss.config.js
3. 若仍不起左右，在 package.json 加上 browserslist 字段
4. 增加 optimization 字段的 minimizer 字段，使用 `OptimizeCSSAssetsPlugin`, `TerserJSPlugin` 压缩 js, css

## P7 转化ES6语法
1. `babel`, `@babel/core`, `@babel/preset-env`
2. 还有更加高级的插件，比如说：类，装饰器……
3. 这里的 use 里面可以放 options, 还有 plugins （比较复杂）

## P8 处理js更高级的语法与校验
1. 看 babel 文档吧
2. 检验：ESLint, `eslint`, `eslint-loader`
3. module.rules 是从右向左，从下到上，可以在 `options` 增加 `enforce: 'pre'` 字段强制
4. .eslintrc.json 去 https://eslint.org/demo 下载
5. `Cannot assign to read only property 'exports' of object '#<Object>'` -> 
https://www.jianshu.com/p/acec542bcfc4

## P9 全局变量引入
1. expose-loader
2. Loader 的分类：pre, normal, post, 內联
3. 方法1 - 內联的用法：`import $ from 'expose-loader?$!jquery'`
4. 方法1 - 配置的用法：`{ test: require.resolve('jquery'), use: 'expose-loader?$' }`
5. 方法2 - 在每个模块注入：`new webpack.ProvidePlugin({ $: 'jquery' })`
6. 方法3 - 引入但不打包：使用 CDN, 且在配置文件中加入 externals 字段

## P10 图片的处理
1. 有3种方式
2. 方法1 - 在 js 种创建图片来引入 `let img = new Image(); img.src = ''`
3. 方法2 - 在 css 引入 `background('url')`
4. 方法3 - `<img src="" alt="" />`
5. file-loader: 生成文件到 build 目录，并返回图片文件名（带 hash）
6. html-withimg-loader：解决 html 的图片引入（有毛病的, fileload 要配置 `esModule: false`）
7. url-loader 依赖 file-loader, 要配置 `options: { limit: 200 * 1024, esModule: false }`, base64 会比源文件大 1/3 , 还可以配置 outputPath

## P11 打包文件分类
1. 给 MiniCssExtractPlugin 配置 `{ filename: './css/main.css' }`
2. publicPath 可以单独在 loader 里面配置(ps. 这里老师没讲到，css 也要配置，否则找不到图片)

## P12 打包多页应用
1. entry 分别配置
2. output 的 filename 字段为 `[name].[hash:6].js`
3. new 两次 HtmlWebpackPlugin，改 filename, 添加对应 chunks 数组

## P13 配置source-map
1. 源码映射 niubi.. 增加映射文件，帮助调试源代码
2. 配置 `devtool: 'source-map'`, 会生成一个 .map 的映射文件，大而全且独立
3. eval-source-map -> 不会产出单独文件，但可以显示行和列
4. cheap-moudule-source-map -> 不会产生列，但是有单独的映射文件
5. cheap-moudule-eval-source-map -> 不会产生文件，集成在打包后的文件中，不会产生列（但是有行）

## P14 watch的用法
1. `watch: true` 只要改代码，就会实时编译
2. `watchOption: { poll, aggregateTimeout, ignored }`

## P15 webpack小插件应用
1. cleanWebpackPlugin
2. copyWebpackPlugin (坑爹的文档，传入对象，第一个字段为 patterns)
3. bannerPlugin （内置的版权声明插件）

## P16 webpack跨域问题
1. 配置 devServer 的 proxy, 如果后端没有给出 /api, 使用 `target, pathRewrite`
2. 如果只想 mock 数据，使用 devServer 的 before -> `before (app) { app.get()... }`
3. 前后端一起启动，使用服务端端口，使用 `webpack-dev-middleware` 中间件

## P17 resolve属性
1. modules 限制 commonjs 的模块查找规则
2. alias 别名
3. mainFields 指定宿主版本的模块代码
4. mainFiles 指定入口文件
5. extensions 省略导入时候的拓展名

## P18 定义环境变量
1. `webpack.DefinePlugin` 中配置变量
2. `webpack.DefinePlugin({ DEV: JSON.stringify('dev') })`
3. 表达式也需要左右两边加引号，可用 JSON.stringify 转字符串

## P19 区分不同环境
1. webpack-merge 里面的 smart 进行合并：`module.exports = smart(base, { ... })`
2. `npm run build -- --config webpack.dev.js`
3. 可以把 devtool, devServer 放到 webpack.dev.js
4. 可以把 optimization 放到 webpack.prod.js

## P20 noParse
1. 配置 `modules: { noParse }` 不去解析这个模块

## P21 ingorePlugin
1. 首先引用了 moment, 这个库还引入了很多东西，例如设置中文 `moment.locale('zh-cn')`
2. 配置 `new webpack.IgnorePlugin(/\.\/locale/, /moment/)`
3. 手动引入 `require('moment/locale/zh-cn')`

****
**新建分支**
> 原来的分支为 zfpx_1-21
****

## P22 dllPlugin
0. dll -> Dynamic Link Library -> 动态链接库
1. react 是用 @babel/preset-react 处理的，但是打包的结果会很大
2. 把 react, react-dom 抽离，单独打包，新建 webpack.config.react.js
3. 在dll配置文件中配置 output 的 `library` 字段，接收返回值, 也可以指定 `libraryTarget: 'var' / 'commonjs' / 'umd' ...)`
4. `webpack.DllPlugin({ name, path })` 配置任务清单 -> manifest.json
5. 在总配置文件中配置 `new webpack.DllReferencePlugin({ manifest })`
6. ps: devServer 的配置：`devServer: { port, open, contentBase }`

## P23 happypack
1. 使用多线程进行打包，确实快了
2. 先配置 js loader 的 `use: 'Happypack/loader?id=js'`
3. 再配置 plugins 的 `new Happypack({ id: 'js', use: [ 原本的loader ] })`

## P24 webpack自带优化
1. tree-shaking: import 在生产环境下，会自动去掉没用的代码（require 不行）
2. scope-hosting: 作用域提升，生产环境下自动省略可以简化的代码

## P25 抽离公共代码
1. 分割代码块: `optimization:{splitChunks:{cacheGroups:{common, vendor}}}`
2. 补充：splitChunk 的理解 -> https://www.cnblogs.com/kwzm/p/10314438.html
3. 补充：what is **chunk**
> 1. what is module? -> js的模块化
> 2. what is chunk? -> webpack 根据功能拆分出来的，包含3种情况
>> 1. 项目入口 entry
>> 2. 通过 import 动态引入的代码
>> 3. 通过 splitChunks 拆分出来的代码
>> 4. sum_up: chunk包含着module, 可能是一对多, 也可能是一对一
> 3. what is bundle? -> webpack打包之后的各个文件
>> 1. bundle 与 chunk 是一对一关系
>> 2. bundle 就是对 chunk 进行编译压缩打包等处理之后的产出
4. **chunks** 的 参数 `async, initial, all`
5. **cacheGroups** 默认两个缓存组：vender, default (zfpx 用的是 common)

## P26 懒加载
1. 不同配置，只需要使用 import 方法，得到一个 promise 对象
2. 如果要使用高级的 es 语法，可以这样配置 `entry: ['babel-polyfill', './src/index.js']`

## P27 热更新
1. 在 devServer 配置 `hot: true`
2. 热更新插件 `new webpack.HotModuleReplacementPlugin()`
3. 打印更新的文件路径 `new webpack.NamedModulesPlugin()`
4. 在资源文件中，还可以通过 `if (module.hot) { module.hot.accept(path, callback) }`

## P28 Tapable-1
1. Webpack 本质上是一种事件流机制，工作流程就是将各个插件串联起来，实现这个的核心是 Tapable
2. Tapable 有点类似 node 的 events 库，核心原理依赖发布订阅模式
3. doc -> https://www.npmjs.com/package/tapable

## P29 Tapable-2
1. SyncHook
> Basic hook (without “Waterfall”, “Bail” or “Loop” in its name). This hook simply calls every function it tapped in a row.
2. SyncBailHook
> A bail hook allows exiting early. When any of the tapped function returns anything, the bail hook will stop executing the remaining ones.
3. SyncWaterfallHook -> 实现方法很棒
> A waterfall hook also calls each tapped function in a row. Unlike the basic hook, it passes a return value from each function to the next function.
4. SyncLoopHook -> 实现方法很棒，用到 call
> TODO ?? 同步遇到某个不返回 undefined 的监听函数会多次执行

## P30 AsyncParallelHook
1. AsyncParallel* -> 异步并行
> An async-parallel hook can also be tapped with synchronous, callback-based and promise-based functions (using myHook.tap(), myHook.tapAsync() and myHook.tapPromise()). However, they run each async method in parallel.
2. tapAsync 传入的 callback 好像 next, 这个 callback 还是一个计数器，如果计数器数量 === 注册函数的数量，才执行 callAsync 的 finalCallback
3. tapPromise 的写法太优雅了，使用到了 `Array.prototype.map`, `Promise.all` 实现
4. AsyncParallelBailHook 就是对 reject 进行熔断
5. ps: 并发 -> concurrent, 并行 -> Parallel, 串行 -> serial

## P31 AsyncSeriesHook
1. AsyncSeries* -> 异步串行
> An async-series hook can be tapped with synchronous, callback-based and promise-based functions (using myHook.tap(), myHook.tapAsync() and myHook.tapPromise()). They call each async method in a row.
2. callAsync 的实现使用的 next 非常像 express 的源码，每一个 task 都递归调用 next, 递归边界是长度相等
3. tapPromise 类似 redux 源码，使用 reduce 收敛，太牛了，then 要返回 promise 对象

## P32 AsycSeriesWaterfallHook
1. 难点在于，异步串行，要借鉴 asyncSeries 的 callAsync 的实现
2. callAsync 有3个内部的变量，idx, finalCallback, next
3. next 是关键，作用就是将注册在数组里面的函数依此调用，并在每一次调用时都会传入 next
4. next 能够实现串行是因为，在异步操作执行到最后才触发
5. 实现 waterfallHook, 关键还要传参

****
**新建分支**
1. 分支主题：手写 webpack
2. 分支名称：rewriteWebpack
****

## P33 webpack手写
1. 通过正统的 webpack 打包出了 bundle.js
2. 通过改写，得出 bundle.template.js
3. 新建了一个 repo -> mypack
4. `npm link mypack` 把全局的包映射到本地, 然后就可以使用 `npm mypack`

****
**回到主分支**
1. 分支主题：loader plugin 的编写
2. 分支名称：master
****

## P40 loader
1. 自定义 loader 的路径处理
> 1. 写死 -> `use: path.resolve(__dirname, 'loaders', 'loader1')`
> 2. 别名 -> `resolveLoader:{ alias: { loader1: path.resolve(__dirname, 'loaders', 'loader1') } },`
> 3. 路径 -> `resolveLoader:{ modules: ['node_modules', path.resolve(__dirname, 'loaders')] },`

## P41 loader的配置