const { AsyncSeriesHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap () {
    let self = this
    this.hooks.arch.tapPromise('node', function (name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node ', name)
          resolve()
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('webpack', function (name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('webpack ', name)
          resolve()
        }, 1000)
      })
    })
  }
  async start () {
    let rst = await this.hooks.arch.promise('circle')
    console.log('end')
  }
}

let l = new Lesson()
l.tap()
l.start()
