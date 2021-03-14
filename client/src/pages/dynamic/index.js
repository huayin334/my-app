import React from 'react'
import './index.scss'
import Card from './Card'
import Header from './Header'

export default function Dynamic() {
  return (
    <div className="dynamic">
      <Header></Header>
      <div className="content">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  )
}
