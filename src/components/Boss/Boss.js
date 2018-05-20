import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../reducer/UserList-redux'
import UserInfoCard from '../UserInfoCard/UserInfoCard'
import {getCollectionList} from '../../reducer/Collection-redux'

@connect(
    state=>({userList:state.UserList.userList,state:state}),
    {getUserList,getCollectionList}
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
        this.props.getCollectionList('boss')
    }
    render() {
        return (
            <UserInfoCard userList={this.props.userList}></UserInfoCard>
        )
    }
}
