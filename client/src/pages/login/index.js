import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [mail, setMail] = useState('')
  const submit = () => {
    axios.get('/login/submit?mail=' + mail).then((res) => {
      console.log(res)
    })
  }
  const submit1 = () => {
    setMail(document.getElementById('input').value)
  }
  return (
    <div className="mine">
      <form name="my">
        <input
          id="input"
          type="text"
          onKeyUp={(e) => {
            submit1(e)
          }}
        ></input>
        <input></input>
      </form>
      <button
        onClick={() => {
          submit()
        }}
      >
        登录
      </button>
    </div>
  )
}
