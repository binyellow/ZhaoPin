import React, { Component } from 'react'
import { Button, Input, Form, Modal } from 'antd'
import {connect} from 'react-redux';
import {withRouter,Link,Redirect} from 'react-router-dom'
import {login} from '../../services/user'
import Logo from '../../components/Logo/Logo'
import styles from './Login.less'
import {LoginAction,LoadData} from '../../reducer/login'
import axios from 'axios'
const FormItem = Form.Item;
const FormItemLayout = {
    labelCol:{span:4},
    wrapperCol:{span:20}
}
@Form.create()
@withRouter
@connect(
    state=>({login:state.login}),
    {LoginAction,LoadData}
)
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            userName:'',
            passWord:'',
        }
    }
    handleChangeState = (key,value)=>{
        this.setState({[key]:value})
    }
    handleLogin = () =>{
        const {validateFields} = this.props.form;
        validateFields((err,values)=>{
            if(!err){
                login(values).then(res=>{
                    if(res.status===200){
                        if(res.data.code===1){
                            Modal.error({title:'登录失败',content:res.data.message})
                        }else if(res.data.code===0){
                            Modal.success({
                                title:'登录成功',
                                content:`欢迎您${values.userName}`,
                                onOk:()=>{
                                    this.props.LoginAction();
                                    // axios.get('/user/info')
                                    // .then(res=>{
                                    //     if (res.status===200) {
                                    //         if (res.data.code===0) {
                                    //             this.props.LoadData(res.data.data)
                                    //             // const {type} = this.props.login;
                                    //             // this.props.history.push(`/${type}-info`)
                                    //         }else{
                                    //             this.props.history.push('/register')
                                    //         }
                                    //     }
                                    // })
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    render() {
        const {form:{getFieldDecorator},login:{redirectTo,isAuth}} = this.props;
        // const {isAuth,type} = this.props.login;
        return (
            <div className={styles.wrapper}>
                {redirectTo?<Redirect to={redirectTo}/>:null}
                <Logo/>
                <FormItem
                label="账号"
                help
                {...FormItemLayout}
                >
                {getFieldDecorator('userName',{
                    rules:[{required:true}]
                })(
                    <Input
                    onChange={e=>this.handleChangeState('userName',e.target.value)}/>
                )}
                </FormItem>
                <FormItem
                label="密码"
                help
                {...FormItemLayout}
                >
                {getFieldDecorator('passWord',{
                    rules:[{required:true}]
                })(
                    <Input
                        type="password"
                        onChange={e=>this.handleChangeState('passWord',e.target.value)}/>
                )}
                </FormItem>
                <div className={styles.operator}>
                    <div style={{marginTop:'10px'}}>
                        <Button 
                        type="primary" 
                        onClick={this.handleLogin}
                        style={{ transform: 'translateX(50px)'}}>
                        登录</Button>
                        <Link to="/register" style={{position:'relative',left:'200px'}}>还没有账号？注册</Link>
                    </div>
                </div>
            </div>
        )
    }
}