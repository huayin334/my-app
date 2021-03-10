const DB = require('../../../utils/db')
const { clientdb } = require('../../../utils/redis')
/**
 * POST请求
 * 用户注册:提交邮箱 验证码 密码
 * 首先要校验 邮箱是否注册过
 */
module.exports = async (ctx, next) => {
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
}
