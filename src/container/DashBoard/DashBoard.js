import React from 'react'
import {connect} from 'react-redux'
import {NavBar, Icon,Popover} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import {Switch, Route,Redirect} from 'react-router-dom'
import NavLinkBar from '../../components/NavLink/NavLink'
import Boss from '../../components/Boss/Boss'
import Genius from '../../components/Genius/Genius'
import User from '../../components/User/User'
import {getMsgList,sendMsg,recvMsg} from '../../reducer/ChatList-redux'
import Msg from '../../components/Msg/Msg'
import Analysis from '../../components/Analysis/Analysis'

const Item = Popover.Item;
@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg}
)

class DashBoard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: true,
		}
		if(this.props.location.pathname==='/'){
			this.props.history.push('/register')
		}
	}
	componentDidMount(){
		console.log(this.props)
		if(!this.props.ChatList.chatMsg.length){
            this.props.recvMsg()
		}
		this.props.getMsgList()
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
				path:'/analysis',
				text:'分析',
				icon:'analysis',
				title:'分析招聘信息',
				component:Analysis
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]

		const page = navList.find(item=>item.path === pathname)
		const myImg = src => <img src={require(`../../components/NavLink/img/${src}.png`)} className="am-icon am-icon-xs" alt="" />;
		return (
			<div>
				{}
				<NavBar className='fixd-header' mode='dark'
					rightContent={
						pathname==='/me'?
						<Popover mask
						  overlayClassName="fortest"
						  overlayStyle={{ color: 'currentColor' }}
						  visible={this.state.visible}
						  overlay={[
							(<Item key="4" value="scan" icon={myImg('job')} data-seed="logId">
							修改个人信息</Item>),
							(<Item key="5" value="special" icon={myImg('boss')} style={{ whiteSpace: 'nowrap' }}>
							My Qrcode</Item>),
							(<Item key="6" value="button ct" icon={myImg('msg')}>
							  <span style={{ marginRight: 5 }}>Help</span>
							</Item>),
						  ]}
						  align={{
							overflow: { adjustY: 0, adjustX: 0 },
							offset: [-10, 0],
						  }}
						  onVisibleChange={this.handleVisibleChange}
						  onSelect={this.onSelect}
						>
						  <div style={{
							height: '100%',
							padding: '0 15px',
							marginRight: '-15px',
							display: 'flex',
							alignItems: 'center',
						  }}
						  >
							<Icon type="ellipsis" />
						  </div>
						</Popover>:null
					}
				>
					{pathname==='/'?null:navList.find(v=>v.path===pathname).title}
				</NavBar>
				<div style={{marginTop:45,marginBottom:50}}>
					<Switch>
						{navList.map(v=>(
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
					</Switch>
					{/* <QueueAnim>
						<Route key={page.path} path={page.path} component={page.component}/>
					</QueueAnim> */}
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
				
			</div>
		)

		
	}

}

export default DashBoard