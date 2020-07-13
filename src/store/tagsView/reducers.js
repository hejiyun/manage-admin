// reducers/index.js
const initState = {
  pageLoadingVal: false
}
const AppReducer = (state=initState, action) => {
  switch (action.type) {
    case `OpenPageLoading`: {
      return {
        pageLoadingVal: true
      }
    }
    case `ClosePageLoading`: {
      return {
        pageLoadingVal: false
      }
    }
    default: {
      return state
    }
  }
}

export default AppReducer
