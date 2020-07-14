import {
  combineReducers,
} from 'redux';
import LoginInsert from './loginMsg/reducers'
import AppReducer from './tagsView/reducers'


const rootReducer = combineReducers({ 
  LoginInsert,
  AppReducer
});

export default rootReducer;