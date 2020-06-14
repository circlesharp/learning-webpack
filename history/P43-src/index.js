const str = require('./a.js')

class Dog {
  constructor () {
    this.name = 'puppy'
  }
  bark () {
    return this.name
  }
}

let dog = new Dog()

console.log('hello', str, dog.name)
