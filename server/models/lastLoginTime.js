const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const lastLoginTimeSchema = Schema({
  userName:{type:String,required:true},
  time:{type:Number,default:Date.now},
})

module.exports =  mongoose.model('lastLoginTime', lastLoginTimeSchema);