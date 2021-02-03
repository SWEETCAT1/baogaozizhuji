<!--解绑微信公众号-->
<template>
  <div v-show="isShowunbind" id="unbind-wexin-div">

    <div id="unbind-wexin">
      <head-item head-text="解绑公众号"></head-item>
      <p>请登录微信公众号-个人中心内完成解绑!</p>
      <div id="unbind-button">
        <button-item button-name="确定" @click.native="changeUnbindpage"></button-item>
      </div>
    </div>
  </div>

</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import headItem from "@/components/headItem/headItem";
export default {
  name: "unbindWexin",
  components:{
    buttonItem,
    headItem
  },
  data(){
    return {
      isShowunbind:false
    }
  },
  methods:{
    changeUnbindpage(){
      this.isShowunbind = !this.isShowunbind
    }
  },
  mounted() {
    this.$bus.$on('showunbindpage', this.changeUnbindpage)
  },
  beforeDestroy() {
    this.$bus.$off('showunbindpage')
  }
}
</script>

<style scoped>
#unbind-wexin-div{
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
#unbind-wexin{
  background-color: #fff;
  height: 240px;
  width: 240px;
  border: 1px solid #666666;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}
#unbind-wexin>p{
  font-size: 14px;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
}
#unbind-button{
  margin-top: 50px;
  margin-left: 80px;
}
</style>
