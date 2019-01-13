import React, { Component } from "react";
import globalStyles from "../../common/globalStyles.less";
import { Form, Input, Button, Modal, Row, Col } from "antd";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { editPassWord } from "../../services/user";
import { LoadData } from "../../reducer/login";
import AuthRoute from "../../components/AuthInfo/AuthInfo";
const FormItem = Form.Item;
const FormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
@Form.create()
@withRouter
@connect(
  state => ({ login: state.login }),
  { LoadData }
)
export default class EditPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passWord: "",
      newPassWord: "",
      repeatNewPassWord: {
        value: ""
      }
    };
  }
  handleChangeState = (key, value) => {
    this.setState({
      [key]: value
    });
  };
  validRepeatPwd = value => {
    if (value === this.state.newPassWord) {
      return {
        validateStatus: "success"
      };
    } else {
      return {
        validateStatus: "error"
      };
    }
  };
  handleRepeatPwdChangeState = value => {
    this.setState({
      repeatNewPassWord: {
        ...this.validRepeatPwd(value),
        value
      }
    });
  };
  handleEditPassWord = () => {
    const {
      form: { validateFields },
      login: { type = "genius", _id }
    } = this.props;
    const fieldNames = ["passWord", "newPassWord", "repeatNewPassWord"];
    validateFields(fieldNames, (err, values) => {
      if (!err) {
        editPassWord({ ...values, type, _id }).then(res => {
          if (res.status === 200) {
            if (!res.data.success) {
              Modal.error({ title: "修改失败", content: res.data.message });
            } else {
              Modal.success({
                title: "修改成功",
                content: "请记住您的新密码",
                onOk: () => {
                  this.props.history.push("/login");
                }
              });
            }
          }
        });
      }
    });
  };
  render() {
    const path = this.props.location.pathname;
    const {
      form: { getFieldDecorator },
      login: { redirectTo, isAuth }
    } = this.props;
    // const {isAuth,type} = this.props.login;
    return (
      <div className={globalStyles.wrapper}>
        {/* {this.props.login.isAuth||this.props.login.type?null:<Redirect to="/login"/>} */}
        {/* {redirectTo&&path!==redirectTo?<Redirect to={redirectTo}/>:null} */}
        <Logo />
        <FormItem label="原始密码" help {...FormItemLayout}>
          {getFieldDecorator("passWord", {
            rules: [{ required: true }]
          })(
            <Input
              type="password"
              onChange={e => this.handleChangeState("passWord", e.target.value)}
            />
          )}
        </FormItem>
        <FormItem label="新密码" help {...FormItemLayout}>
          {getFieldDecorator("newPassWord", {
            rules: [{ required: true }]
          })(
            <Input
              type="password"
              onChange={e =>
                this.handleChangeState("newPassWord", e.target.value)
              }
            />
          )}
        </FormItem>
        <FormItem
          label="重复新密码"
          help
          hasFeedback
          validateStatus={this.state.repeatNewPassWord.validateStatus || ""}
          {...FormItemLayout}
        >
          {getFieldDecorator("repeatNewPassWord", {})(
            <Input
              type="password"
              onChange={e => this.handleRepeatPwdChangeState(e.target.value)}
            />
          )}
        </FormItem>
        <Row type="flex" justify="center" className={globalStyles.operator}>
          <Col style={{ marginBottom: "5px" }}>
            <Button type="primary" onClick={this.handleEditPassWord}>
              修改密码
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              返回
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
