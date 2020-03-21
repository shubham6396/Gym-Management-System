import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import * as actions from './store/Actions/AuthorizeUser'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;



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


class LoginForm extends React.Component{


   onFinish = (values) => {

      const username = values.username;
      const password = values.password;

      this.props.onAuth(username, password);
      this.props.history.push('/');

   }


  render() {


    return (
        <div>
          {

            <Form

                {...formItemLayout}

                name="login"

                onFinish={this.onFinish}

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
          }
        </div>
    );
  }
};



const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch  => {
  return {
    onAuth: (username, password) => dispatch(actions.authorize(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
