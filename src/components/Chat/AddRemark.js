import React, { Component } from 'react';
import { Input, Modal, Slider,Row,Col,InputNumber } from 'antd';

const { TextArea } = Input;

export default class AddRemark extends Component {
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
            title={<h3>评论</h3>}
            visible={this.props.visible}
            onCancel={()=>this.props.handleChangeVisible(false)}
            onOk={()=>this.props.handleComment(this.state.content,this.state.inputValue)}
        >
            <TextArea
                rows={4}
                onChange={this.change}
                value={this.state.content}
            >
            </TextArea>
            <Row style={{marginTop:'10px'}}>
                <Col span={4}>
                    <h4>评分：</h4>
                </Col>
                <Col span={12}>
                    <Slider min={0} max={100} onChange={this.onChange} value={this.state.inputValue} />
                </Col>
                <Col span={4}>
                <InputNumber
                    min={0}
                    max={100}
                    style={{ marginLeft: 16 }}
                    value={this.state.inputValue}
                    onChange={this.onChange}
                />
                </Col>
            </Row>
        </Modal>
        );
    }
}
