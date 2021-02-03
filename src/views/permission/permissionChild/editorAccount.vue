<template>
  <div id="editor-account-div" v-show="showEditor">
    <div id="editor-account">
      <head-item head-text="编辑账号"></head-item>
      <div id="editor-input-div">
        <div class="editor-input" id="editor-input-1">
          <label>姓名</label>
          <input type="text" placeholder="输入新的姓名" v-model="newName">
        </div>
        <div class="editor-input">
          <label>手机号码</label>
          <input type="text" placeholder="输入新的手机号码" v-model="newPhone">
        </div>
        <div id="editor-button">
          <button-item button-name="确认" @click.native="confirmEditor"></button-item>
          <button-item button-name="取消" @click.native="closeShoweditor"></button-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import headItem from "@/components/headItem/headItem";
import {editAccount} from "@/network/permission";
export default {
  name: "editorAccount",
  components:{
    buttonItem,
    headItem
  },
  data(){
    return {
      showEditor:false,
      newName:'',
      newPhone:'',
      editId:''
    }
  },
  props:[

  ],
  methods:{
    changeShoweditor(Id,oriName,oriPhone){
      this.showEditor = !this.showEditor
      this.editId = Id
      this.newName = oriName
      this.newPhone = oriPhone
    },
    closeShoweditor(){
      this.showEditor = false
    },
    confirmEditor(){
      const token = this.$Store.get('token')
      const message = {Id:this.editId,Name:this.newName,Phone:this.newPhone}
      editAccount(token,message).then(res=>{
        // console.log(res)
        if (res.data.Code !== 200){
          this.$message.error({message:res.data.Message,center:true})
        } else {
          this.closeShoweditor()
          this.$bus.$emit('createpermission')
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('openeditorpage',this.changeShoweditor)
  },
  beforeDestroy() {
    this.$bus.$off('openeditorpage')
  }
}
</script>

<style scoped>
#editor-account-div{
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
#editor-account{
  background-color: #fff;
  height: 300px;
  width: 400px;
  border: 1px solid #666666;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#editor-input-div{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  font-size: 16px;
}
.editor-input{
  margin-top: 10px;
}
.editor-input>input{
  height: 38px;
  width: 280px;
  margin-left: 10px;
  border:1px solid #d4d4d4;
  border-radius: 5px;
}
#editor-input-1>label{
  letter-spacing: 15px;
}
#editor-button{
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}
</style>
