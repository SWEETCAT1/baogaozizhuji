// 封装axios库
import axios from 'axios'

export function request(config){
  //创建实例
  const instance = axios.create({

    baseURL:JSON.parse(localStorage.getItem('BASE_URL')),
    timeout:5000,
  })
  // //请求拦截
  // instance.interceptors.request.use(aaa=>{
  //   return aaa
  // },error => {
  //   console.log(error)
  // })
  // //响应拦截
  // instance.interceptors.request.use(res=>{
  //   return res
  // },error => {
  //   if (error.message.includes('timeout')){
  //     // console.log(error)
  //     this.$message.error({message:'网络超时！',center:true})
  //   } return Promise.reject(error)
  // })
  // 发送网络请求
  return instance(config)
}



