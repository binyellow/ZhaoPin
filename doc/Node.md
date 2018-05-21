---
title: Node基础
date: 2018-05-15
tag: Node
version: 0.0.1
---

### 首先先熟悉JS基础
1. [CNode:Node.js包教不包会](https://github.com/alsotang/node-lessons)
2. 模块快速入门导引
    1. [HTTP](./Node-HTTP.md)
    2. FS文件操作
3. Koa
    1. 简介就不介绍了，就是express团队升级的产品哈
    2. 一个最简单的服务
    ```js
    // main.js
    const koa = require('koa')
    const app = new koa()

    app.use(ctx=>{
        ctx.body = 'hello world'
    })
    app.listen(3000)
    ```
    3. `nodemon main.js`然后访问`localhost:3000`
    4. [Koa一些详细](./Koa.md)