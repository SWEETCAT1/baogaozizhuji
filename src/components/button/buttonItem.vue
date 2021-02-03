<!--常规蓝色按钮组件-->
<template>
  <div class="buttonDiv">
    <button class="buttonItem">
      <a href="javascript:void(0);">
        {{buttonName}}
      </a>
    </button>
    <div class="warnButtonDiv" v-if="isWarn">
      <div class="warnButton">
        <span>{{warnNums}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "buttonItem",
  data(){
    return {

    }
  },
  props:[
    'buttonName','isWarn','warnNums'
  ]
  //   {
  //   buttonName:String,
  //   isWarn:{
  //     type:Boolean,
  //     default:false
  //   },
  //   warnNums:String
  // }
}
</script>

<style scoped>
.buttonItem{
  background-color: #0089e7;
  border:none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  padding: 12px 23px;
  border-radius: 4px;
  margin-right: -10px;
  outline: none;
}
.buttonItem>a{
  text-decoration: none;
  color: white;
}
.buttonDiv{
  display: inline-block;
}
.warnButtonDiv {
  display: inline-block;
  position: relative;
  float: right;
  z-index: 2;
  margin-top: -7px;
}
.warnButton{
  border: 1px solid red;
  background-color: red;
  color:white ;
  border-radius: 50%;
  height: 18px;
  width: 19px;
  font-size: 14px;
  display: flex;
  justify-content: center;
}

</style>
