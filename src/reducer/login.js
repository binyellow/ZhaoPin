const ADD_USER = 'ADD_USER'
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initState = {isAuth:false,user:'huangBin'}
export function login(state=[initState],action){
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                isAuth:true
            }
        case LOGOUT:
            return {
                ...state,
                isAuth:false
            }
        case ADD_USER:
            return [
                ...state,
                ...action.payload
            ]
        default:
            return state;
    }
}

export function AddUserAction(payload){
    console.log(payload)
    return {
        type: ADD_USER,
        payload
    }
}

export function LoginAction(){
    return {
        type:LOGIN,
    }
}
export function LogoutAction(){
    return {
        type:LOGOUT,
    }
}