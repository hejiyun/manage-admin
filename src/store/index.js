// store/index.js
import { createStore } from 'redux'
import AppReducer from './tagsView/reducers'
import LoginInsert from './loginMsg/reducers'

const store = createStore(AppReducer, LoginInsert)

export default store