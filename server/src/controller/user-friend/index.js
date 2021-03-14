const Router = require('koa-router')
const userFriend = new Router()

// 查询用户登录状态
userFriend.get('/getFriendList', require('./getFriendList'))

module.exports = userFriend
