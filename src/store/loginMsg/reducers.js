import * as info from './action-type'
import { getToken } from '@util/auth'

const defaultState = {
  Token: getToken(),
  RToken: '',
  userName: '',
  userCode: ''
}



 const loginInsert = (state = defaultState, action) => {
   console.log(action.type)
  switch (action.type) {
      case info.SETTOKEN: 
      console.log('进来了')
          state.Token = action.Token
          return {
            ...state
          }
      case info.GETTOKEN:
        const str = state.Token
        return {
          Token: str
        }

      case info.SETRTOKEN: 
      console.log('进来了1')
      state.RToken = action.RToken
      return {
        ...state
      }

      case info.GETRTOKEN:
        const Rstr = state.RToken
        return {
          Token: Rstr
      }
      case info.SETUSERNAME: 
      console.log('进来了2')
      state.userName = action.userName
      return {
        ...state
      }

      case info.GETUSERNAME:
        const userstr = state.userName
        return {
          Token: userstr
      }
      case info.SETUSERCODE: 
      console.log('进来了3')
      state.userCode = action.userCode
      return {
        ...state
      }

      case info.GETUSERCODE:
        const userCodestr = state.userCode
        return {
          Token: userCodestr
      }

      default: {
        return state
      }

  }
}
export default loginInsert