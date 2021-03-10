const Router = require('koa-router')
const login = new Router()

// 查询用户登录状态
login.get('/status', require('./status'))
// 注册时获取验证码
login.get('/getVerificationCode', require('./getVerificationCode'))

// 注册账号
login.post('/register', require('./register'))
// 用户登录
login.post('/toLogin', require('./toLogin'))
module.exports = login
