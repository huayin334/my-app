const Koa = require('koa')
const WebSocket = require('ws')
const app = new Koa()
const WebSocketApi = require('../utils/ws') //引入封装的ws模块

// 导入
const router = require('./users')
// 使用koa-bodyparser中间件,post请求可以直接使用ctx.request.body获取请求参数
var bodyParser = require('koa-bodyparser')
// 跨域
const cors = require('koa2-cors')
app.use(bodyParser())
// 1.应用级中间件
// 匹配任何路由, 如果不写next 就不会继续往下匹配
app.use(async (ctx, next) => {
  console.log(new Date())
  await next() //当前路由匹配完成以后继续向下匹配
  console.log('路由匹配完成后又会回到这里')
})
// 设置跨域
app.use(cors())
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3002')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
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
// 注册路由允许使用中间件
let server = app.listen(3001, () => {
  console.log('启动在3001端口')
})

// const server = http.createServer(app.callback())

const wss = new WebSocket.Server({
  // 同一个端口监听不同的服务
  server, //挂载到原有服务器上，
})
//
WebSocketApi(wss)
module.exports = router

/**
 * 注意：wss服务是独立于koa执行的一个服务，虽然他们共用一个端口，但是并不会经过koa中间件，
 * 所以的koa中间件控制登陆状态将失效，也就是说客户端有可能绕过你的登陆检测就可连接wss，
 * 所以你有必要使用cookies判断当前用户（在ws.upgradeReq中找）
 */
