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

                    <Layout className="layout" style={{backgroundColor: "white"}}>
                        <Header>
                            <div className="logo"/>
                            <Menu
                                className="main-menu"
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={window.location.pathname=="/profile/"?['main-menu-2']:(window.location.pathname=="/about/"?['main-menu-4']:['main-menu-1'])}
                                style={{lineHeight: '64px'}}

                            >
                                {
                                    this.props.isAuthenticated ?
                                        <Menu.Item key="main-menu-1"><Link to='/'>Dashboard</Link></Menu.Item>
                                        :
                                        (
                                            this.props.isStaffAuthenticated ?
                                            <Menu.Item key="main-menu-1"><Link to='/'>Tracking</Link></Menu.Item>
                                            :
                                            <Menu.Item key="main-menu-1"><Link to='/'>Login</Link></Menu.Item>
                                        )

                                }

                                {

                                    this.props.isAuthenticated ?
                                        <Menu.Item key="main-menu-2"><Link to='/profile/'>Profile</Link></Menu.Item>
                                        :
                                        <span/>

                                }
                                <Menu.Item key="main-menu-4" ><Link to='/about/'>About</Link></Menu.Item>

                                <Menu.Item key="main-menu-5" ><Link to='/contact/'>Contact</Link></Menu.Item>
                                {

                                    this.props.isAuthenticated || this.props.isStaffAuthenticated ?
                                        <Menu.Item key="main-menu-3" onClick={this.props.logout}>Logout</Menu.Item>
                                        :
                                        <span/>

                                }




                            </Menu>


                        </Header>


                        <Content style={{padding: '0 50px', margin: '20px'}}>

                            <div className="site-layout-content">{this.props.children}</div>
                        </Content>

                        <Footer style={{backgroundColor: "white", textAlign: 'center', bottom: "0", width: "100%", marginTop: "100px"}}><h4><b>SSDI Project Team 6</b></h4></Footer>
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
