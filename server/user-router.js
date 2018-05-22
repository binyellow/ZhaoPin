const koaRouter = require('koa-router');
const model = require('./model')
const mongoose= require('mongoose')
const lodash = require('lodash')
const getMd5Pwd = require('./utils/utils')
const {register,findList,update,getLastLogin} = require('./controllers/user')
const {deleteMsg} = require('./controllers/Chat')
const Chat = model.getModule('chat');
const {addComment,getCommentList} = require('./controllers/Comment')
const {collectGenius,collectCompany,getCompanyCollection,getGeniusCollection} = require('./controllers/Collection')

const filter = {'pwd':0,'__v':0}
const user = new koaRouter();
const getData = (ctx,next) => {
    const cookie = ctx.cookies.get('userId');
    return new Promise((resolve,reject)=>{
        if(!cookie){
            reject({code:1})
        }else{
            model.getModule('user').findOne({_id:cookie},filter, (err, doc) => {//find返回Promise对象
                if (err) { 
                    reject(err)
                }
                resolve(doc)
            })
        }
    }).then(doc=>{
        ctx.body = {code:0,data:doc}
        next()
    }).catch(e=>{
        ctx.body = e;
        next()
    })
}

const Login = (ctx, next)=>{
    const requestData = ctx.query;
    // const User = model.getModule('user');
    return new Promise((resolve,reject)=>{
        if(lodash.isEmpty(requestData)){
            reject({code:1,message:'请输入合法的账号密码'})
        }else{
            mongoose.model('user').findOne({...requestData,passWord:getMd5Pwd(requestData.passWord)})
            .then(data=>{
                const lastLoginTime = mongoose.model('lastLoginTime')
                lastLoginTime.findOne({userName:requestData.userName},(err,doc)=>{
                    if(!doc){
                        lastLoginTime.create({userName:requestData.userName},(err,doc)=>console.log(doc))
                    }else{
                        lastLoginTime.update({userName:requestData.userName},{time:new Date().getTime()},(err,doc)=>console.log(doc))
                    }
                })
                resolve(data)
            })
        }
    }).then(data=>{
        ctx.cookies.set('userId',data._id,{httpOnly:false})
        ctx.body = {code:0,data};
        next();
    })
    .catch(err=>{
        ctx.body = {code:err.code||1,err,message:'账号密码错误'};
        next();
    })
}

const EditPwd = (ctx,next)=>{
    const {userName,passWord,newPassWord,type} = ctx.query;
    const cookie = ctx.cookies.get('userId');
    const User = model.getModule('user');
    return new Promise((resolve,reject)=>{
        User.findOneAndUpdate({_id:cookie,passWord:getMd5Pwd(passWord)},{passWord:getMd5Pwd(newPassWord),userName,type},(err,doc)=>{
            if(err||passWord===newPassWord){
                reject({err,code:1,message:'请不要近期试用过的密码'})
            }else{
                if(doc){
                    resolve({code:0,doc})
                }else{
                    reject({code:1,message:'账号密码错误'})
                }
            }
        })
    }).then(res=>{
        ctx.body = res
    }).catch(err=>{
        ctx.body = err
    })
}
const getMsgList = async (ctx,next)=>{
    const user = ctx.cookies.get('userId');
    // const {to} = ctx.query;
    let res = {}//常量的错不要再犯了
    await new Promise((resolve,reject)=>{
        let users = {};
        const User = mongoose.model('user');
        User.find({},(e,userDoc)=>{
            if(!e){
                userDoc.forEach(item=>{
                    users[item._id] = {name:item.userName,avatar:item.avatar}
                })
                // console.log(user,to)
                Chat.find({$or:[{from:user},{to:user}]},(err,doc)=>{   //查找from,to对应的聊天记录
                    if(!err){
                        // console.log(doc)
                        res = {success:true,msgs:doc,users}
                        resolve(res)
                    }else{
                        reject({success:false,message:err})
                    }
                })
            }
        })
    }).then(data=> ctx.body = res).catch(e=>ctx.body = {success:false,message:e})
}
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
user.get('/info', getData)
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


// const register = (ctx, next) => {
//     const { userName } = ctx.request.body;
//     const User = model.getModule('user');
//     return new Promise((resolve,reject)=>{//返回Promise对象的执行结果其实就是 ctx.body=
//         User.findOne({ userName },(err, doc) => {
//             if(err){
//                 reject(err)
//                 return;
//             }
//             if (doc) {
//                 reject( { code: 1, message: `用户名${userName}已存在`,doc })
//             }else{
//                 resolve({ code:0, message:doc })
//             }
//         })
//     }).then(({code, message})=>{
//             let registerData = ctx.request.body;
//             const User = model.getModule('user');
//             return new Promise((resolve,reject)=>{//新的Promise决定之前的状态,then也是处理他的状态
//                 User.create({...registerData,passWord:getMd5Pwd(registerData.passWord)}).then(data=>{
//                     console.log(data)
//                     resolve({code:0,data})
//                 },err=>reject(err))
//             })
//     }).then(({code,data})=>{
//         ctx.cookies.set('userId',data._id)
//         ctx.body = {code,data};
//         next();
//     }).catch((err) => {
//         ctx.body = err;
//         next();
//     });
// }