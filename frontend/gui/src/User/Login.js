import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
    Tabs,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import * as actions from './store/Actions/AuthorizeUser'
import { Spin, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import './Tabs.css'


const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}


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

const styles = {
    marginRight: '25%'

};

const h_styles = {
    marginLeft: '35%',

    color: 'black'
};


class LoginForm extends React.Component{

   onFinish = (values) => {

      const username = values.username;
      const password = values.password;

      this.props.onAuth(username, password);
      this.props.history.push('/');

   };


    staffLogin = (values) => {

      const username = values.staff_username;
      const password = values.staff_password;

      this.props.onStaffAuth(username, password);
      this.props.history.push('/');

   };

  render() {


    return (

            <div>
                 <h1 style = {h_styles}><b>Welcome to our Gym System</b></h1>
                 <h2 style = {h_styles}><b>Lead a healthy life with us ! !</b></h2>
                 <Divider/>

            <div className="card-container" style={{marginTop: "30px"}}>
            <Tabs defaultActiveKey="1" onChange={callback} type="card" >
                <TabPane tab="Student" key="1">
                    <Form  style = {styles}

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
                          label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Username</h4>}
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
                          label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Password</h4>}
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
                            style={{marginRight: '10px', color: "white"}}
                            to='/register/'> Register
                        </Link>


                      </Form.Item>
                    </Form>

                    </TabPane>
                <TabPane tab="Staff" key="2">

                    <Form  style = {styles}

                        {...formItemLayout}

                        name="staffLogin"

                        onFinish={this.staffLogin}

                        initialValues={{
                          remember: true
                        }}
                        scrollToFirstError
                    >

                      <Form.Item
                          name="staff_username"
                          label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Username</h4>}
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
                          name="staff_password"
                          label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Password</h4>}
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

                      </Form.Item>
                    </Form>
                </TabPane>

                </Tabs>
            </div>
            </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
};

const mapDispatchToProps = dispatch  => {
  return {
    onAuth: (username, password) => dispatch(actions.authorize(username, password)),
    onStaffAuth: (username, password) => dispatch(actions.staffAuthorize(username, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
