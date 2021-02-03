//数据统计页面的请求
import {request} from "@/network/request";

//获取设备统计列表
export function getAdviceinfo(token,message){
  return request({
    url:'admin/getselfmachinestatisticslist',
    method:'post',
    headers:{ 'accessToken': token},
    data:message
  })
}
