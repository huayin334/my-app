import React from 'react'
import './index.scss'

export default function Header() {
  return (
    <>
      <div className="dynamic-header">
        <div className="header-item">全部</div>
        <div className="header-item">感情</div>
        <div className="header-item">学习</div>
        <div className="header-item">交易</div>
        <div className="header-item">关注</div>
      </div>
    </>
  )
}
