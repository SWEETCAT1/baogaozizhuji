import Vue from 'vue'
import VueRouter from 'vue-router'


// const Home = ()=> import('@/views/home/Home')
// const Data = ()=> import('@/views/data/Data')
// const Login = ()=> import('@/views/login/Login')
// const Permission = ()=> import('@/views/permission/Permission')

import Home from "@/views/home/Home";
import Data from "@/views/data/Data";
import Login from "@/views/login/Login";
import Permission from "@/views/permission/Permission";


Vue.use(VueRouter)

// 处理重复点击同一路由
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// VueRouter.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = VueRouter.history.pending.fullPath;
//   if(isChunkLoadFailed){
//     VueRouter.replace(targetPath);
//   }
// })


const routes = [
  {path:'/',redirect:'/login'},
  {path:'/home',name:'home',component:Home,meta: { hidden: true,title:"首页"}},
  {path:'/data/',name:'data',component:Data,meta: { hidden: true,title:"数据统计"}},
  {path:'/login',name:'login',component:Login,meta: { hidden: true,title:"登录"}},
  {path:'/permission/',name:'permission',component:Permission,meta: { hidden: true,title:"权限管理"}},
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
