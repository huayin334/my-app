import React, { useEffect, useState } from 'react'
import './index.scss'
import Search from '../../components/Search'
import axios from '../../utils/axios'
import FriendList from './friend-list'

export default function Friends() {
  const [friendName, setFriendName] = useState([])
  useEffect(() => {
    axios.get('/userFriend/getFriendList').then((res) => {
      console.log(res.data.data)
      setFriendName(res.data.data)
    })
  }, [])
  return (
    <div className="friend-list">
      <Search placeholderText="输入搜索好友"></Search>
      {friendName.map((item) => {
        return (
          <FriendList
            username={item.username}
            key={item.username}
            imgSrc={item.avatar}
          ></FriendList>
        )
      })}
    </div>
  )
}
