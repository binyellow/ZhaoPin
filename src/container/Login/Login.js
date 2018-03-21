import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Button, Input, Form, Modal } from 'antd'
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom'
import {login} from '../../services/register'
import Logo from '../../components/Logo/Logo'
import styles from './Login.less'
import {LoginAction} from '../../reducer/login'
const FormItem = Form.Item;
const FormItemLayout = {
    labelCol:{span:4},
    wrapperCol:{span:20}
}
@Form.create()
@withRouter
@connect(
    state=>({login:state.login}),
    {LoginAction}
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
        const {getFieldsValue} = this.props.form;
        const values = getFieldsValue()
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
                        }
                    })
                }
            }
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {isAuth,type} = this.props.login;
        console.log(isAuth)
        return (
            <div className={styles.wrapper}>
                {isAuth?<Redirect to={`/${type}-info`}/>:null}
                <Logo/>
                <FormItem
                label="账号"
                help
                {...FormItemLayout}
                >
                {getFieldDecorator('userName',{

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
                {getFieldDecorator('passWord',{})(
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
