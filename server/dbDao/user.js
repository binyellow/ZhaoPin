const mongoose = require('mongoose');
const User = mongoose.model('user')
/**
 * 查找数据库所有数据
 */
exports.findList = async (params)=>{
    let res = {}
    console.log(params.type);
    let newParams;
    if(params.type){
        newParams = params;
    }else{
        newParams = null
    }
    await new Promise((resolve,reject)=>{
        User.find({...newParams},(err,doc)=>{
            if(err){
                res = {success:false,data:err};
                reject(res);
            }else{
                res = {success:true,data:doc};
                resolve(res);
            }
        })
    })
    return res;
}
/**
 * 根据输入条件查找是否有数据
 * @param {*} params 
 */
exports.findParamsInDB = async (params)=>{
    let res = {exist:false};
    // await User.findOne({...params},(err,doc)=>{
    //     if(err){
    //         res = {...res,err}
    //     }else if(doc){
    //         res = {exist:true,doc,message:'用户已存在'}
    //     }
    // }).then()
    await new Promise((resolve,reject)=>{
        User.find({...params},(err,doc)=>{
            if(doc.length){
                res = {exist:true,doc,message:'已存在'}
                resolve(res);
            }else{
                resolve(res)
            }
        })
    })
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
    await User.create(params).then(doc=>{
        res = {success:true,doc}
    }).catch(e=>{
        res = {success:false,message:'后台出错啦'}
    })
    return res
}
/**
 * 找到并更新数据
 */
exports.update = async (query,params)=>{
    let res = {};
    await new Promise((resolve,reject)=>{
        User.findByIdAndUpdate(query,params,(err,doc)=>{
            if(!err){
                const data = Object.assign({},{
                    userName:doc.userName,
                    type:doc.type
                },params)
                console.log(doc)
                res = {success:true,data}
                resolve(res);
            }else{
                res = {success:false,message:'服务器出错'}
                reject(err);
            }
        })
    })
    return res
}
