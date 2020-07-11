// TODO: 导入其他模块
import createHeading from './heading.js'
const heading = createHeading()
document.body.append(heading)

// TODO: 导入资源模块
import './main.css'

// TODO: 导入文件资源
import icon from './icon.png'
const img = new Image()
img.src = icon
document.body.append(img)