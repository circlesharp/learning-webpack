class SyncBailHook { // 同步保险钩子
  constructor (args) { // args -> ['name']
    this.tasks = []
  }
  tap (name, task) {
    this.tasks.push(task)
  }
  call (...args) {
    let ret // 返回值
    let idx = 0 // 先从第0个执行
    do {
      ret = this.tasks[idx++](...args)
    } while (ret === undefined && idx < this.tasks.length)
  }
}

let hook = new SyncBailHook(['name'])

hook.tap('node', function (name) {
  console.log('node', name)
  // return '熔断，停止向下执行'
})

hook.tap('java', function (name) {
  console.log('java', name)
})

hook.call('circle')
