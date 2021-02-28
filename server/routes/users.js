const router = require('koa-router')()
//封装好的引入mysql方法
const DB = require('../utils/db')

const mysql = require('mysql')
// 引入koa封装好的websocket功能
const ws = require('koa-websocket')
const list = require('./list')
const login = require('./login')
// 引入jwt token工具
const JwtUtil = require('../utils/jwt')

// 异常捕获处理
const handler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.response.body = {
      code: 1,
      message: '服务器异常',
      desc: error,
    }
  }
}

// // 异常捕获逻辑，一定要放在第一个中间件
router.use(handler)

router.use(async (ctx, next) => {
  console.log(ctx)
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
  if (ctx.req.url != '/login/toLogin' && ctx.req.url != '/user/register') {
    let token = ctx.request.header.authorization
    console.log(token, 'token---')
    console.log(token)
    let jwt = new JwtUtil(token)
    let result = jwt.verifyToken()
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
      console.log(result)
      ctx.body = { status: 403, msg: '登录已过期,请重新登录' }
      // res.render('login.html');
    } else {
      console.log('next')
      await next()
    }
  } else {
    console.log('next1')
    await next()
  }
})

router.get('/', async (ctx, next) => {
  ctx.body = 'koa2'
})
// 2.路由级中间件
router.get('/string', async (ctx, next) => {
  console.log('路由级中间件')
  await next() //继续往下匹配
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
  // 获取传参
  console.log(ctx.query)
  console.log(1)
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

router.get('/stuData', async (ctx, next) => {
  ctx.body = { code: 1 }
})
//动态路由
router.get('/news/:aid', async (ctx) => {
  // 获取动态路由的传值
  console.log(ctx.params)
  ctx.body = '动态路由'
})
router.all('koa/ws', async (ctx) => {
  //客户端链接传过来的客户端身份
  const { id } = ctx.query
  wsObj[id] = ctx
  // 给客户端发送链接成功的信息
  ctx.websocket.send('连接成功')
  // 监听客户端发送过来的信息
  ctx.websocket.on('message', function (message) {
    console.log(message)
    // uid为接收方, 将接收到的信息发送给接收方uid, 可以根据自己的需求处理数据
    //  再发送
    const uid = JSON.parse(message).uid
    if (!wsObj[uid]) {
    }
  })
})
router.use('/list', list.routes(), list.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())

// 路由重定向
// 从 / 定向到 /home
router.redirect('/', '/home')
// 导出
module.exports = router
