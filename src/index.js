require('./index.css')
require('./index.styl')

const str = require('./a')

const print = s => console.log(s + ' in an arrowFunction')

print(str)

class A {
  a = 'classA'
}

let a = new A()
print(a.a)
