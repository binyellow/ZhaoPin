import React, { Component } from 'react'
import MediaQuery from 'react-responsive';
import RegisterMobile from './RegisterMobile'
import RegisterPc from './RegisterPc'

export default class Login extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <MediaQuery minWidth={800}>
                    <RegisterPc></RegisterPc>
                </MediaQuery>
                <MediaQuery maxWidth={800}>
                    <RegisterMobile></RegisterMobile>
                </MediaQuery>
            </div>
        )
    }
}
