const mongoose = require('mongoose');
const Chat = mongoose.model('chat')

/**
 * 添加聊天消息
 */
function createChat({chatId,from,to,content}){
    Chat.create({chatId,from,to,content},(err,doc)=>{
        console.log(doc)
    })
}

module.exports = {createChat}