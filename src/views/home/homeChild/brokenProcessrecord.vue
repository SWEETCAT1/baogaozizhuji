<template>
  <div id="broken-process-div" v-show="showBrokenprocess">
    <div id="broken-procee">

      <div id="broken-top">
        <div id="broken-head">
          <head-item head-text="故障处理记录"></head-item>
        </div>
        <!--      查询条件栏-->
        <div id="select-search">
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
              size="small"
              :editable="false"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div id="process-state">
            <label>处理状态</label>
            <select v-model="searchStatu">
              <option v-for="(item,index) in processState" :key="item+index">{{item}}</option>
            </select>
          </div>
          <div id="warn-type">
            <label>故障类型</label>
            <select v-model="searchBrokentype">
              <option v-for="(item,index) in allbrokenTypeList" :key="item+index">{{item}}</option>
            </select>
          </div>
          <div id="advice-nums">
            <label>终端编号</label>
            <select v-model="searchAdvicenums">
              <option v-for="(item,index) in selectadviceNumslist" :key="item+index">{{item}}</option>
            </select>
          </div>
          <div id="search-button">
            <button-item button-name="查询" @click.native="searchPage"></button-item>
            <button-item button-name="关闭所有故障" @click.native="closeAllbroken"></button-item>
            <button-item button-name="撤回" @click.native="cancelOprate"></button-item>
          </div>
        </div>
        <!--      列表表格-->
        <div id="table-show-div">
          <table id="table-show">
            <tr id="table-show-blue-tr">
              <td id="table-td-1">故障时间</td>
              <td id="table-td-2">终端编号</td>
              <td id="table-td-3">故障类型</td>
              <td id="table-td-4">处理状态</td>
              <td id="table-td-5">处理时间</td>
              <td id="table-td-6">处理人</td>
              <td id="table-td-7">操作</td>
            </tr>
            <tr v-for="(item,index) in processlist" :key="item+index" :class="{trBgc:index%2===1}" id="table-show-content">
              <td>{{getbrokenTime(index)}}</td>
              <td class="table-left-td">
                <div style="width:140px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                     margin-left: 4px"
                     :title="adviceNumslist[index]">
                  {{getadviceNums(index)}}
                </div></td>
              <td>{{getbrokenTypelist(index)}}</td>
              <td>{{getprocesslist(index)}}</td>
              <td>{{getfinishTime(index)}}</td>
              <td class="table-left-td">
                <div style="width:120px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                    margin-left: 4px"
                     :title="finishNamelist[index]">{{getfinishName(index)}}</div></td>
              <td class="table-oprate">
                <a href="javascript:void(0);" @click="dealBroken(index)">关闭故障</a>
                <a href="javascript:void(0);" @click="cancelDeal(index)">撤回</a>
              </td>
            </tr>
          </table>
        </div>
        <el-pagination
          background-color="white"
          layout="total,prev, pager, next, jumper"
          :page-count="pageCount"
          :current-page="pageNow"
          @current-change="changePage"
        >
        </el-pagination>
      </div>

      <div id="close-broken-process">
        <button-item button-name="关闭" @click.native="closeBrokenprocessrecord" id="button-close-broken"></button-item>
      </div>
    </div>

  </div>
</template>

<script>
import headItem from "@/components/headItem/headItem";
import buttonItem from "@/components/button/buttonItem";
import {getAdviceselect,
  getBrokenRecord,
  seterrorRecord,
  cancelSeterror,
  batchOpratebroken
} from "@/network/home";
import {getIndexList} from "@/common/utils/utils";

