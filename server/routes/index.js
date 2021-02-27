const Koa = require('koa')
// router.prefix('/users')
const app = new Koa()
// 导入
const router = require('./users')
// 使用koa-bodyparser中间件,post请求可以直接使用ctx.request.body获取请求参数
var bodyParser = require('koa-bodyparser')
app.use(bodyParser())
// 1.应用级中间件
// 匹配任何路由, 如果不写next 就不会继续往下匹配
app.use(async (ctx, next) => {
  console.log(new Date())
  await next() //当前路由匹配完成以后继续向下匹配
  console.log('路由匹配完成后又会回到这里')
})
app.use(router.routes()) //启动路由
/**
 * 可以配置也可以不配置 建议配置
 * 作用: 当所有路由中间件最后调用,根据ctx.status设置response响应头
 * router.allowedMethods()中间件，主要用于 405 Method Not Allowed 这个状态码相关
 * 如果不加这个中间件，如果接口是get请求，而前端使用post请求，会返回 404 状态码，接口未定义。
 * 如果加了这个中间件，这种情况时，会返回405 Method Not Allowed ，
 * 提示 request method 不匹配，并在响应头返回接口支持的请求方法，更有利于调试
 */
app.use(router.allowedMethods())
app.listen(3001, () => {
  console.log('starting ar port 3001')
})

module.exports = router
