// import React from 'react';
// import {renderToString,renderToStaticMarkup} from 'react-dom/server';
const koa = require('koa');
const Router = require('koa-router')
const userRouter = require('./user-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-body')//koa-body、koa-bodyparser都可以body-parser暂时不知道为啥不可以
const Chat = ('./models/chat.js');
const path = require('path')
const koaStatic = require('koa-static')
const fs = require('fs');

const app = new koa();
const router = new Router();

app.use(cors({credentials: true}))
app.use(bodyParser())
app.use(koaStatic(path.resolve('build')))
router.use('/user',userRouter.routes(),userRouter.allowedMethods());
app.use((ctx, next)=>{
    if(ctx.request.path.startsWith('/user/')||ctx.request.path.startsWith('/static/')){
        return next()
    }
    // function APP(){
    //     return <h2>woca</h2>
    // }
    ctx.type = 'html';
    // ctx.body = renderToString(<APP></APP>)
    ctx.body = fs.createReadStream(path.join(__dirname+'../build/index.html'));//path.resolve('build/index.html')
})
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