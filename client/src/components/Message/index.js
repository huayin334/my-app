import React, { useEffect } from 'react'
import './index.scss'
import T from 'prop-types'
export default function Message(props) {
  let { mesText, time = 3000, showMes, setShowMes } = props
  let timer
  useEffect(() => {
    // 只有当显示弹窗的时候,才调用show,防止定时器过多
    if (showMes === 'block') {
      show()
    }
  })
  const show = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      hide()
    }, time)
  }
  const hide = () => {
    setShowMes('none')
  }
  return (
    <div className="message" style={{ display: showMes }}>
      {mesText}
    </div>
  )
}
Message.propTypes = {
  mesText: T.string,
  time: T.number,
  showMes: T.string,
  setShowMes: T.func,
}
