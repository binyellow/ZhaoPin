import React, { Component } from 'react'
import io from 'socket.io-client';
import QueueAnim from 'rc-queue-anim';
import {List,InputItem, Button,NavBar,Icon,Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../reducer/ChatList-redux';

// const {Item} = List
// @connect(
//     state=>state,
//     {getMsgList,sendMsg,recvMsg,readMsg}
// )
export default class Analysis extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                Analysis
            </div>
        )
    }
}
