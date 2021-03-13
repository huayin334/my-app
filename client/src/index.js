import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// 根据屏幕宽度自动改变font-size
import 'lib-flexible'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
  document.getElementById('root')
)
