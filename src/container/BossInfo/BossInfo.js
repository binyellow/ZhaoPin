
import React from 'react'
import {NavBar,InputItem, TextareaItem, Button,Modal} from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../services/user'
import {LoadData} from '../../reducer/login'
import {getMsgList} from '../../reducer/ChatList-redux'

@connect(
	state=>state.login,
	{LoadData,getMsgList}
)
class BossInfo extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:'',
			company:'',
			money:''
		}
	}
	componentDidMount(){
		if(!this.props.ChatList || !this.props.ChatList.chatMsg.length){
            this.props.getMsgList()
        }
	}
	handleUpdate = (data) =>{
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
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.redirectTo}/> :null}
				<NavBar mode="dark" >BOSS完善信息页</NavBar>
				<AvatarSelector 
					selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
				></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)}>
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('company',v)}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('money',v)}>
					职位薪资
				</InputItem>
				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='职位要求'
				>
					
				</TextareaItem>
				<Button 
					onClick={()=>this.handleUpdate(this.state)}
					type='primary'>保存</Button>
			</div>
			
		)
	}
}

export default BossInfo