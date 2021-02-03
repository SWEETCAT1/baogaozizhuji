<!--设备管理展示组件-->
<template>
  <div id="deviceInfo">
<!--    具体每个设备的div-->
<!--    index1是设备列表的序列号-->
    <div v-for="(item,index1) in deviceInfo" :key="item+index1"
         class="deviceBox" :style="{marginRight:'-40px'?index1%2!==0:false}">
      <div id="deviceHead">
<!--        编号-->
        <div id="deviceHeadDiv1">
          <div style="width:132px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;">
            <span :title="item" >编号 {{item}}</span>
          </div>
          <div>
            <img :src="checkState(index1)" alt="">
          </div>
        </div>
<!--        设置模块-->
        <div id="deviceHeadDiv2">
          <a href="javascript:void(0);" @click="openSettingpage(index1)">
            <img src="~assets/img/deviceIcon/setting.png" alt="">
            <span>设置</span>
          </a>
        </div>
      </div>

<!--      图标和比例显示-->
      <div class="deviceBody">
        <div>
          <img src="~assets/img/zhongduanji.png" alt="">
        </div>
        <div class="listItem">
          <!--index2是耗材列表的序列号-->
          <div v-for="(item,index2) in listTitle" :key="item+index2" class="forItem">
<!--            这里是警示标-->
            <div class="warnProcessbar">
              <div>
                <img v-if="isWarning(index1,index2)" @click="openDevicewarn(index1,index2)"
                     src="~assets/img/deviceIcon/iswarning.png" style="cursor: pointer">
                <img v-else src="~assets/img/deviceIcon/nowarning.png" alt="">
              </div>
            </div>
            <div class="titleProcessbar">
              <span>{{item}}</span>
            </div>
<!--            这里是右边的进度条-->
            <div class="processbar">
              <div :style="{background:'#e7e7e7',
                 height:'13px',width:'95px',
                 borderRadius:'5.5px'}"
                   class="groundProcessbar"
              ></div>
              <div :style="{background:listColor[index2],
                  height:'13px',width:checkWidth(index1,index2),
                  borderRadius: '5.5px'}"
                   class="coverProcessbar"></div>
              <!--            后面显示的数据-->
            </div>
            <div class="listNums">
              <span>{{getListNums(index1,index2)}}</span>
            </div>
          </div>
        </div>
      </div>
<!--      位置显示和管理员-->
      <div id="deviceFoot">
        <div style="width:150px; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
          height: 25px" :title="listLocation[index1]">{{listLocation[index1]}}</div>
        <div>
          <span>管理员:</span>
          <span>{{Manager[index1]}}</span>
        </div>
      </div>
    </div>
<!--    添加设备单独的div-->
    <div class="addDevicebox">
      <div @click="isopenAddadvice">
        <a href="javascript:void(0);">
          <img src="../../../assets/img/deviceIcon/addDevice.png" alt="">
        </a>
      </div>
      <div>
        <span>添加设备</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getDevicelist} from "@/network/home";

