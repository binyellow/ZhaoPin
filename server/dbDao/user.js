const mongoose = require('mongoose');
const User = mongoose.model('user')
/**
 * 查找数据库所有数据
 */
exports.findAll = async ()=>{
    let res = {}
    await User.find({},(err,doc)=>{
        if(err){
            res = {success:false,data:err};
        }else{
            res = {success:true,data:doc};
        }
    })
    return res;
}
/**
 * 根据输入条件查找是否有数据
 * @param {*} params 
 */
exports.findParamsInDB = async (params)=>{
    let res = {exist:false};
    await User.findOne({...params},(err,doc)=>{
        if(err){
            res = {...res,err}
        }else if(doc){
            res = {exist:true,doc,message:'用户已存在'}
        }
    }).then()
    return res
        
    // await new Promise((resolve,reject)=>{
    //     User.findOne({...params},(err,doc)=>{
    //         console.log(1)
    //         if(err){
    //             res = {...res,err}
    //             reject(res)
    //         }else if(doc){
    //             res = {exist:true,doc,message:'用户已存在'}
    //             resolve(res)
    //         }
    //     })
    // }).then(res=>res).catch(e=>e)
}
/**
 * 创建数据
 * @param {*} params 
 */
exports.create = async (params)=>{
    let res = {};
    await User.create({...params}).then(doc=>{
        res = {success:true,doc}
    }).catch(e=>{
        res = {success:false,message:'后台出错啦'}
    })
    return res
}

