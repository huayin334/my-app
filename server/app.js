const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

//设置跨域访问
// app.all('*', function (req, res, next) {
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header('Access-Control-Allow-Origin', '*')
//   //允许的header类型
//   res.header('Access-Control-Allow-Headers', 'content-type')
//   //跨域允许的请求方式
//   res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
//   if (req.method.toLowerCase() == 'options') res.send(200)
//   //让options尝试请求快速结束
//   else next()
// })

// error handler
// onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
