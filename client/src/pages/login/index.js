import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [mail, setMail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
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
  const submit2 = () => {
    let data = { mail: mail, mycode: code, password: password, name: name }
    axios.post('/login/check', data).then((res) => {
      console.log(res)
    })
  }
  return (
    <div className="mine">
      <form name="my">
        <div>邮箱</div>
        <input
          id="input"
          type="text"
          onKeyUp={(e) => {
            submit1(e)
          }}
        ></input>
        <div>验证码</div>
        <input
          id="mycode"
          onKeyUp={(e) => {
            submit1(e)
          }}
        ></input>
        <div>密码</div>
        <input
          id="pass"
          onKeyUp={(e) => {
            submit1(e)
          }}
        ></input>
        <div>昵称</div>
        <input
          id="name"
          onKeyUp={(e) => {
            submit1(e)
          }}
        ></input>
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
        登录
      </button>
    </div>
  )
}
