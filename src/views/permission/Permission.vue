<template>
  <div id="permission-div" @keydown.enter="searchAdmin">
<!--    查询栏-->
    <div id="permission-search-div">
      <div id="permission-search">
        <div id="permission-input-admin" class="permission-input">
          <label>登录账号</label>
          <input type="text" class="radius-input" v-model="loginAccount">
        </div>
        <div class="block">
          <span class="demonstration">创建时间</span>
          <el-date-picker
            v-model="loginCreatetime"
            align="center"
            type="date"
            placeholder="选择日期"
            :editable="false"
            size="large"
            style="border: 1px solid #666666;border-radius: 5px;margin-left: 5px"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="permission-input">
          <label>手机号码</label>
          <input type="text" class="radius-input" v-model="phoneNumber">
        </div>
        <div class="permission-input">
          <label>姓名</label>
          <input type="text" class="radius-input" v-model="doctorName">
        </div>
        <div id="permission-button">
          <button-item button-name="查询" @click.native="searchAdmin"></button-item>
        </div>
      </div>
    </div>
<!--    医生权限表格-->
    <div id="permission-table" >
      <div id="permission-table-table-div">
        <div id="permission-table-button">
          <button-item button-name="创建" @click.native="openCreatepage"></button-item>
        </div>
        <div id="permission-table-div">
          <table id="permission-table-table">
            <tr id="permission-table-table-blue-tr">
              <td id="permission-table-td-1">序号</td>
              <td id="permission-table-td-2">登录账号</td>
              <td id="permission-table-td-3">姓名</td>
              <td id="permission-table-td-4">手机号码</td>
              <td id="permission-table-td-5">创建时间</td>
              <td id="permission-table-td-6">操作</td>
            </tr>
            <tr v-for="(item,index) in doctorIdlist" :key="item+index" :class="{trBgc:index%2===1}">
              <td class="table-show-content">
                {{index+1}}
              </td>
              <td class="table-show-content table-left-td">
                <div style="width:160px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                    margin-left: 4px"
                   :title="doctorAccountlist[index]">{{getDocAccount(index)}}</div>
                </td>
              <td class="table-show-content table-left-td">
                <div style="width:160px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
                    margin-left: 4px"
                    :title="doctorNamelist[index]">{{getDocName(index)}}</div></td>
              <td class="table-show-content">{{getDocPhone(index)}}</td>
              <td class="table-show-content">{{getDocCreate(index)}}</td>
              <td>
                <a href="javascript:void(0);" class="table-handle"
                   id="table-handle-first"
                   @click="tabEditor(index)">编辑</a>
                <a href="javascript:void(0);" class="table-handle" style="color: red"
                   @click="tabDelete(index)">删除</a>
                <a href="javascript:void(0);" class="table-handle" style="color: blue"
                   @click="tabStopadmin(index)">{{getUserdata(index)}}</a>
                <a href="javascript:void(0);" class="table-handle"
                   @click="tabResetpass(index)">重置密码</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <create-admin></create-admin>
    <!--<reset-password></reset-password>-->
    <del-account></del-account>
    <editor-account></editor-account>
  </div>
</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import createAdmin from "@/views/permission/permissionChild/createAdmin";
import delAccount from "@/views/permission/permissionChild/delAccount";
import editorAccount from "@/views/permission/permissionChild/editorAccount";
import {
  getAdminlist,
  stopAdmin,
  resetPass
} from "@/network/permission";

