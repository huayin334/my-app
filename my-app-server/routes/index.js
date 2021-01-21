const router = require('koa-router')()
//封装好的引入mysql方法
const DB = require('../public/javascripts/mysqlDB')
const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql');

const app = new Koa()
router.get('/', async (ctx, next) => {
  ctx.body = 'koa2'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
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

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001, () => {
  console.log('starting ar port 3001');
});

module.exports = router
