import React from "react";
import {Layout, Menu, Breadcrumb, Divider} from 'antd';
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from "./store/Actions/AuthorizeUser";
const { Header, Content, Footer } = Layout;



class MainLayout extends React.Component {

    state ={
        current: '1'
    };


    render() {
        return (

                    <Layout className="layout">
                        <Header>
                            <div className="logo"/>
                            <Menu
                                className="main-menu"
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={window.location.pathname=="/profile/"?['main-menu-2']:['main-menu-1']}
                                style={{lineHeight: '64px'}}

                            >
                                {
                                    this.props.isAuthenticated ?
                                        <Menu.Item key="main-menu-1"><Link to='/dashboard/'>Dashboard</Link></Menu.Item>
                                        :
                                        <Menu.Item key="main-menu-1"><Link to='/'>Login</Link></Menu.Item>
                                }
                                {

                                    this.props.isAuthenticated ?
                                        <Menu.Item key="main-menu-2"><Link to='/profile/'>Profile</Link></Menu.Item>
                                        :
                                        <span/>

                                }
                                {

                                    this.props.isAuthenticated ?
                                        <Menu.Item key="main-menu-3" onClick={this.props.logout}>Logout</Menu.Item>
                                        :
                                        <span/>

                                }

                            </Menu>


                        </Header>


                        <Content style={{padding: '0 50px', margin: '20px'}}>

                            <div className="site-layout-content">{this.props.children}</div>
                        </Content>

                        <Footer style={{textAlign: 'center'}}>SSDI Project Team 6</Footer>
                    </Layout>


        )

    }
}

const mapDispatchToProps = dispatch  => {
  return {
    logout: () => dispatch(actions.logout())
  }
};

export default withRouter(connect(null, mapDispatchToProps)(MainLayout));
