import Vue from 'vue'
import Router from 'vue-router'
import Store from "../store"
import LoginRouter from "@/pages/login/router"
import MainRouter from "@/pages/main/router"
import FeedbackRouter from "@/pages/feedback/router"
import FeedbackRouter1 from "@/pages/feedback.1/router"
Vue.use(Router);
let routes = [];
routes = routes.concat(LoginRouter);
routes.push(FeedbackRouter);
routes = routes.concat(FeedbackRouter1);
routes.push(MainRouter);
const router = new Router({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
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
export default router;