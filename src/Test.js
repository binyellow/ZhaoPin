import React from 'react';

export default class Test extends React.Component{
    render(){
        const people = {name:'huangbin',age:21,sex:'male'}
        const location = this.props.match.params;
        // console.log(location,this.props);
        for (const [key,value] of Object.entries(people)) {
            console.log(key,value)
        }
        return (
            <div>测试组件  {Object.keys(location)+"--"+Object.values(location)}</div>
        )
    }
}

