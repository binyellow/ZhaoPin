const ChatDB = require('../dbDao/Chat')
const model = require('../model')
const Chat = model.getModule('chat');

function createChat({from,to,content}){
    const chatId = [from,to].sort().join('_');
    ChatDB.createChat({chatId,from,to,content});
}

const deleteMsg = async (ctx,next)=>{
    const to = ctx.cookies.get('userId');
    const { msgChatIds } = ctx.request.body;
    await new Promise((resolve,reject)=>{
        Chat.remove({'_id':{ $in: msgChatIds}},(err,doc)=>{
            if(!err){
                console.log(doc);
                resolve({success:true,num:doc.n})
            }else{
                reject({})
            }
        })
    }).then(res=>ctx.body = res).catch(e=>ctx.body={success:false,message:e})
}
module.exports = {createChat,deleteMsg};