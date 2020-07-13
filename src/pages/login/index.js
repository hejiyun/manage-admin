import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {loginIn} from '@axios/Test'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

    const onFinish = async (values) => {
        const params = values
        params['systemId'] = 10
       const res = await loginIn(values)
       const token = res.data.data.accessToken
       const Rtoken = res.data.data.refreshToken
       const name = res.data.data.userName
       console.log(token, Rtoken, name)
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };


// 这里几个页面级组件的结构都一样,改类名就行
class login extends Component {
    formRef = React.createRef();

    onReset = () => {  
        this.formRef.current.resetFields();
    };
    render () {
        return (
            <div style={{width: '300px', margin: '200px auto'}}>
            <Form
             ref={this.formRef}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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

export default login
