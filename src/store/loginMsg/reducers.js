import * as info from './action-type'
import { getToken } from '@util/auth'

const defaultState = {
  Token: getToken(),
  RToken: '',
  userName: '',
  userCode: ''
}



 const loginInsert = (state = defaultState, action) => {
  switch (action.type) {
      case info.SETTOKEN: 
          state.Token = action.Token
          return {
            ...state
          }

      case info.SETRTOKEN: 
      state.RToken = action.RToken
      return {
        ...state
      }

      case info.SETUSERNAME: 
      state.userName = action.userName
      return {
        ...state
      }

      case info.SETUSERCODE: 
      state.userCode = action.userCode
      return {
        ...state
      }

      default: {
        return state
      }

  }
}
export default loginInsert