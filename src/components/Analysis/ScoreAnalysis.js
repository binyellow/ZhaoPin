import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

export default class ScoreAnalysis extends Component {
    getOption = () => {
        const {commentList} = this.props.UserList;
        const {type} = this.props.login;
        const xData = [];
        const yData = [];
        commentList.forEach(item=>{
          xData.push(item.toName)
          yData.push(item.score)
        })
        return {
          title: {
            text: type==='genius'?'各公司评分':'求职者评分'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['评分']
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
