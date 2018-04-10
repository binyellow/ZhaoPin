const koa = require('koa');
const Router = require('koa-router')
const userRouter = require('./user-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-body')//koa-body、koa-bodyparser都可以body-parser暂时不知道为啥不可以
const model = require('./model')
const Chat = model.getModule('chat')

const app = new koa();
const router = new Router();

// Chat.remove({},(err,doc)=>{console.log(doc)})
app.use(cors({credentials: true}))
app.use(bodyParser())
router.use('/user',userRouter.routes(),userRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods())

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server)
io.on('connection', function(socket){ 
    socket.on('sendMsg',data=>{
        console.log(data)
        Chat.create(data,(err,doc)=>{
            console.log(1+":  "+doc)
            io.emit('receive',Object.assign({},doc._doc))
        });
    })
});
server.listen(9030,()=>{    //服务监听而不是app
    console.log(9030);
})