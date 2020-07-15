import * as tag from './action-type'

const initState = {
  TagsData: [{
    path: '/Home',
    redirect: '/TradingPlatform/orderList',
    name: '主页',
  }],
  RoleList: []
}

const TagsData = (state=initState, action) => {
  switch (action.type) {
    case tag.SETTAGSDATA: {
      state.TagsData = action.TagsData
      return {
        ...state
      }
    }
    case tag.SETROLELIST: {
      state.RoleList = action.RoleList
      return {
        ...state
      }
    }
    default: {
      return state
    }
  }
}

export default TagsData