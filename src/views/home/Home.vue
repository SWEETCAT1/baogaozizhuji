<template>
<!--  整个页面-->
  <div id="around">
<!--    左边-->
    <div id="tab-left">
      <div id="tab-left0">
        <head-item head-text="当前在线终端" class="headText"></head-item>
        <img src="~assets/img/zhongduanji.png" alt="" id="zizhuji">
        <img src="~assets/img/online.png" alt="" id="online">
        <div id="onlineNums">
          <span>{{onlineNums}}</span>
        </div>
        <div id="onlineTtile">
          <span>当前在线终端数</span>
        </div>
      </div>
      <div id="tab-left1">
        <head-item head-text="耗材消耗分布"></head-item>
        <div id="tab-left1-pie">
          <div ref="pie" id="pieDiv"></div>
          <div id="all-print-div">
            <div id="all-paperuse-top">{{allPrintnums}}</div>
            <div id="all-paperuse-bottom">总打印份数</div>
          </div>
        </div>
      </div>
      <div id="tab-left2">
        <head-item head-text="故障次数"></head-item>
        <img src="~assets/img/zhongduanjihuise.png" alt="" id="huisezizhuji">
        <img src="~assets/img/broken.png" alt="" id="broken">
        <div id="broken-div">
          <div id="brokenNums">
            <span>{{brokenNums}}</span>
          </div>
          <div id="brokenTitle">
            <span>当月故障次数</span>
          </div>
        </div>
      </div>
    </div>
<!--    右边-->
    <div id="tab-right">
      <head-item head-text="设备管理"></head-item>
      <div id="tab-right-top">
        <button-item button-name="预警记录处理" :is-warn="isWarn"
                     :warn-nums="warnNums" id="leftButton" @click.native="openWarnprocessrecord"></button-item>
        <button-item button-name="故障处理记录" :is-warn="isBroken"
                     :warn-nums="brokenNum" id="middleButton" @click.native="openBrokenprocessrecord"></button-item>
        <button-item button-name="打印次数管理" id="rightButton" @click.native="openPrintnums"></button-item>
      </div>
     <div id="tab-right-bottom">
       <device-info></device-info>
     </div>
    </div>
    <add-device></add-device>
    <print-nums></print-nums>
    <warn-processrecord></warn-processrecord>
    <broken-processrecord></broken-processrecord>
    <advice-setting></advice-setting>
  </div>
</template>

<script>
import headItem from "@/components/headItem/headItem";
import buttonItem from "@/components/button/buttonItem";
import deviceInfo from "@/views/home/homeChild/deviceInfo";
import addDevice from "@/views/home/homeChild/addDevice";
import adviceSetting from "@/views/home/homeChild/adviceSetting";
import printNums from "@/views/home/homeChild/printNums";
import brokenProcessrecord from "@/views/home/homeChild/brokenProcessrecord";
import warnProcessrecord from "@/views/home/homeChild/warnProcessrecord";
import {
  getDeviceinfo,
} from "@/network/home";

