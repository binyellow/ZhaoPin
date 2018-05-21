---
title: react-redux
date: 2018-03-18 23:02:28
tags: Redux
version: 0.0.1
---
### context了解一下
1. 上下文环境
2. 使用了就要类型校验

<!--more-->

在传入context的组件中要校验context类型并返回context
```js
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: 'binyellow'
    }
  }
  static childContextTypes = {
    user: propTypes.string
  }
  getChildContext(){
    return this.state
  }
  render(){
    return (
      <div>
        App
        <GrandChild></GrandChild>
      </div>
    )
  }
}
```
在使用context的组建中校验
```js
class GrandChild extends Component{
  static contextTypes = {
    user: propTypes.string
  }
  render(){
    console.log(this.context);
    return(
      <div>
        GrandChildName: {this.context.user}
      </div>
    )
  }
}
```

### 高阶函数了解一下
1. connect函数形如:`connect(mapStateToProps,mapDispatchToProps)(APP)`
2. 实质上是高阶函数中返回了一个高阶组件
3. 怎么实现
```js
export function connect(mapStateToProps,mapDispatchToProps){
    return function(WrappedComponent){
        return class ConnectComponent extends Component{
            ...
        }
    }
}
```
4. 箭头函数实现
```js
export const connect = (mapStateToProps,mapDispatchToProps)=>(WrappedComponent)=>{
    return class ConnectComponent extends Component{
        ...
    }
}
```


### connect是什么：connect其实就是给传入的组件包裹上context的属性,来拿到全局的属性store

### 正题：connect如何实现
```js
export const connect = (mapStateToProps=state=>state,mapDispatchToProps={})=>(WrappedComponent)=>{
    return class ConnectComponent extends Component{
        static contextTypes = {
            store: propTypes.object
        }
        constructor(props,context){
            super(props,context)
            this.state = {
                props:{}
            }
        }
        componentDidMount(){
            //每次dispatch都会触发subscribe,利用此来更新stateProps
            const {store} = this.context;
            store.subscribe(()=>this.update())
            this.update()
        }
        update(){
            const {store} = this.context;
            console.log(store);
            // 这里面来把state分发出去
            const stateProps = mapStateToProps(store.getState());
            // 这里把action都包一层dispatch
            const actionProps = bindActionCreators(mapDispatchToProps,store.dispatch)   // bindActionCreators详见redux
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...actionProps
                }
            })
        }
        render(){
            return (
                // 从context中获取的state和用dispatch包装后的action传给组件WrappedComponent
                <WrappedComponent {...this.state.props}></WrappedComponent>
            )
        }
    }
}
```