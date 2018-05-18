import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import cityData from '../../common/city'
import {getMaxNumber} from '../../common/utils'
require('echarts/map/js/china.js');

export default class WorkingSpaceAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
      componentWillMount(){
        this.setState({option:this.getOption()})
      }
      getOption = () => {
        const userList = this.props.UserList;   //对应的用户列表
        const {type} = this.props;
        const legendData = userList.map(item=>item.userName);
        const workingPlaceTotal = this.props.UserList.map(item=>item.workingPlace);
        const seriesData = this.props.UserList.map(item=>{
            const workingPlace = cityData[0].find(v=>v.value===item.workingPlace)
            return {
                name: item.userName,
                type: 'map',
                mapType: 'china',
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data:[
                  {name: workingPlace?workingPlace.label:'',value: workingPlace?1:0 },
                ]
            }
        })
        console.log(seriesData);
        return {
          title: {
            text: type==='boss'?'牛人意向工作城市':'应聘职位工作地点',
            // subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item' //触发类型
          },
          legend: { // 图例
            orient: 'vertical',     //图例列表的布局朝向
            left: 'left',
            data: legendData    //图例的数据数组
          },
          visualMap: {  //数值范围
            min: 0, //数据的最小值
            max: getMaxNumber(workingPlaceTotal),
            left: 'left',
            top: 'bottom',
            text: ['高','低'],       // 文本，默认为数值文本
            calculable: true    // 是否显示拖拽用的手柄
          },
          toolbox: {    //工具栏
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
            //   dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          series: seriesData
        };
    };
    render() {
        return (
            <div>
                <ReactEcharts
                option={this.state.option}
                style={{height: '500px', width: '100%'}}
                className='react_for_echarts' />
            </div>
        );
    };
}
