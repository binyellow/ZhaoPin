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
        createTime:{type:Date,default:new Date()},
        'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}
    },
    chat:{
        from:{type:String,required:true},
        to:{type:String,required:true},
        chatId:{type:String,required:true},
        content:{type:String,required:true},
        chatTime:{type:Number,default:Date.now},
        read:{type:Boolean,default:false}
    }
}
for (const key in models) {
    if (models.hasOwnProperty(key)) {
        mongoose.model(key,mongoose.Schema(models[key]))
    }
}
// mongoose.model('user',mongoose.Schema(models.user))
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

/**
 * model就是表 params:表名,表模型
 * model = mongoose.model('name',mongoose.Schema)
 * 取这个模型就是mongoose.model(name)
 */