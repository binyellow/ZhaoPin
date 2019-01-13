const koaRouter = require('koa-router');
const mongoose= require('mongoose')
const { register, Login, findList, update, getLoginInfo, getLastLogin, EditPwd } = require('./controllers/user')
const { getMsgList } = require('./controllers/Chat');
const {deleteMsg} = require('./controllers/Chat')
const Chat = require('./models/chat');
const {addComment,getCommentList} = require('./controllers/Comment')
const {collectGenius,collectCompany,getCompanyCollection,getGeniusCollection} = require('./controllers/Collection')

const user = new koaRouter();

const readMsg = async (ctx,next)=>{
    const to = ctx.cookies.get('userId');
    const { from } = ctx.request.body;
    await new Promise((resolve,reject)=>{
        Chat.update({from,to},{'$set':{read:true}},{'multi':true},(err,doc)=>{
            if(!err){
                resolve({success:true,num:doc.nModified})
            }else{
                reject({})
            }
        })
    }).then(res=>ctx.body = res).catch(e=>ctx.body={success:false,message:e})
}
// mongoose,model('user').find({},(e,userDoc)=>{
//     if(!e){
//         userDoc.forEach(item=>{
//             users[item._id] = {name:item.userName,avatar:item.avatar}
//         })
//         res = {success:true,msgs:doc._doc,users}
//         console.log(res)
//         resolve(res)
//     }
// })

user.post('/read-msg',readMsg)
user.get('/get-msg-list',getMsgList)
user.get('/info', getLoginInfo)
user.post('/register', register)//post、get注意一下
user.get('/login',Login)
user.get('/edit-pwd',EditPwd)
user.get('/list',findList)
user.post('/update',update)
user.post('/delete-msg',deleteMsg)
user.get('/get-last-login',getLastLogin)
user.post('/comment',addComment)
user.get('/comment-list',getCommentList)
user.get('/collect-company',collectCompany)
user.get('/collect-genius',collectGenius)
user.get('/get-company-collection',getCompanyCollection)
user.get('/get-genius-collection',getGeniusCollection)

module.exports = user