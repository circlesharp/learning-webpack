class AsyncSeriesHook {
  constructor (args) { // args -> ['name']
    this.tasks = []
  }
  tapAsync (name, task) {
    this.tasks.push(task)
  }
  callAsync (...args) {
    const finalCallback = args.pop()
    let idx = 0
    const next = () => {
      // if (idx === this.tasks.length) return finalCallback() // 另一种写法
      let task = this.tasks[idx++]
      if (!task) return finalCallback()
      task(...args, next)
    }
    next()
  }
}

let hook = new AsyncSeriesHook(['name'])


hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node ', name)
    cb()
  }, 1000)
})

hook.tapAsync('webpack', function (name, cb) {
  setTimeout(() => {
    console.log('webpack ', name)
    cb()
  }, 1000)
})

hook.callAsync('circle', function () {
  console.log('callAsync end')
})
