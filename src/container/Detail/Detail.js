import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Result,NavBar,Icon,List} from 'antd-mobile';
import {getUserList} from '../../reducer/UserList-redux'
import experienceData from '../../common/experience'
import cityData from '../../common/city'
import {getLastLogin} from '../../services/user'

const {Item} = List
const {Brief} = Item
@connect(
    state=>state,
    {getUserList}
)
export default class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            lastLoginTime:''
        }
    }
    componentWillMount(nextProps,nextState){
        const {type} = this.props.login;
        const {userList} = this.props.UserList;
		if(!userList.length){
			this.props.getUserList(type==='boss'?'genius':'boss') 
		}
	}
    componentDidMount(){
        const {id} = this.props.match.params;
        const {userName} = this.props.UserList.userList.find(item=>item._id===id)
        getLastLogin({userName}).then(res=>{
            if(res.status===200){
                if(res.data.success){
                    this.setState({lastLoginTime:res.data.data[0].time})
                }
            }
        })
    }
    render() {
        const {id} = this.props.match.params
        const {userList} = this.props.UserList
        const userItem = userList.find(v=>v._id===id)
        // const {userName,avatar} = userItem
        const workingPlace = cityData[0].find(item=>item.value===userItem.workingPlace)
        return (
            <div>
                <NavBar className='fixd-header' mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
					{userItem?userItem.userName:''}详细信息
				</NavBar>
                <div style={{marginTop:'45px'}}>
                    <Result
                        img={<img style={{width:50}} src={require(`../../components/img/${userItem.avatar?userItem.avatar:'boy'}.png`)  }/>}
                        title={userItem?userItem.userName:''}
                    />
                    <List>
                        <Item multipleLine>
                            <Brief>
                                {userItem.type==='boss'?'技能要求':'技术栈'}：{userItem.desc}
                            </Brief>
                            <Brief>
                                {userItem.type==='boss'?'工作经验要求':'工作经验'}：{experienceData[userItem.experience]}
                            </Brief>
                            <Brief>
                                工作地点：{workingPlace.label}
                            </Brief>
                            <Brief>
                                {userItem.type==='boss'?'招聘岗位':'应聘岗位'}：{userItem.title}
                            </Brief>
                            <Brief>
                                {userItem.type==='boss'?`薪资：${userItem.money}`:`期待薪资：${userItem.expectMoney}`}
                            </Brief>
                            <Brief>
                                注册时间：{new Date(userItem.createTime).toLocaleString()}
                            </Brief>
                            <Brief>
                                最后登录时间：{this.state.lastLoginTime===''?'':new Date(this.state.lastLoginTime).toLocaleString()}
                            </Brief>
                        </Item>
                    </List>
                </div>
            </div>
        )
    }
}
