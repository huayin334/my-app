import React from 'react'
import './index.scss'
import search_icon from './images/search.png'

export default function Search(props) {
  return (
    <div className="search">
      <div className="box"></div>
      <img src={search_icon} alt="null"></img>
    </div>
  )
}
