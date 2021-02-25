const db = require('./db')

let arr = [
  {id:3,img:'21380',username:'hh'},
  {id:4,img:'2138test0',username:'test'},
]

// 对数组进行for循环, 并插入到mysql的banner表
arr.map(item=>{
  // 主要插入的顺序, username img id 是和数据库里的顺序是一样的
  let sql = `insert into t_user values ('${item.username}','${item.img}',${item.id})`
   db.query(sql)
})