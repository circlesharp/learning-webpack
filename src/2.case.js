class AsyncSeriesWaterfallHook {
  constructor (args) { // args -> ['name']
    this.tasks = []
  }
  tapAsync (name, task) {
    this.tasks.push(task)
  }
  callAsync (...args) {
    let finalCallback = args.pop()
    let idx = 0
    let next = (err, data) => {
      let task = this.tasks[idx++]
      if (!task) return finalCallback()
      if (idx === 0) {
        task(...args, next)
      } else {
        task(data, next)
      }
    }
    next()
  }
  _callAsync (...args) {
    let finalCallback = args.pop()
    let [ first, ...others ] = this.tasks
    const done = (err, ...args) => {
      if (!err) return args
    }
    others.reduce((c, n) => n(c, done), first(...args, done))
  }
}

let hook = new AsyncSeriesWaterfallHook(['name'])

hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node ', name)
    cb(null, 'node is good~')
  }, 1000)
})

hook.tapAsync('webpack', function (data, cb) {
  setTimeout(() => {
    console.log('webpack ', data)
    cb()
  }, 1000)
})

hook.callAsync('circle', function () {
  console.log('callAsync end')
})
