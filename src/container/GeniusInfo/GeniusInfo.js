
import React from 'react'
import {NavBar,InputItem, TextareaItem, Button,Modal} from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {LoadData} from '../../reducer/login'
import {update} from '../../services/user'

@connect(
	state=>state.login,
	{LoadData}
)
class GeniusInfo extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			title:'',
			experience:'',
			expectMoney:'',
			desc:'',
			avatar:null
		}
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
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
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
				<NavBar mode="dark" >牛人完善信息页</NavBar>
				<AvatarSelector 
					selectAvatar={(imgName)=>{
						this.setState({
							avatar:imgName
						})
					}}
				></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)} clear>
					求职岗位
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('expectMoney',v)} clear>
					期望薪资
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('experience',v)} clear>
					工作经验
				</InputItem>
				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='个人简介'
				>
				</TextareaItem>
				<Button 
					onClick={()=>this.handleUpdate(this.state)}
					type='primary'>保存</Button>
			</div>
			
		)
	}
}

export default GeniusInfo