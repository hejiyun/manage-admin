import PrivateRoute from '@router/PrivateRoute'
import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import routers from '@router/index'
import loadable from '@util/loadable'
const NotFound404 = loadable(() => import('@pages/404'))

// 按需引入
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{ position: 'relative'}}>
        {/* 路由从上到下依次匹配, 如果将404放在前面,则404后的路由都不会响应 */}
        <Switch>
          {
            routers.map(route => {
              return (
                <PrivateRoute exact path={route.path} component={route.component}/>
              )
            })
          }
          <Redirect exact from='/' to='/Home'/>
          <PrivateRoute component={NotFound404}></PrivateRoute>
        </Switch>
      </div>
    )
  }
}

export default withRouter(ContentMain)