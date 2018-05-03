import React, { Component } from 'react'
import io from 'socket.io-client';
import lodash from 'lodash';
import QueueAnim from 'rc-queue-anim';
import {List,InputItem, Button,NavBar,Icon,Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../reducer/ChatList-redux';
import {getUserList} from '../../reducer/UserList-redux'

const socket = io('ws://localhost:9030');
const {Item} = List
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg,getUserList}
)
export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }
    componentWillUpdate(nextProps, nextState){
        console.log(nextProps,nextState);
        if(nextProps.ChatList.chatMsg.length!==this.props.ChatList.chatMsg.length){
            const {type} = this.props.login;
            this.props.getUserList(type==='boss'?'genius':'boss')
            this.props.getMsgList()
        }
    }
    componentDidMount(){
        if(!this.props.ChatList.chatMsg.length){
            this.props.recvMsg()
        }
        this.props.getMsgList()//this.props.match.params.username
        this.fixCarousel()
    }
    componentWillUnmount(){
        //将要离开页面的时候把聊天的id传过去
        this.props.readMsg(this.props.match.params.username)
    }
    fixCarousel(){
        setTimeout(()=>window.dispatchEvent(new Event('resize')),0)
    }
    handleSend = () =>{
        const from = this.props.login._id;
        const to = this.props.match.params.username;
        const chatId = [from,to].sort().join('_')
        this.props.sendMsg({from,to,chatId,content:this.state.text})
        this.setState({text:''})
    }
    handleShow = () =>{
        this.setState({
            showEmoji:!this.state.showEmoji
        })
    }
    render() {
        const emoji = '😀 😁 😂 🤣 😃 😄 😍 😋 😘 😗 😙 😚 🤩 🙄 😶 😑 😐 😣 😥 😮 🤐 😪 😫 😴 😌 😛 😝 🤤 😒 😓 😔 😕 🙃 🤑 🤯 😬 😱 😳 🤪 😵 😡 😠 😷 🤢 🤕 😇 🤠 🤡'
        .split(' ').filter(v=>v).map(v=>({text:v}));
        const to = this.props.match.params.username
        // console.log(this.props.ChatList.users[`${to}`].name)
        const {users} = this.props.ChatList;
        const [...userList] = this.props.UserList.userList;
        const chatId = [this.props.login._id,to].sort().join('_');
        const ChatMsg = this.props.ChatList.chatMsg.filter(item=>item.chatId===chatId)
        const toName = users[`${to}`]?this.props.ChatList.users[`${to}`].name:null
        return (
            <div id="chat-page">
                <div>
                    <NavBar
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                    >{ !lodash.isEmpty(userList) && toName ||to}</NavBar>
                    <QueueAnim type='top'>
                        {ChatMsg.map(item=>{
                            const avatar = require(`../img/${users[item.from].avatar}.png`)
                            return <List key={item._id}>
                                {item.from===to?(
                                    <Item
                                        thumb={avatar}
                                    >对方：{item.content}</Item>
                                ):(
                                    <Item className="chat-me"
                                        extra={<img src={avatar}/>}
                                    >{item.content}</Item>
                                )}
                            </List>
                        }
                        )}
                    </QueueAnim>
                </div>
                <List className="stick-footer">
                    {this.state.showEmoji?
                    <Grid 
                        data={emoji}
                        columnNum={8}
                        isCarousel
                        carouselMaxRow={2}
                        onClick={(el)=>{
                            this.setState({text:this.state.text+el.text})
                        }}
                    />:null}
                    <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={
                            <div style={{lineHeight:1.5}}>
                                <span style={{marginRight:'10px'}} onClick={()=>{
                                    this.handleShow();
                                    this.fixCarousel()
                                }
                                }>😋</span>
                                <span onClick={this.handleSend}>发送</span>
                            </div>
                        }
                    >
                    </InputItem>
                </List>
            </div>
        )
    }
}
