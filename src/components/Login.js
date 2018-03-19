import React, { Component } from 'react'
import {connect} from 'react-redux'
import lodash from 'lodash'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {LoginAction,AddUserAction} from '../reducer/login'
import Logo from './Logo/Logo'

@connect(
state=>({auth:state.login}),
// dispatch=>({
//     login:()=>dispatch(LoginAction()),
//     add:(payload)=>dispatch(AddUserAction(payload))
// })
{LoginAction,AddUserAction}
)
export default class Login extends Component{
    componentDidMount(){
        axios.get('/data').then(res=>{
            if(res.status===200){
                // this.props.add(res.data)
                this.props.AddUserAction(res.data)
            }
        })
    }
    render(){
        const {auth,LoginAction} = this.props;
        console.log(auth)
        const loginPage = (
            <div>
                <Logo/>
                {(lodash.isArray(auth)?auth:[]).map((item,index)=>{
                    return <div key={index}>
                        {item.user}:{item.age}
                    </div>
                })}
                <button onClick={LoginAction}>登录</button>
            </div>
        )
        return (
            auth.isAuth?<Redirect to="/dashboard"></Redirect>:loginPage
        )
    }
}

