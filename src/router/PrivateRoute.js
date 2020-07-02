import React from 'react'
import { Route, Redirect, } from 'react-router-dom'

// 这里后期可以获取redux中的数据.判断权限,如果没有权限,则会重定向到登录页
const isAuthenticated = () => {
  // 在这个逻辑函数中, 去进行判断, 是否是后端返回的权限路由
    return true
}
// 创建受保护的路由,只有登录状态能访问.
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    !!isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/NotFound',
        state: {from: props.location}
      }}/>
  )}/>
)

export default PrivateRoute