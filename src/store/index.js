//注册vuex
import Vue from 'vue'
import Vuex from 'vuex'
import action from '@/store/action'
import getters from '@/store/getters'
import mutations from '@/store/mutaions'
import Store from 'store'

Vue.use(Vuex)

Vue.prototype.$Store = Store

const store = new Vuex.Store({
  state:{
    //maintabbar的右上角医生名称
    doctorName:'',
    // accessToken:'',
    // deviceInfo:[],
    // deviceSetting:{},
    // noticeMan:[],
  },
  mutations,
  action,
  getters
})
export default store
