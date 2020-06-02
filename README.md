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
