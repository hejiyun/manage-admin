import * as info from './action-type'

export const getAToken = () => {
  return {
      type: info.GETTOKEN, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型
  }
}

export const setAToken = (Token) => {
  return {
      type: info.SETTOKEN, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型,
      Token
  }
}

export const setRToken = (RToken) => {
  return {
      type: info.SETRTOKEN, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型,
      RToken
  }
}

export const getRToken = () => {
  return {
      type: info.GETRTOKEN, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型,
  }
}

export const setUserName = (userName) => {
  return {
      type: info.SETUSERNAME, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型,
      userName
  }
}

export const getUserName = () => {
  return {
      type: info.GETUSERNAME, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型,
  }
}

export const setUserCode = (userCode) => {
  return {
      type: info.SETUSERCODE, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型,
      userCode
  }
}

export const getUserCode = () => {
  return {
      type: info.GETUSERCODE, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型,
  }
}