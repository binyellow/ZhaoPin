const koa = require('koa');
const Router = require('koa-router')
const user = require('./user-router')
const bodyParser = require('koa-body')//koa-body、koa-bodyparser都可以body-parser暂时不知道为啥不可以
const app = new koa();
const router = new Router();


app.use(bodyParser())//这里注意下是new
// app.use(ctx=>{
//     console.log(ctx);
//     ctx.body='1'
// })
router.use('/user',user.routes(),user.allowedMethods());
app.use(router.routes()).use(router.allowedMethods())
app.listen(9030,()=>{
    console.log(1);
})