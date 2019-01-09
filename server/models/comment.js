const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const commentSchema = Schema({
  from:{type:String,required:true},           //评论者
  fromName:{type:String,required:true},
  to:{type:String,required:true},             //被评论者
  toName:{type:String,required:true},         //被评论者名称
  reviewTime:{type:Number,default:Date.now},  //评论时间
  content:{type:String,required:true},        //评论内容
  score:{type:String},                         //打分
})

module.exports =  mongoose.model('Comment', commentSchema);