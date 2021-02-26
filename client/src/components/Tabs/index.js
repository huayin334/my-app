import React, { useState } from 'react'
import './index.scss'
import xiaoxi from './images/xiaoxi.png'
import xiaoxi_active from './images/xiaoxi_active.png'
import dianhua from './images/dianhua.png'
import dianhua_active from './images/dianhua_active.png'
import dingwei from './images/dingwei.png'
import dingwei_active from './images/dingwei_active.png'
import wode from './images/wode.png'
import wode_active from './images/wode_active.png'

export default function Tabs() {
  const [activenum, setActivenum] = useState(0)
  const list = [
    { name: '消息', icon: xiaoxi, icon_active: xiaoxi_active },
    { name: '好友', icon: dianhua, icon_active: dianhua_active },
    { name: '动态', icon: dingwei, icon_active: dingwei_active },
    { name: '我的', icon: wode, icon_active: wode_active },
  ]
  const toDetail = (index) => {
    setActivenum(index)
  }
  return (
    <div className={'tab'}>
      {list.map((item, index) => (
        <div key={item.name} onClick={() => toDetail(index)}>
          <img
            src={index === activenum ? item.icon_active : item.icon}
            alt={item.name}
          ></img>
          {item.name}
        </div>
      ))}
    </div>
  )
}