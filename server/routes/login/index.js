const { transporter, mailOptions } = require('./mail')
const Router = require('koa-router')
const { clientdb } = require('../../utils/redis')
const login = new Router()
const DB = require('../../utils/db')
// 引入jwt token工具
const JwtUtil = require('../../utils/jwt')

// 获取验证码:获取邮箱验证码
login.get('/getVerificationCode', async (ctx, next) => {
  // 接收人邮箱
  mailOptions.to = ctx.request.query.mail
  // 随机验证码
  let VerificationCode = Math.floor(Math.random(1, 10) * 10000)
  mailOptions.text = `>_<请牢记你的验证码,不要告诉别人哦:${VerificationCode}`
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        ctx.body = {
          code: 1,
          data: 'error',
        }
        console.log(333)
        reject()
        return
      }
      ctx.body = {
        code: 0,
        data: 'success',
      }
      console.log(ctx.body)
      console.log('Message sent: %s', info.messageId)
      // 验证码缓存到redis,30s过期
      clientdb.set(mailOptions.to, VerificationCode, 30000)
      resolve()
    })
  })
  console.log(ctx.body, '返回的值')
})
/**
 * 用户注册:提交邮箱 验证码 密码
 * 首先要校验 邮箱是否注册过
 */
login.post('/check', async (ctx, next) => {
  console.log(ctx.request.body)
  let params = ctx.request.body
  // 是否注册过
  const isRegister = await DB.query(
    `select * from user where userid='${ctx.request.body.mail}'`
  )
  console.log(isRegister, 'isRegister')
  // 没有注册过
  if (isRegister.length === 0) {
    if (params.mycode === (await clientdb.get(params.mail))) {
      // 向数据库插入邮箱,昵称,密码
      const result = await DB.query(
        'INSERT INTO `my_app`.`user`(`userid`, `username`, `password`, `createTime`)' +
          `VALUES ('${params.mail}', '${params.name}', '${params.password}', now());`
      )
      console.log(result)
      ctx.body = { code: 0, data: 'success' }
    } else {
      ctx.body = { code: 1, data: '验证码错误' }
    }
  } else {
    // 已经注册过
    ctx.body = { code: 2, data: '该邮箱已注册' }
  }
})
// 用户登录:查询数据库是否有此人
login.post('/toLogin', async (ctx, next) => {
  let params = ctx.request.body
  console.log(ctx.request.body)
  // 查看是否有这个用户
  const result = await DB.query(
    'select * from user where userid=' + `'${params.mail}'`
  )
  console.log(result)
  console.log(result.length)
  console.log(params.password === result[0].password)
  console.log(result[0].userid.toString())
  if (result.length === 0) {
    ctx.body = { code: 1, data: '用户未注册' }
  } else {
    // 用户存在,校验密码
    if (params.password === result[0].password) {
      // 登陆成功，添加token验证
      let _id = result[0].userid.toString()
      console.log(_id)
      // 将用户id传入并生成token
      let jwt = new JwtUtil(_id)
      console.log(jwt, 'jwt')
      let token = jwt.generateToken()
      console.log(token, 'token')
      // 将 token 返回给客户端
      ctx.body = { code: 0, data: 'success', token: token }
    } else {
      ctx.body = { code: 2, data: '密码错误' }
    }
  }
  console.log(result)
})

module.exports = login
