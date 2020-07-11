import createHeading from './heading.js'
import './main.css'
import icon from './icon.png'

const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon

document.body.append(img)

consoel.log1(';abe')
// TODO: 代理API
const ul = document.createElement('ul')
document.body.append(ul)

// 跨域请求, 虽然GitHub支持CORS,但并不是每一个服务器都应该支持
fetch('/api/users')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement('li')
            li.textContent = item.login
            ul.append(li)
        })
    })

// 手动处理js模块的热更新逻辑
import createEditor from './editor'
import background from './better.png'
import './global.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = background
document.body.appendChild(img)

// ============ 以下用于处理 HMR，与业务代码无关 ============
if (module.hot) { // 判断是否存在热替换
  let lastEditor = editor
  module.hot.accept('./editor', () => { // 监控指定的模块
    // console.log('editor 模块更新了，需要这里手动处理热更新逻辑')
    // 热更新的逻辑，创建新的元素，覆盖原来的，实现热替换
    // console.log(createEditor)

    const value = lastEditor.innerHTML
    document.body.removeChild(lastEditor)
    const newEditor = createEditor()
    newEditor.innerHTML = value
    document.body.appendChild(newEditor)
    lastEditor = newEditor
  })

  module.hot.accept('./better.png', () => {
    img.src = background
    console.log(background)
  })
}
