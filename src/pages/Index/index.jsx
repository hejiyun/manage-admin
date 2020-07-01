import React, { Component } from 'react';
import ContentMain from '@router/contentMain'
import { Layout, Menu,Popover } from 'antd';
import { Link } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons';
import './Index.less'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

// 这里几个页面级组件的结构都一样,改类名就行
class Index extends Component {
    state = {
        collapsed: false,
        isShow: false,
        isHide: false
      };
    
      toggle = () => {
        this.setState({
          isShow: !this.state.isShow,
          collapsed: !this.state.collapsed
        });
      };
      showTop = () => {
      }
      handleVisibleChange = () => {
        this.setState({
          visible: !this.state.visible
        });
      }
      render() {
        const content = (
          <div>
            <p>
            <Link to = '/home' onClick={this.handleVisibleChange}>
              <span>首页</span>
            </Link>
            </p>
           <p>
           <Link to = '/login' onClick={this.handleVisibleChange}>
              <span>退出登录</span>
            </Link>
           </p>
          </div>
        );
        return (
          <Layout className="layout-box-class">
            <Sider breakpoint="lg"
              collapsedWidth="0"
              width={180}
              onBreakpoint={broken => {
                this.setState({
                  isHide: broken
                });
              }}
              zeroWidthTriggerStyle={{ top:'42px', opacity:0.4, }}
              collapsed={this.state.collapsed} onCollapse={this.toggle}
             >
              <div className="logo">宝唯管理平台</div>
              <Menu style={{ width: '100%'}}  theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to = '/Detail' onClick={this.state.isHide ? this.toggle : ''}>
                          <span>跳转</span>
                        </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to = '/Collecte'  onClick={this.state.isHide ? this.toggle : ''}>
                          <span>跳转</span>
                        </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to = '/home'  onClick={this.state.isHide ? this.toggle : ''}>
                          <span>跳转</span>
                        </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: '0 68px 0 0 ', height: '42px', lineHeight: '42px', position: 'relative', borderBottom: '1px solid #ccc' }}>
                {this.state.isShow ? <div className="logo1">宝唯管理平台</div> : ''}
                左边是tags,  右边是用户登录
                <Popover visible={this.state.visible} placement="bottom" onVisibleChange={this.handleVisibleChange} content={content} trigger="click">
                <div className="header-right" onClick={this.showTop}>
                张岩<DownOutlined />
                </div>
                </Popover> 
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '12px 8px',
                  padding: 12,
                  minHeight: 280,
                }}
              >
                  <ContentMain/>
              </Content>
            </Layout>
          </Layout>
        );
      }
}

export default Index