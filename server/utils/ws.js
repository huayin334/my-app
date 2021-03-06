module.exports = (wss) => {
  wss.on('connection', function connection(ws, req) {
    console.log(req.url, 'req123')
    // const ip = req.socket.remoteAddress
    // 'message':监听客户端发送的消息
    if (req.url === '/test') {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message)
      })
      // 发送给客户端
      ws.send('something')
    }
  })
}
