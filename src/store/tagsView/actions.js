import * as tag from './action-type'

export const setTagsData = (TagsData) => {
  return {
      type: tag.SETTAGSDATA, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型
      TagsData
  }
}

export const setRoleList = (RoleList) => {
  return {
      type: tag.SETROLELIST, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型
      RoleList
  }
}