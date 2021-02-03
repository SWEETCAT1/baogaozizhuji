<template>
  <div id="data-div" @keydown.enter="searchDeviceinfo">
<!--    查询-->
    <div id="data-search-div">
      <div id="data-search">
        <div class="block">
          <span class="demonstration" style="margin-right: 5px;">选择时间</span>
          <el-date-picker
            v-model="searchTime"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="large"
            :editable="false"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
          <span class="demonstration" style="margin-left: 10px">选择终端</span>
          <el-select
            v-model="selectedDeviceId"
            multiple
            collapse-tags
            style="margin-left: 10px;border-radius: 5px;border: 1px solid #666666;"
            size="large"
            :clearable="true"
            placeholder="请选择"
            :popper-append-to-body="false">
            <el-option
              v-for="item in adviceSelectNumslist"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div id="data-button">
          <button-item button-name="查询" @click.native="searchDeviceinfo"></button-item>
        </div>
      </div>
    </div>
<!--    柱状图显示-->
    <div id="data-bar">
      <div ref="bar" id="barDiv"></div>
    </div>
<!--    报表显示栏-->
    <div id="data-table" >
      <div id="data-table-table-div">
        <!--导出按钮-->
        <div id="data-table-button" >
          <button-item button-name="导出报表" @click.native="exportExcel"></button-item>
        </div>
        <!--表格实体-->
        <div id="data-table-div">
          <table id="data-table-table">
            <tr id="data-table-table-blue-tr">
              <td id="data-table-td-1">终端编号</td>
              <td id="data-table-td-2">故障次数</td>
              <td id="data-table-td-3">纸张消耗(张)</td>
              <td id="data-table-td-5">订针消耗(对)</td>
              <td id="data-table-td-6">印油消耗(个)</td>
              <td id="data-table-td-4">硒鼓消耗(个)</td>
              <td id="data-table-td-7">打印份数(份)</td>
            </tr>
            <tr v-for="(item,index) in adviceNumslist" :key="item"
                id="data-table-table-tr" :class="{trBgc:index%2===1}">
              <td id="data-table-table-td" style="overflow: hidden;text-overflow: ellipsis">
                <div style="width:200px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                    margin-left: 4px"
                :title="item">
                  {{item}}
                </div>
              </td>
              <td>{{getAdvicebroken(index)}}</td>
              <td>{{getAdvicepaperuse(index)}}</td>
              <td>{{getAdviceneedleuse(index)}}</td>
              <td>{{getAdviceinkuse(index)}}</td>
              <td>{{getAdvicedrumuse(index)}}</td>
              <td>{{getAdviceprintuse(index)}}</td>
            </tr>
            <tr id="data-table-table-tr-2" >
              <td style="text-align: left;padding-left: 6px" :class="{trBgc:adviceNumslist.length%2===1}">合计</td>
              <td v-for="item in adviceDatasum" :class="{trBgc:adviceNumslist.length%2===1}"
                  :key="item">{{item}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import {getAdviceinfo} from "@/network/data";

export default {
  name: "Data",
  components:{
    buttonItem,
  },
  data(){
    return{
      //下拉点击选中
      selectedDeviceId:[],
      searchTime:'',

      //报表数据
      adviceNumslist:[],
      //选择下拉框的数据
      adviceSelectNumslist:[],
      adviceBrokenList:[],
      advicePaperuseList:[],
      adviceDrumuseList:[],
      adviceNeedleuseList:[],
      adviceInkuseList:[],
      advicePrintList:[],
      adviceDatasum:[],

      // datapicker
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },

      // bar图
      option: {
        dataset: {
          source: [
            ['product'],
            ['纸张'],
            ['订针'],
            ['印油'],
            ['硒鼓'],
          ]
        },
        barMaxWidth:25,
        barMinWidth:10,
        color:['blue','orange','red','pink','black','yellow','green'],
        xAxis: {
          type:'category',
          axisLine: {
            lineStyle: {}
          },
          axisTick: {
            show: false
          },
          axisLabel: {margin: 10},
        },
        yAxis: {
          axisLine: { // 坐标轴轴线
            lineStyle: {}
          },
          axisTick: { //坐标轴刻度
            show: true
          },
          axisLabel: {
            show: false
          },//标签距离
          nameTextStyle: {
            fontWeight: ''
          },
        },
        //图例标记
        legend: {
          bottom: 0
        },
        //指定每个都是柱状图
        series: [
        ]
      },
    }
  },
  computed:{
  },
  methods:{
    //获取报表数据
    getAdvicebroken(index){return this.adviceBrokenList[index]},
    getAdvicepaperuse(index){return this.advicePaperuseList[index]},
    getAdvicedrumuse(index){return this.adviceDrumuseList[index]},
    getAdviceneedleuse(index){return this.adviceNeedleuseList[index]},
    getAdviceinkuse(index){return this.adviceInkuseList[index]},
    getAdviceprintuse(index){return this.advicePrintList[index]},

    //查询按钮
    searchDeviceinfo(){
      //清空option的数据
      this.drawBardom().clear()
      this.option.series = []
      this.option.dataset.source = [
        ['product',],
        ['纸张'],
        ['订针'],
        ['印油'],
        ['硒鼓'],
      ]
      const token = this.$Store.get('token')
      let message = {}
      if (this.searchTime.length===0){
        message.BeginTime = ''
        message.EndTime = ''
      } else {
        message.BeginTime = this.searchTime[0]
        message.EndTime = this.searchTime[1]
      }
      message.MachineNoList = this.selectedDeviceId
      getAdviceinfo(token,message).then(res=>{
        // console.log(res)
        this.adviceNumslist = []
        this.adviceBrokenList = []
        this.advicePaperuseList = []
        this.adviceDrumuseList = []
        this.adviceNeedleuseList = []
        this.adviceInkuseList = []
        this.advicePrintList = []
        this.adviceDatasum = []
        const reslist = res.data.Value.SelfMachineStatisticsList
        // console.log(reslist)
        for(let i=0;i<reslist.length;i++){
          this.adviceNumslist.push(reslist[i]['MachineNo'])
          this.adviceBrokenList.push(reslist[i]['ErrorCount'])
          this.advicePaperuseList.push(reslist[i]['Paper'])
          this.adviceDrumuseList.push(reslist[i]['XG1'])
          this.adviceNeedleuseList.push(reslist[i]['Pin'])
          this.adviceInkuseList.push(reslist[i]['YY1'])
          this.advicePrintList.push(reslist[i]["PrintCount"])

          let echartsMachine = reslist[i]['MachineNo']
          if(reslist[i]['MachineNo'].length>12){
            echartsMachine = reslist[i]['MachineNo'].substring(0,9)
            echartsMachine += '...'
          }
          this.option.dataset.source[0].push(echartsMachine)
          this.option.dataset.source[1].push(reslist[i]['Paper'])
          this.option.dataset.source[2].push(reslist[i]['Pin'])
          this.option.dataset.source[3].push(reslist[i]['YY'])
          this.option.dataset.source[4].push(reslist[i]['XG'])

          this.option.series.push({
            type:"bar",
            label: {
              show: true,
              position: 'top',
              color: 'black'
            }
          })

        }
        // this.drawBardom().setOption(this.option)
        // console.log(this.option)
        const resSumlist = res.data.Value.SelfMachineStatisticsTotalModel
        //合计列表
        this.adviceDatasum.push(resSumlist['ErrorTotalCount'])
        this.adviceDatasum.push(resSumlist['PaperTotal'])
        this.adviceDatasum.push(resSumlist['PinTotal'])
        this.adviceDatasum.push(resSumlist['YY1Total'])
        this.adviceDatasum.push(resSumlist['XG1Total'])
        this.adviceDatasum.push(resSumlist['PrintCountTotal'])
      })
    },
    //导出报表
    exportExcel(){
      require.ensure([],()=>{
        const {export_json_to_excel} = require('@/vendor/Export2Excel')
        const tHeader = ['终端编号','故障次数','纸张消耗(张)','订针消耗(个)','印油消耗','硒鼓消耗(个)','打印份数(份)']
        const filterVal = ['MachineNo','ErrorCount','Paper','Pin','YY','XG','PrintCount']
        let list = []
        for(let i=0;i<this.adviceNumslist.length;i++){
          list.push({})
          list[i].MachineNo = this.adviceNumslist[i]
          list[i].ErrorCount = this.adviceBrokenList[i]
          list[i].Paper = this.advicePaperuseList[i]
          list[i].Pin = this.adviceNeedleuseList[i]
          list[i].YY = this.adviceInkuseList[i]
          list[i].XG = this.adviceDrumuseList[i]
          list[i].PrintCount = this.advicePrintList[i]
        }
        // console.log(list)
        list.push({MachineNo:''})
        // console.log(list)
        const allIndex = this.adviceNumslist.length
        // console.log(this.adviceDatasum)
        list[allIndex].MachineNo = '合计'
        list[allIndex].ErrorCount = this.adviceDatasum[0]
        list[allIndex].Paper = this.adviceDatasum[1]
        list[allIndex].Pin = this.adviceDatasum[2]
        list[allIndex].YY = this.adviceDatasum[3]
        list[allIndex].XG = this.adviceDatasum[4]
        list[allIndex].PrintCount = this.adviceDatasum[5]
        const data = this.formatJson(filterVal,list)
        let resStart = ''
        let resEnd = '-'
        //制作标题
        // console.log(this.searchTime)
        if(this.searchTime.length !== 0){
         let res1 = []
         res1 = [this.searchTime[0]]
          for(let i=0;i<res1.length;i++){
            if (res1[i]!=='-'){
              resStart+=res1[i]
            }
          }
        }

        if(this.searchTime.length !== 0){
          let res2 = []
          res2 = [this.searchTime[1]]
          for(let i=0;i<res2.length;i++){
            if (res2[i]!=='-'){
              resEnd+=res2[i]
            }
          }
        } else {resEnd='(全时段)' }
        let  excelTitle = '自助机耗材消耗报表'+resStart+resEnd
        export_json_to_excel(tHeader,data,excelTitle)
      })
    },
    formatJson(filterVal,jsonData){
      return jsonData.map(v=>filterVal.map(j=>v[j]))
    },
    drawBardom(){
      let echarts = require('echarts/lib/echarts')
      require('echarts/lib/component/title')
      require('echarts/lib/component/legend')
      require('echarts/lib/chart/bar')
      return echarts.init(this.$refs.bar)
    },
  },
  created() {
    //拿到表数据
    const token = this.$Store.get('token')
    const message = { "BeginTime": "", "EndTime": "", "MachineNoList": []}
    getAdviceinfo(token,message).then(res=>{
      // console.log(res)
      //先清空原来的数据
      this.adviceNumslist = []
      this.adviceSelectNumslist = []
      this.adviceBrokenList = []
      this.advicePaperuseList = []
      this.adviceDrumuseList = []
      this.adviceInkuseList = []
      this.advicePrintList = []
      this.adviceDatasum = []
      const reslist = res.data.Value.SelfMachineStatisticsList
      // console.log(reslist)
      // const allreslist = res.data.Value.SelfMachineStatisticsTotalModel
      for(let i=0;i<reslist.length;i++){
        this.adviceNumslist.push(reslist[i]['MachineNo'])
        this.adviceBrokenList.push(reslist[i]['ErrorCount'])
        this.advicePaperuseList.push(reslist[i]['Paper'])
        this.adviceDrumuseList.push(reslist[i]['XG1'])
        this.adviceNeedleuseList.push(reslist[i]['Pin'])
        this.adviceInkuseList.push(reslist[i]['YY1'])
        this.advicePrintList.push(reslist[i]["PrintCount"])

        let echartsMachine = reslist[i]['MachineNo']
        if(reslist[i]['MachineNo'].length>12){
          echartsMachine = reslist[i]['MachineNo'].substring(0,9)
          echartsMachine += '...'
        }
        this.option.dataset.source[0].push(echartsMachine)
        this.option.dataset.source[1].push(reslist[i]['Paper'])
        this.option.dataset.source[2].push(reslist[i]['Pin'])
        this.option.dataset.source[3].push(reslist[i]['YY'])
        this.option.dataset.source[4].push(reslist[i]['XG'])

        this.option.series.push({
          type:"bar",
          label: {
            show: true,
            position: 'top',
            color: 'black'
          }
        },)
      }
      this.drawBardom().setOption(this.option)
      //监听窗口缩放
      window.addEventListener('resize',()=>{
        if(this.drawBardom()){
          this.drawBardom().resize()
        }
      })
      this.adviceSelectNumslist = this.adviceNumslist
      const resSumlist = res.data.Value.SelfMachineStatisticsTotalModel
      // console.log(resSumlist)
      //合计列表
      this.adviceDatasum.push(resSumlist['ErrorTotalCount'])
      this.adviceDatasum.push(resSumlist['PaperTotal'])
      this.adviceDatasum.push(resSumlist['PinTotal'])
      this.adviceDatasum.push(resSumlist['YY1Total'])
      this.adviceDatasum.push(resSumlist['XG1Total'])
      this.adviceDatasum.push(resSumlist['PrintCountTotal'])
    })
  },
  mounted() {

  },
  updated() {
    this.drawBardom().setOption(this.option)
  },
  watch:{
    option(newVal){
      this.drawBardom().setOption(newVal)
    },
    deep:true
  },
}
</script>

