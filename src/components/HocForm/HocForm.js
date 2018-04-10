import React,{Component} from 'react';

export default function HocForm(Com) {
    return class HocForm extends Component {
        // 抽出公共的方法和state
        constructor(props){
            super(props)
            this.state = {

            }
        }
        handleChangeState = (key,value)=>{
            this.setState({[key]:value})
        }
        render() {
            return (
                <Com 
                {...this.props}
                state={this.state}
                handleChangeState={this.handleChangeState}
                ></Com>
            )
        }
    }
}
