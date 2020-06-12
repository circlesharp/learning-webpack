const stylus = require('stylus')

function loader (source) {
  let css
  stylus.render(source, (err, c) => {
    if (err) console.log(err)
    css = c
  })
  css = css.replace(/\n/g, '\\n')
  return css
}

module.exports = loader
