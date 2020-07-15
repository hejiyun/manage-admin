import React, {Component} from 'react'
import { Menu, Icon} from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {MenuList} from '@router'

const { SubMenu } = Menu;
class SiderMenu extends Component {
  state = {
    selectedKeys: ['/Home'],
    openKeys: ['/user']
  };

  // 点击menu触发菜单栏高亮切换
  handleClick = e => {
    this.setState({
      selectedKeys: [e.key]
    });
  };
  // 根据路径,设置对应的openkey
  changeOpenKey(pathname) {
    // 此排序规则需要router路径path按层级依次递进
    const arr = pathname.split('/')
    switch (arr.length) {
      // 如果当前地址截取长度为2,那么证明是只有一个/,即是主菜单的其中一个,此时直接填入高亮
      case 2 :
        this.setState({
          openKeys: [pathname]
        })
        break;
      // 如果当前地址截取的长度为3,那么证明是子菜单的一个,此时,填入的应该是主菜单的高亮部分
      case 3 :
        this.setState({
          openKeys: [`/${arr[1]}`]
        })
        break;
      case 4:
        this.setState({
          openKeys: [`/${arr[1]}`, `/${arr[1]}/${arr[2]}`]
        })
        break;
      // 就当前项目而言,结构较简单, 如果层级复杂, 可以继续判断长度.
      default :
        this.setState({
          openKeys: [`/${arr[1]}`]
        })
    }
  }
  // 初始化不执行, 在component接收新的状态(props)时被触发, 一般用于父组件状态更新时子组件重新渲染
  componentWillReceiveProps(nextProps) {
    const pathname = nextProps.location.pathname
    // 如果当前跳转的路由和上一次跳转的路由不相同
    if (this.props.location.pathname !== pathname) {
      // 再判断当前跳转的地址中是否包含上一个地址, 如果包含, 那么就是跳转进附属页面了, 此时菜单栏应该不变
      if (pathname.indexOf(this.props.location.pathname) !== -1) {
        // 如果是'/', 表明访问首页, 也不作处理, 直接让它跳转,
        if (this.props.location.pathname === '/') {
          this.setState({
            selectedKeys: [pathname],
          })
        }
       
      } else {
        // 如果不相同, 那么证明跳转的是同一个页面
        this.setState({
          selectedKeys: [pathname]
        })
      }
    }
    this.changeOpenKey(pathname)
  }

  // 判断处理是否需要重新加载, 只有当打开的菜单栏和选中的菜单相同时， 才不需要更新
  shouldComponentUpdate(nextProps, nextState) {
    const len = nextState.openKeys.length
    if (len === 1) {
      // 二级菜单时, 判断第一项相同且选中相同
      if ((nextState.openKeys[0] === this.state.openKeys[0]) && nextState.selectedKeys[0] === this.state.selectedKeys[0]) {
        return false
      }
      return true
    } else {
      // 三级菜单时, 判断第二项相同且选中相同
      if ((nextState.openKeys[1] === this.state.openKeys[1]) && nextState.selectedKeys[0] === this.state.selectedKeys[0]) {
        return false
      }
      return true
    }
  }

  // 当路径改变时, 获取菜单项信息, 并打开对应的菜单, 关闭其他菜单项
  onOpenChange = openKeys => {
    if (openKeys.length === 1) {
      // 如果只打开一级菜单, 那么就设置为当前菜单
      this.setState({
        openKeys: openKeys
      })
    } else if (openKeys.length === 2) {
      // 如果长度有两个, 证明有可能是切换菜单
      // 那么先判断, 后面包含前面, 不包含则两者不同菜单项.则直接打开后者菜单项
      if (openKeys[1].indexOf(openKeys[0]) !== -1) {
        // 如果包含, 则进入子项
        this.setState({
          openKeys: openKeys
        })
      } else {
        this.setState({
          openKeys: [openKeys[1]]
        })
      }
    } else if (openKeys.length === 0) {
      this.setState({
        openKeys: []
      })
    } else if (openKeys.length === 3) {
      // 如果长度为3, 那么证明打开的是同一级下不同二级目录
      // 因为路径是递进的, 所以, 当最后打开的不是当前菜单目录下的子目录时, 第三项必然不包含第一项, 那么表明打开其他菜单
      if (openKeys[2].indexOf(openKeys[0]) > -1) {
        this.setState({
          openKeys: [openKeys[0], openKeys[2]]
        })
      } else {
        this.setState({
          openKeys: [openKeys[2]]
        })
      }
    }
  };
  componentDidMount() {
    // 每次加载main部分组件时,抓取当前页面跳转地址, 将当前地址设置为menu高亮.
    const pathName = this.props.location.pathname
    this.setState({
      selectedKeys: [pathName]
    })
    this.changeOpenKey(pathName)
  }
  
  isShow = (item, roleList) => {
    if (item.meta.roles) {
      const flag = roleList.filter(e => e === item.meta.roles[0]).length !== 0
      return flag
    } else {
      return true
    }
  }
  render () {
    const { selectedKeys, openKeys } = this.state
    const roleList = this.props.RoleList.RoleList
    // 目前只考虑三级层次菜单, 如果有很多级, 那么内部逻辑使用递归即可
    return (
      <Menu style={{ width: '100%'}}  theme="dark" mode="inline"   onOpenChange={this.onOpenChange} openKeys={openKeys} selectedKeys={selectedKeys} defaultSelectedKeys={selectedKeys} onClick={this.handleClick}> 
      {
       // 需要注意的是, 首先判断该项没有hidden属性, 然后再判断该项的roles属性在后端返回的权限路由当中,这样才能渲染出来
        MenuList.map((item, index) => {
          if (!item.hidden && this.isShow(item, roleList)) {
              // 第一级菜单目录
              return  item.children && item.children.length ?  <SubMenu
              key={item.path}
              title={
                <span>
                  <Icon type={item.icon}></Icon>
                  <span>{item.name}</span>
                </span>
              }
              >
              {
                // 第二级菜单目录
                item.children.map(e => {
                  if (!e.hidden && this.isShow(e, roleList)) {
                    if (!e.children || e.children.length === 0) {
                      return <Menu.Item key={e.path}>
                        <Link to = {e.path}>
                          <span>{ e.name }</span>
                        </Link>
                      </Menu.Item>
                      
                    } else {
                      // 第三级菜单目录
                      return <SubMenu key={e.path} title={e.name}>
                        {
                          e.children.map(Tchildren => {
                            if (!Tchildren.hidden && this.isShow(Tchildren, roleList)) {
                              return <Menu.Item key={Tchildren.path}>
                              <Link to = {Tchildren.path}>
                                <span>{Tchildren.name}</span>
                              </Link>
                            </Menu.Item>
                            } else {
                              return null
                            }         
                          })
                        }
                    </SubMenu>
                    }
                  } else {
                    return null
                  }     
                })
              }
              </SubMenu> : <Menu.Item key={item.path}>
                      <Link to = {item.path}>
                        <span>{ item.name }</span>
                      </Link>
                    </Menu.Item>
          } else {
            return null
          }
        })
      }
  </Menu>)
  }
}
export default connect (state => (
  { RoleList: state.TagsData }
))(withRouter(SiderMenu))