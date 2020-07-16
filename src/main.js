import Vue from 'vue'
import App from './App.vue'
import {Table, TableColumn, Dialog, Pagination, Popover } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import './components' // 注册全局组件
import "./style/common.less"
import 'amfe-flexible';
import store from './store/'
import minxinCommon from './mixins/mixin-common'
Vue.config.productionTip = false
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Popover)
Vue.mixin(minxinCommon)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
