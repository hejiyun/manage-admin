const defaultState = {
  Token: '',
  RToken: '',
  userName: ''
}

 const loginInsert = (state = defaultState, action) => {
  switch (action.type) {
      case 'SetToken': 
          return {
            Token: state.Token
          }
      case 'SETTOKEN':
        return {
          Token: action
        }
      default: {
        return state
      }

  }
}
export default loginInsert