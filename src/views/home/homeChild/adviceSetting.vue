<!--设备设置组件页面-->
<template>
  <div id="advice-setting-div" v-show="showAdvicesetting">
    <div id="advice-setting">
      <div id="setting-div">
        <!--页面左边-->
        <div id="left-div">
          <!--设备设置-->
          <div id="set-advice">
            <head-item head-text="设备设置"></head-item>

            <div id="first-line-btn">
              <div class="switch-btn" id="adviceStart">
                <span>设备启动</span>
                <el-switch
                  v-model="isUse"
                  active-color="#13ce66"
                  inactive-color="#8c8c8c">
                </el-switch>
              </div>
              <div class="switch-btn" id="faceStart">
                <span >开启人脸识别</span>
                <el-switch
                  v-model="isFace"
                  active-color="#13ce66"
                  inactive-color="#8c8c8c">
                </el-switch>
              </div>
            </div>
            <div class="second-line-btn">
              <div class="switch-btn" id="workTime">
                <span>工作时段</span>
                <el-switch
                  v-model="isOnline"
                  active-color="#13ce66"
                  inactive-color="#8c8c8c">
                </el-switch>
              </div>
            </div>

            <div class="foreNoon">
              <label>上午</label>
              <input type="text" placeholder="例: 08:00" ref="amStartTime" class="small-input foreNoon-left-input"
                     v-model="amStartTime" :disabled="!isOnline">
              <label>至</label>
              <input type="text" placeholder="例: 12:00" ref="amEndTime" class="small-input foreNoon-right-input"
                     v-model="amEndTime" :disabled="!isOnline">
              <label>时</label>
            </div>
            <div class="foreNoon">
              <label>下午</label>
              <input type="text" placeholder="例: 14:00" ref="pmStartTime" class="small-input foreNoon-left-input"
                     v-model="pmStartTime" :disabled="!isOnline">
              <label>至</label>
              <input type="text" placeholder="例: 22:00" ref="pmEndTime" class="small-input foreNoon-right-input"
                     v-model="pmEndTime" :disabled="!isOnline">
              <label>时</label>
            </div>

            <div class="second-line-btn">
              <div class="switch-btn">
                <span>自动关机</span>
                <el-switch
                  v-model="isAutoopen"
                  active-color="#13ce66"
                  inactive-color="#8c8c8c">
                </el-switch>
              </div>
            </div>


            <div id="endTime">
              <label>关机时间</label>
              <input type="text" placeholder="例: 18:00" class="medium-input endTime-input"
                     v-model="autoCloseTime" ref="autoCloseTime" >
              <label>时</label>
            </div>

            <div id="timerSet">
              <label>倒计时配置</label>
              <input type="text" placeholder="页面停留时长,例 : 120" class="medium-input timerSet-input"
                     v-model="waitTime"  ref="waitTime" >
              <label>秒</label>
            </div>

            <div id="errorNotice">
              <label style="vertical-align: top">错误提示</label>
              <textarea name="" id="errorNotice-textarea" placeholder="请联系病案科添加打印耗材
  病案科地址住院楼一楼101
  电话:0755-1234567转0000" v-model="errorText" ref="errorText"></textarea>
            </div>
          </div>
          <!--设置信息维护-->
          <div>
            <head-item head-text="设备信息维护"></head-item>
            <div class="device-info-setting">
              <label>终端编号</label>
              <input type="text" v-model="adviceNumber"
                     class="medium-input device-info-input">
            </div>
            <div class="device-info-street">
              <label>终端IP地址</label>
              <input type="text" v-model="adviceIP"
                     class="medium-input device-info-street-input">
            </div>
            <div class="device-info-setting">
              <label>终端位置</label>
              <input type="text" v-model="adviceLocation"
                     class="medium-input device-info-input">
            </div>
          </div>

          <!--    耗材最大值预算-->
          <div id="max-consume-pre">
            <head-item head-text="耗材最大值预算"></head-item>
            <div id="paperMax">
              <label>纸张最大值</label>
              <input type="text" placeholder="例: 2700(张)" ref="paperMaxuse" class="small-small-input usemax-input"
                     v-model="paperMaxuse">
              <span id="paperSpan">张</span>
              <label id="needleMax">订针最大值</label>
              <input type="text" placeholder="例: 3000(对)" ref="needleMaxuse" class="small-small-input usemax-input"
                     v-model="needleMaxuse">
              <span id="needleSpan">对</span>
            </div>
            <div id="otherMax">
              <label id="tonerMax">满印油打印量</label>
              <input type="text" placeholder="例: 40000(张)" ref="drumMaxuse" class="small-small-input usemax-input"
                     v-model="inkMaxuse">
              <span id="tonerSpan">张</span>
              <label id="oilMax">满硒鼓打印量</label>
              <input type="text" placeholder="例: 20000(张)" ref="inkMaxuse" class="small-small-input usemax-input"
                     v-model="drumMaxuse">
              <span id="oilSpan">张</span>
            </div>
          </div>
        </div>


        <!--页面右边-->
        <div id="right-div">
          <!--    耗材预警设置-->
          <div id="consume-hint-setting">
            <head-item head-text="耗材预警设置"></head-item>
            <div id="paperStore" class="consume-setting">
              <label>纸张预警的值</label>
              <input type="text" placeholder="例 : 120" class="consume-setting-input medium-medium-input" ref="paperWarn"
              v-model="paperWarn">
              <span>张</span>
            </div>
            <div id="needleStore" class="consume-setting">
              <label>订针预警的值</label>
              <input type="text" placeholder="例 : 120" ref="needleWarn" class="consume-setting-input medium-medium-input"
              v-model="needleWarn">
              <span>对</span>
            </div>
            <div id="drumStore" class="consume-setting">
              <label>印油预警比例</label>
              <input type="text" placeholder="例 : 10" ref="drumWarn" class="consume-setting-input medium-medium-input"
              v-model="inkWarn">
              <span>%</span>
            </div>
            <div id="oilStore" class="consume-setting">
              <label>硒鼓预警比例</label>
              <input type="text" placeholder="例 : 10" ref="inkWarn" class="consume-setting-input medium-medium-input"
              v-model="drumWarn">
              <span>%</span>
            </div>
            <div id="noticeMan">
              <label for="manSelect">通知人</label>
              <select name="" id="manSelect" ref="noticeManager"
                      v-model="noticeManager">
                <option  v-for="(item,index) in noticeMan" :key="item+index">
                  {{item}}
                </option>
              </select>
            </div>
            <div id="noticeWay">
              <label for="waySelect">通知方式</label>
              <select name="" id="waySelect" ref="noticeWay"
                      v-model="noticeWay">
                <option v-for="(item,index) in noticeWayList" :key="item+index">
                  {{item}}
                </option>
              </select>
            </div>
          </div>

          <!--    耗材当前设置-->
          <div id="consume-atpresent-setting">
            <head-item head-text="耗材当前设置"></head-item>
            <div id="paperStorenow" class="consume-at-setting">
              <label>纸张现存量</label>
              <input type="text" placeholder="例 : 120" ref="paperUsenow" class="consume-setting-input medium-medium-input"
                     v-model="paperUsenow">
              <span>张</span>
            </div>
            <div id="needleStorenow" class="consume-at-setting">
              <label>订针现存量</label>
              <input type="text" placeholder="例 : 120" ref="needleUsenow" class="consume-setting-input medium-medium-input"
                     v-model="needleUsenow">
              <span>对</span>
            </div>
            <div id="tonerStorenow" class="consume-at-setting">
              <label>印油现比例</label>
              <input type="text" placeholder="例 : 10" ref="inkUsenow" class="consume-setting-input medium-medium-input"
                     v-model="inkUsenow">
              <span>%</span>
            </div>
            <div id="oilStorenow" class="consume-at-setting">
              <label>硒鼓现比例</label>
              <input type="text" placeholder="例 : 10" ref="drumUsenow" class="consume-setting-input medium-medium-input"
                     v-model="drumUsenow">
              <span>%</span>
            </div>
          </div>

          <!--    消息通知-->
          <div id="informMessage">
            <head-item head-text="消息通知"></head-item>
            <div id="noticeWarn" class="inform-message-div">
              <label style="vertical-align: top">耗材预警通知</label>
              <textarea name="" id="noticeWarntext" ref="warnText"
                        v-model="warnText"></textarea>
            </div>
            <div id="useoutWarn" class="inform-message-div">
              <label style="vertical-align: top">耗材用尽通知</label>
              <textarea name="" id="useoutWarntext" ref="useoutwarnText"
                        v-model="useoutwarnText"></textarea>
            </div>
          </div>
        </div>
      </div>
      <!--按钮-->
      <div id="button-div">
        <button-item button-name="保存" @click.native="saveSettings" id="leftButton"></button-item>
        <button-item button-name="取消" @click.native="closeAdvicesetting"></button-item>
      </div>
    </div>
  </div>
