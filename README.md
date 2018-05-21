---
title: Node.js开发实战
date: 2018-05-15
tag: Node
version: 0.0.1
---
《Node.js开发实战》总结报告
===

### 学习内容

1. Node.js开发实战这本书主要讲的是node的语法基础和基础api、网络编程、单元测试、mongoDB、React、express。
2. Node.js是一个机遇Google所开发的浏览器Chrome V8引擎的JavaScript运行环境，Node.js使用多种先进的技术，其中包括事件驱动、非阻塞式I/O模型，使其轻量又高效。
3. JS基础主要讲了变量、注释、数据类型、函数等，又一次复习了JS，但是要看基础还是得看JS高程，原型和其他基础。
4. Node.js包管理介绍了npm,但是现在比较推荐用cnpm和yarn，介绍了http、url、path等模块
5. 文件系统章节介绍了fs模块，详细内容可[参考](https://nodejs.org/docs/latest-v9.x/api/fs.html)
6. Node.js网络开发介绍了TCP和HTTP，主要是怎么创建客户端和服务端，对后面理解koa的服务端有帮助，详见后文
7. Node.js数据库开发主要介绍了MongoDB的连接与使用，同时也介绍了mysql，想学习下mongo所以选择了它
8. Node.js实战部分介绍了JQeury、React、express，我选择的koa看的是阮一峰的教程和陈深海的教程
9. 详细笔记参见下面学习笔记部分

### 实战和心得

#### 实战

1. 基于上面的基础，我结合socket.io和echarts开发一个在线聊天的招聘系统，可以实现即时聊天、通过echarts查看分析招聘和应聘者信息
2. 前端部分用的creat-react-app脚手架搭建的环境，React、React-Router、Redux管理数据
3. 后台用的Koa2、中间用了koa2-cors解决跨域问题，koa-router管理路由，koa-body获取post请求内容，koa-static处理静态文件
4. mongoDB作为数据库,mongoose来连接管理数据库

#### 心得
1. 通过跟着书边完成自己定的项目，发现项目驱动式的学习效率要远远高于一个劲的看
2. 在敲代码前要整体思考一下，要考虑到代码复用性，可升级维护性，为此我多写了很多重复代码作为学费
3. 在做项目的过程中发现在对于异步的处理Promise的应用，ES6基础上还是特别不熟悉，基础永远是最重要的
4. 要勤做笔记，首先要自己能看得懂，然后要写成别人能看懂的

### 学习笔记

1. [工欲利其事，必先利其器](./doc/VSCode.md)
2. [前端环境搭建](./doc/Front-enviroment.md)
3. [node基础知识](./doc/Node.md)

### 项目运行

1. 项目地址`https://github.com/binyellow/ZhaoPin`
2. `git clone`
3. [安装mongoDB](https://www.mongodb.com/)
4. `cnpm i`安装依赖
5. 配置好mongoDB
    - (./server/model.js)中账号密码端口
6. 依次执行
    - mongod
    - npm run koa
    - npm start
