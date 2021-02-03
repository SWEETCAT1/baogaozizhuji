// 基于echarts的画图函数
let echarts = require('echarts/lib/echarts')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')


//耗材分布柱状图
export function drawPie(arg,dom) {
  console.log(arg)
  //arg是一个消耗数值的数组,dom是拿到当前的dom
  //option是基础样式
  let option = {
    color:['#5b9bd5',
      '#ffc000',
      '#ff0000',
      '#ce7335'],
    title: {
      show: true,
      textStyle: {
        color: '#333333',
        fontStyle: 'normal',
        fontWeight: 'light',
        fontSize: 24,
      },
    },
    legend: {
      orient: "vertical",
      right: 30,
      top:40,
      // itemWidth:40,
      // itemHeight:30,
      data: ["纸张消耗", '订针消耗', '印油消耗', '硒鼓消耗'],
      textStyle:{
        lineHeight:10
      }
    },
    series: [{
      type: "pie",
      radius: ['50%', '70%'],
      right:150,
      labelLine: {
        show: false
      },
      label: {
        show: false
      },
      data: [{
        value: arg[0],
        name: "纸张消耗",
      },  {
        value: arg[1],
        name: "订针消耗"
      }, {
        value: arg[2],
        name:"印油消耗",
      }, {
        value: arg[3],
        name:  "硒鼓消耗"
      },]
    }]
  }
  echarts.init(dom).setOption(option)
}
//数据统计柱状图
// export function setBaroption(){
//   //arg是各个消耗的数组 dom是拿到的dom
//   return {
//     xAxis: {
//       data: [
//         "纸张", "硒鼓", "订针", "印油"
//       ],
//       axisLine: {
//         lineStyle: {}
//       },
//       axisTick: {
//         show: false
//       },
//       axisLabel: {margin: 10},
//     },
//     yAxis: {
//       axisLine: { // 坐标轴轴线
//         lineStyle: {}
//       },
//       axisTick: { //坐标轴刻度
//         show: true
//       },
//       axisLabel: {
//         formatter() {
//           return ""
//         }
//       },//标签距离
//       nameTextStyle: {
//         fontWeight: ''
//       },
//
//     },
//     //图例标记
//     legend: {
//       bottom: 0
//     },
//     series: [
//       {
//         type: "bar",
//         name: '1号机',
//         data: [230, 150, 120, 60],
//         color: ['blue'],
//         label: {
//           show: true,
//           position: 'top',
//           color: 'black'
//         }
//       },
//       {
//         type: "bar",
//         name: '2号机',
//         data: [140, 155, 150, 10],
//         color: ['orange'],
//         label: {
//           show: true,
//           position: 'top',
//           color: 'black'
//         }
//       },
//       {
//         type: "bar",
//         name: '3号机',
//         data: [140, 155, 150, 10],
//         color: ['red'],
//         label: {
//           show: true,
//           position: 'top',
//           color: 'black'
//         }
//       },
//       {
//         type: "bar",
//         name: '4号机',
//         data: [33, 95, 180, 100],
//         color: ['pink'],
//         label: {
//           show: true,
//           position: 'top',
//           color: 'black'
//         }
//       },
//       {
//         type: "bar",
//         name: '5号机',
//         data: [190, 15, 300, 19],
//         color: ['black'],
//         label: {
//           show: true,
//           position: 'top',
//           color: 'black'
//         }
//       }]
//   }
// }






