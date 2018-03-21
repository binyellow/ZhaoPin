import React, { Component } from 'react'
import globalStyles from '../../common/globalStyles.less'
import {Form,Input,Button,Modal} from 'antd'
import {connect} from 'react-redux'
import {withRouter,Link,Redirect} from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import {editPassWord} from '../../services/user'
import {LoadData} from '../../reducer/login';
const FormItem = Form.Item;
const FormItemLayout = {
    labelCol:{span:4},
    wrapperCol:{span:20}
}
@Form.create()
@withRouter
@connect(
    state=>({login:state.login}),
    {LoadData}
)
export default class GeniusInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            userName:'',
            passWord:'',
            newPassWord:'',
            repeatNewPassWord:{
                value:'',
            },
        }
    }
    handleChangeState = (key,value)=>{
        this.setState({
            [key]:value
        })
    }
    validRepeatPwd=(value)=>{
        if(value===this.state.newPassWord){
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
            repeatNewPassWord:{
                ...this.validRepeatPwd(value),
                value
            }
        })
    }
    handleEditPassWord = () =>{
        const {form:{validateFields},login:{type}} = this.props;
        const fieldNames = ['userName','passWord','newPassWord','repeatNewPassWord'];
        validateFields(fieldNames,(err,values)=>{
            if(!err){
                editPassWord({...values,type}).then(res=>{
                    if(res.status===200){
                        if(res.data.code===1){
                            Modal.error({title:'修改失败',content:res.data.message})
                        }else{
                            Modal.success({title:'修改成功',content:'请记住您的新密码',onOk:()=>{
                                this.props.history.push('/login')
                            }})
                        }
                    }
                })
            }
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        // const {isAuth,type} = this.props.login;
        return (
            <div className={globalStyles.wrapper}>
                {this.props.login.isAuth||this.props.login.type?null:<Redirect to="/login"/>}
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
                label="原始密码"
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
                <FormItem
                label="新密码"
                help
                {...FormItemLayout}
                >
                {getFieldDecorator('newPassWord',{
                    rules:[{required:true}]
                })(
                    <Input
                        type="password"
                        onChange={e=>this.handleChangeState('newPassWord',e.target.value)}/>
                )}
                </FormItem>
                <FormItem
                label="重复新密码"
                help
                hasFeedback
                validateStatus={this.state.repeatNewPassWord.validateStatus||''}
                {...FormItemLayout}
                >
                {getFieldDecorator('repeatNewPassWord',{})(
                    <Input
                        type="password"
                        onChange={e=>this.handleRepeatPwdChangeState(e.target.value)}/>
                )}
                </FormItem>
                <div className={globalStyles.operator}>
                    <div style={{marginTop:'10px'}}>
                        <Button 
                        type="primary" 
                        onClick={this.handleEditPassWord}
                        style={{ transform: 'translateX(50px)'}}>
                        修改密码</Button>
                        <Button 
                            style={{position:'relative',left:'180px'}}
                            onClick={()=>{
                                this.props.LoadData({});
                                this.props.history.push('/login')
                            }}
                        >注销</Button>
                        <Link to="/register" style={{position:'relative',left:'200px'}}>注册</Link>
                    </div>
                </div>
            </div>
        )
    }
}
