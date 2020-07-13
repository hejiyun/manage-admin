import React, {Component} from 'react'
import { Menu, Icon} from 'antd';
import { Link, withRouter } from 'react-router-dom'

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
      if ((nextState.openKeys[0] === this.state.openKeys[0]) && nextState.selectedKeys[0] === this.state.selectedKeys[0]) {
        return false
      }
      return true
    } else {
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
  render () {
    const { selectedKeys, openKeys } = this.state
    const MenuList = [
      {
        path: '/Home',
        redirect: '/TradingPlatform/orderList',
        name: '主页',
      },
      {
        path: '/TradingPlatform',
        redirect: '/TradingPlatform/orderList',
        name: 'TradingPlatform',
        meta: {
          title: 'B2B交易管理',
          roles: ['B2B_Transaction'],
          icon: 'form'
        },
        children: [
          {
            path: '/TradingPlatform/orderList',
            id:('@/views/tradingPlatform/orderList/List'),
            name: 'OrderList',
            meta: { title: '订单列表', roles: ['B2B_Sales_List'] }
          },
          {
            path: '/TradingPlatform/returnList',
            id:('@/views/tradingPlatform/returnList/List'),
            name: 'ReturnList',
            meta: { title: '退货单列表', roles: ['B2B_Return_List'] }
          },
          {
            path: '/TradingPlatform/List/ListDetail/:id?',
            id:('@/views/tradingPlatform/ListDetail/Detail'),
            name: 'ListDetail',
            meta: { title: '订单详情', noCache: true },
            hidden: true
          },
          {
            path: '/TradingPlatform/List/ListDetail/EditOrder/:id?',
            id:('@/views/tradingPlatform/ListDetail/EditOrder'),
            name: 'EditOrder',
            meta: { title: '修改订单', noCache: true },
            hidden: true
          },
          {
            path: '/TradingPlatform/returnList/creditDetail/:id?',
            id:('@/views/tradingPlatform/returnList/creditDetail'),
            name: 'CreditDetail',
            meta: { title: '销售退货单详情', noCache: true },
            hidden: true
          }, {
            path: '/TradingPlatform/UserMessage/HistoryDiscount',
            id:('@/views/tradingPlatform/ListDetail/HistoryDiscount'),
            name: 'HistoryDiscount',
            meta: { title: '历史折扣详情', noCache: true },
            hidden: true
          },
          {
            path: '/TradingPlatform/userMessage',
            id:('@/views/tradingPlatform/UserMessage/UserMessage'),
            name: 'UserMessage',
            meta: { title: '客户信息页', noCache: true },
            hidden: true
          }
        ]
      },
      {
        path: '/OMS',
        name: 'OMS',
        // hidden: true,
        meta: {
          title: '线上订单管理', roles: ['Online_Order_Manage'], icon: 'shopping'
        },
        children: [
          {
            path: '/OMS/OrderList',
            id:('@/views/OMS/orderList/orderList'),
            name: 'OmsOrderList',
            meta: { title: '交易单列表', roles: ['Transaction_List'] }
          },
          {
            path: '/OMS/OrderDetail/:No?/:id?',
            id:('@/views/OMS/orderList/orderDetail'),
            name: 'OmsOrderDetail',
            meta: { title: '交易单详情', noCache: true },
            hidden: true
          },
          {
            path: '/OMS/ReceiveList',
            id:('@/views/OMS/receiveList/receiveList'),
            name: 'OmsReceiveList',
            meta: { title: '售后单列表', roles: ['After_Sale_Bill_List'] }
          },
          {
            path: '/OMS/ReceiveDetail/:No?/:id?',
            id:('@/views/OMS/receiveList/receiveDetail'),
            name: 'OmsReceiveDetail',
            meta: { title: '售后单详情', noCache: true },
            hidden: true
          }
        ]
      },
      {
        path: '/ODS',
        redirect: '/ODS/DeliveryList',
        name: 'ODS',
        meta: {
          title: '收发货管理',
          roles: ['Receive_And_Deliver_Manage'],
          icon: 'table'
        },
        children: [
          {
            path: '/ODS/DeliveryList',
            id:('@/views/ODS/DeliveryList/DeliveryList'),
            name: 'DeliveryList',
            meta: { title: '发货单列表', roles: ['Dispatch_Bill_List'] }
          },
          {
            path: '/ODS/ReceiveList',
            id:('@/views/ODS/ReceiveList/ReceiveList'),
            name: 'ReceiveList',
            meta: { title: '收货单列表', roles: ['Receive_Bill_List'] }
          },
          {
            path: '/ODS/DeliveryList/DeliveryDetail/:id?',
            id:('@/views/ODS/DeliveryList/DeliveryDetail'),
            name: 'DeliveryDetail',
            meta: { title: '发货详情', noCache: true },
            hidden: true
          },
          {
            path: '/ODS/ReceiveList/ReceiveDetail/:id?',
            id:('@/views/ODS/ReceiveList/ReceiveDetail'),
            name: 'ReceiveDetail',
            meta: { title: '收货详情', noCache: true },
            hidden: true
          }
        ]
      },
      {
        path: '/statement',
        redirect: '/statement/jit/list',
        name: 'Statement',
        meta: {
          title: '财务管理',
          roles: ['Financial_Manage'],
          icon: 'money'
        },
        children: [
          {
            path: '/statement/list',
            id:('@/views/statement/jit/list'),
            name: 'StatementJit',
            meta: { title: 'statementJit', roles: ['JIT_Financial_Sheet'], icon: 'table' }
          }
        ]
      },
      {
        path: '/goods',
        redirect: '/goods/list',
        name: 'Goods',
        meta: {
          title: '基础档案管理',
          roles: ['Archive_Manage'],
          icon: 'component'
        },
        children: [
          {
            path: '/goods/detail/:id?',
            id:('@/views/goods/detail'),
            name: 'GoodsDetail',
            meta: { title: '货品详情' },
            hidden: true
          },
          {
            path: '/goods/list',
            id:('@/views/goods/list'),
            name: 'GoodsList',
            meta: { title: '商品管理', roles: ['Commodity_Manage'] }
          },
          {
            path: '/warehouseManage/list',
            id:('@/views/warehouseManage/list'),
            name: 'WareHoseList',
            meta: { title: '仓库管理', roles: ['Store_Manage'] },
            hidden: true
          }
        ]
      },
      {
        path: '/stock',
        name: 'Stock',
        meta: {
          title: '供应链管理',
          roles: ['Supply_Chain_Mange'],
          icon: 'eye-open'
        },
        children: [
          {
            path: '/stock/index',
            id:('@/views/stock/index'),
            name: 'StockSearch',
            meta: { title: '库存管理', roles: ['Inventory_Allocation'] },
            children: [
              {
                path: '/stock/index/PhysicalSearch',
                id:('@/views/stock/PhysicalSearch'),
                name: 'PhysicalSearch',
                meta: { title: '实物库存查询', roles: ['Physical_Inventory_Query'] }
              },
              {
                path: '/stock/index/PhysicalAllocation',
                id:('@/views/stock/PhysicalAllocation'),
                name: 'PhysicalAllocation',
                meta: { title: '实物库存管理', roles: ['Physical_Inventory_Allocation'] }
                // hidden: true
              },
              {
                path: '/stock/index/ChannelAllocation',
                id:('@/views/stock/ChannelAllocation'),
                name: 'ChannelAllocation',
                meta: { title: '渠道库存管理', roles: ['Channel_Inventory_Allocation'] }
              },
              {
                path: '/stock/index/ChannelAllocationB2C',
                id:('@/views/stock/ChannelAllocationB2C'),
                name: 'ChannelAllocationB2C',
                meta: { title: '渠道库存管理-B2C', roles: ['Channel_Inventory_Allocation_B2C'] }
              },
              {
                path: '/stock/index/ChannelAllocationBBC',
                id:('@/views/stock/ChannelAllocationBBC'),
                name: 'ChannelAllocationBBC',
                meta: { title: '渠道库存管理-BBC', roles: ['Channel_Inventory_Allocation_BBC'] }
              },
              {
                path: '/stock/index/ChannelAllocationJIT',
                id:('@/views/stock/ChannelAllocationJIT'),
                name: 'ChannelAllocationJIT',
                meta: { title: '渠道库存管理-JIT', roles: ['Channel_Inventory_Allocation_JIT'] }
              }
            ]
          },
          {
            path: '/stock/transfer',
            id:('@/views/scm/index'),
            name: '调拨管理',
            // hidden: true,
            meta: {
              title: '调拨管理', roles: ['Allocate_Mange']
            },
            children: [
              {
                path: '/stock/transfer/list',
                id:('@/views/scm/list'),
                name: 'ScmList',
                meta: { title: '调拨申请单列表', roles: ['Apply_Allocate_Bill_List'] }
                // hidden: true
              },
              {
                path: '/stock/transfer/detail/:id?',
                id:('@/views/scm/detail'),
                name: 'ScmDetail',
                meta: { title: '调拨申请单-明细信息', noCache: true },
                hidden: true
              }
            ]
          },
          // 采购管理系统
          {
            path: '/stock/Purchase',
            name: '采购单据管理',
            meta: { title: '采购单据管理', roles: ['PurchaseManage'] },
            children: [
              {
                path: '/stock/Purchase/PurchaseList',
                name: 'PurchaseList',
                meta: { title: '采购单据列表' },
                hidden: true
              },
              {
                path: '/stock/Purchase/AddPurchase',
                name: 'AddPurchase',
                meta: { title: '新增采购单' }
                // hidden: true
              },
              {
                path: '/stock/Purchase/PurchaseDetail',
                name: 'PurchaseDetail',
                meta: { title: '采购单据明细' },
                hidden: true
              },
              {
                path: '/stock/purchase/download',
                name: 'DownloadPurchase',
                meta: { title: '采购单据明细下载' },
                hidden: true
              }
            ]
          }
        ]
      },
      {
        path: '/listNew',
        name: 'listNew',
        hidden: true,
        meta: {
          title: '订单管理', icon: 'table'
        },
        children: [
        ]
      },
      {
        path: '/sysmLog',
        name: 'sysmLog',
        hidden: true,
        meta: {
          title: '系统日志', icon: 'excel', roles: ['sysmLog']
        },
        children: [
          {
            path: '/sysmLog/log',
            id:('@/views/sysmLog/index'),
            name: 'SysmLogQuery',
            meta: { title: '日志管理' }
            // hidden: true
          }
        ]
      },
      {
        path: '/permission',
        redirect: '/permission/index',
        alwaysShow: true, // will always show the root menu
        hidden: true,
        meta: {
          title: 'permission',
          icon: 'lock',
          roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
          {
            path: 'page',
            id:('@/views/permission/page'),
            name: 'PagePermission',
            meta: {
              title: 'pagePermission',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          },
          {
            path: 'directive',
            id:('@/views/permission/directive'),
            name: 'DirectivePermission',
            meta: {
              title: 'directivePermission'
              // if do not set roles, means: this page does not require permission
            }
          }
        ]
      },
    
      /** When your routing table is too long, you can split it into small modules**/
      //  无完全遮罩
      {
        path: '/error',
        redirect: 'noredirect',
        name: 'ErrorPages',
        meta: {
          title: 'errorPages',
          icon: '404'
        },
        hidden: true,
        children: [
          {
            path: '401',
            id:('@/views/errorPage/401'),
            name: 'Page401',
            meta: { title: 'page401', noCache: true }
          },
          {
            path: '404',
            id:('@/views/errorPage/404'),
            name: 'Page404',
            meta: { title: 'page404', noCache: true }
          }
        ]
      }
    ]
    // 目前只考虑三级层次菜单, 如果有很多级, 那么内部逻辑使用递归即可
    return (
      <Menu style={{ width: '100%'}}  theme="dark" mode="inline"   onOpenChange={this.onOpenChange} openKeys={openKeys} selectedKeys={selectedKeys} defaultSelectedKeys={selectedKeys} onClick={this.handleClick}> 
      {
     
        MenuList.map((item, index) => {
          if (!item.hidden) {
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
                  if (!e.hidden) {
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
                            if (!Tchildren.hidden) {
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
export default withRouter(SiderMenu)