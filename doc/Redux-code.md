---
title: redux-code
date: 2018-03-12 11:45:13
tags: Redux
version: 0.0.1
---
### 开始阅读前先回顾一下Redux的几个基本的API
1. `const store = createStore(reducer)`
2. `store.dispatch(action)`发起一个动作让reducer匹配
3. `const state = store.getState()`获取当前的state
4. `store.subscribe(listener)`添加监听,每次dispatch都会触发监听函数
5. `bindActionCreators(actions,dispatch)`
<!--more-->
### 具体的调用
```js
const reducer = (state=initialState,action){
    switch(action.type){
        case add:
            return state+1;
        case delete: 
            return state-1;
        default:
            return 0;
    }
}
const store = createStore(reducer)
const state = store.getState()
const listener = () =>{
    console.log(`现在有${store.getState()把枪}`)
}
store.subscribe(listener);
store.dispatch({type:add})
```

### Redux/createStore的简单实现
#### 先理清思路
1. createStore函数创建的对象有getState、dispatch、subscribe方法
2. 创建完就可以获取到初始值default，那么在内部是不是就默认dispatch了一个特别特别特殊的action，来区别用户的action.type
3. 每次dispatch都会触发subscribe订阅的监听函数

```js
export function createStore(reducer){
    let currentState = {};  // 注意这里,在后面的react-redux源码中应该判断是否为空来返回initialState
    let currentListeners = [];
    // getState比较简单就是返回当前state就行了
    function getState(){
        return currentState;
    }
    // 每订阅一个监听函数就推到监听函数数组里面
    function subscribe(listener){
        currentListener.push(listener);
    }
    /*
    *   最主要就是dispatch如何实现了
    *   1. 首先是要改变state对吧？
    *   2. 然后要触发listener
    *   3. 返回一个action对象
    */
    function dispatch(action){
        currentState = reducer(currentState,action);
        currentListeners.forEach(v=>v())
        return action
    }
    // 这里手动dispatch一个动作来返回初始state
    dispatch({type:'@huangbin-redux-study'})
    return {getState,subscribe,dispatch}
}
```

### bindActionCreator实现：其实就是给action绑定上dispatch
```js
// function bindActionCreator(action,dispatch){
//     return (...args)=> dispatch(action(...args))
// }
export function bindActionCreators(actions,dispatch){
    const bound = {}; // 绑定后的
    Object.keys(actions).forEach(item=>{
        // bound[item] = bindActionCreator(actions[item],dispatch)
        bound[item] = (...args) =>dispatch(actions[item](...args));// 这里透传进来参数
    })
    console.log(bound);
    return bound;
}
```