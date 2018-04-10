import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {getUserList} from '../../reducer/UserList-redux'
import UserInfoCard from '../UserInfoCard/UserInfoCard'
@connect(
    state=>({userList:state.UserList.userList}),
    {getUserList}
)
export default class Genius extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render() {
        return (
            <UserInfoCard userList={this.props.userList}></UserInfoCard>
        )
    }
}
