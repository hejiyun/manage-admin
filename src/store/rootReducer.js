import {
  combineReducers,
} from 'redux';
import LoginInsert from './loginMsg/reducers'
import AppReducer from './preventRepeat/reducers'
import TagsData from './tagsView/reducers'


const rootReducer = combineReducers({ 
  LoginInsert,
  AppReducer,
  TagsData
});

export default rootReducer;