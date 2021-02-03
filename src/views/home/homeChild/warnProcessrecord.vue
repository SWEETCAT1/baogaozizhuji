<template>
  <div id="warn-process-div" v-show="showWarnprocess">
    <div id="warn-process">
      <div id="warn-top">
        <div id="warn-head">
          <head-item head-text="预警处理记录"></head-item>
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
            <label>预警类型</label>
            <select v-model="searchWarntype">
              <option v-for="(item,index) in allwarnTypeList" :key="item+index">{{item}}</option>
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
            <button-item button-name="关闭所有预警" @click.native="closeAllwarn"></button-item>
            <button-item button-name="撤回" @click.native="cancelOprate"></button-item>
          </div>
        </div>
        <!--      列表表格-->
        <div id="table-show-div">
          <table id="table-show">
            <tr id="table-show-blue-tr">
              <td id="table-td-1">预警时间</td>
              <td id="table-td-2">终端编号</td>
              <td id="table-td-3">预警类型</td>
              <td id="table-td-wanrcontent">预警内容</td>
              <td id="table-td-4">处理状态</td>
              <td id="table-td-5">处理时间</td>
              <td id="table-td-6">处理人</td>
              <td id="table-td-7">操作</td>
            </tr>
            <tr v-for="(item,index) in processlist" :key="item+index" :class="{trBgc:index%2===1}" id="table-show-content">
              <td>
                <div>
                  {{getwarnTime(index)}}
                </div></td>
              <td class="table-left-td">
                <div style="width:140px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                      margin-left: 4px"
                     :title="adviceNumslist[index]">
                  {{getadviceNums(index)}}
                </div>
              </td>
              <td>{{getwarnTypelist(index)}}</td>
              <td  class="table-left-td">
                <div style="width:150px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                     margin-left: 4px"
                     :title="processContentlist[index]">{{getwarningRecord(index)}}</div></td>
              <td>{{getprocesslist(index)}}</td>
              <td>{{getfinishTime(index)}}</td>
              <td class="table-left-td">
               <div style="width:120px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                    margin-left: 4px"
                    :title="finishNamelist[index]">{{getfinishName(index)}}</div></td>
              <td class="table-oprate">
                <a href="javascript:void(0);" @click="dealWarn(index)">关闭预警</a>
                <a href="javascript:void(0);" @click="cancelDeal(index)">撤回</a>
              </td>
            </tr>
          </table>
        </div>
        <!--分页-->
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
        <button-item button-name="关闭" @click.native="closewarnprocessrecord" id="button-close-broken"></button-item>
      </div>
    </div>
  </div>
</template>

<script>
import headItem from "@/components/headItem/headItem";
import buttonItem from "@/components/button/buttonItem";
import {getIndexList} from "@/common/utils/utils";
import {getWarningRecord,
  getAdviceselect,
  seterrorRecord,
  cancelSeterror,
  batchOpratewarn} from "@/network/home";

