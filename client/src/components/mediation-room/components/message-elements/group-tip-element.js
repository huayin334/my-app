import React from 'react'
import T from 'prop-types'
import TIM from 'tim-js-sdk'
import './index.less'

export default function GroupTipElement(props) {
  const { message = {}, payload, groupMemberMap } = props

  const getGroupTipContent = () => {
    const userName =
      (Array.isArray(payload.userIDList) &&
        payload.userIDList
          .map(item => (groupMemberMap[item] && groupMemberMap[item].nick) || item)
          .join(',')) ||
      message.nick
    switch (message.payload.operationType) {
      case TIM.TYPES.GRP_TIP_MBR_JOIN:
        return `${userName} 加入调解室`
      case TIM.TYPES.GRP_TIP_MBR_QUIT:
        return `${userName} 退出调解室`
      case TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
        return `${userName} 被移出调解室`
      default:
        return ''
    }
  }

  const text = getGroupTipContent()
  return text ? <div className={'group-tip-element'}>{text}</div> : null
}
GroupTipElement.propTypes = {
  message: T.object,
  payload: T.object,
  groupMemberMap: T.object
}
