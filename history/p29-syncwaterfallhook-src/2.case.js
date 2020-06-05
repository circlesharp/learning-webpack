class SyncWaterfallHook { // 同步保险钩子
  constructor (args) { // args -> ['name']
    this.tasks = []
  }
  tap (name, task) {
    this.tasks.push(task)
  }
  call (...args) {
    let [ first, ...others ] = this.tasks
    others.reduce((a, b) => {
      return b(a)
    }, first(...args))
  } // Array.prototype.reduce((ret, item) => ret*, initialValue)
  _call (...args) {
    let ret = args
    this.tasks.forEach(task => {
      ret = task(...ret)
    })
  }
}

let hook = new SyncWaterfallHook(['name'])

hook.tap('node', function (name) {
  console.log('node -> ', name)
  return '瀑布，传给下一个'
})

hook.tap('webpack', function (data) {
  console.log('webpack -> ', data)
  return 'node, webpack ok'
})
hook.tap('java', function (data) {
  console.log('java -> ', data)
})

hook.call('circle')
