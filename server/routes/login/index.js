const { transporter, mailOptions } = require('./mail')
const Router = require('koa-router')
const { clientdb } = require('../../utils/redis')
const login = new Router()
const DB = require('../../utils/db')

// 获取邮箱验证码
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
// 提交邮箱 验证码 密码
login.post('/check', async (ctx, next) => {
  console.log(ctx.request.body)
  let params = ctx.request.body
  if (params.mycode === (await clientdb.get(params.mail))) {
    // 向数据库插入邮箱,昵称,密码
    const result = await DB.query(
      'INSERT INTO `my_app`.`user`(`userid`, `username`, `password`, `createTime`)' +
        `VALUES ('${params.mail}', '${params.name}', '${params.password}', now());`
    ) //查询数据库
    console.log(result)
    ctx.body = { code: 0, data: 'success' }
  } else {
    ctx.body = { code: 1, data: '验证码错误' }
  }
})
module.exports = login
