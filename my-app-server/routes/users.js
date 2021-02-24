const router = require('koa-router')()
//封装好的引入mysql方法
const DB = require('../public/javascripts/mysqlDB')

const mysql = require('mysql');
// 引入koa封装好的websocket功能
const ws = require('koa-websocket')
const list = require('./list');

router.get('/', async (ctx, next) => {
  ctx.body = 'koa2'
})
// 2.路由级中间件
router.get('/string', async (ctx, next) => {

  console.log('路由级中间件');
  await next()//继续往下匹配

})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
  // 获取传参
  console.log(ctx.query);
  console.log(1);

})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/stuData', async (ctx, next) => {
  const result = await DB.query('select * from t_user'); //查询数据库
  console.log(result);
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3001/stuData'); //配置跨域资源共享
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.body = result;

})
//动态路由
router.get('/news/:aid', async(ctx)=>{
  // 获取动态路由的传值
  console.log(ctx.params);
  ctx.body='动态路由'
})
router.all('koa/ws',(ctx)=>{
  //客户端链接传过来的客户端身份
  const { id } = ctx.query
  wsObj[id] = ctx
  // 给客户端发送链接成功的信息
  ctx.websocket.send('连接成功')
  // 监听客户端发送过来的信息
  ctx.websocket.on('message', function(message){
    console.log(message);
    // uid为接收方, 将接收到的信息发送给接收方uid, 可以根据自己的需求处理数据
    //  再发送
    const uid = JSON.parse(message).uid
    if(!wsObj[uid]){
    }
  })
})
router.use('/list', list.routes(), list.allowedMethods())
// 导出
module.exports = router
