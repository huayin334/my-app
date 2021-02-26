import React from 'react'
import './index.scss'
import search_icon from './images/search.png'
import T from 'prop-types'

export default function Search(props) {
  const { placeholderText } = props
  return (
    <div className="search">
      <div className="box">
        {/* 这样写可以使键盘的换行变成搜索 */}
        <form action="">
          <input type="search" placeholder={placeholderText} />
        </form>
      </div>
      <img src={search_icon} alt="null"></img>
    </div>
  )
}
Search.propTypes = {
  placeholderText: T.string,
}
