import axios from 'axios'

export function addComment(params){
    return axios.post('/user/comment',{...params})
}