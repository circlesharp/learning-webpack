const { AsyncParallelHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap () {
    let self = this
    this.hooks.arch.tapAsync('node', function (name, cb) {
      setTimeout(() => {
        console.log('node ', name)
        cb()
      }, 1000)
    })
    this.hooks.arch.tapAsync('java', function (name, cb) {
      setTimeout(() => {
        console.log('java ', name)
        cb()
      }, 1000)
    })
  }
  start () {
    this.hooks.arch.callAsync('circle', function () {
      console.log('end')
    })
  }
}

let l = new Lesson()
l.tap()
l.start()