export default {
  name: "warnProcessrecord",
  components:{
    headItem,
    buttonItem
  },
  data(){
    return {
      showWarnprocess:false,
      //初始化数据
      //分页数据
      pageSize:10,
      pageIndex:1,
      pageNow:1,
      pageList:[],
      pageCount:0,
      //显示
      showhide:true,

      //状态列表
      statelist:[],
      // 终端编号列表
      selectadviceNumslist:['全部'],
      adviceNumslist:[],
      // 预警类型列表
      warnTypelist:[],
      // 处理状态列表
      processlist:[],
      //预警内容列表
      processContentlist:[],
      // 预警时间列表
      startTimelist:[],
      // 预警处理时间列表
      finishTimelist:[],
      // 处理人列表
      finishNamelist:[],
      // 记录Id
      recordId:[],

      //查询条件
      searchTime:'',
      searchStatu:'',
      searchWarntype:'',
      searchAdvicenums:'',
      searchwarnTypeIndex:-1,
      searchStatuIndex:-1,
      searchAdvicenumsIndex:'',

      //处理状态
      processState:[
        '全部','待处理','已处理',
      ],
      // 预警类型
      allwarnTypeList:[
        '全部','纸张预警','订针预警','硒鼓预警','印油预警','纸张耗尽','订针耗尽','硒鼓耗尽','印油耗尽',
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
    //初始化界面
    isShowwarnprocessrecord(){
      this.showWarnprocess = !this.showWarnprocess
      const token = this.$Store.get('token')
      getAdviceselect(token).then(res=>{
        this.selectadviceNumslist = ['全部']
        this.searchAdvicenums = '全部'
        this.searchStatu = '全部'
        this.searchWarntype = '全部'
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.selectadviceNumslist.push(res.data.Data[i].MachineNo)
        }
      })
      const message = {'pageIndex':this.pageIndex,"pageSize":this.pageSize,
        "Type":-1,"Status":-1}
      // console.log(message)
      getWarningRecord(token,message).then(res=>{
        this.startTimelist = []
        this.adviceNumslist = []
        this.warnTypelist = []
        this.processlist = []
        this.processContentlist = []
        this.finishTimelist = []
        this.finishNamelist = []
        this.pageList = []
        this.recordId = []
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.startTimelist.push(res.data.Data[i].CreateTime)
          this.adviceNumslist.push(res.data.Data[i].MachineNo)
          this.warnTypelist.push(this.allwarnTypeList[res.data.Data[i].Type+1])
          this.processlist.push(this.processState[res.data.Data[i].Status+1])
          this.processContentlist.push(res.data.Data[i].WarningContent)
          this.recordId.push(res.data.Data[i].Id)
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
      //判断select为全部时
      if(this.searchWarntype !== '全部'){
        this.searchwarnTypeIndex = getIndexList(this.searchWarntype,this.allwarnTypeList) -1
        console.log(this.searchwarnTypeIndex)
      } else {this.searchwarnTypeIndex = -1}
      if(this.searchStatu !== '全部'){
        this.searchStatuIndex = getIndexList(this.searchStatu,this.processState) -1
        console.log(this.searchStatu,this.processState)
      } else {this.searchStatuIndex = -1}
      if(this.searchAdvicenums === '全部'){
        this.searchAdvicenumsIndex =  ''
      } else {
        this.searchAdvicenumsIndex = this.searchAdvicenums
      }
      //message参数
      const message = {'pageIndex':this.pageIndex,"pageSize":this.pageSize,"MachineNo":this.searchAdvicenumsIndex}
      if (this.searchTime.length===0){
        message.StartTime = ''
        message.EndTime = ''
      } else {
        message.StartTime = this.searchTime[0]
        message.EndTime = this.searchTime[1]
      }
      message.Type = this.searchwarnTypeIndex
      message.Status = this.searchStatuIndex
      console.log(message)
      getWarningRecord(token,message).then(res=>{
        this.startTimelist = []
        this.adviceNumslist = []
        this.warnTypelist = []
        this.processlist = []
        this.processContentlist = []
        this.finishTimelist = []
        this.finishNamelist = []
        this.pageList = []
        this.recordId = []
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.startTimelist.push(res.data.Data[i].CreateTime)
          this.adviceNumslist.push(res.data.Data[i].MachineNo)
          this.recordId.push(res.data.Data[i].Id)
          this.warnTypelist.push(this.allwarnTypeList[res.data.Data[i].Type+1])
          this.processlist.push(this.processState[res.data.Data[i].Status+1])
          this.processContentlist.push(res.data.Data[i].WarningContent)
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
      })
    },
    //关闭所有预警
    closeAllwarn(){
      const token = this.$Store.get('token')
      if(this.searchWarntype !== '全部'){
        this.searchwarnTypeIndex = getIndexList(this.searchWarntype,this.allwarnTypeList) -1
        // console.log(this.searchwarnTypeIndex)
      } else {this.searchwarnTypeIndex = -1}
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
        "Status":this.searchStatuIndex,'Type':this.searchwarnTypeIndex,"MachineNo":this.searchAdvicenumsIndex}
      // console.log(message)
      batchOpratewarn(token, message).then(res=>{
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
      if(this.searchWarntype !== '全部'){
        this.searchwarnTypeIndex = getIndexList(this.searchWarntype,this.allwarnTypeList) -1
        // console.log(this.searchwarnTypeIndex)
      } else {this.searchwarnTypeIndex = -1}
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
        "Status":this.searchStatuIndex,'Type':this.searchwarnTypeIndex,"MachineNo":this.searchAdvicenumsIndex}
      batchOpratewarn(token, message).then(res=>{
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
        "Type":this.searchwarnTypeIndex,"Status":this.searchStatuIndex}
      getWarningRecord(token,message).then(res=> {
        this.startTimelist = []
        this.adviceNumslist = []
        this.warnTypelist = []
        this.processlist = []
        this.processContentlist = []
        this.finishTimelist = []
        this.finishNamelist = []
        this.recordId = []
        // console.log(res)
        for (let i = 0; i < res.data.Data.length; i++) {
          this.startTimelist.push(res.data.Data[i].CreateTime)
          this.adviceNumslist.push(res.data.Data[i].MachineNo)
          this.recordId.push(res.data.Data[i].Id)
          this.warnTypelist.push(this.allwarnTypeList[res.data.Data[i].Type+1])
          this.processlist.push(this.processState[res.data.Data[i].Status+1])
          this.processContentlist.push(res.data.Data[i].WarningContent)
          // console.log(this.processlist)
          if (res.data.Data[i].Status === 0) {
            this.finishTimelist.push('')
            this.finishNamelist.push('')
          } else {
            this.finishTimelist.push(res.data.Data[i].FinishTime)
            this.finishNamelist.push(res.data.Data[i].Name)
          }
        }
      })
    },
    //处理未处理的预警
    dealWarn(index){
      const token = this.$Store.get('token')
      const setType = 1
      const setId = this.recordId[index]
      const message = {Id:setId,OperationType:setType}
      seterrorRecord(token,message).then(res=>{
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
      const setType = 1
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

    closewarnprocessrecord(){
      this.$bus.$emit('createhomeagin')
      this.showWarnprocess = false
      this.searchwarnTypeIndex = -1
      this.searchStatu = -1
      this.pageNow = 1
    },
    getwarnTime(index){return this.startTimelist[index]},
    getadviceNums(index){return this.adviceNumslist[index]},
    getwarnTypelist(index){return this.warnTypelist[index]},
    getwarningRecord(index) {return this.processContentlist[index]},
    getprocesslist(index){return this.processlist[index]},
    getfinishTime(index){return this.finishTimelist[index]},
    getfinishName(index){return this.finishNamelist[index]},
    //通过设备信息点击打开
    openWarnrecord(args){
      // console.log(args)
      this.showWarnprocess = !this.showWarnprocess
      const token = this.$Store.get('token')
      getAdviceselect(token).then(res=>{
        this.selectadviceNumslist = ['全部']
        this.searchAdvicenums = args[0]
        this.searchStatu = '待处理'
        this.searchWarntype = this.allwarnTypeList[args[1]+1]
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.selectadviceNumslist.push(res.data.Data[i].MachineNo)
        }

      })
      const message = {'pageIndex':this.pageIndex,"pageSize":this.pageSize,
        "Type":args[1],"Status":0,'MachineNo':args[0]}
      this.searchwarnTypeIndex = args[1]
      // console.log(message)
      getWarningRecord(token,message).then(res=>{
        this.startTimelist = []
        this.adviceNumslist = []
        this.warnTypelist = []
        this.processlist = []
        this.processContentlist = []
        this.finishTimelist = []
        this.finishNamelist = []
        this.pageList = []
        this.recordId = []
        // console.log(res)
        for(let i=0;i<res.data.Data.length;i++){
          this.startTimelist.push(res.data.Data[i].CreateTime)
          this.adviceNumslist.push(res.data.Data[i].MachineNo)
          this.warnTypelist.push(this.allwarnTypeList[res.data.Data[i].Type+1])
          this.processContentlist.push(res.data.Data[i].WarningContent)
          this.processlist.push(this.processState[res.data.Data[i].Status+1])
          this.recordId.push(res.data.Data[i].Id)
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
        this.$forceUpdate()
      })
    }

  },
  computed:{

  },
  beforeMount() {

  },
  created() {

  },
  mounted() {
    this.$bus.$on('openwarnprocessrecord',this.isShowwarnprocessrecord)
    this.$bus.$on('opendevicewarn', this.openWarnrecord)
  },
  beforeDestroy() {
    this.$bus.$off('openwarnprocessrecord')
    this.$bus.$off('opendevicewarn')
  }
}
</script>

<style scoped>
/*公共类*/
select{
  outline: #0089e7;
}

#warn-process-div{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(55,55,55,.6);
  z-index:100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#warn-process{
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
#warn-top{
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
  justify-content: flex-start;
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


#process-state>label{
  margin-left: 12px;
}
#process-state>select{
  margin-left: 5px;
  width:75px;
  height: 35px;
  border-radius:4px;
}
#warn-type>label{
  margin-left: 12px;
}
#warn-type>select{
  margin-left: 5px;
  width: 85px;
  height: 35px;
  border-radius:4px;
}
#advice-nums>label{
  margin-left: 12px;
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
#table-show-div{
  margin-top: 10px;
}
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
#table-td-1{
  width: 150px;
}
#table-td-2{
  width: 150px;
}
#table-td-3{
  width: 110px;
}
#table-td-wanrcontent{
  width: 150px;
}
#table-td-4{
  width: 100px;
}
#table-td-5{
  width: 120px;
}
#table-td-6{
  width: 130px;
}
#table-td-7{
  width: 150px;
}
.trBgc{
  background-color: #edf6fd
}
#warn-head{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#table-show-content{
  text-align: center;
  height: 35px;
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
#button-close-broken{
  width: 120px;
}
/*公共类*/
.table-left-td{
  text-align: left;
}

</style>
