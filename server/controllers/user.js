const mongoose = require('mongoose');

const { successResponse, failedResponse } = require('../utils/response');
const User = require('../models/user');
const getMd5Pwd = require('../utils/utils');
const { queryOne, query } = require('../dbDao/find');
const create = require('../dbDao/create');
const { updateOne } = require('../dbDao/update');

/**
 * 查询对方（需求方）用户列表
 * @param {*} ctx 上下文对象
 * @param {*} next next指针
 */
const findList = async (ctx,next)=>{
    const {type} = ctx.query;
    const data = await query(User, { type });
    ctx.body = successResponse({data});
}

const register = async (ctx,next)=>{
    const {userName,passWord} = ctx.request.body;
    const isExist = await queryOne(User, {userName});
    let res;
    if(!isExist){
        res = await create(User, {...ctx.request.body, passWord:getMd5Pwd(passWord)})
        ctx.cookies.set('userId', res._id, {httpOnly: true})
        ctx.body = successResponse(res)
    }else{
        ctx.body = failedResponse({message:'已存在'});
    }
}

const update = async (ctx,next)=>{
    const _id = ctx.cookies.get('userId');
    const { body } = ctx.request;
    const data = await updateOne(User, { _id }, {...body});
    ctx.body = successResponse({ data });
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

module.exports = {findList, register, update, getLastLogin}