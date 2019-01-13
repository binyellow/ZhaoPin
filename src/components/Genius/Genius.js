import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {getUserList} from '../../reducer/UserList-redux'
import UserInfoCard from '../UserInfoCard/UserInfoCard'
import {getCollectionList} from '../../reducer/Collection-redux'

@connect(
    state=>({userList:state.UserList.userList, login: state.login}),
    {getUserList,getCollectionList}
)
export default class Genius extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount(){
      const { _id } = this.props.login;
      this.props.getUserList('boss', { _id })
      this.props.getCollectionList('genius')
    }
    render() {
        return (
            <UserInfoCard userList={this.props.userList}></UserInfoCard>
        )
    }
}
