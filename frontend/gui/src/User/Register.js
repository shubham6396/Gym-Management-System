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
  AutoComplete,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux";

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

class RegistrationForm extends React.Component {

onFinish = values => {
    this.props.onSignup(values);
    this.props.history.push('/');
}

    render() {
        return (
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
                    label="First Name"

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
                    label="Last Name"

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
                    label="Student ID"

                    rules={[
                        {
                            required: true,
                            message: 'Please Enter your Student ID!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>


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

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
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
                    label="E-mail"
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
                    label="Phone Number"
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
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>

                    <Link

                        to='/'> Login
                    </Link>
                    {'    '}or{'    '}
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

            </Form>


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

