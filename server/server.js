const express = require('express');
const mongoose = require('mongoose');
const app = new express();
//使用user这个集合
const DB_URL = 'mongodb://localhost:27017/User';
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>console.log('连接成功'))
const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,required:true},
    age:{type:Number,required:true}
}))
// User.create({
//     user:'huangbin',
//     age:22
// },(err,doc)=>{
//     if(!err){console.log(doc)}else{console.log(err)}
// })
// User.remove({age:22})
// User.update({user:'huangbin'},{$set:{age:21}},(err,doc)=>console.log(doc))
app.get('/data',(req,res)=>{
    User.find({user:'huangbin'},(err,doc)=>res.json(doc))
})
app.listen(9030,()=>{
    console.log(1);
})