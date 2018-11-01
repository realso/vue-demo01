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
import animated from 'animate.css'
Vue.use(animated)
Vue.config.productionTip = false
Vue.use(Rui);
Vue.use(MintUI);
window.realsoApp = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

Vue.directive('hold', function(el, binding) {
    let timer = null;
    const start = function(e) {
        // 如果是点击事件，不启动计时器，直接返回
        if (e.type === 'click') {
            return
        }
        if (timer == null) {
            // 创建定时器 ( 2s之后执行长按功能函数 )
            timer = setTimeout(function() {
                //执行长按功能函数
                binding.value()
            }, 2000)
        }
    }
    const cancel = function() {
            if (timer !== null) {
                clearTimeout(timer)
                timer = null
            }
        }
        // 添加事件监听器
    el.addEventListener("touchstart", start);
    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("touchend", cancel);
})