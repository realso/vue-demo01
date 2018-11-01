export default {
    path: '/feedback',
    name: 'feedback',
    component: r => require.ensure([], () => r(require('@/pages/feedback/index')), "feedback"),
    redirect: 'feedback/list/main',
    children: [{
            path: '/feedback/list/:view',
            name: "list",
            component: r => require.ensure([], () => r(require('@/pages/feedback/list/index')), "feedback")
        },
        {
            path: '/feedback/add/:view',
            name: "add",
            component: r => require.ensure([], () => r(require('@/pages/feedback/add/index')), "feedback")
        }
    ]
}