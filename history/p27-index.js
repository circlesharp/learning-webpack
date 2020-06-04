// import "babel-polyfill"

let button = document.createElement('button')
button.innerText = 'click me'
document.body.appendChild(button)

button.addEventListener('click', async function () {
  // es6 草案语法
  let source = await import('./source')
  console.log(source.default)
})