export default {
  name: "deviceInfo",
  components: {
  },
  computed:{
    ...mapGetters([
    ]),


  },
  data(){
    return {
      //不变的参数
      imgPath:[
        require('@/assets/img/deviceIcon/isoffline.png'),
        require('@/assets/img/deviceIcon/isonline.png'),
        require('@/assets/img/deviceIcon/isbroken.png'),
      ],
      listTitle:[
        '纸张剩余','订针剩余','印油剩余','硒鼓剩余'
      ],
      listColor:[
        '#6699ff', '#ffcc66','#ff0000','#cc9900'
      ],
      //需要改变的
      //设备的编号
      deviceInfo:[],
      deviceId:[],
      //设备的地理位置
      listLocation:[],
      Manager:[],
      onlineStatus:[],
      //耗材预警设置
      listPaperwarn:[],
      listDrumwarn:[],
      listNeedlewarn:[],
      listInkwarn:[],
      //余量
      listPaperremain:[],
      listDrumremain:[],
      listNeedleremain:[],
      listInkremain:[],
      //各个最大量
      listPapermax:[],
      listDrummax:[],
      listNeedlemax:[],
      listInkmax:[]
    }
  },
  methods:{
    //检测设备状态来判断状态图片显示
    checkState(index1){
      return this.imgPath[this.onlineStatus[index1]]
    },
    //返回进度条的Width
    checkWidth(index1,index2){
      let perWidth;
      switch (index2){
        case 0:
          perWidth = this.listPaperremain[index1]/this.listPapermax[index1]
          if (perWidth<=0.01){perWidth=0}
          break
        case 1:
          perWidth = this.listNeedleremain[index1]/this.listNeedlemax[index1]
          if (perWidth<=0.01){perWidth=0}
          break
        case 2:
          perWidth = this.listInkremain[index1]/this.listInkmax[index1]
          if (perWidth<=0.01){perWidth=0}
          break
        case 3:
          perWidth = this.listDrumremain[index1]/this.listDrummax[index1]
          if (perWidth<=0.01){perWidth=0}
          break
      }
      return perWidth*95 + 'px'
    },
    //检测是否显示警告条
    isWarning(index1,index2){
      let isshow;
      switch (index2){
        case 0:
          isshow = this.listPaperremain[index1]<=this.listPaperwarn[index1];break
        case 1:
          isshow = this.listNeedleremain[index1]<=this.listNeedlewarn[index1];break
        case 2:
          isshow = this.listInkremain[index1]<=this.listInkwarn[index1];break
        case 3:
          isshow = this.listDrumremain[index1]<=this.listDrumwarn[index1];break
      }
      return isshow
    },
    //打开添加设备
    isopenAddadvice(){
      this.$bus.$emit('openaddadvice')
    },
    //打开设置页面
    openSettingpage(index1){
      const deviceNum = this.deviceId[index1]
      this.$bus.$emit('opensettingpage', deviceNum)
    },
    //显示耗材具体数量
    getListNums(index1,index2){
      let nums;
      switch (index2){
        case 0:
          nums = this.listPaperremain[index1];break
        case 1:
          nums = this.listNeedleremain[index1];break
        case 2:
          if(this.listInkremain[index1]===0&&this.listInkmax[index1]===0){
            nums = '0%';break
          } else {
            nums = ((this.listInkremain[index1]/this.listInkmax[index1])*100).toFixed(1)+'%';break
          }
        case 3:
          if(this.listDrumremain[index1]===0&&this.listDrummax[index1]===0){
            nums = '0%';break
          } else {
            nums = ((this.listDrumremain[index1]/this.listDrummax[index1])*100).toFixed(1)+'%';break
          }
      }
      return nums
    },
    //点击打开预警
    openDevicewarn(index1,index2){
      // console.log(index1)
      const deviceNums = this.deviceInfo[index1]
      const warnTitle = this.listTitle[index2]
      let clickWarn = 0;
      switch (warnTitle){
        case "纸张剩余":
          clickWarn = 0;break
        case "印油剩余":
          clickWarn = 3;break
        case "硒鼓剩余":
          clickWarn = 2;break
        case "订针剩余":
          clickWarn = 1;break
      }
      this.$bus.$emit('opendevicewarn', [deviceNums,clickWarn])
    },
    //初始化界面
    createDeviceinfo(){
      const token = this.$Store.get('token')
      getDevicelist(token).then(res =>{
        // console.log(res)
        const deviceList = res.data.Data
        for(let i=0;i<deviceList.length;i++){
          let deviceListindex = deviceList[i]
          this.deviceInfo.push(deviceListindex.MachineNo)
          this.deviceId.push(deviceListindex.MachineId)
          this.listLocation.push(deviceListindex.MachinePlace)
          this.Manager.push(deviceListindex.AdminName)
          this.onlineStatus.push(deviceListindex.OnlineStatus)
          //余量
          this.listPaperremain.push(deviceListindex.PaperNow)
          this.listDrumremain.push(deviceListindex.XGNow)
          this.listNeedleremain.push(deviceListindex.PinNow)
          this.listInkremain.push(deviceListindex.YYNow)
          //预警提示值
          this.listPaperwarn.push(deviceListindex.PaperWarning)
          this.listDrumwarn.push(deviceListindex.XGWarning)
          this.listNeedlewarn.push(deviceListindex.PinWarning)
          this.listInkwarn.push(deviceListindex.YYWarning)
          //最大值
          this.listPapermax.push(deviceListindex.PaperTotal)
          this.listDrummax.push(deviceListindex.XGTotal)
          this.listNeedlemax.push(deviceListindex.PinTotal)
          this.listInkmax.push(deviceListindex.YYTotal)
        }
      })
    }
  },
  created() {
    this.createDeviceinfo()
  },
  mounted() {
    // this.$bus.$on('createdeviceinfo',this.createDeviceinfo)
  },
  beforeDestroy() {
    // this.$bus.$off()
  }
}
</script>

<style scoped>
#deviceInfo{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:flex-start;
}
.deviceBox{
  width: 400px;
  height: 285px;
  border: 2px solid #dbdbdb;
  margin-left: 30px;
  margin-top: 40px;
  margin-bottom: -10px;
}
.deviceBox:hover{
  border: 2px solid #0089e7;
}
/*标题部分*/
#deviceHead{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#deviceHead>div{
  margin-left: 19px;
  margin-top: 21px;
}
#deviceHead>div>img{
  margin-left: 10px;
}
#deviceHeadDiv1{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
#deviceHeadDiv2{
  width:150px;
  height: 50px;
}
#deviceHeadDiv2>a{
  color: #0089e7;
}
#deviceHeadDiv2>a>img{
  margin-left: 60px;
}
#deviceHeadDiv2>a>span{
  position: relative;
  display: block;
  width: 40px;
  left:90px;
  top:-22px
}
/*整个中间部分*/
.deviceBody{
  display: flex;
  flex-direction: row;
}
.deviceBody>div>img{
  margin-left: 20px;
}
/*遍历部分的盒子*/
.listItem{
  display: flex;
  flex-direction: column;
  padding: 15px;
}
/*整个进度条遍历得部分*/
.forItem{
  display: flex;
  flex-direction: row;
}
/*警示牌*/
.warnProcessbar{
  position: relative;
  margin-right: 15px;
  margin-top: 12px;
}
/*文字标*/
.titleProcessbar{
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  margin-top: 12px;
  margin-left: -2px;
  margin-right: 8px;
}

/*进度条*/
.processbar{
  display: flex;
  flex-direction: row;
  min-width: 95px;
}
.groundProcessbar{
  margin-top: 12px;
}

.coverProcessbar{
  margin-left: -95px;
  margin-top: 12px;
}
.listNums{
  font-weight: 300;
  margin-top: 8px;
  margin-left: 8px;
}

/*位置*/
#deviceFoot{
  margin-left: 15px;
  margin-right: 20px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


/*添加设备*/
.addDevicebox{
  width: 400px;
  height: 285px;
  border: 2px solid #dbdbdb;
  margin-left: 30px;
  margin-top: 40px;
  margin-bottom: 10px;
}
.addDevicebox:hover{
  border:2px solid #0089e7;
}
.addDevicebox>div>a>img{
  margin-top:85px;
  margin-left: 160px;
}
.addDevicebox>div>span{
  margin-left: 165px;
}
</style>
