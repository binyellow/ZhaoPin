const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const collectionsCompanySchema = Schema({   //被收藏的公司列表的意思
  from:{type:String,required:true},
  to:{type:String,required:true},
  collectionTime:{type:Number,default:Date.now},
  type:{type:String,required:true}             //收藏者类型
})

module.exports =  mongoose.model('collectionsCompany', collectionsCompanySchema);