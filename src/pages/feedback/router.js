export default {
  path: '/feedback',
  name: 'feedback',
  component:r => require.ensure([], () => r(require('@/pages/feedback/index')), "feedback"),
  redirect: 'feedback/list',
  children: [{
      path: '/feedback/list',
      name:"list",
      component: r => require.ensure([], () => r(require('@/pages/feedback/views/list')), "feedback")
    },
    {
      path: '/feedback/detail',
      name:"detail",
      component: r => require.ensure([], () => r(require('@/pages/feedback/views/detail')), "feedback")
    },
    {
      path: '/feedback/add',
      name:"add",
      component: r => require.ensure([], () => r(require('@/pages/feedback/views/add')), "feedback")
    }
  ]
}
