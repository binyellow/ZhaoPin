const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = Schema({
  userName:{type:String,required:true},   //用户名
  passWord:{type:String,required:true},   //密码
  type:{type:String,required:true},       //类型
  createTime:{type:Number,default:Date.now},  //注册时间 {type:Date,default:new Date()}
  avatar:{'type':String},               //头像
  desc:{'type':String},                 // 个人简介或者职位简介
  workingPlace:{type:String},           // 工作地点
  title:{'type':String},                // 职位名
  experience:{type:String},               // 工作经验
  expectMoney:{type:String},              // 期望薪资
  company:{'type':String},              // 公司
  money:{'type':String},                // 工作薪资
})

module.exports =  mongoose.model('User', userSchema);