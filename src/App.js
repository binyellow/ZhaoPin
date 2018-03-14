import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addAction,deleteAction} from './reducer/note';
import { Button, Input, Form } from 'antd';

@connect(state=>({textList:state.note}),{addAction,deleteAction})
@Form.create()
class App extends Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    const {textList,addAction,deleteAction,
      form:{getFieldDecorator,setFieldsValue,getFieldsValue}} = this.props;
    return (
      <div>
        {getFieldDecorator('input')(
          <Input 
          id="demo" 
          style={{width:'100px'}}
          onPressEnter={(e)=>{
            const value = getFieldsValue(['input']).input
            if(value){
              addAction(value)
            }
            setFieldsValue({'input':''})
          }}/>
        )}
        <Button type="primary" 
          onClick={()=>{
            const value = getFieldsValue(['input']).input
            if(value){
              addAction(value)
            }
            setFieldsValue({'input':''})
          }}>
        点击
        </Button>
        <ul>
          {textList.map((item,index)=>
            <li 
              onClick={()=>deleteAction(index)} 
              key={item.text+index}>
            {item.text}
            </li>)}
        </ul>
      </div>
    );
  }
}

export default App

// const mapStateToProps = (state, ownProps) => ({
  //  return {
  //   userInfo:state.userInfo
  // }
// })

// const mapDispatchToProps = {
//      
// }

// const mapDispatchToProps = (dispatch) => {
//      return {addUser:(user)=>dispatch(addUser(user))}
// }
// export default connect(mapStateToProps, mapDispatchToProps)(component)
