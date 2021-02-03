<template>
<!--背景-->
    <div id="main-bgc">
<!--登录部分-->
      <div id="main-div">
<!--左边页面-->
        <div id="main-left">
          <img src="~assets/img/login/logo.png" alt="">
          <span id="top-span">深圳市天方达健信科技有限公司版权所有</span>
          <span id="bottom-span">全国服务热线: 400-103-7788</span>
        </div>
<!--右边页面-->
        <div id="main-right">
          <div id="main-right-info">
            <span id="main-right-top">{{info[0]}}</span>
            <span id="main-right-bottom">{{info[1]}}</span>
          </div>

          <div class="main-right-login" id="mainLogintop">
            <img src="~assets/img/login/user.png" alt="">
            <span>用户名</span>
            <input type="text" class="login-input"
                   v-model="userName" ref="userName">
          </div>
          <div class="main-right-login" id="mainLoginbottom">
            <img src="~assets/img/login/password.png" alt="">
            <span>密 码</span>
            <input type="password" class="login-input form-control"
                   v-model="userPassword" ref="userPassword" @keydown.enter="toRouterhome">
          </div>

          <div id="login-button" @click="toRouterhome">
            <button id="login-button-item">
              <a href="javascript:void(0);" style="text-decoration: none;color: white;">
                <span>{{buttonName}}</span>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {postUserinfo} from "@/network/login";

export default {
  name: "Login",
  components:{

  },
  data(){
    return {
      info:[
        '体检报告自助打印终端管理后台',
        'Self service printing terminal of physical examination report'.toUpperCase()
      ],
      buttonName:'登 录',
      userName:'',
      userPassword:'',
      isLogin:false,
    }
  },
  methods:{
    toRouterhome(){
      const pass = this.$md5(this.userPassword)
      postUserinfo(this.userName, pass).then(res=>{
        if(res.data.Code !== 200){
          // console.log(res)
          this.$message.error({message:res.data.Message,center:true})
        } else {
          this.$message.success({message:'登录成功',center:true})
          const accessToken = JSON.parse(res.request.response).Value.access_token
          this.$Store.set('token',accessToken)
          let docName = JSON.parse(res.config.data)['Account']
          localStorage.removeItem("doctorName")
          this.$Store.set('doctorName', docName)
          this.$router.push({name:'home', query:{doctorname:docName}})
        }
      })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
/*左边*/
#main-bgc{
  background-image: url("../../assets/img/login/loginBackground.png");
  background-attachment:fixed;
  background-size: contain;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
#main-div{
  display: flex;
  flex-direction: row;
}
#main-left{
  background-color: #2054ca;
  width: 350px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#main-right{
  background-color: #fff;
  width: 520px;
  height: 450px;
  display: flex;
  flex-direction: column;
}
#main-left>img{
  margin-top: 15%;
}
#main-left>span{
  color:#ffffff ;
  font-size: 13px;
  font-weight: 300;
}

/*右边*/
#top-span{
  margin-top: 12%;
}
#bottom-span{
  margin-top: 3%;
}
#main-right-info{
  display: flex;
  flex-direction: column;
  align-items: center;
}
#main-right-top{
  margin-top: 70px;
  font-size: 26.5px;
  font-weight: bold;
  color: #343434;
}
#main-right-bottom{
  margin-top: 7px;
  font-size:13.5px;
  -webkit-transform:scale(0.83,0.83);
  font-weight: 300;
  color: #bebebe;
}
.login-input{
  border:0;
  border-bottom:1px solid #bebebe;
  outline: none;
}
.main-right-login{
  white-space: nowrap;
}
#mainLogintop{
  margin-top: 80px;
  margin-left: 60px;
}
#mainLogintop>span{
  margin-left: 10px;
  margin-right: 10px;
}
#mainLogintop>input{
  width: 300px;
}
#mainLoginbottom{
  margin-top: 50px;
  margin-left: 60px;
}
#mainLoginbottom>span{
  margin-left: 10px;
  margin-right: 10px;
  word-spacing: 12px;
}
#mainLoginbottom>input{
  width: 300px;
}
#login-button{
  margin-top: 50px;
  margin-left: 80px;
}
#login-button-item{
  width: 360px;
  height: 45px;
  background-color: #0089e7;
  border-radius:20px;
  outline: none;
  border: 1px solid #bebebe;
}
@media screen and (max-height:768px) and (max-width: 1366px){
  #main-div{
    margin-top: 100px;
  }
}
</style>
