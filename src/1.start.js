const { AsyncSeriesWaterfallHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node ', name)
        cb(null, 'node is good~')
      }, 1000)
    })
    this.hooks.arch.tapAsync('webpack', (data, cb) => {
      setTimeout(() => {
        console.log('webpack ', data)
        cb(null, 'webpack is good!')
      }, 1000)
    })
    this.hooks.arch.tapAsync('java', (data, cb) => {
      setTimeout(() => {
        console.log('java ', data)
        cb(null, 'java is terrific')
      }, 1000)
    })
  }
  async start () {
    let rst = await this.hooks.arch.promise('circle')
    console.log('the last str is:', rst)
    console.log('o(*￣▽￣*)o')
  }
}

let l = new Lesson()
l.tap()
l.start()
