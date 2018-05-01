import {Card, WingBlank,WhiteSpace} from 'antd-mobile';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'


@withRouter
class UserInfoCard extends Component {
    handleChatTo = (item)=>{
        console.log(item)
        console.log(this.props)
        this.props.history.push(`/chat/${item._id}`)
    }
    render() {
        return (
            <WingBlank>
            <WhiteSpace/>
            {this.props.userList.map(item=>
            <div key={item._id}>
                <Card
                    onClick={()=>this.handleChatTo(item)}
                >
                    <Card.Header
                        title={item.userName}                    
                        thumb={require(`../img/${item.avatar}.png`)}
                        extra={item.title}
                    >
                    </Card.Header>
                    <Card.Body>
                        <div>{item.type==='boss'?`招聘要求：${item.desc}`:`个人简介：${item.desc}`}</div>
                        {item.type==='boss'?
                            <div>
                                <div>公司：{item.company}</div>
                                <div>薪资：{item.money}</div>
                            </div>:
                            <div>
                                期望薪资: {item.expectMoney}
                            </div>
                        }
                    </Card.Body>
                </Card>
                <WhiteSpace/>
            </div>
            )}
            </WingBlank>
        );
    }
}

UserInfoCard.propTypes = {
    userList: PropTypes.array.isRequired
};

export default UserInfoCard;