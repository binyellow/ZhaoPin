import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {LoginAction} from '../reducer/login'
@connect(state=>({auth:state.login}),{LoginAction})
export default class Login extends Component{
    render(){
        const {auth,LoginAction} = this.props;
        // console.log(auth.isAuth)
        const loginPage = (
            <div>
                <button onClick={LoginAction}>登录</button>
            </div>
        )
        return (
            auth.isAuth?<Redirect to="/dashboard"></Redirect>:loginPage
        )
    }
}

