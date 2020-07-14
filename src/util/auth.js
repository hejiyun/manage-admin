import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
let info = JSON.parse(sessionStorage.getItem('userInfo'))
export function getAToken() {
  return info.Token ? info.Token : ''
}

export function getRToken() {
  return info.RToken ? info.RToken : ''
}

export function getUserName() {
  return info.userName ? info.userName : ''
}

export function getUserCode() {
  return info.userCode ? info.userCode : ''
}

export function setUserInfo(userInfo) {
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo))

}
export function removeUserInfo() {
  sessionStorage.removeItem('userInfo')

}