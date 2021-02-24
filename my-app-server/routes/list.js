//这个文件专门用来存放关于list列表的所有接口
const Router = require('koa-router')
const list = new Router()

//写对应的接口
list.get('/yinger',async (ctx)=>{
  ctx.body = "列表页-婴儿"
})

list.get('/wanju', async (ctx)=>{
ctx.body = '列表页-玩具'
})
module.exports = list