<template>
  <div id="create-account-div" v-show="showCreateaccount">
    <div id="create-account">
      <head-item head-text="创建账号"></head-item>
      <div id="create-account-input">
        <div id="create-account-input-1" class="create-input">
          <label>姓名</label>
          <input type="text" placeholder="输入姓名" v-model="createName">
        </div>
        <div id="create-account-input-2" class="create-input">
          <label>手机号码</label>
          <input type="text" placeholder="手机号码" v-model="createPhone">
        </div>
        <div id="create-account-input-3" class="create-input">
          <label>登录账号</label>
          <input type="text" placeholder="请勿输入非常规符号" v-model="createAccount">
        </div>
        <div id="create-account-input-4" class="create-input">
          <label>登录密码</label>
          <input type="password" placeholder="输入登录密码" v-model="createPass">
        </div>
        <div id="create-account-input-5" class="create-input">
          <label>确认密码</label>
          <input type="password" placeholder="确认密码" v-model="createConfirmpass">
        </div>
      </div>
      <div id="wexin-div">
        <span>绑定微信公众号</span>
        <img :src="`${publicPath}weixerweima.png`" alt="">
        <!--<img src="/weixerweima.png" alt="">-->
      </div>
      <div id="wexin-span">
        <span>扫码关注公众号并完成注册,才可以收取耗材</span>
        <span>预警等消息推送</span>
      </div>
      <div id="create-account-button">
        <button-item button-name="确认" @click.native="createAdminaccount"></button-item>
        <button-item button-name="取消" @click.native="closeShowcreatepage"></button-item>
      </div>
    </div>
  </div>
</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import headItem from "@/components/headItem/headItem";
import {createAdmin} from "@/network/permission";

export default {
  name: "createAdmin",
  components:{
    headItem,
    buttonItem,
  },
  data(){
    return{
      showCreateaccount:false,
      createName:'',
      createPhone:'',
      createAccount:'',
      createPass:'',
      createConfirmpass:'',
      publicPath:process.env.BASE_URL,
    }
  },
  methods:{
    //创建管理员
    isShowcreatepage(){
      this.createName = ''
      this.createPhone = ''
      this.createAccount = ''
      this.createPass = ''
      this.createConfirmpass = ''
      this.showCreateaccount = !this.showCreateaccount
    },
    closeShowcreatepage(){
      this.createName = ''
      this.createPhone = ''
      this.createAccount = ''
      this.createPass = ''
      this.createConfirmpass = ''
      this.showCreateaccount = false
    },
    createAdminaccount(){
      const token = this.$Store.get('token')
      const createMessage = {Name:this.createName,
        Phone:this.createPhone,Account:this.createAccount,
        Password:this.createPass,SurePassword:this.createConfirmpass}
        createAdmin(token, createMessage).then(res=>{
          // console.log(res)
          if (res.data.Code !== 200){
            this.$message.error({message:res.data.Message,center:true})
          } else {
            this.closeShowcreatepage()
            this.$bus.$emit('createpermission')
          }
        })
        this.$bus.$emit('updatepermission')
    }
  },
  mounted() {
    this.$bus.$on('opencreatepage',this.isShowcreatepage)
  },
  beforeDestroy() {
    this.$bus.$off('opencreatepage')
  }
}
</script>

<style scoped>
#create-account-div{
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
#create-account{
  background-color: #fff;
  height: 600px;
  width: 400px;
  border: 1px solid #666666;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#create-account-input{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  font-size: 16px;
}
.create-input{
  margin-top: 10px;
  margin-left: 5px;
}
.create-input>input{
  height: 38px;
  width: 280px;
  margin-left: 10px;
  border:1px solid #d4d4d4;
  border-radius: 5px;
}
#create-account-input-1>label{
  letter-spacing: 15px;
}
#wexin-div{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 15px;
  margin-left: 35px;
}
#wexin-div>img{
  height: 114px;
  width: 114px;
}
#wexin-span{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 200;
}
#create-account-button{
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
