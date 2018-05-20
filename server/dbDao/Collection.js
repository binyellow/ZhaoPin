/**
 * @param {*} modelName 传入的模型名
 * @param {*} params 传的参数，参数都应在controller或者service中处理好
 */
const find = async (modelName,params)=>{
    let res = {exist:false};
    await new Promise((resolve,reject)=>{
        modelName.find({...params},(err,doc)=>{
            if(doc.length){
                console.log(doc);
                res = {exist:true,doc,message:'已存在'}
                resolve(res);
            }else{
                resolve(res)
            }
        })
    })
    return res
}

const create = async (modelName,params)=>{
    let res = {};
    await modelName.create(params).then(doc=>{
        res = {success:true,doc}
    }).catch(e=>{
        res = {success:false,message:'后台出错啦'}
    })
    return res
}

const remove = async (modelName,params)=>{
    let res = {};
    await modelName.remove(params).then(doc=>{
        res = {success:true,doc}
    }).catch(e=>{
        res = {success:false,message:'后台出错啦'}
    })
    return res
}

module.exports = {find,create,remove}