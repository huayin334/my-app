import React, { useState } from 'react'
import axios from '../../utils/axios'
import './index.scss'
import Message from '../../components/Message'
import { hex_md5 } from '../../utils/md5'
export default function Login() {
  const [mail, setMail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showMes, setShowMes] = useState('none')

  const submit = () => {
    axios.get('/login/getVerificationCode?mail=' + mail).then((res) => {
      if (res.data.code === 0) {
        console.log('成功')
      } else if (res.data.code === 1) {
        console.log('失败')
      }
    })
  }
  const submit1 = () => {
    setMail(document.getElementById('input').value)
    setCode(document.getElementById('mycode').value)
    setPassword(document.getElementById('pass').value)
    setName(document.getElementById('name').value)
  }
  // 注册
  const submit2 = () => {
    // 将密码加密后存到数据库,防止数据库泄露时密码泄露
    let data = {
      mail: mail,
      mycode: code,
      password: hex_md5(password),
      name: name,
    }
    axios.post('/login/check', data).then((res) => {
      console.log(res)
    })
  }
  // 登录
  const submit3 = () => {
    let data = { mail: mail, password: hex_md5(password) }
    axios.post('/login/toLogin', data).then((res) => {
      console.log(res.data.token)
      localStorage.setItem('token', res.data.token)
    })
    setShowMes('block')
  }
  return (
    <div className="mine">
      <Message
        mesText={'发送成功'}
        time={3000}
        showMes={showMes}
        setShowMes={setShowMes}
      ></Message>
      <form name="my">
        <div>
          <span>邮 箱:</span>
          <input
            id="input"
            type="text"
            onKeyUp={(e) => {
              submit1(e)
            }}
          ></input>
        </div>
        <div>
          <span>验证码:</span>
          <input
            id="mycode"
            onKeyUp={(e) => {
              submit1(e)
            }}
          ></input>
        </div>
        <div>
          <span>密 码:</span>
          <input
            id="pass"
            onKeyUp={(e) => {
              submit1(e)
            }}
          ></input>
        </div>
        <div>
          <span>昵 称:</span>
          <input
            id="name"
            onKeyUp={(e) => {
              submit1(e)
            }}
          ></input>
        </div>
      </form>
      <button
        onClick={() => {
          submit()
        }}
      >
        获取验证码
      </button>
      <button
        onClick={() => {
          submit2()
        }}
      >
        注册
      </button>
      <button
        onClick={() => {
          submit3()
        }}
      >
        登录
      </button>
    </div>
  )
}
