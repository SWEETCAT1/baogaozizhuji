//权限管理界面的数据请求
import {request} from "@/network/request";

//获取管理员列表
export function getAdminlist(message,token){
  return request({
    method:'post',
    url:'/admin/getadminlist',
    headers:{ 'accessToken': token},
    data:message
  })
}


//创建管理员
export function createAdmin(token,message){
  return request({
    method:'post',
    url:'/admin/addadmin',
    headers:{ 'accessToken': token},
    data:message
  })
}

//编辑账号
export function editAccount(token,message){
  return request({
    method:"post",
    url:'/admin/updateadmin',
    headers:{'accessToken': token},
    data:message
  })
}

//删除账号
export function delAdmin(Id,token){
  return request({
    method:'post',
    url:'/admin/deleteadmin',
    headers:{ 'accessToken': token},
    params:{Id}
  })
}

//停用账号
export function stopAdmin(message,token){
  return request({
    method:'post',
    url:'/admin/disableorenable',
    headers:{ 'accessToken': token},
    params:{
      'Id':message['Id'],
      'IsUse':message['IsUse']
    }
  })
}
// 重置密码
export function resetPass(message,token){
  return request({
    method:'post',
    url:'admin/resetpassword',
    headers:{ 'accessToken': token},
    params:{Id:message}
  })
}
