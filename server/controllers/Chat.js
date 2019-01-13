const User = require('../models/user');
const Chat = require('../models/chat');
const { successResponse, failedResponse } = require('../utils/response');

const ChatDB = require('../dbDao/Chat')

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

const getMsgList = async (ctx,next)=>{
  try {
    const { _id = ctx.cookies.get('userId') } = ctx.query;
    const allUserData = await User.find();
    const formatUserData = allUserData.map(item=> {
      return { name: item.userName, avatar:item.avatar };
    });
    const chatList = await Chat.find({ $or: [{ from: _id }, { to: _id }]});
    if(!ctx.cookies.get('userId')) {
      ctx.cookies.set('userId', _id, { httpOnly: true, domain: 'localhost', maxAge: 60*60*1000 });
    }
    ctx.body = successResponse({ msgs: chatList, users: formatUserData });
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error)
  }
}

module.exports = { createChat, deleteMsg, getMsgList };