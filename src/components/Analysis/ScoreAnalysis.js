import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

export default class ScoreAnalysis extends Component {
    getOption = () => {
        const {userList,commentList} = this.props.UserList;
        const {type} = this.props.login;
        const xData = [];
        const yData = [];
        userList.forEach(item=>{
            if(type==='genius'){
                xData.push(item.userName);
                yData.push(item.money)
            }else{
                xData.push(item.userName);
                yData.push(item.expectMoney)
            }
        })
        return {
          title: {
            text: type==='genius'?'各公司工资':'求职者期待薪资'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['工资']
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
              name:'评分',  //对应折线图上选中时选择的标题
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
