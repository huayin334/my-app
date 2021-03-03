import React from 'react'
import T from 'prop-types'
import './index.scss'

export default function MessageBubble(props) {
  const getBubbleStyle = () => {
    const { isMine } = props
    return isMine ? 'message-send' : 'message-received'
  }

  return (
    <div className={`message-content ${getBubbleStyle()}`}>
      {props.children}
    </div>
  )
}

MessageBubble.propTypes = {
  isMine: T.bool.isRequired,
  children: T.element,
}
