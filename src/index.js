require('./index.css')
require('./index.styl')

// const str = require('./a')
import str from './a'

const print = s => console.log(s + '\nin an arrowFunction')

print(str)

@log
class A {
  a = 'classA'
}

let a = new A()
print(a.a)

function log (target) {
  print(target)
}
