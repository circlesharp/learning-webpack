const loaderUtils = require('loader-utils')

function loader (source) {
  const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
    content: source
  })
  this.emitFile(filename, source)
  return `module.exports = '${filename}'`
}

// 改成 buffer 模式
loader.raw = true

module.exports = loader