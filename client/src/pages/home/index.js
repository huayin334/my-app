import React, { useEffect, useState } from 'react'
import './index.scss'
import List from './list'
import Add from './add'
import Search from '../../components/Search'
// import MediationRoom from './mediation-room'

export default function Home() {
  // const [userid, setUserid] = useState('')
  const list = [
    {
      url:
        'https://th.bing.com/th/id/R4eaec4f6ebcaad6c05da9a44f6426193?rik=oL9AE8f6OIFtkQ&riu=http%3a%2f%2fwww.gexing.me%2fuploads%2fallimg%2f160630%2f6-16063009295SV.jpg&ehk=iFURJkYS7GmRp25Rwv%2bc%2b%2bNqjnJyqLsHuaYVVWDU2ao%3d&risl=&pid=ImgRaw',
      name: '技术交流群',
      text: '大佬们帮我看下这个错误',
    },
    {
      url:
        'https://th.bing.com/th/id/R7d30ec5565781957cc7b292fdad6ee8d?rik=LSjBWaGrk29K%2bA&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f202003%2f20%2f1584674708226992.jpg&ehk=kVlSMpjA8Of9zKEHykbskWk4yl42qHqVZ4LrIARyDvk%3d&risl=&pid=ImgRaw',
      name: '17大数据1班团支书',
      text: '请同学们尽快发给我',
    },
    {
      url:
        'https://tse2-mm.cn.bing.net/th/id/OIP.PioI7mJimr_s-zMY4bHYXwAAAA?pid=ImgDet&rs=1',
      name: '技术交流群',
      text: '大佬们帮我看下这个错误',
    },
  ]

  let wsServer
  const connect = () => {
    // 获取userid
    // setUserid(localStorage.getItem('userid'))
    // 创建socket请求，调上面node的接口，传频道id
    wsServer = new WebSocket(
      `ws://localhost:3001/test?userid=${localStorage.getItem('userid')}`
    )
    wsServer.onopen = function () {
      console.log('连接成功')
    }
    // 接收服务器发送的信息
    wsServer.onmessage = function (evt) {
      console.log(JSON.parse(evt.data))
    }
  }
  useEffect(() => {
    connect()
    console.log(localStorage.getItem('userid'))
  }, [])
  const toSend = () => {
    let data = { a: 12 }
    wsServer.send(JSON.stringify(data))
  }

  return (
    <div className="home" id="home">
      <botton
        onClick={() => {
          toSend()
        }}
      >
        发送
      </botton>
      <Add></Add>
      {/* <MediationRoom></MediationRoom> */}
      <Search placeholderText="输入搜索聊天内容"></Search>
      {list.map((item, index) => (
        <List
          key={index.toString()}
          imgUrl={item.url}
          name={item.name}
          text={item.text}
        ></List>
      ))}
    </div>
  )
}
