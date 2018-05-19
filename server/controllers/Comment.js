const mongoose = require('mongoose')
const CompanyComment = mongoose.model('comment');

const addComment = async (ctx,next)=>{
    const from = ctx.cookies.get('userId');
    const { content,to,score,toName,fromName } = ctx.request.body;
    await new Promise((resolve,reject)=>{
        CompanyComment.create({from,to,content,score,toName,fromName},(err,doc)=>{
            if(!err){
                console.log(doc);
                resolve({success:true,num:doc.n})
            }else{
                reject({})
            }
        })
    }).then(res=>ctx.body = res).catch(e=>ctx.body={success:false,message:e})
}
const getCommentList = async (ctx,next)=>{
    let res = {}
    await new Promise((resolve,reject)=>{
        CompanyComment.find({},(err,doc)=>{
            if(err){
                res = {success:false,data:err};
                reject(res);
            }else{
                res = {success:true,data:doc};
                resolve(res);
            }
        })
    })
    ctx.body = res
}

module.exports = {addComment,getCommentList};