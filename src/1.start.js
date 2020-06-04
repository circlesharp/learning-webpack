const { SyncWaterfallHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }
  tap () { // 注册监听函数
    this.hooks.arch.tap('node', function (name) {
      console.log('node ', name)
      return 'node 学得还行哦' // 这个结果会传给下一个
    })
    this.hooks.arch.tap('java', function (data) {
      console.log('java ', data)
    })
  }
  start () {
    this.hooks.arch.call('circle')
  }
}

let l = new Lesson()
l.tap()
l.start()
