// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import Rui from 'rs-ui1'
import MintUI from 'mint-ui'
import 'rs-ui1/dist/css/mui.min.css'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.use(Rui);
Vue.use(MintUI);
window.realsoApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})