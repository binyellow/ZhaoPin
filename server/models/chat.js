const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const chatSchema = Schema({
  from:{type:String,required:true},
  to:{type:String,required:true},
  chatId:{type:String,required:true},
  content:{type:String,required:true},
  chatTime:{type:Number,default:Date.now},
  read:{type:Boolean,default:false}
})

module.exports =  mongoose.model('Chat', chatSchema);