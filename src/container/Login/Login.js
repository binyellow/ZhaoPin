import MediaQuery from 'react-responsive';
import React,{Component} from 'react';
import LoginPc from './LoginPc';
import LoginMobile from './LoginMobile'

export default class Login extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <MediaQuery minWidth={900}>
                    <LoginPc/>
                </MediaQuery>
                <MediaQuery maxWidth={900}>
                    <LoginMobile></LoginMobile>
                </MediaQuery>
            </div>
        )
    }
}
