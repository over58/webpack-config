const AsyncParallelHook = require('./AsyncParallelHook')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 2000)
    })
    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
        cb()
      }, 1000)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.callAsync('world', function() {
      // 每一个结束后都回调这里，也可以自己计数实现类似于Promise.all的效果
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()
