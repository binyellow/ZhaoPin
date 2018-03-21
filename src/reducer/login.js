const LOAD_DATA = 'LOAD_DATA'
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initState = {isAuth:false,userName:'',passWord:'',type:''}
export function login(state=initState,action){
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
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth:true
            }
        default:
            return state;
    }
}

export function LoadData(payload){
    return {
        type: LOAD_DATA,
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