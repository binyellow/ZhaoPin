import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList,getAllCommentList} from '../../reducer/UserList-redux'
import {Accordion} from 'antd-mobile'
import MoneyAnalysis from '../../components/Analysis/MoneyAnalysis'
import WorkingSpaceAnalysis from '../../components/Analysis/WorkingSpaceAnalysis'
import ScoreAnalysis from '../../components/Analysis/ScoreAnalysis'
import CollectionAnalysis from '../../components/Analysis/CollectionAnalysis';
import {getCollectionList} from '../../reducer/Collection-redux'

@connect(
    state=>state,
    {getUserList,getAllCommentList,getCollectionList}
)
export default class Analysis extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        console.log(this.props);
        const {type} = this.props.login;//type是指当前用户类型
        this.props.getUserList(type==='genius'?'boss':'genius')
        this.props.getAllCommentList()
        this.props.getCollectionList(type==='genius'?'genius':'boss')
    }
    render() {
        return (
            <div>
                <Accordion>
                  <Accordion.Panel header="薪资分析">
                    <MoneyAnalysis UserList={this.props.UserList} login={this.props.login}></MoneyAnalysis>
                  </Accordion.Panel>
                  <Accordion.Panel header="工作地点分析">
                    <WorkingSpaceAnalysis 
                        UserList={this.props.UserList.userList} 
                        type={this.props.login.type}
                    />
                  </Accordion.Panel>
                  <Accordion.Panel header="评价分析">
                    <ScoreAnalysis 
                        login={this.props.login}
                        UserList={this.props.UserList}
                    />
                  </Accordion.Panel>
                  <Accordion.Panel header="被收藏数分析">
                    <CollectionAnalysis 
                        login={this.props.login}
                        UserList={this.props.UserList}
                        collectionList={this.props.CollectionList.collectionList}
                    />
                  </Accordion.Panel>
                </Accordion>
            </div>
        )
    }
}
