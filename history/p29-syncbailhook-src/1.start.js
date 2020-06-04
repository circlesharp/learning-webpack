const { SyncBailHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }
  tap () { // 注册监听函数
    this.hooks.arch.tap('node', function (name) {
      console.log('node ', name)
      // return '想停止学习'  // 保险/熔断 -> 返回非 undefined, 停止运行
      return undefined
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
