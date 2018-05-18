import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../reducer/UserList-redux'
import ReactEcharts from 'echarts-for-react'
import {Accordion} from 'antd-mobile'
import MoneyAnalysis from '../../components/Analysis/MoneyAnalysis'
import WorkingSpaceAnalysis from '../../components/Analysis/WorkingSpaceAnalysis'
import cityData from '../../common/city'

@connect(
    state=>state,
    {getUserList}
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
    }
    render() {
        return (
            <div>
                <Accordion>
                  <Accordion.Panel header="薪资分析">
                    <MoneyAnalysis UserList={this.props.UserList} login={this.props.login}></MoneyAnalysis>
                  </Accordion.Panel>
                  <Accordion.Panel header="工作地点分析">
                    <WorkingSpaceAnalysis UserList={this.props.UserList.userList} type={this.props.login.type}/>
                  </Accordion.Panel>
                </Accordion>
            </div>
        )
    }
}
