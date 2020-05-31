// webpack.config.js 本质是一个 node 模块，不是 JSON


/** <-- webpack 核心概念 -->
 * 1. entry -> 项目入口
 * 2. module -> 开发中每一个文件都可以看做 module
 * 3. chunk -> 代码块，一个 chunk 可以由多个模块组成
 * 4. loader -> 模块的处理器，对模块进行转换处理
 * 5. plugin -> 扩展插件，插件可以处理 chunk，也可以对最后的打包结果进行处理，可以完成 loader 完不成的任务
 * 6. bundle -> 最终打包完成的文件，一般就是和 chunk 一一对应的关系，bundle 就是对 chunk 进行便意压缩打包等处理后的产出
 */

/** <-- webpack 蓝图 -->
 * webpack 是一个模块打包工具
 * 能够从一个需要处理的 JavaScript 文件开始
 * 构建一个依赖关系图（dependency graph），该图映射到了项目中每个模块
 * 然后将这个依赖关系图输出到一个或者多个 bundle 中
 */

/** <-- context -->
 * 1. context 项目打包的相对路径上下文
 * 2. 默认为 process.cwd()，即工作目录
 * 3. 如果要设置，必须是一个绝对路径
 */

/** <-- entry 入口 -->
 * 1. entry支持多种类型，包括字符串、对象、数组
 * 2. 包括了单文件入口和多文件入口两种方式
 */

/** <-- output 输出 -->
 * 1. output 是指定了entry 对应文件编译打包后的输出 bundle
 * 2. 常用属性 path, filename, publicPath
 * 3. 不指定 output, 默认到 dist/main.js
 * 4. 不同 entry, output 只能有一个，name 可以用 [name].js 占位
 */

/** <-- Webpack 占位符 -->
 * 1. [hash] -> 模块标识符的 hash
 *  修改任何文件都会导致所有文件的 hash 发生改变
 *  在一个项目中虽然入口不同，但是 hash 是相同的
 *  hash 无法实现前端静态资源在浏览器上长缓存
 * 2. [chunkhash] -> chunk 内容的 hash
 *  只要组成 entry 的模块文件没有变化，则对应的 hash 也是不变的
 *  将公共库代码拆分到一起，因为公共库代码变动较少的，使用 chunkhash 可以发挥最长缓存的作用
 * 3. [name] -> 模块名称
 * 4. [id] -> 模块标识符
 * 5. [query] -> 模块的 query，例如，文件名 ? 后面的字符串
 * 6. [function] -> 一个 return 出一个 string 作为 filename 的函数
 */

const path = require('path')

module.exports = {
  entry: {
    home: '/src/home.js',
    search: '/src/search.js',
    list: '/src/list.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}
