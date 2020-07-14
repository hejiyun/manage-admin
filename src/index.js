import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {persistor} from './store/index'
import {PersistGate} from 'redux-persist/lib/integration/react';

console.log(persistor)
ReactDOM.render(
    <BrowserRouter >
     <Router>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Route component={App}></Route>
     </PersistGate>
      </Provider>
    </Router>
    </BrowserRouter>
   ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
