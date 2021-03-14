const DB = require('../../../utils/db')
// 引入jwt token工具
const JwtUtil = require('../../../utils/jwt')
/**
 * GET
 * 获取好友列表
 */

module.exports = async (ctx) => {
  // 获取token
  let token = ctx.request.header.authorization
  let jwt = new JwtUtil(token)
  // 用token获取到userid
  let userid = jwt.verifyToken()
  console.log(userid, 0909090)
  const friendList = await DB.query(
    `select uf.friendid, u.username, u.avatar from user_friend uf join user u on uf.friendid = u.userid where uf.userid='${userid}';`
  )
  console.log(friendList, userid, 'friendList')
  ctx.body = {
    code: 0,
    data: friendList,
  }
}
