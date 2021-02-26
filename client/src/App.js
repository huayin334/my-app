import { useEffect } from 'react'
// import axios from 'axios';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Mine from './pages/mine'
import Friends from './pages/friends'
import Dynamic from './pages/dynamic'
import Tabs from './components/Tabs'
import './index.scss'

function App() {
  useEffect(() => {
    // axios.get('/stuData').then((res) => {
    //   console.log(res);
    // });
    // axios.get('/list/yinger').then((res) => {
    //   console.log(res);
    // });
  })

  return (
    <div className="box">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/mine" component={Mine} />
        <Route exact path="/dynamic" component={Dynamic} />
        <Route exact path="/friends" component={Friends} />
      </Switch>
      <Tabs></Tabs>
    </div>
  )
}

export default App
