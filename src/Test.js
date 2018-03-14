import React from 'react';
import {Link} from 'react-router-dom'
import './config'
export default class Test extends React.Component{
    render(){
        const location = this.props.match.params;
        console.log(location,this.props);
        return (
            <div>
                <Link to="/dashboard">DashBoard</Link><br/>
                测试组件  {Object.keys(location)+"--"+Object.values(location)}
            </div>
        )
    }
}