export default {
  name: "Permission",
  components:{
    buttonItem,
    createAdmin,
    delAccount,
    editorAccount,
  },
  data(){
    return {
      doctorIdlist: [],
      doctorAccountlist: [],
      doctorNamelist: [],
      doctorPhonelist: [],
      doctorCreatetimelist: [],
      doctorIsuse: [],
      userState: ['启用', '停用'],

      loginAccount: '',
      loginCreatetime: '',
      phoneNumber: '',
      doctorName: '',

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]

      }
    }
  },
  methods:{
    openCreatepage(){
      this.$bus.$emit('opencreatepage')
    },
    //编辑
    tabEditor(index){
      const editId = this.doctorIdlist[index]
      const oriName = this.doctorNamelist[index]
      const oriPhone = this.doctorPhonelist[index]
      this.$bus.$emit('openeditorpage',editId, oriName,oriPhone)
      this.createPermission()
    },
    //删除
    tabDelete(index){
      const docId = this.doctorIdlist[index]
      this.$bus.$emit('opendelaccount', docId)
      this.createPermission()
    },
    //暂停账号
    tabStopadmin(index){
      const token = this.$Store.get('token')
      const message = {'Id':this.doctorIdlist[index],'IsUse':Number(!this.doctorIsuse[index])}
      stopAdmin(message,token).then((res)=>{
        if (res.data.Code!==200){
          this.$message.error({message:res.data.Message,center:true})
        } else {
          this.$message.success({message:res.data.Message,center:true})
          this.createPermission()
        }
      })
    },
    //重置密码
    tabResetpass(index){
      const resetId = this.doctorIdlist[index]
      const token = this.$Store.get('token')
      resetPass(resetId, token).then(res=>{
        if (res.data.Code!==200){
          this.$message.error({message:res.data.Message,center:true})
        } else {
          this.$message.success({message:res.data.Message,center:true})
          this.createPermission()
        }
      })
    },
    getDocAccount(index){return this.doctorAccountlist[index]},
    getDocName(index){return this.doctorNamelist[index]},
    getDocPhone(index){return this.doctorPhonelist[index]},
    getDocCreate(index){return this.doctorCreatetimelist[index]},
    getUserdata(index){return this.userState[this.doctorIsuse[index]]},
    //查询
    searchAdmin(){
      const token = this.$Store.get('token')
      const listmessage = {'Account':this.loginAccount,'CreateTime':this.loginCreatetime,
        'Phone':this.phoneNumber,'Name':this.doctorName,}
      getAdminlist(listmessage, token).then(res=>{
        // console.log(res)
        if(res.data.Message != null){
          this.$message.error(res.data.Message)
        }
        //数据更新
        this.doctorIdlist=[]
        this.doctorAccountlist=[]
        this.doctorNamelist=[]
        this.doctorPhonelist=[]
        this.doctorCreatetimelist=[]
        this.doctorIsuse=[]
        const permissionTable = res.data.Data
        for(let i=0;i<permissionTable.length;i++){
          this.doctorIdlist.push(permissionTable[i]['Id'])
          this.doctorAccountlist.push(permissionTable[i]['Account'])
          this.doctorNamelist.push(permissionTable[i]['Name'])
          this.doctorPhonelist.push(permissionTable[i]['Phone'])
          this.doctorCreatetimelist.push(permissionTable[i]['CreateTime'])
          this.doctorIsuse.push(permissionTable[i]['IsUse'])
        }
      })
    },
    //初始化函数
    createPermission(){
      this.doctorIdlist = []
      this.doctorAccountlist = []
      this.doctorNamelist = []
      this.doctorPhonelist = []
      this.doctorCreatetimelist = []
      this.doctorIsuse = []
      const token = this.$Store.get('token')
      getAdminlist('',token).then(res=>{
        const permissionTable = res.data.Data
        // console.log(permissionTable)
        for(let i=0;i<permissionTable.length;i++){
          this.doctorIdlist.push(permissionTable[i]['Id'])
          this.doctorAccountlist.push(permissionTable[i]['Account'])
          this.doctorNamelist.push(permissionTable[i]['Name'])
          this.doctorPhonelist.push(permissionTable[i]['Phone'])
          this.doctorCreatetimelist.push(permissionTable[i]['CreateTime'])
          this.doctorIsuse.push(permissionTable[i]['IsUse'])
        }
      })
    }
  },
  computed:{
  },
  created() {
    this.createPermission()
  },
  mounted() {
    this.$bus.$on('createpermission',this.createPermission)
  },
  beforeDestroy() {
    this.$bus.$off('createpermission')
  },
}
</script>

<style scoped>
#permission-div{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/*查询页*/
#permission-search-div{
  background-color: #fff;
  height: 100px;
  min-width: 1400px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 15%;
  margin-right: 15%;
  font-size: 14px;
}
#permission-search{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  white-space: nowrap;
  height: 100%;
}
#permission-input-admin>label{
  margin-left: 20px;
}
.permission-input{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-left: 10px;
}
.permission-input>input{
  width: 132px;
  height: 38px;
  margin-left: 10px;
  outline: none;
  border: 1px solid #666666;
}
.block{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
#permission-button{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.radius-input{
  border: 1px solid #bebebe;
  border-radius: 4px;
  outline: none;
}
/*权限管理表格*/
#permission-table{
  background-color: #fff;
  font-size: 14px;
  height: 700px;
  min-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y:auto;
  /*overflow-x: hidden;*/
}
#permission-table-table-div{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  white-space: nowrap;
}
#permission-table-button{
  margin-top: 20px;
  margin-left: 24px;
}
#permission-table-table{
  margin-left: 20px;
  margin-top: 12px;
  border: 1px solid #dbdbdb;
  white-space: nowrap;
}
#permission-table-table-blue-tr{
  background-color: #0089e7;
  border-radius: 5px;
  color: white;
  text-align: center;
  height: 35px;
}
#permission-table-td-1{width: 120px}
#permission-table-td-2{width: 180px}
#permission-table-td-3{width: 180px}
#permission-table-td-4{width: 200px}
#permission-table-td-5{width: 150px}
#permission-table-td-6{width: 300px}
.trBgc{background-color: #edf6fd}
.table-show-content{
  height: 35px;
  text-align: center;
}
.table-handle{
  text-decoration: none;
  color: #0089e7;
  margin-left: 20px;
}
#table-handle-first{
  margin-left: 50px;
}
.table-left-td{
  text-align: left;
}


</style>
