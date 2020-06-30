import React, { Component } from 'react';
// NavLinK作为跳转路由标签,如常用的侧边栏跳转高亮效果就可以使用这个标签
import { NavLink } from 'react-router-dom';

// 声明跳转路由时,当前跳转对象的背景色及颜色,以作高亮区分
const selectedStyle = {
    backgroundColor: 'red',
    color: 'slategray'
}

class Header extends Component {
    render () {
        return (
            <nav>
                <NavLink to = '/home' activeStyle = { selectedStyle }> 首页 </NavLink>
                <NavLink to = '/Detail' activeStyle = { selectedStyle }> 详情 </NavLink>
                <NavLink to = '/Login' activeStyle = { selectedStyle }> 登录 </NavLink>
                <NavLink to = '/Collecte' activeStyle = { selectedStyle }> 收集 </NavLink>
            </nav>
        )
    }

}

// 最后要将Header暴露出来
export default Header
