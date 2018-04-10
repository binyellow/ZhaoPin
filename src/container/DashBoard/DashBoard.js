import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route,Redirect} from 'react-router-dom'
import NavLinkBar from '../../components/NavLink/NavLink'
import Boss from '../../components/Boss/Boss'
import Genius from '../../components/Genius/Genius'
import User from '../../components/User/User'
import {getMsgList,sendMsg,recvMsg} from '../../reducer/ChatList-redux'
import Msg from '../../components/Msg/Msg'

@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg}
)

class DashBoard extends React.Component{
	componentDidMount(){
		if(!this.props.ChatList.chatMsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
	}
	constructor(props){
		super(props);
		if(this.props.location.pathname==='/'){
			this.props.history.push('/register')
		}
	}
	
	render(){
		const { pathname } = this.props.location
		const {login} = this.props
		const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:login.type==='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:login.type==='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]


		return (
			<div>
				{}
				<NavBar className='fixd-header' mode='dark'>{pathname==='/'?null:navList.find(v=>v.path===pathname).title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
				
			</div>
		)

		
	}

}

export default DashBoard