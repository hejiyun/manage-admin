import * as tag from './action-type'

const initState = {
  TagsData: []
}

const TagsData = (state=initState, action) => {
  switch (action.type) {
    case tag.SETTAGSDATA: {
      state.TagsData = action.tagsData
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