<!--修改密码-->
<template>
  <div id="changePassDiv" v-show="showChangePass" >
    <div id="changePass">
      <head-item head-text="修改密码"></head-item>
      <form action="">
        <div id="oriPassDiv">
          <label for="oriPass">原密码</label>
          <input v-model="oriPassword" type="password" id="oriPass" placeholder="请输入登录密码" autocomplete="off">
        </div>
        <div id="newPassDiv">
          <label for="newPass">新密码</label>
          <input v-model="newPassword" type="password" id="newPass" placeholder="请输入新密码" autocomplete="off">
        </div>
        <div id="confirmPassDiv">
          <label for="confirmPass">确认密码</label>
          <input v-model="confirmPassword" type="password" id="confirmPass" placeholder="请再次输入新密码" autocomplete="off">
        </div>
      </form>
      <button-item button-name="确认" id="leftButton" @click.native="confirmChange"></button-item>
      <button-item button-name="取消" id="rightButton" @click.native="changeShow"></button-item>
    </div>
  </div>
</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import headItem from "@/components/headItem/headItem";
import {changePassword} from "@/network/home";
export default {
  name: "changePassword",
  components:{
    headItem,
    buttonItem
  },
  data(){
    return{
      oriPassword:'',
      newPassword:'',
      confirmPassword:'',
      //
      showChangePass: false
    }
  },
  created() {

  },
  methods:{
    changeShow(){
      this.oriPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.showChangePass = !this.showChangePass
    },
    confirmChange(){
      const token = this.$Store.get('token')
      const message = {'OldPwd':this.oriPassword,'NewPwd':this.newPassword,'SureNewPwd':this.confirmPassword}
      changePassword(token,message).then(res=>{
        if (res.data.Code !== 200){
          this.$message.error({message:res.data.Message,center:true})
        } else {
          this.showChangePass = false
          this.$message.success({message:"密码修改成功!",center:true})
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('openchangepage',this.changeShow)
  },
  beforeDestroy() {
    this.$bus.$off('openchangepage')
  }

}
</script>

<style scoped>
#changePassDiv{
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
#changePass{
  background-color: #fff;
  height: 315px;
  width: 410px;
  border: 1px solid #666666;
  font-size: 16px;
}
#oriPassDiv{
  margin-top: 40px;
  margin-left: 40px;
}
#oriPassDiv>input{
  margin-left: 10px;
  width: 270px;
  height: 31px;
}
#newPassDiv{
  margin-top: 20px;
  margin-left: 40px;
}
#newPassDiv>input{
  margin-left: 10px;
  width: 270px;
  height: 31px;
}
#confirmPassDiv{
  margin-top: 20px;
  margin-left: 23px;
}
#confirmPassDiv>input{
  margin-left: 10px;
  width: 270px;
  height: 31px;
}
#leftButton{
  margin-top: 30px;
  margin-left: 110px;
  margin-right: 53px;
}

</style>
