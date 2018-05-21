import MediaQuery from 'react-responsive';
import React,{Component} from 'react';
import LoginPc from './LoginPc';
import LoginMobile from './LoginMobile'

export default class Login extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <MediaQuery minWidth={800}> {/*屏幕适配当屏幕分辨率大于800px时渲染Pc*/}
                    <LoginPc/>
                </MediaQuery>
                <MediaQuery maxWidth={800}> {/*屏幕适配当屏幕分辨率小于800px时渲染Pc*/}
                    <LoginMobile></LoginMobile>
                </MediaQuery>
            </div>
        )
    }
}
