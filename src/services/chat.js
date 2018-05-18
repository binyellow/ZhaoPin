import axios from 'axios'

export function deleteMsg(msgChatIds){
    console.log(msgChatIds);
    return axios.post('/user/delete-msg',{msgChatIds})
}