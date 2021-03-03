// 引入模块依赖
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data
  }

  //生成token
  generateToken() {
    let data = this.data
    let created = Math.floor(Date.now() / 1000)
    /**
     * 打开命令行工具，输入openssl，打开openssl
     * 生成私钥：genrsa -out rsa_private_key.pem 2048
     * 生成公钥： rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
     *
     * 查看地址--打开命令行
     * ls -a 查看隐藏文件
     * pwd查看当前路径
     *
     * 这里的地址要注意!!!
     *
     */
    let cert = fs.readFileSync(path.join('/Users/qiuluo/rsa_private_key.pem')) //私钥 可以自己生成
    let token = jwt.sign(
      {
        data,
        // 过期时间一个月
        exp: created + 60 * 60 * 24 * 31,
      },
      cert,
      { algorithm: 'RS256' }
    )
    return token
  }

  // 校验token
  verifyToken() {
    let token = this.data
    let cert = fs.readFileSync(path.join('/Users/qiuluo/rsa_public_key.pem')) //公钥 可以自己生成
    let res
    try {
      let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || {}
      }
    } catch (e) {
      res = 'err'
    }
    return res
  }
}

module.exports = Jwt