export default {
  name: "brokenProcessrecord",
  components:{
    headItem,
    buttonItem
  },
  data(){
    return {
      showBrokenprocess:false,
      //初始化数据
      //分页数据
      pageSize:10,
      pageIndex:1,
      pageNow:1,
      pageList:[],
      pageCount:0,
      showhide:true,

      //状态列表
      statelist:[],
      // 终端编号列表
      selectadviceNumslist:['全部'],
      adviceNumslist:[],
      // 预警类型列表
      brokenTypelist:[],
      // 处理状态列表
      processlist:[],
      // 故障时间列表
      startTimelist:[],
      // 预警处理时间列表
      finishTimelist:[],
      // 处理人列表
      finishNamelist:[],
      // 记录Id的列表
      recordId:[],

      //查询条件
      searchTime:'',
      searchStatu:'',
      searchBrokentype:'',
      searchAdvicenums:'',
      searchbrokenTypeIndex:0,
      searchStatuIndex:-1,
      searchAdvicenumsIndex:'',

      //处理状态
      processState:[
        '全部','待处理','已处理',
      ],
      // 故障类型
      allbrokenTypeList:[
        '全部','系统故障','线程错误','硬件异常','其他异常'
      ],
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
    }
  },
  methods:{
    //初始化页面
    isShowbrokenprocessrecord(){
      this.showBrokenprocess = !this.showBrokenprocess
      const token = this.$Store.get('token')
      getAdviceselect(token).then(res=>{
        this.selectadviceNumslist = ['全部']
        this.searchAdvicenums = '全部'
        this.searchStatu = '全部'
        this.searchBrokentype = '全部'
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.selectadviceNumslist.push(res.data.Data[i].MachineNo)
        }
      })
      const message = {'pageIndex':this.pageIndex,"pageSize":this.pageSize,
        "Type":0,"Status":-1}
      getBrokenRecord(token,message).then(res=>{
        this.startTimelist = []
        this.adviceNumslist = []
        this.brokenTypelist = []
        this.processlist = []
        this.finishTimelist = []
        this.finishNamelist = []
        this.pageList = []
        this.recordId = []
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.startTimelist.push(res.data.Data[i].CreateTime)
          this.adviceNumslist.push(res.data.Data[i].MachineNo)
          this.recordId.push(res.data.Data[i].Id)
          this.brokenTypelist.push(this.allbrokenTypeList[res.data.Data[i].Type])
          this.processlist.push(this.processState[res.data.Data[i].Status+1])
          // console.log(this.processlist)
          if(res.data.Data[i].Status===0){
            this.finishTimelist.push('')
            this.finishNamelist.push('')
          } else {
            this.finishTimelist.push(res.data.Data[i].FinishTime)
            this.finishNamelist.push(res.data.Data[i].Name)
          }
        }
        //分页
        this.pageCount = res.data.TotalPage
        for(let i=1;i<=this.pageCount;i++){
          this.pageList.push(i)
        }
      })
    },
    //查询请求
    searchPage(){
      const token = this.$Store.get('token')
      if(this.searchBrokentype !== '全部'){

        this.searchBrokenTypeIndex = getIndexList(this.searchBrokentype,this.allbrokenTypeList)
      } else {this.searchBrokenTypeIndex = 0}
      if(this.searchStatu !== '全部'){
        this.searchStatuIndex = getIndexList(this.searchStatu,this.processState) - 1
        // console.log(this.searchStatu,this.processState)
      } else {this.searchStatuIndex = -1}
      if(this.searchAdvicenums === '全部'){
        this.searchAdvicenumsIndex = ''
      } else {this.searchAdvicenumsIndex = this.searchAdvicenums}
      //参数打包
      const message = {'pageIndex':this.pageIndex,"pageSize":this.pageSize, "MachineNo":this.searchAdvicenumsIndex}
      if (this.searchTime.length===0){
        message.StartTime = ''
        message.EndTime = ''
      } else {
        message.StartTime = this.searchTime[0]
        message.EndTime = this.searchTime[1]
      }
      message.Type = this.searchBrokenTypeIndex
      message.Status = this.searchStatuIndex
      // console.log(message)
      getBrokenRecord(token,message).then(res=>{
        this.startTimelist = []
        this.adviceNumslist = []
        this.brokenTypelist = []
        this.processlist = []
        this.finishTimelist = []
        this.finishNamelist = []
        this.recordId = []
        this.pageList = []
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.startTimelist.push(res.data.Data[i].CreateTime)
          this.adviceNumslist.push(res.data.Data[i].MachineNo)
          this.recordId.push(res.data.Data[i].Id)
          this.brokenTypelist.push(this.allbrokenTypeList[res.data.Data[i].Type])
          this.processlist.push(this.processState[res.data.Data[i].Status+1])
          // console.log(this.processlist)
          if(res.data.Data[i].Status===0){
            this.finishTimelist.push('')
            this.finishNamelist.push('')
          } else {
            this.finishTimelist.push(res.data.Data[i].FinishTime)
            this.finishNamelist.push(res.data.Data[i].Name)
          }
        }
        //分页
        this.pageCount = res.data.TotalPage
        for(let i=1;i<=this.pageCount;i++){
          this.pageList.push(i)
        }
        this.pageNow = 1
        this.searchStatuIndex = -1
        this.searchbrokenTypeIndex = 0
      })

    },
    //关闭所有预警
    closeAllbroken(){
      const token = this.$Store.get('token')
      if(this.searchBrokentype !== '全部'){
        this.searchbrokenTypeIndex = getIndexList(this.searchBrokentype,this.allbrokenTypeList)
        // console.log(this.searchbrokenTypeIndex)
      } else {this.searchbrokenTypeIndex = 0}
      if(this.searchStatu !== '全部'){
        this.searchStatuIndex = getIndexList(this.searchStatu,this.processState) - 1
        // console.log(this.searchStatu,this.processState)
      } else {this.searchStatuIndex = -1}
      if(this.searchAdvicenums === '全部'){
        this.searchAdvicenumsIndex =  ''
      } else {
        this.searchAdvicenumsIndex = this.searchAdvicenums
      }
      const message = {'OperationType':0,'StartTime':this.searchTime[0],'EndTime':this.searchTime[1],
        "Status":this.searchStatuIndex,'Type':this.searchbrokenTypeIndex,"MachineNo":this.searchAdvicenumsIndex}
      batchOpratebroken(token, message).then(res=>{
        // console.log(res)
        if(res.data.Code===200){
          for(let i=0;i<this.processlist.length;i++){
            if(this.processlist[i]==='待处理'){
              this.processlist[i] = '已处理'
            }
          }
          this.$forceUpdate()
        }
      })
    },
    //撤回操作
    cancelOprate(){
      const token = this.$Store.get('token')
      if(this.searchBrokentype !== '全部'){
        this.searchbrokenTypeIndex = getIndexList(this.searchBrokentype,this.allbrokenTypeList)
        // console.log(this.searchbrokenTypeIndex)
      } else {this.searchbrokenTypeIndex = 0}
      if(this.searchStatu !== '全部'){
        this.searchStatuIndex = getIndexList(this.searchStatu,this.processState) - 1
        // console.log(this.searchStatu,this.processState)
      } else {this.searchStatuIndex = -1}
      if(this.searchAdvicenums === '全部'){
        this.searchAdvicenumsIndex =  ''
      } else {
        this.searchAdvicenumsIndex = this.searchAdvicenums
      }
      const message = {'OperationType':1,'StartTime':this.searchTime[0],'EndTime':this.searchTime[1],
        "Status":this.searchStatuIndex,'Type':this.searchbrokenTypeIndex,"MachineNo":this.searchAdvicenumsIndex}
      batchOpratebroken(token, message).then(res=>{
        if(res.data.Code===200){
          for(let i=0;i<this.processlist.length;i++){
            if(this.processlist[i]==='已处理'){
              this.processlist[i]='待处理'
            }
          }
          this.$forceUpdate()
        }
      })
    },
    //分页查询
    changePage(pagenow){
        const token = this.$Store.get('token')
        this.pageNow = pagenow
        const message = {'pageIndex':this.pageNow,"pageSize":this.pageSize,
          "Type":this.searchbrokenTypeIndex,"Status":this.searchStatuIndex}
        getBrokenRecord(token,message).then(res=> {
          this.startTimelist = []
          this.adviceNumslist = []
          this.brokenTypelist = []
          this.processlist = []
          this.recordId = []
          this.finishTimelist = []
          this.finishNamelist = []
          // console.log(res)
          for (let i = 0; i < res.data.Data.length; i++) {
            this.startTimelist.push(res.data.Data[i].CreateTime)
            this.adviceNumslist.push(res.data.Data[i].MachineNo)
            this.recordId.push(res.data.Data[i].Id)
            this.brokenTypelist.push(this.allbrokenTypeList[res.data.Data[i].Type])
            this.processlist.push(this.processState[res.data.Data[i].Status+1])
            // console.log(this.processlist)
            if (res.data.Data[i].Status === 0) {
              this.finishNamelist.push('')
            } else {
              this.finishTimelist.push(res.data.Data[i].FinishTime)
              this.finishNamelist.push(res.data.Data[i].Name)
            }
          }
        })
    },
    //处理未处理的预警
    dealBroken(index){
      const token = this.$Store.get('token')
      const setType = 2
      const setId = this.recordId[index]
      const message = {Id:setId,OperationType:setType}
      seterrorRecord(token,message).then((res)=>{
        // console.log(res)
        if(res.data.Code !== 200){
          this.$message.error(res.data.Message)
        } else {
          this.processlist[index] = this.processState[2]
          this.$forceUpdate()
        }
      })
    },
    //撤回操作
    cancelDeal(index){
      const token = this.$Store.get('token')
      const setType = 2
      const setId = this.recordId[index]
      const message = {Id:setId,OperationType:setType}
      cancelSeterror(token,message).then(res=>{
        // console.log(res)
        if(res.data.Code !== 200){
          this.$message.error(res.data.Message)
        } else {
          this.processlist[index] = this.processState[1]
          this.$forceUpdate()
        }
      })
    },

    closeBrokenprocessrecord(){
      this.showBrokenprocess = false
      this.$bus.$emit('createhomeagin')
      this.searchbrokenTypeIndex = 0
      this.searchStatu = -1
      this.pageNow = 1
    },
    getbrokenTime(index){return this.startTimelist[index]},
    getadviceNums(index){return this.adviceNumslist[index]},
    getbrokenTypelist(index){return this.brokenTypelist[index]},
    getprocesslist(index){return this.processlist[index]},
    getfinishTime(index){return this.finishTimelist[index]},
    getfinishName(index){return this.finishNamelist[index]},

  },

  beforeMount() {

  },
  mounted() {
    this.$bus.$on('openbrokenprocessrecord',this.isShowbrokenprocessrecord)
  },
  beforeDestroy() {
    this.$bus.$off('openbrokenprocessrecord')
  }
}
</script>

