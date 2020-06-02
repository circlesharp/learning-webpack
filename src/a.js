require('@babel/polyfill')

class B {
  b = 'b in class B'
}

function * gen (params) {
  yield 'string in gen'
}

console.log(gen().next())

console.log('aaa'.includes('a'))

module.exports = (new B()).b
