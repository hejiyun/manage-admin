import React, { Component } from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom'
import PrivateRoute from './router/PrivateRoute'
import loadable from '@util/loadable'
import 'antd/dist/antd.css'
const Login = loadable(() => import('@pages/login'))
const Index = loadable(() => import('@pages/Index/index.jsx'))

class App extends Component {
  render () {
    return (
      <div className="App">
        <Switch>
        <Route path='/Login' component={Login}></Route>
        <PrivateRoute path='/' component={Index}></PrivateRoute>
        </Switch>
      </div>
    );
  }
  
}

export default App;

