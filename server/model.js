const mongoose= require('mongoose')

//使用user这个集合
const DB_URL = 'mongodb://localhost:27017/User';
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>console.log('连接成功'))

const models = {
    user:{
        user:{type:String,required:true},
        age:{type:Number,required:true}
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
//     user:'huangbin',
//     age:22
// },(err,doc)=>{
//     if(!err){console.log(doc)}else{console.log(err)}
// })
// User.remove({age:22})
// User.update({user:'huangbin'},{$set:{age:21}},(err,doc)=>console.log(doc))