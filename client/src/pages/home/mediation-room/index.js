// import React, { useEffect, useState, useReducer, useRef } from 'react'
// // import TIM from 'tim-js-sdk'
// import T from 'prop-types'
// import { page } from 'common/decorator'
// import { NavBar, Toast, Icon, Picker } from 'design'
// import { isEmpty } from 'lodash'
// import { getCommonData } from 'common/utils'
// import axios from '../../../utils/axios'
// import qs from 'qs'
// import MessageItem from './components/message-item'
// import MessageInputBox from './components/message-input-box'
// import './index.scss'
// import { reducer } from './reducer'
// import * as Constants from './constant'
// // const { tim } = window

// function MediationRoom(props) {
//   const { chatRoomId, account, sig, chatRoomName } = props
//   const [myProfile, setMyProfile] = useState({})
//   const [chatRooms, setChatRooms] = useState([])
//   const [groupMemberMap, setGroupMemberMap] = useState({})
//   const [pickerStart, setPickerStart] = useState(false)
//   const conversationID = `GROUP${chatRoomId}`
//   const [scrollInfo, setScrollInfo] = useState({
//     preScrollHeight: 0,
//     isShowNewMessageTips: false,
//   })
//   const messageListRef = useRef()
//   const [messageState, dispatch] = useReducer(reducer, {
//     messageList: [],
//     nextReqMessageID: undefined,
//     isCompleted: false,
//     wacIsCompleted: false,
//     account: account,
//   })
//   const { isWechat } = getCommonData()

//   // 如果当前出处页面底部，有接受到新消息时，自动滚动到页面最下面
//   const keepMessageListOnBottom = () => {
//     const { preScrollHeight } = scrollInfo
//     const { clientHeight, scrollTop, scrollHeight } = messageListRef.current
//     let isShowNewMessageTips
//     if (preScrollHeight - clientHeight - scrollTop < 100) {
//       messageListRef.current.scrollTop = scrollHeight
//       isShowNewMessageTips = false
//     } else {
//       isShowNewMessageTips = true
//     }

//     setScrollInfo({
//       preScrollHeight: scrollHeight,
//       isShowNewMessageTips: isShowNewMessageTips,
//     })
//   }

//   const scrollMessageListToBottom = () => {
//     const { scrollHeight } = messageListRef.current
//     messageListRef.current.scrollTop = scrollHeight
//     setScrollInfo({
//       preScrollHeight: scrollHeight,
//       isShowNewMessageTips: false,
//     })
//   }

//   // const onTimSDKReady = () => {
//   //   tim.getMyProfile().then(({ data }) => setMyProfile(data));
//   //   generateGroupMemberMap();
//   //   getMessageList();
//   // };

//   const generateGroupMemberMap = () => {
//     // tim
//     //   .getGroupMemberList({ groupID: chatRoomId, count: 30, offset: 0 })
//     //   .then(({ data }) => {
//     //     if (Array.isArray(data.memberList)) {
//     //       let groupMemberMap = {};
//     //       data.memberList.forEach((item) => {
//     //         groupMemberMap[item.userID] = item;
//     //       });
//     //       setGroupMemberMap(groupMemberMap);
//     //     }
//     //   });
//   }

//   const onNetWorkStateChange = ({ data }) => {
//     let message = ''
//     switch (data.state) {
//       case this.TIM.TYPES.NET_STATE_CONNECTED:
//         message = '已接入网络'
//         break
//       case this.TIM.TYPES.NET_STATE_CONNECTING:
//         message = '当前网络不稳定'
//         break
//       case this.TIM.TYPES.NET_STATE_DISCONNECTED:
//         message = '当前网络不可用'
//         break
//       default:
//         break
//     }

//     message && Toast.message(message)
//   }

//   const onMessageListScroll = ({ target }) => {
//     const { preScrollHeight, isShowNewMessageTips } = scrollInfo
//     const clientHeight = messageListRef.current.clientHeight
//     if (
//       preScrollHeight - clientHeight - target.scrollTop < 100 &&
//       isShowNewMessageTips
//     ) {
//       setScrollInfo({
//         preScrollHeight,
//         isShowNewMessageTips: false,
//       })
//     }
//   }
//   const setMessageRead = (latestSeq) => {
//     // tim.setMessageRead({ conversationID: conversationID });
//     // axios({
//     //   url: '/api/enies/im/updateProgress',
//     //   headers: {
//     //     'Content-Type': 'application/x-www-form-urlencoded',
//     //   },
//     //   method: 'POST',
//     //   data: qs.stringify({
//     //     chatRoomId,
//     //     account: account,
//     //     latestSeq,
//     //   }),
//     // });
//   }

