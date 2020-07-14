import * as tag from './action-type'

const initState = {
  TagsData: [],
  MenuList: []
}

const TagsData = (state=initState, action) => {
  switch (action.type) {
    case tag.SETTAGSDATA: {
      state.TagsData = action.tagsData
      return {
        ...state
      }
    }
    case tag.SETMENULIST: {
      state.MenuList = action.MenuList
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