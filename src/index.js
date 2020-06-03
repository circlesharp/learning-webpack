// require('./index.css')
// require('./index.styl')
// const str = require('./a')
// const bcm = require('../lovelyBcm.png')

import './style'
import './stylus-style'
import str from './a'
import bcm from './lovelyBcm.png'

const print = s => console.log(s + '\nin an arrowFunction')

print(str)
print($)
print(bcm)

// 环境变量
let url
switch (DEV) {
  case 'development':
    url = 'http://localhost:3000'
    break
  default:
    url = 'http://rtfm.work'
    break;
}
console.log(url)
console.log(ESSPRESION)
console.log(FLAG)


let image = new Image()
image.src = bcm
document.body.appendChild(image)
