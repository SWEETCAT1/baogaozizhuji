<!--打印次数限制-->
<template>
  <div id="print-nums-limit-div" v-show="showPrintnums">
    <div id="print-nums-limit">
      <head-item head-text="打印次数限制"></head-item>
      <div class="row-input" id="switch-btn">
       <label>打印次数限制</label>
        <el-switch
          v-model="isPrintcount"
          active-color="#13ce66"
          inactive-color="#8c8c8c">
        </el-switch>
      </div>
      <div class="row-input" id="setting-input">
        <label>次数配置</label>
        <input type="text" v-model="printCount">
        <label id="setting-input-label">份/人</label>
      </div>
      <div id="setting-btn">
        <button-item button-name="保存" @click.native="savePrintnums"></button-item>
        <button-item button-name="取消" @click.native="changeShowprintnums"></button-item>
      </div>
    </div>
  </div>
</template>

<script>
import headItem from "@/components/headItem/headItem";
import buttonItem from "@/components/button/buttonItem";
import {getPrintnums,setprintManage} from "@/network/home";

export default {
  name: "printNums",
  components:{
    headItem,
    buttonItem
  },
  data(){
    return{
      showPrintnums:false,
      isPrintcount:'',
      printCount:'',
      idPrint:''
    }
  },
  methods:{
    changeShowprintnums(){
      this.isPrintcount = ''
      this.printCount = ''
      this.idPrint = ''
      this.showPrintnums = !this.showPrintnums
      const token = this.$Store.get('token')
      getPrintnums(token).then(res=>{
        // console.log(res)
        this.isPrintcount = res.data.Value._isprintcount
        this.printCount = res.data.Value._count
        this.idPrint = res.data.Value._id
      })
    },
    //保存
    savePrintnums(){
      const token = this.$Store.get('token')
      const message = {
        "Id":this.idPrint,'IsPrintCount':Number(this.isPrintcount),'Count':this.printCount
      }
      // console.log(message)
      setprintManage(token,message).then(res=>{
        // console.log(res)
        if(res.data.Code!==200){
          this.$message.error({message:res.data.Message,center:true})
        } else {
          this.showPrintnums = false
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('openprintnums', this.changeShowprintnums)
    this.$bus.$on('changeswtichbutton',this.changeSwitch)
  },
  beforeDestroy() {
    this.$bus.$off('openprintnums')
    this.$bus.$off('changeswtichbutton')
  }
}
</script>

<style scoped>
#print-nums-limit-div{
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
#print-nums-limit{
  background-color: #fff;
  height: 240px;
  width: 240px;
  border: 1px solid #666666;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}
.row-input{
  display: flex;
  flex-direction: row;
}
#switch-btn{
  margin-top: 40px;
  margin-left: 20px;
}
#switch-btn>label{
  margin-right: 20px;
}
#setting-input{
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  white-space: nowrap;
}
#setting-input>label{
  margin-left: 20px;
  margin-top: 10px;
}
#setting-input>input{
  margin-left:18px ;
  height: 30px;
  width: 40px;
}
#setting-input-label{
  margin-right: 40px;
}
#setting-btn{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

</style>
