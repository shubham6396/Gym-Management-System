import React, { useState } from 'react';

import * as actions from './store/Actions/AuthorizeUser'

import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete, Divider,
    Tabs
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux";


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


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



const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select
                    style={{
                        width: 70,
                    }}
                >
                    <Option value="1">+1</Option>

                </Select>
            </Form.Item>
        );


const styles = {
    marginRight: '25%'
}

const h_styles = {
    marginLeft: '35%',
    color: "black"
}

class RegistrationForm extends React.Component {

onFinish = values => {
    this.props.onSignup(values);
    this.props.history.push('/');
}

    render() {
        return (
            <div>

            <div className="card-container" style={{marginTop: "30px"}}>
            <Tabs defaultActiveKey="1" onChange={callback} type="card" >
                <TabPane tab="Student" key="1">
                    <Form style = {styles}
                        {...formItemLayout}
                        name="register"
                        onFinish={this.onFinish}

                        initialValues={{
                            prefix: '1',
                        }}
                        scrollToFirstError
                    >

                        <Form.Item
                            name="first"
                            label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >First Name</h4>}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="last"
                            label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Last Name</h4>}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last Name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="id"
                            label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Student ID</h4>}

                            rules={[
                                {
                                    type: 'number',
                                    required: true,
                                    message: 'Student ID must be a Number',
                                    transform: (value)=>{
                                        return Number(value)?Number(value):null;
                                    }
                                }

                            ]}
                        >
                            <Input/>
                        </Form.Item>


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

                        <Form.Item
                            name="confirm"
                            label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Confirm Password</h4>}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Email</h4>}
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            name="phone"
                            label={<h4 style={{color: "white", fontSize: "15px", marginTop: "5px"}} >Phone Number</h4>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>

                        <Form.Item name="agreement" valuePropName="checked" {...tailFormItemLayout}>
                            <Checkbox>
                                I have read the <a href="" style={{color: "white"}}>agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>

                            <Link
                                style={{color: "white"}}
                                to='/'> Login
                            </Link>
                            {'    '}or{'    '}
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>

                    </Form>
                </TabPane>
            </Tabs>
            </div>
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
        onSignup: (values) => dispatch(actions.register(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

