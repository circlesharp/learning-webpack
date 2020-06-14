function loader (source) {
  console.log('loader3 ~~~')
  return source
}

loader.pitch = function () {
  console.log('[pitch] [loader3] ~~~')
  return 'ok'
}

module.exports = loader
