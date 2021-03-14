import React from 'react'
import './index.scss'
import T from 'prop-types'
export default function AddModal(props) {
  const { hide } = props
  return (
    <div
      className="home-add-modal"
      style={{ display: `${hide ? 'none' : 'display'}` }}
    ></div>
  )
}
AddModal.propTypes = {
  hide: T.bool,
}
