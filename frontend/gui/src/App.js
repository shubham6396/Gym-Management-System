import React, {Component} from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import MainLayout from "./User/Layout";
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from "./routes";
import * as actions from './User/store/Actions/AuthorizeUser'


class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoLogin();
    }

    render() {
        return (
            <div>
                <Router>
                    <MainLayout {...this.props}>
                        <BaseRouter {...this.props}/>
                    </MainLayout>
                </Router>

            </div>
        );
    }
}


const mapStateToProps = state => {
    return({
            isAuthenticated: state.token !== null
        }
    )
}

const mapDispatchToProps = dispatch => {
    return({
            onTryAutoLogin: () => dispatch(actions.authCheckState())
        }
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
