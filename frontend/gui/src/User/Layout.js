import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link} from "react-router-dom";

const { Header, Content, Footer } = Layout;

const MainLayout = (props) => {
    return(
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1"><Link to='/login/'>Login</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/dashboard/'>Dashboard</Link></Menu.Item>
                <Menu.Item key="3">Settings</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
          </Layout>
        )
}

export default MainLayout;