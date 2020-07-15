import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {loginIn, getMenu} from '@axios/Test'
import { setToken } from '@util/auth'
import { connect } from 'react-redux';
import { setAToken, setRToken, setUserName, setUserCode } from '@store/loginMsg/actions'
import { setRoleList } from '@store/tagsView/actions'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  


// 这里几个页面级组件的结构都一样,改类名就行
class login extends Component {
    formRef = React.createRef();

    onReset = () => {  
      console.log(this.props)
        this.formRef.current.resetFields();
    };

    onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    onFinish = async (values) => {
      const params = values
      params['systemId'] = 10
      try {
        const res = await loginIn(values)
        const Token = res.data.data.accessToken
        const RToken = res.data.data.refreshToken
        const userName = res.data.data.userName
        const userCode = res.data.data.userCode
        setToken(Token)
        this.props.setAToken(Token)
        this.props.setRToken(RToken)
        this.props.setUserName(userName)
        this.props.setUserCode(userCode)
        const resList = await getMenu()
        const curMenuList = resList.data.data
        const arr = []
        curMenuList.forEach(item => {
          if (item.type === 'MENU') {
            arr.push(item.resourceCode)
          }
          if (item.childNodes) {
            this.getTarget(item, arr)
          }
        })
        this.props.setRoleList(arr)
        this.props.history.push('/Home')
      } catch(e) {
        console.log('登录失e败', e)
      } 
  };
  // 递归获取所有resourceCode
  getTarget(item, arr) {
    // 如果内部还有children,那么反复递归当前函数, arr为存储所有符合条件值的数组
    if (item.childNodes) {
      item.childNodes.forEach(e => {
        if (e.type === 'MENU') {
          arr.push(e.resourceCode)
        }
        if (e.childNodes) {
          this.getTarget(e, arr)
        }
      })
    }
  }
    render () {
      console.log(this.props)
        return (
            <div style={{width: '300px', margin: '200px auto'}}>
            <Form
             ref={this.formRef}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="用户名"
              name="userCode"
              rules={[{ required: true, message: 'Please input your userCode!' }]}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
      
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
      
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Button htmlType="button" onClick={this.onReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
          </div>
        )
    }
}

export default connect (state => (
  { loginInsert: state.LoginInsert, TagsData: state.TagsData }
), {
  setAToken, setRToken, setUserName, setUserCode, setRoleList
})(login)

