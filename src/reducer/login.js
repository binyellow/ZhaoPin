
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
export function login(state={isAuth:false,user:'huangBin'},action){
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
        default:
            return state;
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