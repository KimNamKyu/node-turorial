import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'
// Store는 오직 객체만 받는다 :: redux-promise => promise형식 / redux-thunk => function 형식 
const creatStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
ReactDOM.render(
  <Provider
    store={creatStoreWithMiddleware(Reducer)}
  >
      <App />
  </Provider>
  
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
