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
    // 有些页面不用显示tabs
    if (history.location.pathname === '/login') {
      setShowTabs('none')
    }

    axios.get('/stuData').then((res) => {
      console.log(res)
    })
    // axios.get('/list/yinger').then((res) => {
    //   console.log(res)
    // })
    // 组件卸载时会调用
    return () => {}
  }, [history.location.pathname])

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
