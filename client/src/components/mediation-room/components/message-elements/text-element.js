import React from 'react'
import MessageBubble from '../message-bubble'
import T from 'prop-types'

export default function TextElement(props) {
  const { payload } = props
  return (
    <MessageBubble isMine={props.isMine}>
      <span>{payload.text}</span>
    </MessageBubble>
  )
}
TextElement.propTypes = {
  isMine: T.bool.isRequired,
  payload: T.object
}
