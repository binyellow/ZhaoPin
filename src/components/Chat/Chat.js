import React, { Component } from 'react'
import io from 'socket.io-client';
import lodash from 'lodash';
import {deleteMsg} from '../../services/chat'
import QueueAnim from 'rc-queue-anim';
import {Modal} from 'antd'
import {List,InputItem, Button,NavBar,Icon,Grid,Popover} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../reducer/ChatList-redux';
import {getUserList} from '../../reducer/UserList-redux'
import AddRemark from './AddRemark';
import {addComment} from '../../services/comment'

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
            showEmoji: false,
            modalVisible: false,
            popVisible:false
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
    handleVisible = (flag=true)=>{
        this.setState({modalVisible:flag})
    }
    handlePopVisible = (flag=true) =>{

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
    deleteMsg = (msgsChatId) =>{
        // const to = this.props.match.params.username;
        deleteMsg(msgsChatId).then(res=>{
            if(res.status===200){
                if(res.data.success){
                    Modal.success({
                        title:'删除成功',
                        content:`成功删除${res.data.num}条`,
                        onOk:()=>{
                            this.props.history.push('/msg')
                        }
                    })
                }else{
                    Modal.error({
                        title:'删除失败',
                        content:res.data.message,
                    })
                }
            }
        })
    }
    seeDetail = () =>{
        const to = this.props.match.params.username
        this.props.history.push(`/detail/${to}`)
    }
    comment = (content,score) =>{
        const to = this.props.match.params.username;
        const {userList} = this.props.UserList;
        const toName = userList.find(item=>item._id===to).userName;
        addComment({content,to,score,toName}).then(res=>{
            if(res.status===200&&res.data.success){
                Modal.success({
                    title:'评论成功',
                    onOk:()=>{
                        this.setState({modalVisible:false})
                    }
                })
            }
        });
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
        const msgsChatId = ChatMsg.map(v=>v._id);
        const toName = users[`${to}`]?this.props.ChatList.users[`${to}`].name:null
        const myImg = src => <img src={require(`../NavLink/img/${src}.png`)} className="am-icon am-icon-xs" alt="" />;
        return (
            <div id="chat-page">
                <div>
                    <NavBar
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                        rightContent={
                            <Popover mask
                              overlayClassName="fortest"
                              overlayStyle={{ color: 'currentColor' }}
                              visible={this.state.popVisible}
                              overlay={[
                                (<Popover.Item key="4" value="scan" icon={myImg('detail')} data-seed="logId">
                                    <span onClick={this.seeDetail}>查看详细信息</span>
                                </Popover.Item>),
                                (<Popover.Item 
                                    key="5" 
                                    value="special" 
                                    icon={myImg('delete')} 
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    <span onClick={()=>this.deleteMsg(msgsChatId)}>删除聊天记录</span>
                                </Popover.Item>),
                                (<Popover.Item key="6" value="button ct" icon={myImg('comment')}>
                                  <span onClick={()=>this.handleVisible()}>评论</span>
                                </Popover.Item>),
                              ]}
                              align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                              }}
                              onVisibleChange={this.handleVisibleChange}
                              onSelect={this.onSelect}
                            >
                              <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              >
                                <Icon type="ellipsis" />
                              </div>
                            </Popover>
                        }
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
                <AddRemark 
                    visible={this.state.modalVisible} 
                    handleChangeVisible={this.handleVisible}
                    handleComment={this.comment}
                />
            </div>
        )
    }
}
