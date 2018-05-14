import React, { Component } from 'react'
import { Button, Input, Form, Modal, Radio, Row, Col } from 'antd'
import {connect} from 'react-redux';
import 'particles.js';
import MediaQuery from 'react-responsive';
import {withRouter,Link,Redirect} from 'react-router-dom'
import {login} from '../../services/user'
import Logo from '../../components/Logo/Logo'
import styles from './RegisterPc.less'
import {LoginAction,LoadData} from '../../reducer/login'
import HocForm from '../../components/HocForm/HocForm'
import { register } from '../../services/user';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
export default class RegisterPc extends Component {
    constructor(props){
        super(props)
        this.state = {
            userName:'',
            passWord:'',
            repeatPassWord:{
                value:'',
            },
            type:'genius',
        }
    }
    handleChangeState = (key,value)=>{
        this.setState({
            [key]:value
        })
    }
    validRepeatPwd=(value)=>{
        if(value===this.state.passWord){
            return {
                validateStatus:'success'
            }
        }else{
            return {
                validateStatus:'error'
            }
        }
    }
    handleRepeatPwdChangeState = (value)=>{
        this.setState({
            repeatPassWord:{
                ...this.validRepeatPwd(value),
                value
            }
        })
    }
    handleRegister = () =>{
        const {validateFields} = this.props.form;
        const {repeatPassWord,type} = this.state;
        validateFields((err,values)=>{
            if(!err&&repeatPassWord.validateStatus!=='error'&&repeatPassWord.value){
                console.log({...values,type})
                register({...values,type}).then(res=>{
                    if(res.status === 200){
                        const {data} = res;
                        if(!data.success){
                            Modal.error({title:'注册失败',content:data.message})
                        }else if(data.success){
                            Modal.success({
                                title:'注册成功',
                                content:`欢迎您${values.userName}`,
                                onOk:()=>{
                                    const {_id} = data.doc;
                                    this.props.LoadData({...values,type,_id});
                                    this.props.history.push('/login')
                                }
                            })
                        }
                    }
                })
            }else{
                this.setState({repeatPassWord:{validateStatus:'error'}})
            }
        })
    }
    componentDidMount() {
        window.particlesJS.load('particles', '/particles.json', () => {
          console.log('callback - particles-js config loaded');
        });
    }
    render() {
        const path = this.props.location.pathname
        const {form:{getFieldDecorator},login:{redirectTo,isAuth}} = this.props;
        return (
            <div id="particles" className={styles.particlesClass}>
                {redirectTo&&path!==redirectTo&&isAuth?<Redirect to={redirectTo}/>:null}
                <Row type="flex" align="center" justify="middle" className={styles.loginRow}>
                    <Col className={styles.loginCol} span="7">
                        <Logo/>
                        <FormItem>
                        {getFieldDecorator('userName',{
                            rules:[{
                                required:true,message:'请输入用户名'
                            }]
                        })(
                            <Input
                            placeholder="用户名"/>
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('passWord',{
                            rules:[{
                                required:true,message:'请输入密码'
                            }]
                        })(
                            <Input
                            type="password"
                            placeholder="密码"
                            onChange={e=>this.handleChangeState('passWord',e.target.value)}/>
                        )}
                        </FormItem>
                        <FormItem
                        help
                        hasFeedback
                        validateStatus={this.state.repeatPassWord.validateStatus||''}//自定义校验
                        >
                            <Input
                            type="password"
                            placeholder="重复密码"
                            onChange={e=>this.handleRepeatPwdChangeState(e.target.value)}/>
                        </FormItem>
                        <div>
                            <Row type="flex" align="center">
                                <RadioGroup
                                value={this.state.type}
                                onChange={(e)=>this.handleChangeState('type',e.target.value)}
                                >
                                    <Radio
                                    value="genius"
                                    >
                                    牛人
                                    </Radio>
                                    <Radio 
                                    value="boss"
                                    >BOSS</Radio>
                                </RadioGroup>
                            </Row>
                            <Row type="flex" align="center" className={styles.operator}>
                                <Button type="primary" onClick={this.handleRegister}>注册</Button>
                                <Button type="primary" onClick={()=>this.props.history.push('/login')}>登录</Button>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
