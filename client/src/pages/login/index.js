import React, { useState, useEffect, useRef } from 'react'
import axios from '../../utils/axios'
import './index.scss'
import Message from '../../components/Message'
import { hex_md5 } from '../../utils/md5'
import { useHistory } from 'react-router-dom'
export default function Login() {
  let history = useHistory()
  const [mail, setMail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showMes, setShowMes] = useState('none')
  const [codeText, setCodeText] = useState(0)
  const [mesText, setMesText] = useState('')
  const [topColorRes, setTopColorRes] = useState('#5fabea')
  const [topColorLog, setTopColorLog] = useState('')
  const [type, setType] = useState('register')
  let timer = useRef()
  useEffect(() => {
    // 清除定时器
    if (codeText <= 0) {
      clearInterval(timer.current)
    }
    if (mesText === '登录成功') {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        history.push('/home')
      }, 1000)
    }
  }, [codeText, mesText, history])
  const submit = () => {
    if (timer.current) clearInterval(timer.current)
    axios.get('/login/getVerificationCode?mail=' + mail).then((res) => {
      setCodeText(60)
      console.log(res)
      if (res.data.code === 0) {
        timer.current = setInterval(() => {
          if (codeText >= 0) {
            setCodeText((n) => {
              return n - 1
            })
          } else {
            clearInterval(timer.current)
          }
        }, 1000)
      } else if (res.data.code === 1) {
      }
    })
  }

  const submit1 = () => {
    if (document.getElementById('input')) {
      setMail(document.getElementById('input').value)
    }
    if (document.getElementById('mycode')) {
      setCode(document.getElementById('mycode').value)
    }

    if (document.getElementById('pass')) {
      setPassword(document.getElementById('pass').value)
    }
    if (document.getElementById('name')) {
      setName(document.getElementById('name').value)
    }
  }
  // 注册
  const submit2 = () => {
    //邮箱校验
    let email = mail.replace(/^\s+|\s+$/g, '').toLowerCase() //去除前后空格并转小写
    let mycode = code.replace(/^\s+|\s+$/g, '') //去除空格
    let mypassword = password.replace(/^\s+|\s+$/g, '')
    var reg = /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i
    if (email.match(reg) !== null && mycode && mypassword.length >= 6 && name) {
      // 将密码加密后存到数据库,防止数据库泄露时密码泄露
      let data = {
        mail: mail,
        mycode: mycode,
        password: hex_md5(mypassword),
        name: name,
      }
      axios.post('/login/check', data).then((res) => {
        if (res.data.code !== 0) {
          setMesText(res.data.data)
        } else {
          setMesText('注册成功')
          setType('login')
          setTopColorLog('#5fabea')
        }
        setShowMes('block')
        console.log(res)
      })
    } else {
      if (!name) {
        setMesText('昵称不能为空')
      }
      if (!mypassword) {
        setMesText('密码不能为空')
      } else if (mypassword.length < 6) {
        setMesText('密码最少为6位哦')
      }
      if (!mycode) {
        setMesText('验证码不能为空')
      }
      if (email.match(reg) == null) {
        setMesText('请填写正确的邮箱')
      }

      setShowMes('block')
    }

    return
  }
  // 登录
  const submit3 = () => {
    let data = { mail: mail, password: hex_md5(password) }
    axios.post('/login/toLogin', data).then((res) => {
      console.log(res)
      if (res.data.code !== 0) {
        setMesText(res.data.data)
      } else {
        setMesText('登录成功')
        localStorage.setItem('token', res.data.token)
        console.log(history)
      }
      setShowMes('block')
    })
  }
  return (
    <div>
      <Message
        mesText={mesText}
        time={3000}
        showMes={showMes}
        setShowMes={setShowMes}
      ></Message>
      <div className="mine">
        <div className="top">
          <div
            style={{ background: topColorRes }}
            onClick={() => {
              setTopColorRes('#5fabea')
              setTopColorLog('')
              setType('register')
            }}
          >
            注册
          </div>
          <div
            style={{ background: topColorLog }}
            onClick={() => {
              setTopColorLog('#5fabea')
              setTopColorRes('')
              setType('login')
            }}
          >
            登录
          </div>
        </div>
        <div className="input-box">
          <span>邮 箱:</span>
          <input
            id="input"
            type="email"
            onKeyUp={(e) => {
              submit1(e)
            }}
          ></input>
        </div>
        {type === 'register' ? (
          <div className="input-box">
            <span>验证码:</span>
            <input
              id="mycode"
              onKeyUp={(e) => {
                submit1(e)
              }}
            ></input>
            <button
              className={'get-code'}
              onClick={() => {
                submit()
              }}
              disabled={codeText !== 0}
              style={
                codeText !== 0
                  ? {
                      background:
                        '-webkit-linear-gradient(to left, rgb(142, 158, 171), rgb(197, 204, 210))',
                    }
                  : {}
              }
            >
              {codeText === 0 ? '获取验证码' : `${codeText}s后获取`}
            </button>
          </div>
        ) : (
          ''
        )}
        <div className="input-box">
          <span>密 码:</span>
          <input
            placeholder="设置一个密码"
            id="pass"
            type="password"
            onKeyUp={(e) => {
              submit1(e)
            }}
          ></input>
        </div>
        {type === 'register' ? (
          <div className="input-box">
            <span>昵 称:</span>
            <input
              id="name"
              placeholder="设置一个昵称吧~"
              onKeyUp={(e) => {
                submit1(e)
              }}
            ></input>
          </div>
        ) : (
          ''
        )}
        <div className={'btns'}>
          {type === 'register' ? (
            <button
              className={'register'}
              onClick={() => {
                submit2()
              }}
            >
              注册
            </button>
          ) : (
            ''
          )}
          {type === 'login' ? (
            <button
              className={'login'}
              onClick={() => {
                submit3()
              }}
            >
              登录
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
