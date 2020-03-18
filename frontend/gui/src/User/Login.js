import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const LoginForm = () => {
const [form] = Form.useForm();
const handleLogin = values => {
            console.log('Received values of form: ', values);

            axios.get('http://127.0.0.1:8000/user/addUser/?usrId='+'&usrLoginName='+values.username+'&usrPassword='+values.password)
            .then(res => console.log(res)).catch(error => console.error(error));
        };



    return (
        <Form
            {...formItemLayout}
            form={form}
            name="login"
            onFinish={handleLogin}

            initialValues={{
              remember: true
            }}
            scrollToFirstError
        >

          <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Create your Username!',
                },
              ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            {'    '}or{'    '}
            <Link
               style={{marginRight: '10px'}}
               to='/register/'> Register
            </Link>


          </Form.Item>
        </Form>
    );
};

export default LoginForm;
