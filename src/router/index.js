import loadable from '@util/loadable'
const Home = loadable(() => import('@pages/home'))
const Index = loadable(() => import('@pages/Index/index.jsx'))
const Collecte = loadable(() => import('@pages/Collect'))
const Detail = loadable(() => import('@pages/detail'))
const NotFound404 = loadable(() => import('@pages/404'))
const Login = loadable(() => import('@pages/login'))

const routes = [
    {
        path: '/Index',
        component: Index
    },
    {
        path: '/home',
        meta: {
            title: 'B2B交易管理',
            roles: ['B2B_Transaction'],
            icon: 'form'
          },
        component: Home
    },
    {
        path: '/TradingPlatform/orderList',
        meta: {
            title: 'B2B交易管理',
            roles: ['B2B_Transaction'],
            icon: 'form'
          },
        component: Collecte
    },
    {
        path: '/Detail',
        component: Detail
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/NotFound',
        component: NotFound404
    }
];
export const MenuList = [
  {
    path: '/Home',
    name: '主页',
    meta: {
        title: '主页',
        icon: 'form'
      }
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
      },
      {
        path: '/NotFound',
        id:('@/views/errorPage/404'),
        name: 'NotFound',
        meta: { title: 'page404', noCache: true }
      }
    ]
  }
]
export default routes
