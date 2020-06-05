class AsyncParallelHook {
  constructor (args) { // args -> ['name']
    this.tasks = []
  }
  tapAsync (name, task) {
    this.tasks.push(task)
  }
  callAsync (...args) {
    // let callback = args.splice(args.length - 1, 1)[0] // -> 如此丑陋的写法
    let finalCallback = args.pop()
    let idx = 0
    const done = () => {
      idx++
      if (idx === this.tasks.length) { finalCallback() }
    }
    this.tasks.forEach(task => {
      task(...args, done)
    })
  }
}

let hook = new AsyncParallelHook(['name'])


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
