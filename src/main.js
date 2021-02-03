import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import axios from 'axios'
import 'babel-polyfill'

// Vue.config.productionTip = false
// Vue.config.devtools = true
//打包baseUrl
Vue.prototype.getConfigJson=function(){
  axios.get("serve.config.json").then(result=>{
//用一个全局字段保存ApiUrl 也可以用sessionStorage存储
//     console.log(result)
    // this.$Store.set('BASE_URL',result.data.data.BASE_URL)
    localStorage.removeItem('BASE_URL')

    this.$Store.set('BASE_URL',result.data.data.BASE_URL)
    // Vue.prototype.$baseurl=result.data.data.BASE_URL;
    // console.log(this.$Store.get('BASE_URL'))
  }).catch((error)=>{console.log(error)});
}

// 新建Vue实例作为bus总线
Vue.prototype.$bus = new Vue()

//md5库
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// 随路由跳转titile
router.beforeEach((to, from, next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})
//引入elementUi
import {DatePicker,Select,Option,Message,Switch,Pagination} from 'element-ui'
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Pagination)
Vue.prototype.$message = Message


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
