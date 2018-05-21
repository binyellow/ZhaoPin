import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {getArrNumToObj} from '../../common/utils'

export default class CollectionAnalysis extends Component {
    getOption = () => {
        const {commentList,userList} = this.props.UserList;
        const {collectionList} = this.props;
        const collectedId = collectionList.map(v=>v.to);//被收藏者的id列表
        let collectedName = []
        collectedId.forEach(v=>{
          collectedName.push(userList.find(item=>item._id===v).userName)
        })
        const collectedNameNum = getArrNumToObj(collectedName)
        const {type} = this.props.login;
        const xData = [];
        const yData = [];
        for (const key in collectedNameNum) {
            if (collectedNameNum.hasOwnProperty(key)) {
                yData.push(collectedNameNum[key]);
                xData.push(key)
            }
        }
        // commentList.forEach(item=>{
        //   xData.push(item.toName)
        //   yData.push(item.score)
        // })
        return {
          title: {
            text: type==='genius'?'各公司被收藏数':'求职者被收藏数'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['收藏数']
          },
          toolbox: {
            feature: {
              saveAsImage: {},     
              magicType:{
                  type: ['line', 'bar']
              },
              restore:{}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',  //适用于类目
              boundaryGap : false,  //两边留白
              data : xData,
              axisLabel:{
                interval: 0,  //强制显示所有横轴
                // rotate: -30
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'被收藏数',  //对应折线图上选中时选择的标题
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: yData
            }
          ]
        };
    };
    render() {
        return (
            <div>
                <ReactEcharts option={this.getOption()} />
            </div>
        )
    }
}
