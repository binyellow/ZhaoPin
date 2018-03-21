const mongoose= require('mongoose')

//使用user这个集合
const DB_URL = 'mongodb://localhost:27017/User';
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>console.log('连接成功'))

const models = {
    user:{
        userName:{type:String,required:true},
        passWord:{type:String,required:true},
        type:{type:String,required:true},
        createTime:{type:Date,default:new Date()}
    },
    char:{

    }
}
for (const key in models) {
    if (models.hasOwnProperty(key)) {
        mongoose.model(key,mongoose.Schema(models[key]))
    }
}

module.exports = {
    getModule:function(name){
        return mongoose.model(name)
    }
}
// mongoose.model('user').create({
//     userName:'huangbin',
//     passWord:'123456',
//     type:'genius'
// },(err,doc)=>{
//     if(!err){console.log(doc)}else{console.log(err)}
// })
// User.remove({age:22})
// User.update({user:'huangbin'},{$set:{age:21}},(err,doc)=>console.log(doc))