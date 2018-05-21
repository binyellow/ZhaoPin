### http模块创建http服务端、客户端
### http.createServer()、new http.Server()来创建服务器
1. http.Server事件
    1. request(req,res):客户端发起请求时触发
    2. req事件：
        - data:当数据请求时,返回接收的数据chunk
        - end:数据请求完
        - close:请求结束
    3. req属性:
        - method:请求方法
        - headers:请求头
        - url:请求路径
        - httpVersion:http协议版本
    4. res事件：
        - writeHead:发送相应头
        - write:向客户端发送内容
        - end:结束发送请求
### http.request(option,[callback])、http.get(option,[callback])来创建客户端
1. http.request事件
    1. write:发送请求数据
    2. response:接收到相应
    3. end:发送请求完毕
### 模拟客户端和服务端通信
1. 客户端
```
const http = require('http')
let resData = '';
const req = http.request({
    'host': '127.0.0.1',
    'port': 3000,
    'method': 'post',
})
req.on('response',res=>{
    res.on('data', function (chunk) {
        resData += chunk
    });
    res.on('end', function () {
        console.log(console.log('服务端发送的数据是:',resData))
    });
})
req.write('我是客户端');
req.end()
```
2. 服务端
```
const http = require('http')

const server = new http.createServer((req,res)=>{
    let test = '';
    req.on('data',chunk=>{
        test += chunk;
    })
    req.on('end',()=>console.log('客户端发送的请求是:',test))

    res.writeHead(200,{'content-type':'test/html'})
    res.write("我是服务端")
    res.end()
});
server.listen(3000,()=>console.log('Server listen on 3000 start'))
```