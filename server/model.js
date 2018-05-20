const mongoose= require('mongoose')

//使用user这个集合
const DB_URL = 'mongodb://localhost:27017/User';
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>console.log('连接成功'))

const models = {
    user:{
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
    },
    chat:{
        from:{type:String,required:true},
        to:{type:String,required:true},
        chatId:{type:String,required:true},
        content:{type:String,required:true},
        chatTime:{type:Number,default:Date.now},
        read:{type:Boolean,default:false}
    },
    comment:{
        from:{type:String,required:true},           //评论者
        fromName:{type:String,required:true},
        to:{type:String,required:true},             //被评论者
        toName:{type:String,required:true},         //被评论者名称
        reviewTime:{type:Number,default:Date.now},  //评论时间
        content:{type:String,required:true},        //评论内容
        score:{type:String},                         //打分
    },
    // comment_application:{
    //     from:{type:String,required:true},           //评论者
    //     to:{type:String,required:true},             //被评论者
    //     reviewTime:{type:Number,default:Date.now},  //评论时间
    //     content:{type:String,required:true},        //评论内容
    //     score:{type:String}                         //打分
    // },
    lastLoginTime:{
        userName:{type:String,required:true},
        time:{type:Number,default:Date.now},
    },
    collections_genius:{
        from:{type:String,required:true},
        to:{type:String,required:true},
        collectionTime:{type:Number,default:Date.now},
        type:{type:String,required:true}             //收藏者类型
    },
    collections_company:{   //被收藏的公司列表的意思
        from:{type:String,required:true},
        to:{type:String,required:true},
        collectionTime:{type:Number,default:Date.now},
        type:{type:String,required:true}             //收藏者类型
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