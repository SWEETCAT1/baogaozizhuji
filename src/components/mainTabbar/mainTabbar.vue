<!--导航栏组件-->
<template>
  <div id="tabbar">
    <div id="main-tabbar" v-show="!(path==='login')">
<!--      左边模块-->
      <div id="tab-left">
        <div id="tab-left-info0">
          <p>{{info[0]}}</p>
        </div>
        <div id="tab-left-info1">
          <p>{{info[1]}}</p>
        </div>
      </div>
<!--      中间模块-->
      <div id="tab-middle">
        <div v-for="(item,index) in middleInfo" :key="index" class="middleBox">
          <a href="" class="middleInfo" @click="isActive(index)" :class="{checkedbox:isChecked(index)}">
            {{item}}
          </a>
        </div>
      </div>
<!--      右边的模块-->
      <div id="tab-right">
        <div id="tab-right-icon">
          <img src="~@/assets/img/docIcons.svg" alt="" >
        </div>

        <div id="tab-right-span" >
          <a href="javascript:void(0);">
            <span @click="isChange">{{this.$Store.get('doctorName')}}</span>
          </a>
          <div v-show="showPassword" id="float-item">
            <div id="changePasswordDiv">
              <a id="changePassword" href="javascript:void(0);"
                 @click="isShowchangepass"
              >修改密码</a>
            </div>
            <div id="changeWexinDiv">
              <a id="changeWexin" href="javascript:void(0);"
                 @click="isShowunbindpage">解绑公众号</a>
            </div>
          </div>
        </div>

        <div id="tab-right-arrow">
          <a href="javascript:void(0);">
            <img src="~@/assets/img/arrow-down.svg" alt="" @click="isChange">
          </a>
        </div>

        <div id="tab-right-button">
          <a href=" ">
            <img src="~@/assets/img/logout.svg" alt="" @click="exitLogin">
          </a>
        </div>
      </div>
    </div>
    <change-password></change-password>
    <unbind-wexin></unbind-wexin>
  </div>
</template>

<script>
import changePassword from "@/components/mainTabbar/changePassword";
import unbindWexin from "@/components/mainTabbar/unbindWexin";
export default {
  name: "mainTabbar",
  components:{
    changePassword,
    unbindWexin
  },
  data(){
    return {
      info:[
        '体检报告自助打印终端管理后台',
        'Self service printing terminal of physical examination report'.toUpperCase()
      ],
      middleInfo:[
        '首页','数据统计','权限管理'
      ],
      routerInfo:[
        'home','data','permission'
      ],
      // login界面不显示
      path:'',
      // 下拉界面
      showPassword:false,
      // doctorName:'',
    }
  },
  computed:{

  },
  methods:{
    //导航路由跳转
    isActive(index){
      if (this.$route.path !== this.routerInfo[index]){
        this.$router.push({name:this.routerInfo[index],query:{doctorname:this.$Store.get('doctorName')}})
        return this.$route.path = this.routerInfo[index]
      }
    },
    // 动态样式切换判断
    isChecked(index){
      return this.routerInfo.indexOf(this.$route.name) === index;
    },
    // 退出登录
    exitLogin(){
      localStorage.removeItem("doctorName")
      localStorage.removeItem("token")
      localStorage.removeItem("BASE_URL")
      this.$router.push('/login')
    },
    // 修改界面状态改变
    isChange() {
      this.showPassword = !this.showPassword
    },
    //修改密码界面是否弹出
    isShowchangepass(){
      this.$bus.$emit('openchangepage');
      this.showPassword = !this.showPassword
    },
    //打开解绑公众号界面
    isShowunbindpage(){
      this.$bus.$emit('showunbindpage');
      this.showPassword = !this.showPassword
    },

  },
  mounted() {

  },
  beforeCreate() {

  },
  created() {
    this.path = this.$route.name;
  },
  updated() {
    this.path = this.$route.name;

  },
  activated() {

  },
  beforeDestroy() {

  },
  watch:{

  },

}
</script>

<style scoped>
#tabbar{
}
#main-tabbar{
  background-color: #0089e7;
  height: 90px;
  min-width: 1457.6px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
}
/*left*/
#tab-left{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  height: 90px;
  margin-right:8.5% ;
}
#tab-left-info0{
  margin-left: 30px;
  flex-wrap: nowrap;
}
#tab-left-info1{
  margin-top: -35px;
  margin-left: -5px;
  flex-wrap: nowrap;
}
#tab-left-info0>p{
  font-size: 25px;
  color: white;
}
#tab-left-info1>p{
  font-size:12px;
  -webkit-transform:scale(0.83,0.83);
  color: white;
}

/*middle*/
#tab-middle{
  display: flex;
  justify-content: flex-start;
}
.middleBox{
  height: 90px;
  padding-top: 88px;
  font-weight: lighter;
}
.middleInfo{
  margin-right: 65px;
  font-size: 16px;
  color: white;
  text-decoration: none;
}
.checkedbox{
  border-bottom:4.5px solid white;
  padding-bottom:8.5px
}

/*right*/
#tab-right {
  margin-left: 300px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
#tab-right-icon{
  margin-right: 8px;
  margin-top: 3px;
}
#tab-right-button{
  margin-right: 34px;
}
#tab-right-arrow{
  margin-right: 23px;
}
#tab-right-span{
  margin-right: 4px;
  margin-top: 3px;
  font-size: 14px;
}
#tab-right-icon>img{
  width: 17px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
}
#tab-right-arrow>a>img{
  width: 20px;
  height: 15px;
  margin-top: 5px;
}
#tab-right-span>a{
  text-decoration: none;
  color: white;
}
#tab-right-button>a>img{
  height: 20px;
  width: 20px;
  padding: 3px;
  border-radius: 50%;
  background-color: white;
}

#float-item{
  position: absolute;
  margin-top: 8px;
  margin-right: 8px;
  padding: 8px;
  background-color: #ffffff;
  border: 0 solid;

}
#changePassword{
  text-decoration: none;
  color: #666666;
}
#changeWexin{
  text-decoration: none;
  color: #666666;
}
#changePasswordDiv{
  margin-top: 4px;
  margin-bottom: 18px;
}
#changeWexinDiv{
  margin-top: 12px;
  margin-bottom: 8px;
}

#changeWexin:hover{
  color: #0089e7;
}
#changePassword:hover{
  color: #0089e7;
}
@media screen and (max-height: 1366px) and (max-width:768px ){
  #main-tabbar{
    min-width: 800px;
    align-items: flex-start;
    justify-content: flex-start;
  }
  #tab-right{
    margin-left: 50px;
  }
}
</style>
