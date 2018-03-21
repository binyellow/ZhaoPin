const koaRouter = require('koa-router');
const model = require('./model')
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
        console.log(doc)
        ctx.body = {code:0,data:doc}
        next()
    }).catch(e=>{
        ctx.body = e;
        next()
    })
}
const register = (ctx, next) => {
    const { userName } = ctx.request.body;
    const User = model.getModule('user');
    return new Promise((resolve,reject)=>{//返回Promise对象的执行结果其实就是 ctx.body=
        User.findOne({ userName },(err, doc) => {
            if(err){
                reject(err)
                return;
            }
            if (doc) {
                reject( { code: 1, message: `用户名${userName}已存在`,doc })
            }else{
                resolve({ code:0, message:doc })
            }
        })
    }).then(({code, message})=>{
            let registerData = ctx.request.body;
            const User = model.getModule('user');
            new Promise((resolve,reject)=>{//新的Promise决定之前的状态,then也是处理他的状态
                User.create({...registerData}).then(data=>resolve(data),err=>reject(err))
            })
    }).then(({code,message})=>{
        ctx.cookies.set('userId',message._id)
        ctx.body = {code,message};
        next();
    }).catch((err) => {
        ctx.body = err;
        next();
    });
}
const Login = (ctx, next)=>{
    const requestData = ctx.query;
    const User = model.getModule('user');
    console.log(requestData)
    return new Promise((resolve,reject)=>{
        User.findOne({...requestData},(err,doc)=>{
            if(!err){
                resolve(doc)
            }else{
                reject(err)
            }
        })
    }).then(doc=>{
        ctx.cookies.set('userId',doc._id)
        ctx.body = {code:0,doc};
        next();
    })
    .catch(err=>{
        console.log(err);
        ctx.body = {code:1,err,message:'账号密码错误'};
        next();
    })
}


user.get('/info', getData)
user.post('/register', register)//post、get注意一下
user.get('/login',Login)

module.exports = user