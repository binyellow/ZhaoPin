import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../reducer/UserList-redux'
import UserInfoCard from '../UserInfoCard/UserInfoCard'
@connect(
    state=>({userList:state.UserList.userList,state:state}),
    {getUserList}
)
export default class Boss extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        this.props.getUserList('genius')
    }
    render() {
        return (
            <UserInfoCard userList={this.props.userList}></UserInfoCard>
        )
    }
}