</template>

<script>
import buttonItem from "@/components/button/buttonItem";
import headItem from "@/components/headItem/headItem";
import {postSetting, getSetting, getManager} from "@/network/home";

export default {
  name: "adviceSetting",
  data(){
    return {
      showAdvicesetting:false,
      //所有的管理员
      noticeMan:[],
      noticeManid:[],
      //通知方式
      noticeWayList:['请选择','短信','微信公众号'],
      //设备编号/Id
      machineNo:'',
      machineId:'',
      //初始化数据
      // switch button的数据
      isUse:'',
      isAutoopen:'',
      isOnline:'',
      isFace:'',
      // 设备设置
      waitTime:'',
      autoCloseTime:'',
      amStartTime:'',
      pmStartTime:'',
      amEndTime:'',
      pmEndTime:'',
      errorText:"请联系管理员",
      //设备信息维护
      adviceNumber:'',
      adviceIP:'',
      adviceLocation:'',
      // 耗材最大值预算
      paperMaxuse:'',
      needleMaxuse:'',
      drumMaxuse:'',
      inkMaxuse:'',
      //耗材预警设置
      paperWarn:'',
      needleWarn:'',
      drumWarn:'',
      inkWarn:'',
      //通知
      noticeManager:'',
      noticeWaynow:0,
      noticeWay:'',
      //耗材当前设置
      paperUsenow:'',
      needleUsenow:'',
      drumUsenow:'',
      inkUsenow:'',
      //消息通知
      warnText:'',
      useoutwarnText:'',
    }
  },
  components:{
    headItem,
    buttonItem
  },
  computed:{
  },
  methods: {
    //把null转换成空字符串
    null2none(str2){
      if (str2===null){
        return ''
      } else {
        return str2
      }
    },
    //打开页面
    isShowadvicesetting(index) {
      this.showAdvicesetting = true
      const token = this.$Store.get('token')
      getSetting(index, token).then(res1 => {
        // console.log(res1)
        const deviceSetting = res1.data.Value
        this.machineId = deviceSetting.MachineId
        this.machineNo = deviceSetting.MachineNo

        this.isUse = Boolean(deviceSetting.IsUse)
        this.isFace = Boolean(deviceSetting.IsFace)
        this.isOnline = Boolean(deviceSetting.IsOnline)
        this.isAutoopen = Boolean(deviceSetting.IsAutoOpen)

        this.adviceNumber = deviceSetting.MachineNo
        this.adviceIP = deviceSetting.IP
        this.adviceLocation = deviceSetting.MachinePlace

        this.amStartTime = this.null2none(deviceSetting.AMStartTime)
        this.amEndTime =  this.null2none(deviceSetting.AMEndTime)
        this.pmStartTime = this.null2none(deviceSetting.PMStartTime)
        this.pmEndTime = this.null2none(deviceSetting.PMEndTime)

        if (deviceSetting.WaitSecond===0){
          this.waitTime = 30
        } else {
          this.waitTime=deviceSetting.WaitSecond
        }
        this.autoCloseTime = this.null2none(deviceSetting.AutoClose)

        if (deviceSetting.ErrorText===null){
          this.errorText = '请联系管理员'
        } else {
          this.errorText = deviceSetting.ErrorText
        }

        this.paperMaxuse = deviceSetting.PaperTotal
        this.needleMaxuse = deviceSetting.PinTotal
        this.drumMaxuse = deviceSetting.XGTotal
        this.inkMaxuse = deviceSetting.YYTotal

        if (deviceSetting.PaperWarning===0){
          this.paperWarn = this.paperMaxuse*0.1
        } else {
          this.paperWarn = deviceSetting.PaperWarning
        }
        if (deviceSetting.PinWarning===0){
          this.needleWarn = this.needleMaxuse*0.1
        } else {
          this.needleWarn = deviceSetting.PinWarning
        }
        if (deviceSetting.XGWarning===0){
          this.drumWarn = 10
        } else {
          this.drumWarn = (deviceSetting.XGWarning/this.drumMaxuse*100).toFixed(0)
        }
        if (deviceSetting.YYWarning===0){
          this.inkWarn = 10
        } else {
          this.inkWarn = (deviceSetting.YYWarning/this.inkMaxuse*100).toFixed(0)
        }

        if (deviceSetting.PaperNow===null){
          this.paperUsenow = this.paperMaxuse
        } else {
          this.paperUsenow = deviceSetting.PaperNow
        }
        if (deviceSetting.PinNow===null){
          this.needleUsenow = this.needleMaxuse
        } else {
          this.needleUsenow = deviceSetting.PinNow
        }
        if (deviceSetting.XGNow===null){
          this.drumUsenow = 100
        } else {
          this.drumUsenow = (deviceSetting.XGNow/this.drumMaxuse*100).toFixed(0)
        }
        if (deviceSetting.YYNow===null){
          this.inkUsenow = 100
        } else {
          this.inkUsenow = (deviceSetting.YYNow/this.inkMaxuse*100).toFixed(0)
        }

        if (deviceSetting.WarningNoticeText===null){
          this.warnText = '请及时更换'
        } else {
          this.warnText = deviceSetting.WarningNoticeText
        }
        if (deviceSetting.WarningNoticeText===null){
          this.useoutwarnText = '请及时更换'
        } else {
          this.useoutwarnText = deviceSetting.FinishNoticeText
        }

        this.noticeWaynow = deviceSetting.NoticeType
        this.noticeWay = this.noticeWayList[this.noticeWaynow]
        this.noticeManager = deviceSetting.AdminId

      }).then(() => {
        getManager(token).then(res2 => {
          // console.log(res2)
          const manageData = res2.data.Data
          // console.log(manageData)
          for (let i = 0; i < manageData.length; i++) {
            this.noticeMan.push(manageData[i].Name)
            this.noticeManid.push(manageData[i].Id)
          }
          const managerIndex = this.noticeManid.indexOf(this.noticeManager)
          this.noticeManager = this.noticeMan[managerIndex]
        })
      })

    },
    //关闭页面
    closeAdvicesetting() {
      this.showAdvicesetting = false
      //清除数据
      this.noticeMan = []
      this.noticeManid = []
      this.noticeWaynow = 0
    },
    //保存设置
    saveSettings() {
      const token = this.$Store.get('token')
      const message = {
        "MachineId": this.machineId,
        "IsUse": Number(this.isUse),
        "WaitSecond": this.waitTime,
        "IsFace": Number(this.isFace),
        "IsAutoOpen": Number(this.isAutoopen),
        "AutoClose": this.autoCloseTime,
        "IsOnline": Number(this.isOnline),
        "AMStartTime": this.amStartTime,
        "AMEndTime": this.amEndTime,
        "PMStartTime": this.pmStartTime,
        "PMEndTime": this.pmEndTime,
        "ErrorText": this.errorText,
        "MachineNo":this.adviceNumber,
        "IP":this.adviceIP,
        "MachinePlace":this.adviceLocation,
        "PaperTotal": this.paperMaxuse,
        "PinTotal": this.needleMaxuse,
        "XGTotal": this.drumMaxuse,
        "YYTotal": this.inkMaxuse,
        "PaperWarning": this.paperWarn,
        "PinWarning": this.needleWarn,
        "XGWarning": this.drumWarn*this.drumMaxuse/100,
        "YYWarning": this.inkWarn*this.inkMaxuse/100,
        "AdminId": this.noticeManid[this.noticeMan.indexOf(this.noticeManager)],
        "NoticeType": this.noticeWayList.indexOf(this.noticeWay),
        "PaperNow": this.paperUsenow,
        "PinNow": this.needleUsenow,
        "XGNow": this.drumUsenow*this.drumMaxuse/100,
        "YYNow": this.inkUsenow*this.inkMaxuse/100,
        "WarningNoticeText": this.warnText,
        "FinishNoticeText": this.useoutwarnText
      }
      postSetting(token, message).then(res => {
        if(res.data.Code!==200){
          this.$message.error({message:res.data.Message,center:true})
        } else {
          // console.log(res)
          this.closeAdvicesetting()
          this.noticeMan = []
          this.noticeManid = []
          this.noticeWaynow = 0
          window.location.reload()
        }
      })
    },

    //失焦事件 弱提示
    //判断工作时段
    // isClocktime(data){
    //   // let pattern = /^[0]?[0-9]|[1][0-2]:[0-5][0-9]$/;
    //   // let patternExp = new RegExp(pattern)
    //   // // let res = [...data]
    //   // // // if (res[1]===":"){res.splice(0,0,'0')}
    //   // // // console.log(res)
    //   // // // let resPattern = false
    //   // // // if ((res[0]+res[1])<=12){
    //   // // //   resPattern = true
    //   // // // }
    //   // // if(data===''){
    //   // //   this.$message.warning({message:"工作时段-时间不能为空",center:true})
    //   // // }
    //   // if (patternExp.test(data)&&(data!=='')){
    //   //   this.$message.warning({message:"工作时段-时间格式错误",center:true})
    //   // }
    //   // console.log(data)
    // },
    //判断关机时间
    // isClosetime(data){
    //   // let pattern = /[0-2]?[0-9]:[0-5][0-9]$/;
    //   // let patternExp = new RegExp(pattern)
    //   // if(data===null||data===''){
    //   //   this.$message.warning({message:"关机时间-时间不能为空",center:true})
    //   // }
    //   // if (!patternExp.test(data)&&data!==null&&data!==''){
    //   //   this.$message.warning({message:"关机时间-时间格式错误",center:true})
    //   // }
    //   // console.log(data)
    // },
    //不能为空
    // isStringNull(data){
    //   // let textareaWarning;
    //   // if (data===this.errorText){
    //   //   textareaWarning = '错误提示'
    //   // } else if(data===this.warnText){
    //   //   textareaWarning = '耗材预警通知'
    //   // } else if(data===this.useoutwarnText){
    //   //   textareaWarning = '耗材用净通知'
    //   // } else if(data===this.adviceNumber){
    //   //   textareaWarning = '终端IP地址'
    //   // } else if(data===this.adviceLocation){
    //   //   textareaWarning = '终端位置'
    //   // }
    //   // if (data===''||data===null){
    //   //   this.$message.warning({message:textareaWarning+'不要为空',center:true})
    //   // }
    //   // console.log(data)
    // },
    //判断是否为正整数并且不能为空
    // isPositiveint(data){
    //   // let numberWarning;
    //   // switch (data){
    //   //   case this.waitTime:
    //   //     numberWarning = '倒计时配置';break
    //   //   case this.paperMaxuse:
    //   //     numberWarning = '纸张最大值';break
    //   //   case this.needleMaxuse:
    //   //     numberWarning = '订针最大值';break
    //   //   case this.drumMaxuse:
    //   //     numberWarning = '满硒鼓打印量';break
    //   //   case this.inkMaxuse:
    //   //     numberWarning = '满印油打印量';break
    //   //   case this.paperWarn:
    //   //     numberWarning = '纸张预警的值';break
    //   //   case this.needleWarn:
    //   //     numberWarning = '订针预警的值';break
    //   //   case this.drumWarn:
    //   //     numberWarning = '硒鼓预警的值';break
    //   //   case this.inkWarn:
    //   //     numberWarning = '印油预警的值';break
    //   // }
    //   // if (data===''||data===null){
    //   //   this.$message.warning({message:'不能为空',center:true})
    //   // }
    //   // if(!isNumber(data)&&data!==null&&data!==''){
    //   //   this.$message.warning({message:'必须是正整数',center:true})
    //   // }
    //   // console.log(data)
    // }

  },
  mounted() {
    this.$bus.$on('opensettingpage', this.isShowadvicesetting)
    this.$bus.$on('changeisuse',this.changeIsuse)
    this.$bus.$on('changeisface',this.changeIsface)
    this.$bus.$on('changeisonlie',this.changeIsonlie)
    this.$bus.$on('changeisautoopen',this.changeIsAutoOpen)
  },
  beforeDestroy() {
    this.$bus.$off('opensettingpage')
    this.$bus.$off('changeisuse')
    this.$bus.$off('changeisface')
    this.$bus.$off('changeisonlie')
    this.$bus.$off('changeisautoopen')
  },
  watch:{

  }
}

