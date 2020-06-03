// require('./index.css')
// require('./index.styl')
// const str = require('./a')
// const bcm = require('../lovelyBcm.png')

import './index.css'
import './index.styl'
import str from './a'
import bcm from './lovelyBcm.png'

const print = s => console.log(s + '\nin an arrowFunction')

print(str)
print($)
print(bcm)

let image = new Image()
image.src = bcm
document.body.appendChild(image)
