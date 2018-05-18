import React, { Component } from 'react'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom'
import browserCookies from 'browser-cookies';
import {LogoutAction} from '../../reducer/login'
import {getAllUserList} from '../../reducer/UserList-redux'
import city from '../../common/city'
import experienceData from '../../common/experience'

const {Item} = List
const {Brief} = Item
@connect(
    state=>state,
    {LogoutAction,getAllUserList}
)
@withRouter
export default class User extends Component {
    componentWillMount(nextProps,nextState){
		const {userName} = this.props.login;
		if(!this.props.UserList.allUserList.some(item=>item.userName===userName)){
			this.props.getAllUserList()
		}
	}
    editPwd = () =>{
        console.log(this.props)
        this.props.history.push('/edit-pwd')
    }
    logOut = () =>{
        Modal.alert('退出登录','确定清楚登录信息吗？',[
            {text:'取消',onPress:()=>{}},
            {text:'退出',onPress:()=>{
                console.log(browserCookies.get('userId'))
                browserCookies.erase('userId');
                // window.location.href = window.location.href; 这里是强制刷新页面
                this.props.LogoutAction()
            }}
        ])
    }
    render() {
        const userInfo = this.props.login;
        const cityItem = userInfo.workingPlace instanceof Array?city[0].find(v=>v.value===userInfo.workingPlace[0]):city[0].find(v=>v.value===userInfo.workingPlace);
        return userInfo.userName?(
            <div>
                <Result
                    img={<img style={{width:50}} src={require(`../img/${userInfo.avatar}.png`)  }/>}
                    title={userInfo.userName}
                    message={userInfo.type==='boss'?userInfo.company:null}
                />
                <List renderHeader={()=>userInfo.type==='boss'?'招聘要求':'个人信息'}>
                    <Item multipleLine>
                        详细描述：{userInfo.desc}
                        <Brief>
                            工作地点：{cityItem?cityItem.label:''}
                        </Brief>
                        {userInfo.type==='boss'?
                            (<div>
                                <Brief>
                                招聘岗位：{userInfo.title}
                                </Brief>
                                <Brief>
                                薪资：{userInfo.money}
                                </Brief>
                            </div>):
                            (<div>
                                <Brief>
                                意向岗位：{userInfo.title}
                                </Brief>
                                <Brief>
                                期待薪资：{userInfo.expectMoney}
                                </Brief>
                                <Brief>
                                工作经验：{experienceData[userInfo.experience]}
                                </Brief>
                            </div>)
                        }
                    </Item>
                </List>
                <WhiteSpace/>
                <Button
                    onClick={this.editPwd}
                >
                    修改密码
                </Button>
                <Button
                    type='warning'
                    onClick={this.logOut}
                >
                    退出登录
                </Button>
            </div>
        ):(userInfo.redirectTo==='/login'?<Redirect to={userInfo.redirectTo}/>:null)
    }
}
