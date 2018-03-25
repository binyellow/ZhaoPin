const UserDB = require('../dbDao/user')
const getMd5Pwd = require('../utils/utils')

const findAll = async (ctx,next)=>{
    let res = await UserDB.findAll();
    ctx.body = res
}

const register = async (ctx,next)=>{
    const {userName,passWord} = ctx.request.body;
    let isExist = await UserDB.findParamsInDB({userName})//数据库有true,数据库出错false
    let res;
    if(!isExist.exist){//数据库没有这个用户
        res = await UserDB.create({...ctx.request.body,passWord:getMd5Pwd(passWord)})
        ctx.cookies.set('userId',res.doc._id)
    }else{
        res = {...isExist,success:false}
    }
    ctx.body = res
}
module.exports = {findAll,register}