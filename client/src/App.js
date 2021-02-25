import { useEffect } from 'react';
// import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Mine from './pages/mine';

function App() {
  useEffect(() => {
    // axios.get('/stuData').then((res) => {
    //   console.log(res);
    // });
    // axios.get('/list/yinger').then((res) => {
    //   console.log(res);
    // });
  });

  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/mine" component={Mine} />
    </Switch>
  );
}

export default App;
