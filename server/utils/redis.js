const redis = require('redis')
const client = redis.createClient()
// 不使用默认连接方式时，使用如下方式创建客户端：
// const client = redis.createClient({host:'localhost', port:6379, password:'myPassword'});

// 如果想要选择第3个而不是第0个(默认)的数据库，调用方式如下：
// client.select(3, function() { /* ... */ });

client.on('error', function (err) {
  console.log('Error ' + err)
})

client.on('connect', function () {
  console.log('Redis连接成功.')
})
let clientdb = {}
clientdb.set = function (key, value, expire) {
  client.set(key, value)
  client.expire(key, expire)
}

clientdb.get = async function (key) {
  let res
  await new Promise((resolve, reject) => {
    client.get(key, function (err, result) {
      if (err) {
        console.log(err)
        reject()
        return
      }
      res = result
      resolve(result)
    })
  })
  return res
}

module.exports = { clientdb }
