import React from 'react'
import { Route, Redirect, } from 'react-router-dom'

// 这里后期可以获取redux中的数据.判断权限,如果没有权限,则会重定向到登录页
const isAuthenticated = (props, rest) => {
  // 在这块地方写上处理权限路由的方法逻辑即可, 返回true则为通过, 返回false则为没有权限,
  if (rest.route) {
    const flag = rest.roleList.filter(e => e === rest.route.meta.roles[0]).length !== 0
    console.log(flag, 'asdfj')
    return false
  } else {
    return true
  }
}
// 创建受保护的路由,只有登录状态能访问.
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    !!isAuthenticated(props, rest)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/NotFound',
        state: {from: props.location.pathname}
      }}/>
  )}/>
)

export default PrivateRoute