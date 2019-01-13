const mongoose = require('mongoose');
const lodash = require('lodash');

const User = require('../models/user');
const LastLoginTime = require('../models/lastLoginTime');
const { successResponse, failedResponse } = require('../utils/response');
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
  try {
    const {type} = ctx.query;
    const data = await query(User, { type });
    ctx.body = successResponse({data});
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error);
  }
}

const register = async (ctx,next)=>{
  try {
    const {userName,passWord} = ctx.request.body;
    const isExist = await queryOne(User, { userName });
    let res;
    if(!isExist){
      res = await create(User, { ...ctx.request.body, passWord:getMd5Pwd(passWord) })
      ctx.cookies.set('userId', res._id, { httpOnly: true })
      ctx.body = successResponse(res)
    }else{
      ctx.body = failedResponse({ message:'已存在' });
    }
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error)
  }
}

const Login = async (ctx, next)=>{
  try {
    const requestData = ctx.query;
    if(lodash.isEmpty(requestData)){
      ctx.body = failedResponse({ message:'请输入合法的账号密码' });
    }else{
      const userResult = await queryOne(User, {...requestData, passWord:getMd5Pwd(requestData.passWord)});
      if(userResult) {
        const loginResult = await queryOne(LastLoginTime, { userName:requestData.userName });
        if(loginResult) {
          updateOne(LastLoginTime, { userName:requestData.userName }, {time:new Date().getTime()});
        } else {
          create(LastLoginTime, { userName: requestData.userName });
        }
        ctx.cookies.set('userId', userResult._id, { httpOnly: true, domain: 'localhost', maxAge: 60*1000 });
        ctx.body = successResponse({ data: userResult });
      } else {
        ctx.body = failedResponse({ message: '账号或密码错误' });
      }
    }
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error)
  }
}

const EditPwd = async (ctx,next)=>{
  try {
    const {passWord, newPassWord, _id = ctx.cookies.get('userId')} = ctx.query;
    const isSamePwd = await queryOne(User, { _id, passWord:getMd5Pwd(passWord) });
    if( isSamePwd && passWord === newPassWord ) {
      ctx.body = failedResponse({ message: '请不要近期试用过的密码' });
    } else {
      const updateResult = await User.findOneAndUpdate({ _id, passWord:getMd5Pwd(passWord) }, { passWord:getMd5Pwd(newPassWord) });
      console.log(updateResult);
      if(updateResult) {
        ctx.body = successResponse({ data: updateResult });
      } else {
        ctx.body = failedResponse({ message:'密码错误' });
      }
    }
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error)
  }
}

const update = async (ctx,next)=>{
  try {
    const _id = ctx.cookies.get('userId');
    const { body } = ctx.request;
    const data = await updateOne(User, { _id }, {...body});
    console.log(data);
    ctx.body = successResponse({ data });
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error)
  }
}

const getLoginInfo = async (ctx,next)=>{
  try {
    const filter = {'passWord': 0, '__v': 0}
    const _id = ctx.cookies.get('userId');
    const data = await queryOne(User, { _id }, filter);
    ctx.body = successResponse({ data });
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error)
  }
}

/**
 * 1. async返回promise
 * 2. await作用域函数必须是async
 * 3. await Promise对象，String=>Promise.resolve(String)
 */
const getLastLogin = async (ctx,next)=>{
  try {
    const { userName } = ctx.query;
    const data = await queryOne(LastLoginTime, { userName });
    ctx.body = successResponse({ data })
  } catch (error) {
    ctx.body = failedResponse({ message: error });
    throw(error)
  }
  // const {userName} = ctx.query;
  // let res = {}
  // await new Promise((resolve,reject)=>{
  //   LastLoginTime.find({userName},(err,doc)=>{
  //     if(err){
  //       res = {success:false,data:err};
  //       reject(res);
  //     }else{
  //       res = {success:true,data:doc};
  //       resolve(res);
  //     }
  //   })
  // })
  // ctx.body =  res;
}

module.exports = { findList, register, EditPwd, Login, update, getLoginInfo, getLastLogin }

/*  test Async
function timeOut(time) {
  return new Promise(resolve=> {
    setTimeout(()=>resolve(`time===>${time}`), time)
  })
}
async function resolve() {
  a = await timeOut(2000);
  console.log(a);
  console.log(1);
  b = await timeOut(5000);
  console.log(b);
  console.log(2);
  return 'end';
}
resolve().then(res=>console.log(res))
*/