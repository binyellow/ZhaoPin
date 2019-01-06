import React, { Component } from 'react'
import { Button, Input, Form, Modal, Row, Col } from 'antd'
import {connect} from 'react-redux';
import {withRouter,Link,Redirect} from 'react-router-dom'
import {login} from '../../services/user'
import Logo from '../../components/Logo/Logo'
import styles from './LoginMobile.less'
import {LoginAction,LoadData} from '../../reducer/login'
import HocForm from '../../components/HocForm/HocForm'

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
@HocForm
export default class LoginMobile extends Component {
  handleLogin = () =>{
    const {validateFields} = this.props.form;
    validateFields((err,values)=>{  // 校验用户名或密码是否为空
      if(!err){
        login(values).then(res=>{   // 调用登录接口
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
  // 渲染页面
  render() {
    const {form:{getFieldDecorator},login:{redirectTo}} = this.props;
    // const {isAuth,type} = this.props.login;
    return (
      <Form className={styles.wrapper}>
        {(redirectTo&&redirectTo!=='/login')?<Redirect to={redirectTo}/>:null}
        <Logo/>
        <FormItem
        >
        {getFieldDecorator('userName',{
          rules:[{required:true,message:'请输入账号'}]
        })(
          <Input
            placeholder="账号"
            onChange={e=>this.props.handleChangeState('userName',e.target.value)}
          />
        )}
        </FormItem>
        <FormItem
        >
        {getFieldDecorator('passWord',{
            rules:[{required:true,message:'请输入密码'}]
        })(
          <Input
            type="password"
            placeholder="密码"
            onChange={e=>this.props.handleChangeState('passWord',e.target.value)}
          />
        )}
        </FormItem>
        <div>
          <Row type="flex" justify="center" className={styles.operator}>
            <Col style={{marginBottom:'5px'}}>
                <FormItem>
                <Button 
                type="primary"
                htmlType="submit"
                onClick={this.handleLogin}>
                登录</Button>
                </FormItem>
            </Col>
            <Col>
                <Link to="/register">注册</Link>
            </Col>
          </Row>
        </div>
      </Form>
    )
  }
}
