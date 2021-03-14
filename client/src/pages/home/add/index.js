import React, { useState } from 'react'
import './index.scss'
import T from 'prop-types'
import AddModal from './modal'
import add_icon from './images/add-icon.png'
export default function Add() {
  const [hideModal, setHideModal] = useState(true)
  return (
    <div className="home-add">
      <img
        src={add_icon}
        alt="加载失败>_<"
        onClick={() => {
          setHideModal(!hideModal)
          console.log(hideModal)
        }}
      ></img>
      <AddModal hide={hideModal}></AddModal>
    </div>
  )
}
Add.propTypes = {}
