<template>
  <div id="del-account-div" v-show="showDelaccount">
    <div id="del-account">
      <head-item head-text="删除账号"></head-item>
      <div id="del-content">
        <span>你确定删除这个账号吗？</span>
        <div id="del-button">
          <button-item button-name="确定" @click.native="confirmDel"></button-item>
          <button-item button-name="取消" @click.native="closeDelaccount"></button-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import headItem from "@/components/headItem/headItem";
import {delAdmin} from "@/network/permission";
export default {
  name: "delAccount",
  components:{
    buttonItem,
    headItem
  },
  data(){
    return{
      showDelaccount:false,
      delId:''
    }
  },
  methods:{
    openDelaccount(index){
      this.showDelaccount = !this.showDelaccount
      this.delId = index
    },
    closeDelaccount(){
      this.showDelaccount = false
    },
    confirmDel(){
      const token = this.$Store.get('token')
      const delMessage = this.delId.toString()
      delAdmin(delMessage,token).then((res)=>{
        if(res.data.Code !== 200){
         this.$message.error(res.data.Message)
        } else {
          this.closeDelaccount()
          this.$bus.$emit('createpermission')
        }
      })

    }
  },
  mounted() {
    this.$bus.$on('opendelaccount',this.openDelaccount)
  },
  beforeMount() {
    this.$bus.$off('opendelaccount')
  }
}
</script>

<style scoped>
#del-account-div{
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
#del-account{
  background-color: #fff;
  height: 150px;
  width: 240px;
  border: 1px solid #666666;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#del-content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
#del-content>span{
  margin-top: 20px;
}
#del-button{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

</style>
