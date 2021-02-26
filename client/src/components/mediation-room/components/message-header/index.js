import React from 'react'
import T from 'prop-types'
import { getFullDate } from 'common/utils'
import './index.less'

export default function MessageHeader(props) {
  const { message = {}, myProfile = {}, groupMemberMap = {} } = props

  const from = () => {
    return (
      message.nick ||
      (groupMemberMap[message.from] && groupMemberMap[message.from].nick) ||
      message.from
    )
  }

  // 是否是自己发送的消息
  const isMine = () => {
    return message.from === myProfile.userID
  }

  const date = () => {
    return getFullDate(new Date(message.time * 1000))
  }

  return (
    <div className={`message-header ${isMine() ? 'right' : 'left'}`}>
      <div className={'name'}>{from()}</div>
      <div>{date()}</div>
    </div>
  )
}

MessageHeader.propTypes = {
  message: T.object,
  myProfile: T.object,
  groupMemberMap: T.object
}
