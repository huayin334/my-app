const DB = require('../../../utils/db')
// 引入jwt token工具
const JwtUtil = require('../../../utils/jwt')
/**
 * POST
 * 用户登录
 * 要查询数据库是否有此人
 */

module.exports = async (ctx, next) => {
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
}