export default {
  name: "Home",
  components:{
    headItem,
    buttonItem,
    deviceInfo,
    addDevice,
    printNums,
    brokenProcessrecord,
    warnProcessrecord,
    adviceSetting
  },
  data(){
    return {
      // 按钮名称
      isWarn: true,
      isBroken:true,
      //未处理的预警记录数量
      warnNums:0,
      //未处理得故障记录数量
      brokenNum:0,
      //显示修改密码
      isChangePass:false,
      //

      //当前设备在线数量
      onlineNums:0,
      // 当月设备故障次数
      brokenNums:0,
      //各类耗材总数据
      allPrintnums:0,
      allPaperUse:0,
      paperUse:0,
      paperRemain:'',
      drumUse:0,
      drumRemain:'',
      needleUse:0,
      needleRemain:'',
      inkUse:0,
      inkRemain:'',
      //pie图
      option:{
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
          top:60,
          grid:{
            x:400,
            y:20,
            x2:20,
            y2:25
          },
          // itemWidth:40,
          // itemHeight:30,
          // data: ["纸张消耗", '订针消耗', '印油消耗', '硒鼓消耗'],
          textStyle:{
            lineHeight:10
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} 张'
        },

        series: [{
          type: "pie",
          radius: [65, 80],
          right:150,
          label:{show:false},
          labelline:{show:false},
          data: [{
            value: '',
            name:"纸张消耗",
          },  {
            value: '',
            name:"订针消耗",
            tooltip: {
              trigger: 'item',
              formatter: '{b} 对'
            },
          }, {
            value: '',
            name:"印油消耗",
          }, {
            value: '',
            name:"硒鼓消耗",
          },]
        }]
      }
    }
  },
  computed:{
  },
  methods:{
    //打开打印次数管理
    openPrintnums(){
      this.$bus.$emit('openprintnums')
    },
    //打开预警记录处理
    openWarnprocessrecord(){
      this.$bus.$emit('openwarnprocessrecord')
    },
    //打开故障记录处理
    openBrokenprocessrecord(){
      this.$bus.$emit('openbrokenprocessrecord')
    },
    //
    drawPiedom(){
      let echarts = require('echarts/lib/echarts')
      require('echarts/lib/component/title')
      require('echarts/lib/component/legend')
      require('echarts/lib/chart/pie')
      require('echarts/lib/component/tooltip')
      return echarts.init(this.$refs.pie)
    },
    createHome(){
      //初始化页面
      const token = this.$Store.get('token')
      getDeviceinfo(token).then(res=>{
        const value = res.data.Value
        // console.log(value)
        //在线和故障次数
        this.onlineNums = value.OnlineCount
        this.brokenNums = value.NumberOfFailures
        //耗材消耗分布
        this.allPaperUse = value.ConsumptionTotal
        this.allPrintnums = value.TotalCopiesPrinted
        this.paperUse = value.Paper
        this.drumUse = value.XG
        this.needleUse = value.Pin
        this.inkUse = value.YY

        //预警和故障处理
        if(value.WarningRecordPending>=99){
          this.warnNums = '...'
        } else {
          this.warnNums = String(value.WarningRecordPending)
        }
        if(value.ErrorRecordPending>=99){
          this.brokenNum = '...'
        } else {
          this.brokenNum = String(value.ErrorRecordPending)
        }

      })
    }
  },
  mounted() {
    this.$bus.$on('createhomeagin',this.createHome)
  },
  beforeDestroy() {
    this.$bus.$off('createhomeagin')
  },
  created() {
    this.createHome()
  },
  updated() {
    this.option.series[0].data[0].name="纸张消耗"+" "+this.paperUse
    this.option.series[0].data[1].name="订针消耗"+" "+this.needleUse
    this.option.series[0].data[2].name="印油消耗"+" "+this.inkUse
    this.option.series[0].data[3].name="硒鼓消耗"+" "+this.drumUse

    this.option.series[0].data[0].value=this.paperUse
    this.option.series[0].data[1].value=this.needleUse
    this.option.series[0].data[2].value=this.inkUse
    this.option.series[0].data[3].value=this.drumUse
    this.drawPiedom().setOption(this.option)
  },
  watch:{
    option(newVal){
      this.drawPiedom().setOption(newVal)
    }
  }
}
</script>

<style scoped>

#around{
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  min-width: 1457.6px;
  max-height: 800px;
}
/*左边的样式*/
#tab-left{
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  min-width: 400px;
  height: 850px;
  margin-left: auto;
  margin-top: 12px;
  margin-right: 4px;
}
#tab-left0 {
  background-color: #ffffff;
  margin-right: 8px;
  margin-bottom: 10px;
  flex:1;
  height: 250px;
  width: 450px;
}
#tab-left1{
  background-color: #fff;
  margin-right: 8px;
  margin-bottom: 10px;
  flex:1;
  height: 250px;
  width: 450px;
}
#tab-left2{
  background-color: #fff;
  margin-right: 8px;
  margin-bottom: auto;
  flex:1;
  height: 250px;
  width: 450px;
}
#zizhuji{
  margin-left: 66px;
  margin-top: 50px;
  margin-bottom: 15px;
}
#online{
  position: relative;
  z-index: 2;
  margin-bottom:20px;
  margin-left: -32px;
}
#onlineNums{
  position: relative;
  z-index: 2;
  float: right;
  margin-right: 120px;
  font-size: 60px;
  font-weight: bold;
  color: #09bb07;
  margin-top: 65px;
}
#onlineTtile{
  position: relative;
  z-index:2;
  float: right;
  margin-top: 160px;
  margin-right: -75px;
  font-weight: 200;
  font-size: 16px;
}
#huisezizhuji{
  margin-left: 66px;
  margin-top: 50px;
}
#broken{
  position: relative;
  z-index: 2;
  margin-bottom:20px;
  margin-left: -32px;
}
#broken-div{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  z-index:2;
  margin-top: -130px;
  margin-left: 270px;
}
#brokenNums {
  font-size: 60px;
  font-weight: bold;
  color: #f8b728;
}
#brokenTitle{
  font-weight: 200;
  font-size: 16px;
  margin-top: 20px;
}
#tab-left1-pie{
  margin-top: 20px;
}
#pieDiv{
  width: 400px;
  height: 200px;
}
#all-print-div{
  margin-top: -130px;
  margin-left: 78px;
  width: 100px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#all-paperuse-top{
  /*margin-left: 99px;*/
  /*margin-top: -130px;*/
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: bolder;
}
#all-paperuse-bottom{
  /*margin-left: 90px;*/
  /*margin-top: 10px;*/
}
/*右边的样式*/
#tab-right{
  width: 920px;
  height: 850px;
  overflow-y: auto;
  overflow-x:hidden;
  margin-right: auto;
  margin-top: 12px;
  background-color: #fff;
}
#tab-right-top{
  display: flex;
  flex-direction: row;
  align-items: center;
}
#leftButton{
  margin-top: 20px;
  margin-left: 30px;
}
#middleButton{
  margin-top: 20px;
  margin-left: 10px;
}
#rightButton{
  margin-top: 20px;
  margin-left: 10px;
}



</style>
