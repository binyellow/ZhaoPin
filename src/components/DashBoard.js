import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect,Route} from 'react-router-dom';
import Test from '../Test';
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
                    <li><Link to="/dashboard/">主页面</Link></li>
                    <li><Link to="/test/location">测试</Link></li>
                </ul> 
                <Route path="/test/:location" component={Test}/> 
                <Route path="/dashboard/" component={App}/>
            </div>
        )
        const redirectPage = <Redirect to="/login"></Redirect>
        return (
            auth.isAuth?dashBoard:redirectPage
        )
    }
}

