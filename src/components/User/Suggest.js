import React, { Component } from 'react';
import { Input, Modal } from 'antd';

const { TextArea } = Input;

export default class Suggest extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            inputValue: 60,
        }
    }
    change = (e) =>{
        this.setState({content:e.target.value})
    }
    onChange = (value) => {
        this.setState({
          inputValue: value,
        });
    }
    render() {
        return (
        <Modal
            width={300}
            title={<h3>建议</h3>}
            visible={this.props.visible}
            onCancel={()=>this.props.handleChangeVisible(false)}
            onOk={()=>Modal.success({
                title:'提交建议成功',
                content:'谢谢您的建议，我们会做的更好',
                onOk:()=>this.props.handleChangeVisible(false)
            })}
        >
            <TextArea
                rows={4}
                onChange={this.change}
                value={this.state.content}
            >
            </TextArea>
        </Modal>
        );
    }
}
