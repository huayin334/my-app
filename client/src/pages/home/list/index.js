import React from 'react'
import './index.scss'
import T from 'prop-types'
export default function List(props) {
  const { imgUrl, name, text } = props
  return (
    <div className="list">
      <img src={imgUrl} alt="加载失败>_<"></img>
      <div className="text">
        <div>{name}</div>
        <div className="my-text">{text}</div>
      </div>
    </div>
  )
}
List.propTypes = {
  imgUrl: T.string,
  name: T.string,
  text: T.string,
}