</script>

<style scoped>
/*公共类*/
input{
  outline: none;
  height: 25px;
}
textarea{
  resize: none;
  outline: none;
  width: 248px;
  height: 60px;
  box-sizing: border-box;
}
select{
  box-sizing: border-box;
}
.switch-btn{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items:center;
  width: 120px;
  white-space: nowrap;
}
.small-small-input{
  width: 50px;
}
.small-input{
  width: 100px;
}
.medium-input{
  width: 240px;
}
.medium-medium-input{
  width: 212px
}
/*整个大盒子*/
#advice-setting-div{
  position: fixed;
  height: 100%;
  width:100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(55,55,55,.6);
  z-index:100;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
}
#advice-setting{
  background-color: #fff;
  height: 680px;
  width: 850px;
  border: 1px solid #666666;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
/*设备设置 */
#setting-div{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#left-div{
  width: 400px;
  margin-right: 25px;
}
#first-line-btn{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 400px;
  margin-top: 20px;
}
#faceStart{
  width: 150px;
}
.second-line-btn{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 185px;
  margin-top: 10px;
}
.foreNoon{
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-left: 68px;
}
.foreNoon-left-input{
  margin-right: 8px;
  margin-left: 12px;
}
.foreNoon-right-input{
  margin-right: 8px;
  margin-left: 8px;
}
.foreNoon>input{
  margin-right: 10px;
}
#endTime{
  width: 400px;
  margin-top: 10px;
  margin-left: 38px;
}
.endTime-input{
  margin-left: 15px;
  margin-right: 10px;
}
#timerSet{
  width: 400px;
  margin-top: 10px;
  margin-left: 26px;
}
.timerSet-input{
  margin-left: 13px;
  margin-right: 10px;
}
#errorNotice{
  width: 400px;
  margin-left: 39px;
  margin-top: 10px;
}
#errorNotice-textarea{
  width: 275px;
  margin-left: 14px;
  box-sizing: border-box;
}
.device-info-setting{
  margin-left: 38px;
  margin-top: 10px;
}
.device-info-input{
  margin-left: 15px;
  width: 268px;
}
.device-info-street{
  margin-left: 25px;
  margin-top: 10px;
  width: 268px;
  white-space: nowrap;
}
.device-info-street-input{
  margin-left: 15px;
  width: 268px;
}
/*耗材最大值预算*/
#paperMax{
  margin-left: 22px;
  margin-top: 10px;
}
#paperSpan{
  margin-left: 5px;
}
.usemax-input{
  margin-left: 16px;
}
#needleMax{
  margin-left: 28px;
}
#needleSpan{
  margin-left: 8px;
}
#otherMax{
  margin-top: 10px;
  margin-left: 8px;
}
#tonerSpan{
  margin-left: 5px;
}
#oilMax{
  margin-left: 14px;
}
#oilSpan{
  margin-left: 8px;
}
.consume-setting{
  margin-top: 10px;
  margin-left: 30px;
}
.consume-setting>input{
  margin-left: 10px;
  margin-right: 10px;
}
/*消息通知*/
#noticeMan{
  margin-left: 30px;
  margin-top: 10px;
}
#noticeMan>label{
  margin-left: 43px;
}
#manSelect{
  height: 30px;
  width: 250px;
  margin-left: 9px;
}
#noticeWay{
  margin-left: 15px;
  margin-top: 10px;
}
#noticeWay>label{
  margin-left: 43px;
}
#waySelect{
  height: 30px;
  width: 250px;
  margin-left: 10px;
}
.consume-at-setting{
  margin-top: 10px;
  margin-left: 44px;
}
.consume-at-setting>input{
  margin-left: 10px;
  margin-right: 10px;
}
.inform-message-div{
  margin-top: 12px;
}
.inform-message-div>label{
  margin-left: 30px;
}
.inform-message-div>textarea{
  margin-left: 10px;
}
#noticeWarntext{
  height: 55px;
  width: 250px;
}
#useoutWarntext{
  height: 55px;
  width: 250px;
}
#button-div{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 12px;
}
#leftButton{
  margin-right: 30px;
}
/*低分辨率*/
@media screen and (max-height: 768px) and (max-height: 1366px) {
  #advice-setting{
    height: 580px;
  }
  input{
    height: 20px;
  }
  #first-line-btn{
    margin-top: 5px;
  }
  .second-line-btn{
    margin-top: 5px;
  }
  .foreNoon{
    margin-top: 5px;
  }
  #endTime{
    margin-top: 5px;
  }
  #timerSet{
    margin-top: 5px;
  }
  #errorNotice{
    margin-top: 5px;
  }
  .device-info-setting{
    margin-top: 5px;
    margin-left: 38px;
  }
  .device-info-street{
    margin-top: 5px;
    margin-left: 25px;
  }
  .device-info-street-input{
    margin-left: 15px;
  }
  .device-info-setting{
    margin-top: 5px;
  }
  #paperMax{
    margin-top: 5px;
  }
  #otherMax{
    margin-top: 5px;
  }
  #paperStore{
    margin-top: 5px;
  }
  #needleStore{
    margin-top: 5px;
  }
  #drumStore{
    margin-top: 5px;
  }
  #oilStore{
    margin-top: 5px;
  }
  #noticeMan{
    margin-top: 5px;
  }
  #noticeWay{
    margin-top: 5px;
  }
  #paperStorenow{
    margin-top: 5px;
  }
  #needleStorenow{
    margin-top: 5px;
  }
  #tonerStorenow{
    margin-top: 5px;
  }
  #oilStorenow{
    margin-top: 5px;
  }
  #useoutWarn{
    margin-top: 5px;
  }
  #noticeWarn{
    margin-top: 5px;
  }
  #noticeWarntext{
    height: 45px;
  }
  #useoutWarntext{
    height: 45px;
  }
}
</style>
