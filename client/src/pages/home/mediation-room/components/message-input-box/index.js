import React, { useRef } from 'react'
import TIM from 'tim-js-sdk'
import T from 'prop-types'
import './index.scss'
import { Toast, Button } from 'design'

export default function MessageInputBox(props) {
  const { onMessageSend } = props
  const textRef = useRef()

  const sendMessage = () => {
    const { value } = textRef.current
    if (!value || value.trim().length === 0) {
      return
    }
    if (value.trim().length > 512) {
      return Toast.message('发送消息内容超长，请分条发送')
    }
    onMessageSend &&
      onMessageSend({
        type: TIM.TYPES.MSG_TEXT,
        value: value,
      })

    textRef.current.value = ''
  }

  return (
    <div className={'message-input-box'}>
      <textarea
        ref={textRef}
        className={'text-input'}
        rows="1"
        enterkeyhint={'send'}
        onKeyUp={({ target }) => {
          textRef.current.style.height = 'auto'
          textRef.current.style.height = target.scrollHeight + 'px'
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            if (event.ctrlKey) {
              textRef.current.value += '\n'
              return event.preventDefault()
            }
            sendMessage()
            event.preventDefault()
          }
        }}
      />
      <Button type={'primary'} size={'small'} onClick={sendMessage}>
        发送
      </Button>
    </div>
  )
}

MessageInputBox.propTypes = {
  onMessageSend: T.func,
}
