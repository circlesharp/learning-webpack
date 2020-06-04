const { SyncHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  tap () { // 注册监听函数
    this.hooks.arch.tap('node', function (name) {
      console.log('node ', name)
    })
    this.hooks.arch.tap('java', function (name) {
      console.log('java ', name)
    })
  }
  start () { // 启动钩子
    this.hooks.arch.call('circle')
  }
}

let l = new Lesson()
l.tap()
l.start()