//   const onMessageReceive = ({ data }) => {
//     // 筛选出当前的会话的记录
//     if (Array.isArray(data)) {
//       const result = data.filter(
//         (item) => item.conversationID === conversationID
//       )
//       if (result.length) {
//         dispatch({ type: Constants.APPEND_MESSAGE_LIST, payload: result })
//         // 如果有入群提示，更新成员昵称
//         // if (
//         //   result.find(
//         //     (item) =>
//         //       item.type === TIM.MSG_GRP_TIP &&
//         //       item.payload.operationType === TIM.TYPES.GRP_TIP_MBR_JOIN
//         //   )
//         // ) {
//         //   generateGroupMemberMap();
//         // }
//         setMessageRead(result[result.length - 1].sequence)
//       }
//     } else if (data.conversationID === conversationID) {
//       setMessageRead(data.sequence)
//       dispatch({ type: Constants.APPEND_SINGLE_MESSAGE, payload: data })
//     }
//   }

//   const getMessageList = () => {
//     const { isCompleted, isWacCompleted } = messageState
//     if (isCompleted && !isWacCompleted) {
//       getMessageListFromWac().then((data) => {
//         dispatch({
//           type: Constants.GET_MESSAGE_LIST,
//           payload: {
//             ...messageState,
//             messageList: data,
//             isWacCompleted:
//               Array.isArray(data) &&
//               data.length < Constants.DEFAULT_MESSAGE_COUNT, // 实际拉下来的记录不足要求
//           },
//         })
//       })
//     } else if (!isCompleted) {
//       getMessageListFromTim().then(({ data }) => {
//         const { messageList } = data
//         if (!Array.isArray(messageList) || !messageList.length) {
//           getMessageListFromWac().then((data) =>
//             dispatch({
//               type: Constants.GET_MESSAGE_LIST,
//               payload: {
//                 messageList: data,
//                 isCompleted: true,
//                 isWacCompleted:
//                   Array.isArray(data) &&
//                   data.length < Constants.DEFAULT_MESSAGE_COUNT, // 实际拉下来的记录不足要求
//               },
//             })
//           )
//         } else {
//           dispatch({
//             type: Constants.GET_MESSAGE_LIST,
//             payload: {
//               ...data,
//               isWacCompleted: false,
//             },
//           })
//         }
//       })
//     }
//   }

//   const getMessageListFromTim = () => {
//     // return tim.getMessageList({
//     //   conversationID: conversationID,
//     //   nextReqMessageID: messageState.nextReqMessageID,
//     //   count: Constants.DEFAULT_MESSAGE_COUNT,
//     // });
//   }

//   const getMessageListFromWac = () => {
//     const { messageList } = messageState
//     const hasMessage = Array.isArray(messageList) && messageList.length
//     return axios.get('/api/enies/im/getHistoryMessage', {
//       params: {
//         chatRoomId,
//         latestSeq: hasMessage ? messageList[0].sequence : undefined,
//         messageSize: Constants.DEFAULT_MESSAGE_COUNT,
//       },
//     })
//   }

//   const getChatRooms = () => {
//     return axios.get('/api/enies/im/queryChatRooms').then((res) =>
//       setChatRooms(
//         (res || []).map((item) => ({
//           label: item.chatRoomName,
//           value: item.chatRoomId,
//         }))
//       )
//     )
//   }

//   useEffect(() => {
//     getChatRooms()

//     // tim.login({
//     //   userID: account,
//     //   userSig: sig,
//     // });

//     // tim.on(TIM.EVENT.SDK_READY, onTimSDKReady)
//     // tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceive)
//     // tim.on(TIM.EVENT.NET_STATE_CHANGE, onNetWorkStateChange)
//     // tim.on(TIM.EVENT.KICKED_OUT, onKickedOut)
//     return () => {
//       // tim.off(TIM.EVENT.SDK_READY, onTimSDKReady)
//       // tim.off(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceive)
//       // tim.off(TIM.EVENT.NET_STATE_CHANGE, onNetWorkStateChange)
//       // tim.off(TIM.EVENT.KICKED_OUT, onKickedOut)
//     }
//   }, [])

//   useEffect(() => {
//     messageListRef.current.addEventListener('scroll', onMessageListScroll)
//     return () => {
//       messageListRef.current.removeEventListener('scroll', onMessageListScroll)
//     }
//   }, [scrollInfo])

