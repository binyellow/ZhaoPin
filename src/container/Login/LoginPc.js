import React, { Component } from 'react'
import { Button, Input, Form, Modal, Row, Col, Icon } from 'antd'
import {connect} from 'react-redux';
import 'particles.js';
import MediaQuery from 'react-responsive';
import {withRouter,Link,Redirect} from 'react-router-dom'
import {login} from '../../services/user'
import Logo from '../../components/Logo/Logo'
import styles from './LoginPc.less'
import {LoginAction,LoadData} from '../../reducer/login'
import HocForm from '../../components/HocForm/HocForm'

const FormItem = Form.Item;
// const FormItemLayout = {
//     labelCol:{span:4},
//     wrapperCol:{span:20}
// }
@Form.create()
@withRouter
@connect(
    state=>({login:state.login}),
    {LoginAction,LoadData}
)
@HocForm    // 封装的高阶组件 并赋handleChangeState公共方法
export default class LoginPc extends Component {
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
                                    this.props.LoadData(res.data.data);
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    componentDidMount() {
        window.particlesJS.load('particles', '/particles.json', () => {
          console.log('callback - particles-js config loaded');
        });
    }
    render() {
        const {form:{getFieldDecorator},login:{redirectTo}} = this.props;
        // const {isAuth,type} = this.props.login;
        return (
            <div id="particles" className={styles.particlesClass}>
                <Row type="flex" align="center" justify="middle" className={styles.loginRow}>
                <Col className={styles.loginCol} span="7">
                    {(redirectTo&&redirectTo!=='/login')?<Redirect to={redirectTo}/>:null}
                    <Logo/>
                    <FormItem>
                    {getFieldDecorator('userName',{
                        rules:[{required:true,message:'请输入账号'}],
                    })(
                        <Input
                        prefix={<Icon type="user"/>}
                        placeholder="账号"
                        onChange={e=>this.props.handleChangeState('userName',e.target.value)}/>
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('passWord',{
                        rules:[{required:true,message:'请输入密码'}]
                    })(
                        <Input
                            type="password"
                            prefix={<Icon type="lock"/>}
                            placeholder="密码"
                            onChange={e=>this.props.handleChangeState('passWord',e.target.value)}/>
                    )}
                    </FormItem>
                    <div>
                        <Row type="flex" justify="center" className={styles.operator}>
                            <Col>
                                <Button 
                                type="primary" 
                                onClick={this.handleLogin}>
                                登录</Button>
                            </Col>
                            <Col>
                                <Link to="/register">注册</Link>
                            </Col>
                        </Row>
                    </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
