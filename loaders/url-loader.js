const mime = require('mime')
const loaderUtils = require('loader-utils')

function loader (source) {
  const { limit } = loaderUtils.getOptions(this)
  if (limit && limit > source.length) {
    let sourceType = mime.getType(this.resourcePath)
    let source2String = source.toString('base64')
    return `module.exports = "data:${sourceType};base64,${source2String}"`
  } else {
    return require('./file-loader').call(this, source)
  }
}

loader.raw = true

module.exports = loader
