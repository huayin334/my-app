import React from 'react'
import T from 'prop-types'
import { isEmpty } from 'lodash'
import './index.less'
import MessageHeader from '../message-header'
import MessageStatusIcon from '../message-status-icon'
import TextElement from '../message-elements/text-element'
import GroupTipElement from '../message-elements/group-tip-element'
import MediateInputElement from '../message-elements/mediate-input-element'
import { CUSTOM_MSG_TYPE } from '../../constant'
import TIM from 'tim-js-sdk'
export default function MessageItem(props) {
  const { message = {}, myProfile = {}, groupMemberMap = {} } = props

  const showMessageHeader = () => {
    return ![TIM.TYPES.MSG_GRP_TIP, TIM.TYPES.MSG_GRP_SYS_NOTICE].includes(props.message.type)
  }

  const isMine = () => {
    return message.from === myProfile.userID
  }

  const showAvatar = () => {
    const isShow = message.type !== TIM.TYPES.MSG_GRP_TIP
    if (isShow) {
      const avatar = isMine()
        ? myProfile.avatar
        : groupMemberMap[message.from] && groupMemberMap[message.from].avatar
      return (
        <img
          alt={'avatar'}
          src={avatar || require('../../images/icon_default_user.png')}
          className={'col-avatar'}
        />
      )
    }
    return null
  }

  const renderElement = () => {
    const params = {
      isMine: isMine(),
      message: message,
      payload: message.payload,
      myProfile: myProfile,
      groupMemberMap: groupMemberMap
    }
    switch (message.type) {
      case TIM.TYPES.MSG_TEXT:
        return <TextElement {...params} />
      case TIM.TYPES.MSG_GRP_TIP:
        return <GroupTipElement {...params} />
      case TIM.TYPES.MSG_CUSTOM:
        return getCustomElement(params)
      default:
        return null
    }
  }

  const getCustomElement = params => {
    const { message = {}, payload } = params
    let customData
    try {
      customData = JSON.parse(payload.data)
    } catch (e) {
      customData = {}
    }

    const { nick = '' } = groupMemberMap[message.from] || {}
    // 创建群消息
    if (payload.data === 'group_create') {
      const payload = {
        text: `${message.nick || nick}创建调解室`
      }
      return <TextElement {...params} payload={payload} />
    } else if (!isEmpty(customData)) {
      if (customData.type === CUSTOM_MSG_TYPE.INPUT_AMT_INST) {
        return <MediateInputElement {...params} payload={{ ...payload, data: customData }} />
      } else if (
        customData.type === CUSTOM_MSG_TYPE.RESPONSE_INPUT_AMT_INST ||
        customData.type === CUSTOM_MSG_TYPE.PRIVATE_TEXT
      ) {
        const payload = {
          text: customData.text
        }
        return <TextElement {...params} payload={payload} />
      }
    }
  }

  const getMessagePosition = () => {
    if ([TIM.TYPES.MSG_GRP_TIP, TIM.TYPES.MSG_GRP_SYS_NOTICE].includes(message.type)) {
      return 'position-center'
    }
    if (isMine()) {
      return 'position-right'
    } else {
      return 'position-left'
    }
  }

  const messagePosition = getMessagePosition()

  return (
    <div className={`conversation-message-wrapper ${messagePosition}`}>
      <div className={`message-layout ${messagePosition}`}>
        {showAvatar()}
        <div className={'col-content'}>
          {showMessageHeader() ? (
            <MessageHeader
              groupMemberMap={groupMemberMap}
              message={message}
              myProfile={myProfile}
            />
          ) : null}
          <div className={'content-wrapper'}>
            {isMine() ? (
              <MessageStatusIcon
                message={message}
                onResendMessageSuccess={props.onResendMessageSuccess}
              />
            ) : null}
            {renderElement()}
          </div>
        </div>
      </div>
    </div>
  )
}

MessageItem.propTypes = {
  message: T.object,
  myProfile: T.object,
  groupMemberMap: T.object,
  onResendMessageSuccess: T.func
}
