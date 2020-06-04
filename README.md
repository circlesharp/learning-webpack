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
1. dll -> Dynamic Link Library -> 动态链接库
2. 把 react, react-dom 抽离，单独打包，新建 webpack.config.react.js
3. 

