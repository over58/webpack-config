const { SyncWaterfallHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['arch', 'a'])
    }
  }

  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', function(name) {
      console.log('node', name)

      return '返回数据作为下一个事件的参数(如果返回undefined的话，等同于没有返回，不做处理 )'
    })
    this.hooks.arch.tap('b', function(data) {
      console.log('react', data)
      return 'react '
    })

    this.hooks.arch.tap('c', function(data) {
        console.log('c',data)
    })

    this.hooks.arch.tap('d', function(data) {
        // 如果前一个没有return, 就返回再上一级的返回值
        console.log('d',data)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.call('这是调用时候的参数')
  }
}

var a = new Lesson()
a.tap()
a.start()