const koaRouter = require('koa-router');
const model = require('./model')
const mongoose= require('mongoose')
const filter = {'pwd':0,'__v':0}
const lodash = require('lodash')
const getMd5Pwd = require('./utils/utils')
const {register,findAll,update} = require('./controllers/user')


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
            mongoose.model('user').findOne({...requestData,passWord:getMd5Pwd(requestData.passWord)},
            {userName:1,passWord:1,type:1,_id:1}).then(data=>{
                resolve(data)
            })
        }
    }).then(doc=>{
        ctx.cookies.set('userId',doc._id)
        ctx.body = {code:0,doc};
        next();
    })
    .catch(err=>{
        ctx.body = {code:err.code||1,err,message:'账号密码错误'};
        next();
    })
}

const EditPwd = (ctx,next)=>{
    const {userName,passWord,newPassWord,type} = ctx.query;
    const User = model.getModule('user');
    return new Promise((resolve,reject)=>{
        User.findOneAndUpdate({userName,passWord:getMd5Pwd(passWord)},{passWord:getMd5Pwd(newPassWord),userName,type},(err,doc)=>{
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


user.get('/info', getData)
user.post('/register', register)//post、get注意一下
user.get('/login',Login)
user.get('/edit-pwd',EditPwd)
user.get('/all',findAll)
user.post('/update',update)


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