
import React from 'react'
import {NavBar,InputItem, TextareaItem, Button,Modal,Icon} from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../services/user'
import {LoadData} from '../../reducer/login'
import {getMsgList} from '../../reducer/ChatList-redux'
import {getAllUserList} from '../../reducer/UserList-redux'

@connect(
	state=>state,
	{LoadData,getMsgList,getAllUserList}
)
class BossInfo extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:'',
			company:'',
			money:'',
			avatar:null
		}
	}
	componentWillMount(nextProps,nextState){
		const {userName} = this.props.login;
		if(!this.props.UserList.allUserList.some(item=>item.userName===userName)){
			this.props.getAllUserList()
		}
	}
	componentDidMount(){
		if(!this.props.ChatList || !this.props.ChatList.chatMsg.length){
            this.props.getMsgList()
        }
	}
	handleUpdate = () =>{
		const editItem = this.props.UserList.allUserList.find(n=>n.userName===this.props.login.userName);
		const data = this.getOneProps(this.state,editItem)
		update(data).then(res=>{
			if(res.status===200&&res.data.success===true){
				this.props.LoadData(res.data.data)
			}else{
				Modal.alert('更新失败',res.data.message)
			}
		})
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
	getOneProps = (state,editItem) => {
		const keys = Object.keys(state);
		const data = {};
		for (const key of keys) {
			if(state[key]===''||state[key]===null){
				data[key] = editItem[key]?editItem[key]:state[key]
			}else{
				data[key] = state[key]
			}
		}
		return data
	}
	render(){
		const path = this.props.location.pathname;
		const redirect = this.props.login.redirectTo;
		const {userName} = this.props.login;
		const editItem = this.props.UserList.allUserList.find(n=>n.userName===userName);
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.login.redirectTo}/> :null}
				<NavBar 
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>BOSS完善信息页</NavBar>
				<AvatarSelector
					selectedAvatar={editItem?editItem.avatar:undefined}
					selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
				></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)} clear defaultValue={editItem?editItem.title:null}>
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('company',v)}  clear defaultValue={editItem?editItem.company:null}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('money',v)}  clear defaultValue={editItem?editItem.money:null}>
					职位薪资
				</InputItem>
				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='职位要求'
					defaultValue={editItem?editItem.desc:null}
				>
				</TextareaItem>
				<Button 
					onClick={this.handleUpdate}
					type='primary'>保存</Button>
			</div>
			
		)
	}
}

export default BossInfo