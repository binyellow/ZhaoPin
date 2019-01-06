import React, { Component } from 'react'
import styles from './RegisterMobile.less'
import {withRouter,Redirect,Link} from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import { Button, Input, Radio, Form, Modal,Row,Col } from 'antd'
import {connect} from 'react-redux';
import {LoadData} from '../../reducer/login'
import { register } from '../../services/user';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formLayout = {
    labelCol:{span:6},
    wrapperCol:{span:10}
}
@withRouter
@Form.create()
@connect(
  state => ({
    login: state.login
  }), {
    LoadData
  }
)
export default class RegisterMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      passWord: '',
      repeatPassWord: {
        value: '',
      },
      type: 'genius',
    }
  }
  // 管理页面的state：账号、密码等
  handleChangeState = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  // 校验重复密码是否正确
  validRepeatPwd = (value) => {
    if (value === this.state.passWord) {
      return {
        validateStatus: 'success'
      }
    } else {
      return {
        validateStatus: 'error'
      }
    }
  }
  // 重复密码改变触发函数改变state
  handleRepeatPwdChangeState = (value) => {
    this.setState({
      repeatPassWord: {
        ...this.validRepeatPwd(value),
        value
      }
    })
  }
  // 注册函数
  handleRegister = () => {
    const {
      validateFields
    } = this.props.form;
    const {
      repeatPassWord,
      type
    } = this.state;
    validateFields((err, values) => {
      if (!err && repeatPassWord.validateStatus !== 'error' && repeatPassWord.value) {
        console.log({ ...values,
          type
        })
        register({ ...values,
          type
        }).then(res => {
          if (res.status === 200) {
            const {
              data
            } = res;
            if (!data.success) {
              Modal.error({
                title: '注册失败',
                content: data.message
              })
            } else if (data.success) {
              Modal.success({
                title: '注册成功',
                content: `欢迎您${values.userName}`,
                onOk: () => {
                  const {
                    _id
                  } = data.doc;
                  this.props.LoadData({ ...values,
                    type,
                    _id
                  });
                  this.props.history.push('/login')
                }
              })
            }
          }
        })
      } else {
        this.setState({
          repeatPassWord: {
            validateStatus: 'error'
          }
        })
      }
    })
  }
  render() {
    {/*渲染Register页面*/ }
    const path = this.props.location.pathname
    const { form: { getFieldDecorator }, login: { redirectTo, isAuth } } = this.props;
    return (
      <Form className={styles.wrapper}>
        {redirectTo && path !== redirectTo && isAuth ? <Redirect to={redirectTo} /> : null}
        <Logo />
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{
              required: true, message: '请输入用户名'
            }]
          })(
            <Input
              placeholder="用户名"
              onChange={e => this.handleChangeState('userName', e.target.value)} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passWord', {
            rules: [{
              required: true, message: '请输入密码'
            }]
          })(
            <Input
              type="password"
              placeholder="密码"
              onChange={e => this.handleChangeState('passWord', e.target.value)} />
          )}
        </FormItem>
        <FormItem
          help
          hasFeedback
          validateStatus={this.state.repeatPassWord.validateStatus || ''}//自定义校验
        >
          <Input
            type="password"
            placeholder="重复密码"
            onChange={e => this.handleRepeatPwdChangeState(e.target.value)} />
        </FormItem>
        <div className={styles.operator}>
          <div>
            <RadioGroup
              value={this.state.type}
              onChange={(e) => this.handleChangeState('type', e.target.value)}
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
          </div>
          <div style={{ marginTop: '10px' }}>
            {/* <Button type="primary" onClick={()=>this.handleRegister()}>注册</Button>
                        <Button type="primary" onClick={()=>this.props.history.push('/login')}>登录</Button> */}
            <Row type="flex" justify="center" className={styles.operator}>
              <Col style={{ marginBottom: '5px' }}>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleRegister}
                  >
                  注册
                  </Button>
                </FormItem>
              </Col>
              <Col>
                <Link to="/login">登录</Link>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    )
  }
}
