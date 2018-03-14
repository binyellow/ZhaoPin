import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import App from '../App'
import {LogoutAction} from '../reducer/login'
@connect(state=>({auth:state.login}),{LogoutAction})
export default class DashBoard extends Component{
    render(){
        const {auth,LogoutAction} = this.props;
        const dashBoard = (
            <div>
                <button onClick={LogoutAction}>注销</button>
                <ul>
                    <li><Link to="/test/location">测试</Link></li>
                </ul>
                <App/>
            </div>
        )
        const redirectPage = <Redirect to="/login"></Redirect>
        return (
            auth.isAuth?dashBoard:redirectPage
        )
    }
}

