import axios from 'axios';
const UPDATE_USER_LIST = 'UPDATE_USER_LIST';

const initialState = {
    userList:[]
}
export function UserList(state=initialState,action){
    switch(action.type){
        case UPDATE_USER_LIST:
            return {...state,userList:action.payload};
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

export function getUserList(type){
    return dispatch=>{
        axios.get('/user/list?type='+type).then(res=>{
            dispatch(UserListAction(res.data.data))
        })
    }
}