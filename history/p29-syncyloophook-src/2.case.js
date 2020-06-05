class SyncLoopHook {
  constructor (args) { // args -> ['name']
    this.tasks = []
    this.idx = 0
  }
  tap (name, task) {
    this.tasks.push(task)
  }
  call (...args) {
    this.tasks.forEach(task => {
      let ret
      do {
        ret = task.apply(this, args)
        // ret = task.call(this, ...args)
      } while (ret !== undefined)
      this.idx = 0
    })
  }
}

let hook = new SyncLoopHook(['name'])


hook.tap('node', function (name) {
  console.log(`No. ${++this.idx}: node -> ${name}`)
  return this.idx === 2 ? undefined : ''
})

hook.tap('webpack', function (name) {
  console.log('webpack -> ', name)
})

hook.tap('java', function (name) {
  console.log(`No. ${++this.idx}: java -> ${name}`)
  return this.idx === 3 ? undefined : ''
})

hook.call('circle')
