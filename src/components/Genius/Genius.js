import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {getUserList} from '../../reducer/UserList-redux'
import UserInfoCard from '../UserInfoCard/UserInfoCard'
import {getCollectionList} from '../../reducer/Collection-redux'

@connect(
    state=>({userList:state.UserList.userList}),
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
        this.props.getUserList('boss')
        this.props.getCollectionList('genius')
    }
    render() {
        return (
            <UserInfoCard userList={this.props.userList}></UserInfoCard>
        )
    }
}
