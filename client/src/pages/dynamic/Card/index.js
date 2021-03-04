import React from 'react'
import './index.scss'
import xihuan from '../images/xihuan.png'
import pinglun from '../images/pinglun.png'

export default function Card() {
  return (
    <>
      <div className="card">
        <div className="title">?请问XXXXXX?请问XXXXXX?请问XXXXXX?</div>
        <div className="ans">
          泻药,我来简单回答下泻药,我来简单回答下泻药,我来简单回答
          泻药,我来简单回答下泻药,我来简单回答下泻药,我来简单回答下泻药,我来简单回答下泻药,我来简下泻药,我来简单回答下泻药,我来简单回答下泻药,我来简单回答下
        </div>
        <div className="btns">
          {/* <img src={dianzan} alt=">_<"></img> */}
          <div>
            <img src={pinglun} alt=">_<"></img>
            <span>12</span>
          </div>
          <div>
            <img src={xihuan} alt=">_<"></img>
            <span>33</span>
          </div>
        </div>
      </div>
    </>
  )
}
