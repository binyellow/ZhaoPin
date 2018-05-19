import axios from 'axios'

export function register(params){
    return axios.post('/user/register',{...params})
}

export function login(params){
    return axios.get('/user/login',{params:{...params}})
}

export function editPassWord(params){
    return axios.get('/user/edit-pwd',{params:{...params}})
}

export function update(params){
    return axios.post('/user/update',{...params})
}

export function getLastLogin(params){
    return axios.get('/user/get-last-login',{params:{...params}})
}