const mongoose = require('mongoose')

const { successResponse, failedResponse } = require('../utils/response')
const UserDB = require('../dbDao/user')
const User = require('../models/user');
const getMd5Pwd = require('../utils/utils')
const { queryOne } = require('../dbDao/find');
const create = require('../dbDao/create')

const findList = async (ctx,next)=>{
    const {type} = ctx.query;
    let res = await UserDB.findList({type});
    ctx.body = res
}

const register = async (ctx,next)=>{
    const {userName,passWord} = ctx.request.body;
    let isExist = await queryOne(User, {userName})//数据库有true,数据库出错false
    let res;
    if(!isExist){//数据库没有这个用户
        res = await create(User, {...ctx.request.body,passWord:getMd5Pwd(passWord)})
        console.log(res);
        ctx.cookies.set('userId',res._id,{httpOnly:false})
        ctx.body = successResponse(res)
    }else{
        ctx.body = failedResponse({message:'已存在'});
    }
}

const update = async (ctx,next)=>{
    const id = ctx.cookies.get('userId');
    const body = ctx.request.body;
    const resData = await UserDB.update(id,{...body});
    ctx.body = resData
}

const getLastLogin = async (ctx,next)=>{
    const {userName} = ctx.query;
    console.log(userName);
    const LastLoginTime = mongoose.model('lastLoginTime')
    let res = {}
    await new Promise((resolve,reject)=>{
        LastLoginTime.find({userName},(err,doc)=>{
            if(err){
                res = {success:false,data:err};
                reject(res);
            }else{
                res = {success:true,data:doc};
                resolve(res);
            }
        })
    })
    ctx.body =  res;
}

module.exports = {findList,register,update,getLastLogin}