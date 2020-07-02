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
        <Redirect exact from='/' to='/Home'/>
          {
            
            routers.map((route,index) => {
             if(route.path === '/Login') {
              return null
             } else {
              return route.path === '/NotFound' ? <PrivateRoute key={ index } component={NotFound404}></PrivateRoute> :
              <PrivateRoute exact key={ index } path={route.path} component={route.component}/>
                
             }
            })
          }
          
          
        </Switch>
      </div>
    )
  }
}

export default withRouter(ContentMain)