const { clientdb } = require('../../../utils/redis')
const { transporter, mailOptions } = require('./mail')
/**
 * GET
 * 获取验证码:获取邮箱验证码
 */
module.exports = async (ctx, next) => {
  console.log(3343)
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
        console.log(error)
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
}
