export default {
    path: '/',
    name: 'main',
    component: r => require.ensure([], () => r(require('@/pages/main/index')), "main"),
    redirect: '/main1',
    children: [{
            path: '/main1',
            name: "main1",
            component: r => require.ensure([], () => r(require('@/pages/main/views/main1')), "main")
        },
        {
            path: '/main2',
            name: "main2",
            component: r => require.ensure([], () => r(require('@/pages/main/views/main2')), "main"),
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/main3',
            name: "main3",
            component: r => require.ensure([], () => r(require('@/pages/main/views/main3')), "main")
        },
        {
            path: '/main4',
            name: "main4",
            component: r => require.ensure([], () => r(require('@/pages/main/views/main4')), "main")
        }
    ]
}