const mongoose = require('mongoose')
const CollectionGenius = mongoose.model('collections_genius');
const CollectionCompany = mongoose.model('collections_company');
const {find,create,remove} = require('../dbDao/Collection')

const collectGenius = async (ctx,next)=>{
    const from = ctx.cookies.get('userId');
    const {to} = ctx.query;
    const isExist = await find(CollectionGenius,{from,to})
    let res;
    if(!isExist.exist){//数据库没有这个用户
        res = await create(CollectionGenius,{from,to})
    }else{
        res = {...isExist,success:false}
    }
    ctx.body = res
}
const collectCompany = async (ctx,next)=>{
    const from = ctx.cookies.get('userId');
    const {to} = ctx.query;
    const isExist = await find(CollectionCompany,{from,to})
    let res;
    if(!isExist.exist){//数据库没有这个用户
        console.log('noteExist',isExist);
        res = await create(CollectionCompany,{from,to})
    }else{
        console.log('Exist',isExist);
        res = await remove(CollectionCompany,{from,to})
    }
    ctx.body = res
}
const getCompanyCollection = async (ctx,next)=>{
    const res = {...await find(CollectionCompany),success:true}
    ctx.body = res;
}
const getGeniusCollection = async (ctx,next)=>{
    const res = {...await find(CollectionGenius),success:true}
    ctx.body = res;
}

module.exports = {collectGenius,collectCompany,getCompanyCollection,getGeniusCollection}