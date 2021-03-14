//文件名为mysqlDB.js
var mysql = require('mysql')

//建立连接的方法
function __connection() {
  // 创建一个数据库连接 返回connection对象
  // 由 mysql.createConnection 创建的对象，通过调用对象的方法实现连接、操作数据库、断开数据库连接
  var connection = mysql.createConnection({
    host: '101.37.18.96',
    user: 'root',
    password: '123456',
    database: 'my_app',
  })
  // 连接数据库
  connection.connect(function (err) {
    if (err) {
      consol.error('连接错误', err.stack)
    }
    console.log('数据库连接的线程标识', connection.threadId)
  })
  return connection
}

exports.query = function (sql, parmas = null) {
  //1.获取数据库连接对象
  var connection = __connection()
  return new Promise(function (reject, resolve) {
    //2.执行sql语句,通过sql语句实现数据库操作
    connection.query(sql, parmas, function (error, results, fields) {
      if (error) throw error
      reject(results)
    })
    //3.断开连接,确保所有的查询执行之后再使用
    connection.end()
  })
}

/**
 * 简单的数据库操作语句:增删查改
 *
 * 1.添加
 * insert 表名(字段名,字段名,字段名...不写默认全部字段) values(数据,数据,数据) (数据,数据,数据)
 *
 * 2.删除表数据
 * delete from 表名 where 过滤条件
 *
 * 3.更改表数据
 * update 表名 set 字段名-值,字段名-值,...where 过滤条件;
 *
 * 4.查询表数据
 *
 * 查询表内所有数据
 * select * from 表名;
 * 查询表内某字段所有数据
 * select 字段名 from 表名;
 * 过滤查询表
 * select * from 表名 where 过滤条件;
 */
