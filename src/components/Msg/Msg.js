import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'

const {Item} = List
const {Brief} = Item
@connect(
    state=>state,
    {}
)
export default class Msg extends Component {
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
        console.log(chatGroup,userId)
        return (
            <div>
                {Object.values(chatGroup).map(item=>{
                    const last = this.getLast(item)//最后一条
                    const fromId = last.from===userId?last.to:last.from;
                    const from = allUsers[fromId]
                    const avatarPath = require(`../img/${from.avatar}.png`)
                    return (<List>
                        <Item
                            thumb={avatarPath}
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
