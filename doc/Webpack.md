---
title: Webpack
date: 2018-02-13 23:57:56
tags:
    - Webpack
categories: Webpack
---
*注意插件和loader版本问题,要适配webpack4.0*
### Webpack自动刷新和模块热替换

#### 自动刷新
1. iframe模式
2. inline模式

#### 模块热替换（--hot): 是指不需要完全刷新就能更新各个模块
- 要使用模块热替换需指定publicPath: 因为存在path的情况下,webpack-dev-server生成的包并没有放在你的真实目录中,而是放在了内存中
- publicPath: 为项目中的所有资源指定一个基础路径
<!--more-->

### loader要怎么写？

#### 写法有很多,简单点说话的方式简单点
```js
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    preset: ['env','react']
                }
            }
        },
        {
            test: /\.less$/,
            user: [
                'style-loader','css-loader?modules','less-loader'
            ]
        },
        {
            test: /\.(jpg|png|svg|gif)$/,
            use: ['file-loader']
        }
    ]
}
```

- file-loader
file-loader会把import进来的图片资源路径最后转换成输出目录图像的最终路径,同理css-loader也会将background-image:url('path')一样处理

- extract-text-webpack-plugin插件分离css后用html-webpack-plugin来动态加载css

### plugins

#### eslint
- 在webpack中配置eslint-loader
- .eslintrc.js中可配置extends:["standard"]等规范
- 在rules：{}中添加自己的规范

#### tree-shaking
- 把没有调用的引用筛掉
- 然后`--optimize-minimize`: 最小化JavaScript并切换加载器以最小化

#### 装饰器是`transform-decorator-legacy`

### 设置mode来快速

#### development
- 浏览器调试工具
- 开发阶段的详细错误日志和提示
- 快速和优化的增量构建机制

#### production
- 开启所有的优化代码
- 更小的bundle大小
- 去除掉只在开发阶段运行的代码
- Scope hoisting和Tree-shaking
- 自动启用uglifyjs对代码进行压缩

### splitChunks代码分割
- `optimization.splitChunks`
    - name: 命名
    - chunks: initial| all| async
    - minSize: 
    - minChunks:
    - maxInitialRequest
    - cacheGroups: {}
    - [更多](https://webpack.js.org/plugins/split-chunks-plugin/#optimization-runtimechunk)

### lazyLoad

#### require.ensure
- 语法: require.ensure(dependencies: String[], callback: function([require]), [chunkName: String])
- dependencies: 依赖的模块数组
- callback: 回调函数，该函数调用时会传一个require参数
- chunkName: 模块名，用于构建时生成文件时命名使用
注意点：require.ensure的模块只会被下载下来，不会被执行，只有在回调函数使用require(模块名)后，这个模块才会被执行。

#### import.then
- `import(/*webpackChunkName:'testB'*/'./SubPageB').then((SubPageB)=>console.log(SubPageB))`
- 注释是webpack3的魔法注释,也就是打包后的文件名