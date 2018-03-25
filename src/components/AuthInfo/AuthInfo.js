import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadData } from '../../reducer/login'


@withRouter
@connect(
	state=>({login:state.login}),
	{LoadData}
)
class AuthRoute extends React.Component{
	componentDidMount() {
		const publicList = ['/login','/register']
		const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname)>-1) {
			return null
		}
		// 获取用户信息
		axios.get('/user/info')
			.then(res=>{
				if (res.status===200) {
					if (res.data.code===0) {
						this.props.LoadData(res.data.data)
						// const {type} = this.props.login;
						// this.props.history.push(`/${type}-info`)
					}else{
						this.props.history.push('/register')
					}
				}
			})
		// 是否登录
		// 现在的url地址  login是不需要跳转的

		// 用户的type 身份是boss还是牛人
		// 用户是否完善信息（选择头像 个人简介）
	}
	render(){
		return null
	}

}
export default AuthRoute