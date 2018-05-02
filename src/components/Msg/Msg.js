import React, { Component } from 'react'
import {connect} from 'react-redux'
import lodash from 'lodash';
import {List,Badge} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {getMsgList,recvMsg} from '../../reducer/ChatList-redux'

const {Item} = List
const {Brief} = Item
@connect(
    state=>state,
    {getMsgList,recvMsg}
)
@withRouter
export default class Msg extends Component {
    componentDidMount(){
		console.log(this.props)
		if(!this.props.ChatList.chatMsg.length){
            this.props.getMsgList()
            // this.props.recvMsg()
        }
	}
    getLast = (arr) =>{
        return arr[arr.length-1]
    }
    render() {
        const userId = this.props.login._id;//当前用户
        const chatGroup = {}
        this.props.ChatList.chatMsg.forEach(item => {
            chatGroup[item.chatId] = chatGroup[item.chatId] || [];
            chatGroup[item.chatId].push(item)   //注意这里很巧妙的将相同的2个聊天对象的内容放在一起
        });
        const allUsers = this.props.ChatList.users;
        const chatList = lodash.values(chatGroup).sort((a,b)=>{
            const a_last = this.getLast(a).chatTime;
            const b_last = this.getLast(b).chatTime;
            return b_last - a_last;
        })
        console.log(chatList)
        return (
            <div>
                {chatList.map((item,index)=>{
                    const last = this.getLast(item)//最后一条
                    const fromId = last.from===userId?last.to:last.from;
                    const from = allUsers[fromId]
                    const targetId = item[0].from === userId?item[0].to:item[0].from;
                    const unreadNum = item.filter(_item=>!_item.read&&_item.to===userId).length
                    const avatarPath = require(`../img/${from.avatar}.png`)
                    return (<List key={index}>
                        <Item
                            extra={<Badge text={unreadNum}/>}
                            thumb={avatarPath}
                            arrow="horizontal"
                            onClick={()=>this.props.history.push(`chat/${targetId}`)}
                        >
                            {last.content}
                            <Brief>{from.name}</Brief>
                        </Item>
                    </List>)
                })}
            </div>
        )
    }
}
