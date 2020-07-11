/* 
    模块的导出示例
*/

// TODO:  通过 export 关键词修饰定义的变量 从而来导出成员--------------------

// 修饰变量
var name = 'abel~'
/* 
    // 修饰函数
    export function hello () {
        console.log(`hello ${name}`)
    }
    // 修饰类
    export class Person {}
*/

    /* 
        TODO: 统一导出---------------------------------------------------
    */
    // export { name, hello, Person }

    /* 
        TODO: 支持重命名--------------------------------------------------
                - 关键词: as
                - 可以重命名为 default ,但是在引入使用的时候必须再次重命名
    */
    // export { name as default}

    /* 
        TODO: 默认导出--------------------------------------------------
    */
    export default name