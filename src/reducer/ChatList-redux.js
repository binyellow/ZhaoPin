import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9030')


//获取聊天列表
const MSG_LIST = 'CHAT_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识信息
const MSG_READ = 'MSG_READ'

const initState = {
    chatMsg: [],
    users:{},
    unRead: 0   //未读信息数
}

export function ChatList(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {
                ...state,
                chatMsg:action.payload.msgs,
                users:action.payload.users,
                unRead:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.loginId).length
            }
        case MSG_RECV:
            const n = action.payload.msg.to === action.payload.loginId? 1: 0; 
            return {...state,chatMsg:[...state.chatMsg,action.payload.msg],unRead:state.unRead+n}
        case MSG_READ:
            return {...state,chatMsg:state.chatMsg.map(item=>{
                if(item.from===action.payload.from){
                    item.read = true;
                }
                return item;
            }),unRead:state.unRead-action.payload.num===0?0:state.unRead-action.payload.num}
        default:
            return state;
    }
}

function msgList(msgs,users,loginId){
    return {
        type: MSG_LIST,
        payload:{msgs,users,loginId}
    }
}

export function sendMsg(data){
    return dispatch=>{
        socket.emit('sendMsg',data)
    }
}
export function getMsgList(params){
    return (dispatch,getState)=>{
        axios.get('/user/get-msg-list',{params:{to:params}})
        .then(res=>{
            if(res.status===200 && res.data.success){
                const loginId = getState().login._id;
                dispatch(msgList(res.data.msgs,res.data.users,loginId))
            }
        })
    }
}
function msgRecv(msg,loginId){
    return {
        type: MSG_RECV,
        payload: {msg,loginId}
    }
}
export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('receive',data=>{
            console.log(data)
            const loginId = getState().login._id;
            dispatch(msgRecv(data,loginId));
        })
    }
}

function msgRead({from,to,num}){
    return {
        type: MSG_READ,
        payload:{from,to,num}
    }
}
//是要把从from到me的消息置为read:true
export function readMsg(from){
    return (dispatch,getState)=>{
        const to = getState().login._id; //to可以从cookie直接获取
        axios.post('/user/read-msg',{from}).then(res=>{
            if(res.status===200 && res.data.success){
                dispatch(msgRead({from,to,num:res.data.num}))
            }
        })
    }
}