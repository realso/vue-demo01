import Vue from 'vue'
import Router from 'vue-router'
import Store from "../store"
import LoginRouter from "@/pages/login/router"
import MainRouter from "@/pages/main/router"
import FeedbackRouter from "@/pages/feedback/router"
import FeedbackRouter1 from "@/pages/feedback.1/router"
import FeedbackRouter2 from "@/pages/feedback.2/router"
Vue.use(Router);
let routes = [{
    path: '/404',
    name: '404',
    component: r => require.ensure([], () => r(require('@/pages/login')), 'login')
}];
routes = routes.concat(LoginRouter);
routes.push(FeedbackRouter);
//routes = routes.concat(FeedbackRouter1);
routes.push(MainRouter);
routes.push(FeedbackRouter2);
const router = new Router({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (!to.matched || to.matched.length == 0) {

        next({ path: "/404" });
        return;
    }
    if (["login", "404", "503"].indexOf(to.name) != -1 || Store.getters["user/isLogin"]) {
        next();
    } else {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        });
    }
});

//返回
Router.prototype.goBack = function() {　　
    this.isBack = true;
    this.go(-1)
}
export default router;