const fs = require('fs')
const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')

function loader (source) {
  const cb = this.async()
  const options = loaderUtils.getOptions(this)
  const schema = {
    type: 'object',
    properties: {
      text: { type: 'string' },
      filename: { type: 'string' }
    }
  }
  validateOptions(schema, options, 'banner-loader')

  if (options.filename) {
    this.addDependency(options.filename)
    fs.readFile(options.filename, 'utf-8', function (err, data){
      cb(err, _commentText(data, source))
    })
  } else if (options.text) {
    cb(null, _commentText(options.text, source))
  } else {
    cb(null, source)
    console.log('\n需要配置 options.filename 或者 options.text\n')
  }
}

function _commentText (text, source) {
  return `/*${text.trim()}*/\n${source}`
}

module.exports = loader