<style scoped>
#broken-process-div{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(55,55,55,.6);
  z-index:100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#broken-procee{
  background-color: #fff;
  height: 650px;
  width: 1200px;
  border: 1px solid #666666;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
#broken-top{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  width: 1200px;
}
#select-search{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  margin-top: 12px;
}
.block{
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-date-editor{
  width: 280px !important;
  height: 35px !important;
  border: 1px solid #666666;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #666666 !important;
}
#process-state>label{margin-left: 12px;}
#process-state>select{
  margin-left: 5px;
  width:75px;
  height: 35px;
  border-radius:4px;
}
#warn-type>label{margin-left: 12px;}
#warn-type>select{
  margin-left: 5px;
  width: 85px;
  height: 35px;
  border-radius:4px;
}
#advice-nums>label{
  margin-left: 8px;
  margin-right: 8px;
}
#advice-nums>select{
  width: 110px;
  height: 36px;
  border-radius:4px;
}
#search-button{
  margin-top: -5px;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}
.buttonDiv{
  margin-left: 15px;
}
#table-show-div{margin-top: 10px;}
#table-show{
  margin-left: 8px;
  border: 1px solid #dbdbdb;
}
#table-show-blue-tr{
  background-color: #0089e7;
  color: white;
  text-align: center;
  height: 35px;
}
#table-td-1{width: 150px;}
#table-td-2{width: 140px;}
#table-td-3{width: 130px;}
#table-td-4{width: 120px;}
#table-td-5{width: 150px;}
#table-td-6{width: 140px;}
#table-td-7{width: 150px;}
.trBgc{background-color: #edf6fd}
#table-show-content{
  text-align: center;
  height: 35px;
}
#broken-head{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.table-oprate>a{
  margin-right: 15px;
}
/*分页样式*/
.el-pagination{
  margin-top: 10px;
}
/*确定按钮*/
#close-broken-process{
  margin-bottom: 30px;
}
#button-close-broken{width: 120px;}
.table-left-td{
  text-align: left;
}


</style>
