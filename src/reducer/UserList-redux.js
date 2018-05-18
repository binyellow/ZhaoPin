import axios from 'axios';
const UPDATE_USER_LIST = 'UPDATE_USER_LIST';
const UPDATE_ALL_USER_LIST = 'UPDATE_ALL_USER_LIST'

const initialState = {
    userList:[],
    allUserList:[]
}
export function UserList(state=initialState,action){
    switch(action.type){
        case UPDATE_USER_LIST:
            return {...state,userList:action.payload};
        case UPDATE_ALL_USER_LIST:
            return {...state,allUserList:action.payload};
        default:
            return state;
    }
}

function UserListAction(payload){
    return {
        type: UPDATE_USER_LIST,
        payload
    }
}
function AllUserListAction(payload){
    return {
        type: UPDATE_ALL_USER_LIST,
        payload
    }
}
export function getUserList(type){
    // 如何用async,await来重构异步操作
    return async dispatch=>{
        const res = await axios.get('/user/list?type='+type);   //根据type获取联系人列表
        dispatch(UserListAction(res.data.data))
    }
    // return dispatch=>{
    //     axios.get('/user/list?type='+type).then(res=>{
    //         dispatch(UserListAction(res.data.data))
    //     })
    // }
}

export function getAllUserList(){
    return async dispatch=>{
        const res = await axios.get('/user/list');
        dispatch(AllUserListAction(res.data.data))
    }
}