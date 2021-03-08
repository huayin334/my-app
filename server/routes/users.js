const router = require('koa-router')()
//封装好的引入mysql方法
const DB = require('../utils/db')

const mysql = require('mysql')
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
  console.log(ctx, 999)
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
  let url = ctx.request.url
  if (
    url != '/login/toLogin' &&
    url != '/login/check' &&
    !url.includes('/login/getVerificationCode')
  ) {
    let token = ctx.request.header.authorization
    console.log(token, 'token---')
    let jwt = new JwtUtil(token)
    console.log(jwt, 'jwt---')
    let result = jwt.verifyToken()
    console.log(result, 'result---')
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
      console.log(result)
      ctx.body = { status: 403, msg: '登录已过期,请重新登录' }
      // res.render('login.html');
    } else if (url === '/login/status') {
      ctx.body = { status: 200, msg: '已登录' }
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

router.use('/list', list.routes(), list.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())

// 路由重定向
// 从 / 定向到 /home
router.redirect('/', '/home')
// 导出
module.exports = router
