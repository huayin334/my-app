import React from 'react'
import T from 'prop-types'
import Toast from 'design/toast'
import './index.less'

export default function MessageStatusIcon(props) {
  const { message = {}, onResendMessageSuccess } = props

  const getMessageIconClass = message => {
    switch (message.status) {
      case 'unSend':
        return 'message-loading'
      case 'fail':
        return 'message-send-fail'
      default:
        return ''
    }
  }

  const handleResendMessage = (content, message) => {
    if (content === 'message-send-fail') {
      window.tim
        .resendMessage(message)
        .then(data => onResendMessageSuccess && onResendMessageSuccess(data))
        .catch(() => {
          Toast.message('消息发送失败')
        })
    }
  }

  const className = getMessageIconClass(message)
  const content = className === 'message-send-fail' ? '!' : ''

  return (
    <div
      className={className}
      style={{ height: '1.6rem', width: '1.6rem' }}
      onClick={() => handleResendMessage(className, message)}
    >
      {content}
    </div>
  )
}

MessageStatusIcon.propTypes = {
  message: T.object,
  onResendMessageSuccess: T.func
}
