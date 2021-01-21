//文件名为mysqlDB.js
var mysql = require('mysql');

//建立连接的方法


function __connection(){

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'stuData'
    });
    connection.connect();
    return connection;
}

exports.query=function(sql,parmas=null){
    //1.获取数据库连接对象
    var connection=__connection();
    return new Promise(function(reject,resolve){
    
    //2执行sql语句
    connection.query(sql,parmas, function (error, results, fields) {
        if (error) throw error;
        reject(results);
    
    });
    //3关闭连接
    connection.end();
    })
}


