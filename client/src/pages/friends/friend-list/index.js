import React from 'react'
import './index.scss'
import T from 'prop-types'

export default function FriendList(props) {
  const { username, imgSrc } = props
  return (
    <>
      <div className="friend-item">
        <img src={imgSrc} alt="发生了错误" className='avatar'/>
        {username}
      </div>
    </>
  )
}

FriendList.propTypes = {
  username: T.string,
  imgSrc: T.string,
}
