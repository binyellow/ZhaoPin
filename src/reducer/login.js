import {
  getRedirectPath
} from '../common/utils'

const LOAD_DATA = 'LOAD_DATA'
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initState = {
  isAuth: false,
  userName: '',
  passWord: '',
  type: '',
  redirectTo: null
}
export function login(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true
      }
    case LOGOUT:
      return {
        ...initState,
        redirectTo: '/login'
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload,
        redirectTo: getRedirectPath(action.payload) //登录或者更改密码都保留跳转到对应的页面
      }
    default:
      return state;
  }
}

export function LoadData(payload) {
  return {
    type: LOAD_DATA,
    payload
  }
}

export function LoginAction() {
  return {
    type: LOGIN,
  }
}
export function LogoutAction() {
  return {
    type: LOGOUT,
  }
}