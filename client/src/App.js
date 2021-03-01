import { useEffect, useState } from 'react'
import axios from './utils/axios'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Mine from './pages/mine'
import Friends from './pages/friends'
import Dynamic from './pages/dynamic'
import Tabs from './components/Tabs'
import Login from './pages/login'
import './index.scss'
import { useHistory } from 'react-router-dom'

function App() {
  let history = useHistory()
  const [showTabs, setShowTabs] = useState('block')
  useEffect(() => {
    // 第一次加载会执行
    getStatus()
    // 添加路由监听函数,每次路由变化都会执行这个方法
    history.listen((historyLocation) => {
      // 有些页面不用显示tabs
      if (history.location.pathname === '/login') {
        setShowTabs('none')
      } else {
        setShowTabs('block')
      }
    })

    // 组件卸载时会调用
    return () => {}
  })
  const getStatus = () => {
    axios
      .get('/login/status')
      .then((res) => {
        // 用户未登录直接跳转到登录页面
        if (res.data.status !== 200) {
          history.push('/login')
          console.log(history.location.pathname, 1)
        }
      })
      .then(() => {
        console.log(history.location.pathname, 2)
        // 有些页面不用显示tabs
        if (history.location.pathname === '/login') {
          setShowTabs('none')
        } else {
          setShowTabs('block')
        }
      })
  }
  return (
    <div className="box">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/mine" component={Mine} />
        <Route exact path="/dynamic" component={Dynamic} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Tabs showTabs={showTabs}></Tabs>
    </div>
  )
}

export default App
