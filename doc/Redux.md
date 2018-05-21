### 从需求出发，看看使用React需要什么？
#### 回顾props和state
1. props意味着父级分发下来的属性
2. state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，或者自行内部消化。理解这个是理解React和Redux的前提。
#### 当你用React写了几个组件的时候发现React根本无法让两个组件互相交流，使用对方的数据，使用生命方法才能传递数据？
1. **提升state**，将**state放到共有的父组件中**来管理，再**作为props分发回子组件**。
3. 子组件改变父组件state的办法：通过onClick触发父组件声明好的回调。
#### 怎么更好的管理state?
1. 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。
2. 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。
#### 再回来看看重现上面结构的需求：
1. 需要回调通知state (等同于回调参数) -> action
2. 需要根据回调处理 (等同于父级方法) -> reducer
3. 需要state (等同于总状态) -> store
4. 对Redux来说只有这三个要素：
    1. action是纯声明式的数据结构，只提供事件的所有要素，不提供逻辑。
        1. action动作一般返回
        ```js
            {
                type:'ADD',
                payload
            }
        ```
    2. reducer是一个匹配函数，action的发送是全局的：所有的reducer都可以捕捉到并匹配与自己相关与否，相关就拿走action中的要素进行逻辑处理，修改store中的状态，不相关就不对state做处理原样返回。
        1. reducer根据action的type来对数据state做相应的处理
        ```js
        function reducerTest(state=initialState,action){
            switch(action.type){
                case 'ADD':
                    return {...state,action.payload++}
                default:
                    return state
            }
        }
        ```
    3. store负责存储状态并可以被react api回调，发布action.当然一般不会直接把两个库拿来用，还有一个binding叫react-redux, 提供一个Provider和connect。很多人其实看懂了redux卡在这里。
#### 关于React-Redux
1. Provider是一个普通组件，可以作为顶层app的分发点，它只需要store属性就可以了。它会将state分发给所有被connect的组件，不管它在哪里，被嵌套多少层。
2. connect是真正的重点，它是一个科里化函数，意思是先接受两个参数（数据绑定mapStateToProps和事件绑定mapDispatchToProps），再接受一个参数（将要绑定的组件本身）：mapStateToProps：构建好Redux系统的时候，它会被自动初始化，但是你的React组件并不知道它的存在，因此你需要分拣出你需要的Redux状态，所以你需要绑定一个函数，它的参数是state，简单返回你关心的几个值。
    1. mapDispatchToProps：声明好的action作为回调，也可以被注入到组件里，就是通过这个函数，它的参数是dispatch，通过redux的辅助方法bindActionCreator绑定所有action以及参数的dispatch，就可以作为属性在组件里面作为函数简单使用了，不需要手动dispatch。
    2. mapDispatchToProps是可选的，如果不传这个参数redux会简单把dispatch作为属性注入给组件，可以手动当做store.dispatch使用。这也是为什么要科里化的原因。做好以上流程Redux和React就可以工作了。简单地说就是：
        1. 顶层分发状态，让React组件被动地渲染。
        2. 监听事件，事件有权利回到所有状态顶层影响状态。
3. connect的例子
```js
const mapStateToProps = (state, ownProps) => ({
   return {
    userInfo:state.userInfo
  }
})

const mapDispatchToProps = (dispatch) => {
     return {addUser:(user)=>dispatch(addUser(user))}
}
export default connect(mapStateToProps, mapDispatchToProps)(component)
```