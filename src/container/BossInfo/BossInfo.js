
import React from 'react'
import {NavBar,InputItem, TextareaItem, Button,Icon,Picker,List,Slider} from 'antd-mobile'
import {Modal} from 'antd';
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../services/user'
import {LoadData} from '../../reducer/login'
import {getMsgList} from '../../reducer/ChatList-redux'
import {getAllUserList} from '../../reducer/UserList-redux'
import city from '../../common/city'
import experienceData from '../../common/experience'
import styles from '../GeniusInfo/GeniusInfo.less'

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
			experience: '',
			workingPlace:[],
			company:'',
			money:'',
			avatar:null
		}
	}
	componentWillMount(nextProps,nextState){
		const {userName} = this.props.login;
		if(!this.props.UserList.allUserList.some(item=>item.userName===userName).avatar){
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
				this.props.LoadData({...data, ...res.data.data})
				Modal.success({
					title:'更新成功',
					content:'个人信息保存成功',
					onOk:()=>this.props.history.push('/login')
				})
			}else{
				Modal.error({
					title:'更新失败',
					content:res.data.message
				})
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
			if(state[key]===''||state[key]===null||state[key].length===0){
				data[key] = editItem[key]?editItem[key]:state[key]
			}else{
				data[key] = state[key]
			}
		}
		return data
	}
	log = (value) =>{
		return (value)=>{
			console.log(value);
			this.setState({experience:value})
		}
	}
	render(){
		const path = this.props.location.pathname;
		const {userName,redirect} = this.props.login;
		const editItem = this.getOneProps(this.state,this.props.login);
		// const editItem = this.props.UserList.allUserList.find(n=>n.userName===userName);
		// const workingCity = editItem.workingPlace instanceof Array?editItem.workingPlace:editItem.workingPlace.split(' ')
		let workingCity;
		if(editItem&&!this.state.workingPlace.length){
			if(editItem.workingPlace instanceof Array){
				workingCity = editItem.workingPlace
			}else{
				if(editItem.workingPlace){
					if(editItem.workingPlace===''){
						workingCity=[]
					}else{
						workingCity = editItem.workingPlace.split(' ')
					}
				}else{
					workingCity = this.state.workingPlace
				}
			}
		}else{
			workingCity = this.state.workingPlace
		}
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
				<InputItem onChange={(v)=>this.onChange('title',v)} clear value={editItem?editItem.title:null}>
					招聘职位
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
					<List.Item arrow="horizontal">工作地点</List.Item>
				</Picker>
				<InputItem onChange={(v)=>this.onChange('company',v)}  clear value={editItem?editItem.company:null}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('money',v)}  clear value={editItem?editItem.money:null}>
					职位薪资
				</InputItem>
				<div className={styles.slider}>
					<h3 style={{marginLeft:'13px'}}>要求工作经验：</h3>
					<Slider
						style={{ marginLeft: 30, marginRight: 30 }}
						value={editItem?+editItem.experience:3}
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
					title='职位要求'
					value={editItem?editItem.desc:null}
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