<style scoped>
/*查询栏*/
#data-div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#data-search-div{
  background-color: #fff;
  height: 100px;
  margin-top: 12px;
  min-width: 1400px;
  font-size: 14px;
  white-space: nowrap;
}
#data-search{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 100px;
}
.block{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
}

.el-range-editor{
  border: 1px solid #666666 !important;
}
.el-select{
  border: 1px solid #666666 !important;
  border-radius: 4px;
}
#data-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-left: 15px;
}
/*样式穿透*/
.block >>> .el-select__tags>span>span>span{
  width: 40px !important;
  float: left !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: block;
}
/*柱状图*/
#data-bar{
  background-color: #fff;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 12px;
  min-width: 1400px;
  font-size: 14px;
}
#barDiv{
  height: 360px;
  width: 1400px;
}

/*报表栏*/
#data-table{
  background-color: #fff;
  font-size: 14px;
  min-height: 340px;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 12px;
  min-width: 1400px;
}
#data-table-table-div{
  display: flex;
  flex-direction: column;
}
#data-table-button{
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}

#data-table-table{
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 12px;
  margin-bottom: 15px;
  border: 1px solid #dbdbdb;
}
#data-table-table-blue-tr{
  background-color: #0089e7;
  color: white;
  text-align: center;
  height: 35px;
}

#data-table-td-1{width: 180px}
#data-table-td-2{width: 150px}
#data-table-td-3{width: 180px}
#data-table-td-4{width: 200px}
#data-table-td-5{width: 200px}
#data-table-td-6{width: 200px}
#data-table-td-7{width: 200px}
.trBgc{background-color: #edf6fd}
#data-table-table-tr{
  text-align: center;
  height: 35px;
}
#data-table-table-td{
  text-align: left;
}
#data-table-table-tr-2{
  text-align: center;
  height: 35px;
}
@media screen and (max-height: 768px) and (max-height: 1366px)  {
  #data-search-div{
    min-width: 1100px;
  }
  #data-bar{
    min-width: 1100px;
  }
  #barDiv{
    height: 300px;
    width: 1100px;
  }
  #data-table{
    min-width: 1100px;
  }
}
</style>
