import * as Constants from './constant'
import TIM from 'tim-js-sdk'
export const reducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case Constants.GET_MESSAGE_LIST:
      return {
        messageList: filterMessageList(
          [...payload.messageList, ...state.messageList],
          state.account
        ),
        nextReqMessageID: payload.nextReqMessageID,
        isCompleted: payload.isCompleted,
        isWacCompleted: payload.isWacCompleted,
        account: state.account
      }
    case Constants.APPEND_MESSAGE_LIST:
      return {
        messageList: filterMessageList([...state.messageList, ...payload], state.account),
        nextReqMessageID: state.nextReqMessageID,
        isCompleted: state.isCompleted,
        isWacCompleted: state.isWacCompleted,
        account: state.account
      }
    case Constants.APPEND_SINGLE_MESSAGE:
      return {
        messageList: filterMessageList([...state.messageList, payload], state.account),
        nextReqMessageID: state.nextReqMessageID,
        isCompleted: state.isCompleted,
        isWacCompleted: state.isWacCompleted,
        account: state.account
      }
    default:
      return state
  }
}

/**
 * 当 messageList 列表变更时，过滤掉部分消息
 * @param messageList
 * @param account
 */
const filterMessageList = (messageList = [], account) => {
  let ids = []
  let originSeq = []
  messageList
    .slice()
    .reverse()
    .forEach(item => {
      const { data = '' } = item.payload
      // 是否是自定义类型类型的消息
      if (
        (item.type === TIM.TYPES.MSG_CUSTOM &&
          (data.includes(Constants.CUSTOM_MSG_TYPE.INPUT_AMT_INST) ||
            data.includes(Constants.CUSTOM_MSG_TYPE.RESPONSE_INPUT_AMT_INST))) ||
        data.includes(Constants.CUSTOM_MSG_TYPE.PRIVATE_TEXT)
      ) {
        let customData = JSON.parse(data)
        // 如果当前用户不可见，则从messageList中删除
        if (customData.to && !customData.to.includes(account)) {
          ids.push(item.ID)
        }
        // 如果当前类型是 RESPONSE_INPUT_AMT_INST，则将原始记录序号保存，用户删除相应的 INPUT_AMT_INST 类型的信息
        if (customData.type === Constants.CUSTOM_MSG_TYPE.RESPONSE_INPUT_AMT_INST) {
          originSeq.push(customData.originSeq)
        }

        if (
          customData.type === Constants.CUSTOM_MSG_TYPE.INPUT_AMT_INST &&
          originSeq.includes(item.sequence)
        ) {
          ids.push(item.ID)
        }
      }
    })

  if (Array.isArray(ids) && ids.length) {
    const idSet = new Set(ids)
    return messageList.filter(item => !idSet.has(item.ID))
  } else {
    return messageList
  }
}
