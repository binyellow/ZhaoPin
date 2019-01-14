import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../reducer/UserList-redux";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import { getCollectionList } from "../../reducer/Collection-redux";

@connect(
  state => ({ userList: state.UserList.userList, login: state.login }),
  { getUserList, getCollectionList }
)
export default class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const { login } = this.props;
    this.props.getUserList("genius", { _id: login._id });
    this.props.getCollectionList("boss");
  }
  render() {
    return <UserInfoCard userList={this.props.userList} />;
  }
}
