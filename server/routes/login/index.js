const { transporter, mailOptions } = require('./mail')
const Router = require('koa-router')
const login = new Router()
login.get('/submit', async (ctx, next) => {
  console.log(ctx.request.query.mail)
  ctx.body = {
    title: 'koa2 json',
  }
  // 接收人邮箱
  mailOptions.to = ctx.request.query.mail
  // 随机验证码
  mailOptions.text = `>_<请牢记你的验证码,不要告诉别人哦:${Math.floor(
    Math.random(1, 10) * 10000
  )}`
  console.log(mailOptions.text)
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
  })
})
module.exports = login
