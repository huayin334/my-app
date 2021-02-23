const router = require('koa-router')()
//封装好的引入mysql方法
const DB = require('../public/javascripts/mysqlDB')
const Koa = require('koa');
const mysql = require('mysql');
// 引入koa封装好的websocket功能
const ws = require('koa-websocket')
const app = new Koa()
router.get('/', async (ctx, next) => {
  ctx.body = 'koa2'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
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
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3001'); //配置跨域资源共享
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.body = result;

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
app.use(router.routes());//启动路由
/**
 * 可以配置也可以不配置 建议配置
 * 作用: 当所有路由中间件最后调用,根据ctx.status设置response响应头
 */
app.use(router.allowedMethods());
app.listen(3001, () => {
  console.log('starting ar port 3001');
});

module.exports = router
