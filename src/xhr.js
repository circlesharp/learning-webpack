const xhr = new XMLHttpRequest()

// webpack-dev-serve的服务 转发 -> 3000
// 需要配置 http-proxy
xhr.open('GET', '/user', true)
// xhr.open('GET', '/api/user', true)

xhr.onload = function () {
  console.log('xhr.response -> ', xhr.response)
}

xhr.send()

