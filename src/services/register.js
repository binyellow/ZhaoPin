import axios from 'axios'

export function register(params){
    return axios.post('/user/register',{...params})
}

export function login(params){
    return axios.get('/user/login',{params:{...params}})
}