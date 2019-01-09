const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const collectionsGeniusSchema = Schema({
  from:{type:String,required:true},
  to:{type:String,required:true},
  collectionTime:{type:Number,default:Date.now},
  type:{type:String,required:true}             //收藏者类型
})

module.exports =  mongoose.model('collectionsGenius', collectionsGeniusSchema);