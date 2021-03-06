import axios from 'axios';
const UPDATE_USER_LIST = 'UPDATE_USER_LIST';
const UPDATE_ALL_USER_LIST = 'UPDATE_ALL_USER_LIST'
const COMMENT_LIST = 'COMMENT_LIST'
const FILTER_COLLECTION = 'FILTER_COLLECTION'

const initialState = {
    userList:[],
    allUserList:[],
    commentList:[]
}
export function UserList(state=initialState,action){
    switch(action.type){
        case UPDATE_USER_LIST:
            return {...state,userList:action.payload};
        case UPDATE_ALL_USER_LIST:
            return {...state,allUserList:action.payload};
        case COMMENT_LIST:
            return {...state,commentList:action.payload};
        case FILTER_COLLECTION:
            return {...state,userList:action.payload}
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

export function getUserList(type, params = {}){
    // 如何用async,await来重构异步操作
    return async dispatch=>{
        const res = await axios.get('/user/list?type='+type, { params });   //根据type获取联系人列表
        dispatch(UserListAction(res.data.data))
    }
    // return dispatch=>{
    //     axios.get('/user/list?type='+type).then(res=>{
    //         dispatch(UserListAction(res.data.data))
    //     })
    // }
}

function AllUserListAction(payload){
    return {
        type: UPDATE_ALL_USER_LIST,
        payload
    }
}

export function getAllUserList(){
    return async dispatch=>{
        const res = await axios.get('/user/list');
        dispatch(AllUserListAction(res.data.data))
    }
}

function CommentAction(payload){
    return {
        type: COMMENT_LIST,
        payload
    }
}

export function getAllCommentList(){
    return async dispatch=>{
        const res = await axios.get('/user/comment-list');
        dispatch(CommentAction(res.data.data))
    }
}

function CollectionAction(payload){
    return {
        type: FILTER_COLLECTION,
        payload
    }
}

export function filterCollection(res){
    return async dispatch=>{
        dispatch(CollectionAction(res))
    }
}