import React, { Component } from 'react'
import { Button, Input, Radio, Form } from 'antd'
import {withRouter} from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import styles from './Login.less'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const FormItemLayout = {
    labelCol:{span:4},
    wrapperCol:{span:20}
}
@withRouter
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            userName:'',
            passWord:'',
            repeatPassWord:'',
            type:'genius',
        }
    }
    handleChangeState = (key,value)=>{
        this.setState({[key]:value})
    }
    render() {
        console.log(this.props);
        return (
            <div className={styles.wrapper}>
                <Logo/>
                <FormItem
                label="账号"
                {...FormItemLayout}
                >
                    <Input
                    onChange={v=>this.handleChangeState('userName',v)}/>
                </FormItem>
                <FormItem
                label="密码"
                {...FormItemLayout}
                >
                    <Input
                    type="password"
                    onChange={v=>this.handleChangeState('passWord',v)}
                    />
                </FormItem>
                <FormItem
                label="重复密码"
                {...FormItemLayout}
                >
                    <Input
                    type="password"
                    onChange={v=>this.handleChangeState('repeatPassWord',v)}/>
                </FormItem>
                <div className={styles.operator}>
                    <div>
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
                    </div>
                    <div style={{marginTop:'10px'}}>
                        <Button type="primary" onClick={()=>this.props.history.push('/register')}>注册</Button>
                        <Button type="primary">登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}
