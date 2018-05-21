### Context 对象
1. context.response
    - type:返回数据类型
    - body:返回数据内容
2. context.request
    - accepts('xml/json'):判断客户端希望接受什么类型数据
### 模板文件
1. 返回的网页
    - context.response.body = fs.createReadStream('path')
## 路由
1. 原生路由
    - context.request.path来获取用户访问路径
2. koa-route路由
    - route = route.get(path,function),然后app.use(route)
### 静态文件
```
const path = require('path');
const serve = require('koa-static');
const main = serve(path.join(__dirname));
app.use(main);
```
### 重定向
1. ctx.response.redirect(path)：是对返回的重定向
### 中间件：app.use(中间件),中间件接收context,next2个参数
```
const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}//next是接下来要执行的函数
app.use(logger);
```
多个中间件的执行顺序就是洋葱模型，先进后出  
### 异步中间件
```
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();
const main = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};
app.use(main);
app.listen(3000);
```
1. async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
2. 中间件的合成
```
const middlewares = compose([logger, main]);
app.use(middlewares);
```
## 错误处理
1. `ctx.throw(404,500)`
2. 处理错误的中间件，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件
3. error 事件的监听
    - 
    ```
    app.on('error', (err, ctx) =>
        console.error('server error', err);
    );
    ```
4. 释放 error 事件:如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效
    - `ctx.app.emit('error', err, ctx);`
### POST和文件的获取
    - `koa-body`模块可以用来从 POST 请求的数据体里面提取键值对
    - 
## WebApp
1. Cookies
    - `ctx.cookies.get('view')`
    - `ctx.cookies.set('view', n)`
2. 表单、文件
    - koa-body模块可以用来从 POST 请求的数据体里面提取键值对