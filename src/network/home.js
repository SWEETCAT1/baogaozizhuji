//首页界面的数据请求
import {request} from "@/network/request";

// 获取首页初始化信息
export function getDeviceinfo(token){
  return request({
    url:'/admin/gethomemachineinfomodel',
    method:'get',
    headers:{ 'accessToken': token},
  })
}
//获取设备列表
export function getDevicelist(token){
  return request({
    url:'/admin/gethomeselfmachinelist',
    method:'get',
    headers:{ 'accessToken': token},
  })
}

//获取设置
export function getSetting(deviceId,token){
  return request({
    url:'/admin/getselfmachineinfomodel',
    method:'get',
    params:{
      MachineId:deviceId
    },
    headers:{ 'accessToken': token},
  })
}
//获取管理人列表
export function getManager(token){
  return request({
    url:'/admin/getnotifier',
    method:'get',
    headers:{'accessToken': token}
  })
}
//提交设置
export function postSetting(token,message){
  return request({
    url:'/admin/updateselfmachine',
    method:'post',
    headers:{'accessToken': token},
    data:message
  })
}
//添加设备
export function addDevice(token,message){
  return request({
    url:'/admin/addselfmachine',
    method:'post',
    headers:{'accessToken': token},
    data:message
  })
}
//修改管理员密码
export function changePassword(token,message){
  return request({
    url:'/admin/updateadminpwd',
    method:'post',
    headers:{'accessToken': token},
    data:message
  })
}
//获取设备编号下拉框数据
export function getAdviceselect(token){
  return request({
    url:'/admin/getmachinenolist',
    method:'get',
    headers:{'accessToken': token}
  })
}
//获取预警记录
export function getWarningRecord(token,message){
  return request({
    url:'/admin/getwarningrecordlist',
    method:'post',
    headers:{'accessToken': token},
    data:message
  })
}
//获取故障记录
export function getBrokenRecord(token,message){
  return request({
    url:'/admin/geterrorrecordlist',
    method:'post',
    headers:{'accessToken': token},
    data:message
  })
}
//处理未处理的预警记录
export function seterrorRecord(token,message){
  return request({
    url:'/admin/setwarningorerror',
    method:'post',
    headers:{'accessToken': token},
    params:{
      OperationType:message['OperationType'],
      Id:message['Id']
    }
  })
}
//撤回故障/预警已处理
export function cancelSeterror(token,message){
  return request({
    url:'/admin/setwarningorerrorrecord',
    method:'post',
    headers:{'accessToken': token},
    params:{
      OperationType:message['OperationType'],
      Id:message['Id']
    }
  })
}
//批量处理未处理的预警记录/撤回
export function batchOpratewarn(token,message){
  return request({
    url:'/admin/batchclorchwarningrecord',
    method:'post',
    headers:{'accessToken':token},
    data:message
  })
}

//批量处理未处理的故障记录/撤回
export function batchOpratebroken(token, message){
  return request({
    url:'/admin/batchclorcherrorrecord',
    method:'post',
    headers:{'accessToken':token},
    data:message
  })
}
//获取打印次数信息
export function getPrintnums(token){
  return request({
    url:'/admin/getsetting',
    method:'get',
    headers:{'accessToken': token}
  })
}

//打印次数管理
export function setprintManage(token,message){
  return request({
    url:'/admin/updatesetting',
    method:'post',
    headers:{'accessToken': token},
    data:message
  })
}
