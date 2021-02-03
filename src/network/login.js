// //登录页面的数据请求
import {request} from "@/network/request";

export function postUserinfo(username,userpassword){
  return request({
    method:'post',
    url:'/adminlogin/adminlogin',
    data:{
      Account:username.trim(),
      Password:userpassword.trim()
    }
  })
}

