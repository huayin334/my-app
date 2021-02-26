import React from 'react'
import './index.scss'

export default function Mine() {
  return (
    <div className="mine">
      <div className="personal">
        <img
          src="https://tse2-mm.cn.bing.net/th/id/OIP.PioI7mJimr_s-zMY4bHYXwAAAA?pid=ImgDet&rs=1"
          alt="加载失败>_<"
        ></img>
        <div className="">
          <div>昵称:李华</div>
          <div>年龄:22</div>
          <div>地区:22</div>
          <div>个性签名:我爱学习</div>
        </div>
      </div>
      <div className="dynamic">
        <div>
          <div>我的动态</div>
          <div>总动态数:32条</div>
          <div>总点赞数:298个</div>
          <div>{`>>>查看详情`}</div>
        </div>
      </div>
    </div>
  )
}
