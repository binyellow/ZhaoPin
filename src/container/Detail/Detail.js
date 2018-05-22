import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Modal,Row,Col} from 'antd';
import {Result,NavBar,Icon,List,Button,Popover} from 'antd-mobile';
import {getUserList,getAllCommentList} from '../../reducer/UserList-redux'
import {getCollectionList} from '../../reducer/Collection-redux'
import experienceData from '../../common/experience'
import cityData from '../../common/city'
import {getLastLogin} from '../../services/user'
import {collectItem} from '../../services/collection'
import AddRemark from '../../components/Chat/AddRemark'
import {addComment} from '../../services/comment'

const {Item} = List
const {Brief} = Item
@connect(
    state=>state,
    {getUserList,getAllCommentList,getCollectionList}
)
export default class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            lastLoginTime:'',
            modalVisible:false,
            popVisible:false
        }
    }
    componentWillMount(nextProps,nextState){
        const {type} = this.props.login;
        const {userList} = this.props.UserList;
		if(!userList.length){
			this.props.getUserList(type==='boss'?'genius':'boss') 
		}
	}
    componentDidMount(){
        const {username} = this.props.match.params;
        const {userName} = this.props.UserList.userList.find(item=>item._id===username)
        getLastLogin({userName}).then(res=>{
            if(res.status===200){
                if(res.data.success){
                    this.setState({lastLoginTime:res.data.data[0].time})
                }
            }
        })
    }
    toChat = () =>{
        const {username} = this.props.match.params;
        this.props.history.push(`/chat/${username}`)
    }
    handleVisible = (flag=true,popReset)=>{
        this.setState({modalVisible:flag})
        if(popReset==='yes'){
            this.setState({popVisible:false})
        }
    }
    comment = (content,score) =>{       //评论
        const to = this.props.match.params.username;
        const {userList} = this.props.UserList;
        const {type,userName} = this.props.login;
        const toName = userList.find(item=>item._id===to).userName;
        addComment({content,to,score,toName,fromName:userName,type}).then(res=>{
            if(res.status===200&&res.data.success){
                Modal.success({
                    title:'评论成功',
                    onOk:()=>{
                        this.setState({modalVisible:false})
                        this.props.getAllCommentList()
                    }
                })
            }
        });
    }
    collection = () =>{     //收藏
        const to = this.props.match.params.username;
        const {type} = this.props.login;
        collectItem({type,to}).then(res=>{
            if(res.status===200&&res.data.success){
                console.log(res.data.doc);
                this.props.getCollectionList(type);
            }
        });
    }
    render() {
        const {username} = this.props.match.params
        const {userList,commentList} = this.props.UserList
        const {collectionList} = this.props.CollectionList;
        const {_id} = this.props.login;
        const isCollected = collectionList.some(v=>v.from===_id&&v.to===username)
        const userItem = userList.find(v=>v._id===username)
        const thisOneCommentList = commentList.filter(v=>v.to===username);
        const workingPlace = cityData[0].find(item=>item.value===userItem.workingPlace)
        const myImg = src => <img src={require(`../../components/NavLink/img/${src}.png`)} className="am-icon am-icon-xs" alt="" />;
        return (
            <div>
                <NavBar className='fixd-header' mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={
                        <Popover mask
                          overlayClassName="fortest"
                          overlayStyle={{ color: 'currentColor' }}
                          visible={this.state.popVisible}
                          overlay={[
                            (<Popover.Item key="6" value="button ct" icon={myImg('comment')}>
                              <span onClick={()=>this.handleVisible(true,'yes')}>评论</span>
                            </Popover.Item>),
                          ]}
                          align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                          }}
                          onVisibleChange={this.handleVisibleChange}
                          onSelect={this.onSelect}
                        >
                          <div style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          >
                            <Icon type="ellipsis" />
                          </div>
                        </Popover>
                    }
                >
					{userItem?userItem.userName:''}详细信息
				</NavBar>
                <div style={{marginTop:'45px'}}>
                    <Result
                        img={<img style={{width:50}} src={require(`../../components/img/${userItem.avatar?userItem.avatar:'boy'}.png`)  }/>}
                        title={userItem?userItem.userName:''}
                    />
                    <List>
                        <Item multipleLine>
                            <Brief>
                                {userItem.type==='boss'?'技能要求':'技术栈'}：{userItem.desc}
                            </Brief>
                            <Brief>
                                {userItem.type==='boss'?'工作经验要求':'工作经验'}：{experienceData[userItem.experience]}
                            </Brief>
                            <Brief>
                                工作地点：{workingPlace.label}
                            </Brief>
                            <Brief>
                                {userItem.type==='boss'?'招聘岗位':'应聘岗位'}：{userItem.title}
                            </Brief>
                            <Brief>
                                {userItem.type==='boss'?`薪资：${userItem.money}`:`期待薪资：${userItem.expectMoney}`}
                            </Brief>
                            <Brief>
                                注册时间：{new Date(userItem.createTime).toLocaleString()}
                            </Brief>
                            <Brief>
                                最后登录时间：{this.state.lastLoginTime===''?'':new Date(this.state.lastLoginTime).toLocaleString()}
                            </Brief>
                        </Item>
                    </List>
                </div>
                <Row style={{margin:'5px 0'}} type="flex" justify="space-around">
                    <Col span={7}>
                        <Button 
                            type="primary" 
                            onClick={this.toChat}
                        >
                            发送消息
                        </Button>
                    </Col>
                    <Col span={7}>
                        <Button 
                            type="primary" 
                            onClick={()=>this.handleVisible(true)}
                        >
                            评论
                        </Button>
                    </Col>
                    <Col span={7}>
                        <Button 
                            type="primary" 
                            onClick={this.collection}
                        >
                            {isCollected?'取消收藏':'收藏'}
                        </Button>
                    </Col>
                </Row>
                <List renderHeader={()=><h4>评价列表：</h4>}>
                    {thisOneCommentList.map(item=>
                        <Item key={item._id}>
                            <Brief>
                                <h4>{item.fromName}：</h4>
                            </Brief>
                            <Brief>
                                评分：{item.score}分
                            </Brief>
                            <Brief>
                                评价：{item.content}
                            </Brief>
                            <Brief>
                                时间：{new Date(item.reviewTime).toLocaleString()}
                            </Brief>
                        </Item>
                    )}
                </List>
                <AddRemark 
                    visible={this.state.modalVisible} 
                    handleChangeVisible={this.handleVisible}
                    handleComment={this.comment}
                />
            </div>
        )
    }
}
