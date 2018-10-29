import Store from "../../store"
export default [{
    path: '/login',
    name: 'login',
    component: r => require.ensure([], () => r(require('@/pages/login')), 'login')
  },
  {
    path: '/loginout',
    name: 'loginout',
    beforeEnter(to, from, next) {
      Store.dispatch("user/loginOut").then(function () {
        next('/login');
      });
    }
 }]
  