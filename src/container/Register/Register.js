import React, { Component } from 'react'
import MediaQuery from 'react-responsive';
import RegisterMobile from './RegisterMobile'
import RegisterPc from './RegisterPc'

export default class Register extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <MediaQuery minWidth={800}> {/*屏幕适配当屏幕分辨率大于800px时渲染Pc*/}
                    <RegisterPc></RegisterPc>
                </MediaQuery>
                <MediaQuery maxWidth={800}> {/*屏幕适配当屏幕分辨率小于800px时渲染Pc*/}
                    <RegisterMobile></RegisterMobile>
                </MediaQuery>
            </div>
        )
    }
}
