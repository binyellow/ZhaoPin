import MediaQuery from 'react-responsive';
import React,{Component} from 'react';
import DashBoardPc from './DashBoardPc';
import DashBoardMobile from './DashBoardMobile';

export default class Login extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <MediaQuery minWidth={800}>
                    <DashBoardPc/>
                </MediaQuery>
                <MediaQuery maxWidth={800}>
					<DashBoardMobile/>
                </MediaQuery>
            </div>
        )
    }
}
