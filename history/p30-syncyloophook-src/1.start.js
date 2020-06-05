const { SyncLoopHook } = require('tapable')

class Lesson {
  constructor () {
    this.idx = 0
    this.hooks = {
      arch: new SyncLoopHook(['name'])
    }
  }
  tap () { // 注册监听函数
    let self = this
    this.hooks.arch.tap('node', function (name) {
      console.log('node ', name)
      return (++self.idx === 3) ? undefined : ''
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
