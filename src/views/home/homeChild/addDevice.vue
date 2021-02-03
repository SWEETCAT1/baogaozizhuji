<!--弹出框样式-->
<template>
  <div id="addDeviceDiv" v-show="showAddadvice">
    <div id="addDevice">
      <head-item head-text="添加设备"></head-item>
      <form action="">
        <div id="adviceNums">
          <label for="numsinput">终端编号</label>
          <input type="text" v-model="adviceNum" id="numsinput" autocomplete="off">
        </div>
        <div id="adviceLoca">
          <label for="locationinput">终端位置</label>
          <input type="text" v-model="adviceLocation" id="locationinput" autocomplete="off">
        </div>
      </form>
      <button-item button-name="确认" id="leftButton" @click.native="addDeviceinfo"></button-item>
      <button-item button-name="取消" id="rightButton" @click.native="changeShowadvice"></button-item>
    </div>
  </div>
</template>

<script>
import headItem from "@/components/headItem/headItem";
import buttonItem from "@/components/button/buttonItem";
import {addDevice} from "@/network/home";

export default {
  name: "addDevice",
  components:{
    headItem,
    buttonItem
  },
  data() {
    return {
      showAddadvice: false,
      adviceNum:'',
      adviceLocation:''
    }
  },
  methods:{
    changeShowadvice(){
      this.showAddadvice = !this.showAddadvice
      this.adviceNum = ''
      this.adviceLocation = ''
    },
    addDeviceinfo(){
      const token = this.$Store.get('token')
      const message = {'MachineNo':this.adviceNum,'MachinePlace':this.adviceLocation}
      addDevice(token,message).then(res=>{
        if (res.data.Code!==200){
          this.$message.error({message:res.data.Message,center:true})
        } else {
          this.$message.success('添加成功')
          this.$bus.$emit('createhomeagin')
          this.changeShowadvice()
          window.location.reload()
        }
      })
    }
  },

  mounted() {
    this.$bus.$on('openaddadvice',this.changeShowadvice)
  },
  beforeDestroy() {
    this.$bus.$off('openaddadvice')
  }
}
</script>

<style scoped>
#addDeviceDiv{
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
#addDevice{
  background-color: #fff;
  height: 275px;
  width: 493px;
  border: 1px solid #666666;
  font-size: 16px;
}
#adviceNums{
  margin-top: 40px;
  margin-left: 20px;
}
#adviceNums>input{
  margin-left: 10px;
  width: 360px;
  height: 31px;
}
#adviceLoca{
  margin-top: 30px;
  margin-left: 20px;
}
#adviceLoca>input{
  margin-left: 10px;
  width: 360px;
  height: 31px;
}
#leftButton{
  margin-left: 131px;
  margin-top: 30px;
  margin-right: 80px;
}

</style>
