import {useEffect} from 'react'
import axios from 'axios'

function App() {
  useEffect(()=>{
    axios.get('/stuData').then(res=>{
      console.log(res);
    })
    axios.get('/list/yinger').then(res=>{
      console.log(res);
    })
  })

  return (
    <div className="App">
      测试
    </div>
  );
}

export default App;
