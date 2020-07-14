// store/index.js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import AppReducer from './tagsView/reducers'
// 使用中间件, 可以执行store.dispatch的异步操作
import thunk from 'redux-thunk'


let store =  createStore (
  combineReducers({AppReducer}),
  applyMiddleware(thunk)
)
export default store