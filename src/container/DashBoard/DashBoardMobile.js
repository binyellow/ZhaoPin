import React from 'react'
import {connect} from 'react-redux'
import {NavBar, Icon,Popover} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import {Switch, Route,Link} from 'react-router-dom'
import NavLinkBar from '../../components/NavLink/NavLink'
import Boss from '../../components/Boss/Boss'
import Genius from '../../components/Genius/Genius'
import User from '../../components/User/User'
import {getMsgList,sendMsg,recvMsg} from '../../reducer/ChatList-redux'
import {getAllCommentList,filterCollection} from '../../reducer/UserList-redux'
import {LoadData} from '../../reducer/login'
import Msg from '../../components/Msg/Msg'
import Analysis from '../Analysis/Analysis'
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom'

const Item = Popover.Item;
@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,LoadData,getAllCommentList,filterCollection}
)
class DashBoardMobile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: true,
			popVisible:false
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
		this.props.getAllCommentList()
	}
	editPersonInfo = () =>{
		const {type} = this.props.login;
		this.props.LoadData({type});
		this.props.history.push('/login')
	}
	showCollection = () =>{
		const {collectionList} = this.props.CollectionList;
		const collectionUserId = collectionList.map(v=>v.to);
		const {userList} = this.props.UserList;
		const filterData = userList.filter(item=>collectionUserId.indexOf(item._id)>=0)
		this.props.filterCollection(filterData);
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
				{pathname==='/boss'||pathname==='/genius'?
					<NavBar className='fixd-header' mode='dark'
						rightContent={
							<Popover mask
								overlayClassName="fortest"
								overlayStyle={{ color: 'currentColor' }}
								visible={this.state.popVisible}
								overlay={[
									(<Item key="4" value="scan" icon={myImg('edit')} data-seed="logId">
									<span onClick={this.showCollection}>我的收藏</span></Item>),
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
							</Popover>
						}
					>
						{pathname==='/'?null:navList.find(v=>v.path===pathname).title}
					</NavBar>:
					<NavBar className='fixd-header' mode='dark'
						rightContent={
							pathname==='/me'?
							<Popover mask
							overlayClassName="fortest"
							overlayStyle={{ color: 'currentColor' }}
							visible={this.state.visible}
							overlay={[
								(<Item key="4" value="scan" icon={myImg('edit')} data-seed="logId">
								<span onClick={this.editPersonInfo}>修改个人信息</span></Item>),
								(<Item key="5" value="special" icon={myImg('suggest')} style={{ whiteSpace: 'nowrap' }}>
								建议反馈</Item>),
								(<Item key="6" value="button ct" icon={myImg('help')}>
								<span style={{ marginRight: 5 }}>帮助</span>
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
				}
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

export default DashBoardMobile