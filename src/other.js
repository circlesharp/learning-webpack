const moment = require('moment')
require('moment/locale/zh-cn')

require('./xhr.js')

function print (str) {
  console.log(str + ' in other.js~')
}

moment.locale('zh-cn')
let timeStr = moment().endOf('day').fromNow()

print('I am other.js')
print(timeStr)