//   useEffect(() => {
//     // 如果已经在底部，自动出发滚动
//     keepMessageListOnBottom()
//   }, [messageState.messageList])

//   const sendMessage = ({ value, type }) => {
//     // const message = tim.createTextMessage({
//     //   to: chatRoomId,
//     //   conversationType: TIM.TYPES.CONV_GROUP,
//     //   payload: {
//     //     text: value,
//     //   },
//     // })

//     dispatch({
//       type: Constants.APPEND_SINGLE_MESSAGE,
//       // payload: message,
//     })

//     // 发送消息成功或失败后刷新消息列表
//     // tim
//     //   .sendMessage(message)
//     //   .then(({ data }) => {
//     //     setMessageRead(data.message.sequence)
//     //     dispatch({ type: Constants.APPEND_MESSAGE_LIST, payload: [] })
//     //   })
//     //   .catch(() => {
//     //     Toast.message('消息发送失败')
//     //     dispatch({ type: Constants.APPEND_MESSAGE_LIST, payload: [] })
//     //   })
//   }

//   const renderMessageList = () => {
//     const { messageList } = messageState
//     return !isEmpty(messageList) && !isEmpty(myProfile)
//       ? messageList.map((item) => {
//           return (
//             <MessageItem
//               key={item.ID}
//               myProfile={myProfile}
//               message={item}
//               groupMemberMap={groupMemberMap}
//               onResendMessageSuccess={({ data }) => {
//                 setMessageRead(data.message.sequence)
//                 dispatch({ type: Constants.APPEND_MESSAGE_LIST, payload: [] })
//               }}
//             />
//           )
//         })
//       : null
//   }

//   const onKickedOut = () => {
//     window.history.back()
//   }

//   const onChangeRoom = (roomId) => {
//     if (roomId !== chatRoomId) {
//       // 等待弹窗动画完成后再跳转
//       setTimeout(() => {
//         const findRoom = chatRooms.find((item) => item.value === roomId) || {}
//         // location.replace(
//         //   `/mediate-h5/mediation-room?chatRoomId=${encodeURIComponent(
//         //     roomId
//         //   )}&chatRoomName=${findRoom.label}`
//         // )
//       }, 200)
//     }
//   }

//   const renderNewMessageTips = () => {
//     const { isShowNewMessageTips } = scrollInfo
//     return isShowNewMessageTips ? (
//       <div className={'new-message-tips'} onClick={scrollMessageListToBottom}>
//         回到最新位置
//       </div>
//     ) : null
//   }

//   const renderMoreTips = () => {
//     const { isCompleted, isWacCompleted } = messageState
//     return isCompleted && isWacCompleted ? (
//       <div className={'no-more'}>没有更多了</div>
//     ) : (
//       <div onClick={getMessageList} className={'more'}>
//         查看更多
//       </div>
//     )
//   }

//   return (
//     <div className={'current-conversation-wrapper'}>
//       <NavBar divider={false} />
//       <div className={`header ${isWechat ? 'wechat' : ''}`}>
//         <span className={'title'}>
//           <Icon type={'mediation'} style={{ marginRight: '0.3rem' }} />
//           {chatRoomName}
//         </span>
//         <span
//           className={'extra'}
//           onClick={() => {
//             if (isEmpty(chatRooms)) {
//               getChatRooms()
//                 .then(() => setPickerStart(!pickerStart))
//                 .catch((e) => Toast.message(e.error))
//             } else {
//               setPickerStart(!pickerStart)
//             }
//           }}
//         >
//           切换
//         </span>
//       </div>
//       <div className={`current-conversation ${isWechat ? 'wechat' : ''}`}>
//         <div className={'content'}>
//           <div
//             ref={messageListRef}
//             className={'message-list'}
//             id={'message-list'}
//           >
//             {renderMoreTips()}
//             {renderMessageList()}
//           </div>
//           {renderNewMessageTips()}
//         </div>
//         <div className={'footer'}>
//           <MessageInputBox onMessageSend={(data) => sendMessage(data)} />
//         </div>
//       </div>
//       <Picker
//         start={pickerStart}
//         value={chatRooms && chatRooms.length ? chatRoomId : ''}
//         onVisibleChange={(visible) => setPickerStart(visible)}
//         onChange={onChangeRoom}
//         inputAreaClassName={'picker-input-area'}
//         data={chatRooms}
//       />
//     </div>
//   )
// }

// MediationRoom.propTypes = {
//   chatRoomId: T.string,
//   chatRoomName: T.string,
//   account: T.string,
//   sig: T.string,
// }
// export default page()(MediationRoom)
