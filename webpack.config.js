// webpack.config.js 本质是一个 node 模块，不是 JSON


/**
 * 1. entry -> 项目入口
 * 2. module -> 开发中每一个文件都可以看做 module
 * 3. chunk -> 代码块，一个 chunk 可以由多个模块组成
 * 4. loader -> 模块的处理器，对模块进行转换处理
 * 5. plugin -> 扩展插件，插件可以处理 chunk，也可以对最后的打包结果进行处理，可以完成 loader 完不成的任务
 * 6. bundle -> 最终打包完成的文件，一般就是和 chunk 一一对应的关系，bundle 就是对 chunk 进行便意压缩打包等处理后的产出
 */

/**
 * webpack 是一个模块打包工具
 * 能够从一个需要处理的 JavaScript 文件开始
 * 构建一个依赖关系图（dependency graph），该图映射到了项目中每个模块
 * 然后将这个依赖关系图输出到一个或者多个 bundle 中
 */

const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
}
