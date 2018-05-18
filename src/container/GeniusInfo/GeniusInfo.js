import React from 'react'
import {NavBar,InputItem, TextareaItem, Button,Modal,Icon,Picker,List,Slider} from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {LoadData} from '../../reducer/login'
import {update} from '../../services/user'
import {getMsgList} from '../../reducer/ChatList-redux'
import {getAllUserList} from '../../reducer/UserList-redux'
import city from '../../common/city'
import experienceData from '../../common/experience'
import styles from './GeniusInfo.less'

@connect(
	state=>state,
	{LoadData,getMsgList,getAllUserList}
)
class GeniusInfo extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			workingPlace: [],
			experience: 3,
			expectMoney: '',
			desc: '',
			avatar: null
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
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
	getOneProps = (state,editItem) => {
		const keys = Object.keys(state);
		const data = {};
		for (const key of keys) {
			if(state[key]===''||state[key]===null||state[key]===[]){
				data[key] = editItem[key]?editItem[key]:state[key]
			}else{
				data[key] = state[key]
			}
		}
		return data
	}
	handleUpdate = () =>{
		const editItem = this.props.UserList.allUserList.find(n=>n.userName===this.props.login.userName);
		const data = this.getOneProps(this.state,editItem)
		update(data).then(res=>{
			if(res.status===200&&res.data.success===true){
				this.props.LoadData(res.data.data)
				this.props.history.goBack()
			}else{
				Modal.alert('更新失败',res.data.message)
			}
		})
	}
	log = (value) =>{
		return (value)=>{
			console.log(value);
			this.setState({experience:value})
		}
	}
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.login.redirectTo
		const editItem = this.props.login;
		// const workingCity = editItem.workingPlace instanceof Array?editItem.workingPlace:editItem.workingPlace.split(' ')
		let workingCity;
		if(editItem&&!this.state.workingPlace.length){
			if(editItem.workingPlace instanceof Array){
				workingCity = editItem.workingPlace
			}else{
				if(editItem.workingPlace===''){
					workingCity=[]
				}else{
					workingCity = editItem.workingPlace.split(' ')
				}
			}
		}else{
			workingCity = this.state.workingPlace
		}
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.login.redirectTo}></Redirect> :null}
				<NavBar 
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>牛人完善信息页</NavBar>
				<AvatarSelector 
					selectedAvatar={editItem?editItem.avatar:undefined}
					selectAvatar={(imgName)=>{
						this.setState({
							avatar:imgName
						})
					}}
				></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)} clear defaultValue={editItem?editItem.title:null}>
					求职岗位
				</InputItem>
				<Picker
					data={city}
					title="选择城市"
					cascade={false}
					value={workingCity}
					// onChange={v => console.log(v)}
					onOk={v => {
						console.log(v)
						this.setState({workingPlace:v})
					}}
					>
					<List.Item arrow="horizontal">求职地点</List.Item>
				</Picker>
				<InputItem onChange={(v)=>this.onChange('expectMoney',v)} clear defaultValue={editItem?editItem.expectMoney:null}>
					期望薪资
				</InputItem>
				{/* <InputItem onChange={(v)=>this.onChange('experience',v)} clear defaultValue={editItem?editItem.experience:null}>
					工作经验
				</InputItem> */}
				<div className={styles.slider}>
					<h3 style={{marginLeft:'13px'}}>工作经验：</h3>
					<Slider
						style={{ marginLeft: 30, marginRight: 30 }}
						defaultValue={3}
						min={0}
						max={5}
						onChange={this.log()}
						marks={experienceData}
					/>
				</div>
				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='个人简介'
					defaultValue={editItem?editItem.desc:null}
				>
				</TextareaItem>
				<Button 
					onClick={()=>this.handleUpdate()}
					type='primary'>保存</Button>
			</div>
			
		)
	}
}

export default GeniusInfo