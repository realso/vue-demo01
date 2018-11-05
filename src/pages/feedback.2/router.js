//页面跳转参数路由配置
//子模块不暴露到外部。
export default {
    path: '/feedback.2',
    name: 'feedback.2',
    component: r => require.ensure([], () => r(require('@/pages/feedback.2/add/index')), "feedback" /*按需加载，名称一样打包在一个文件*/ ),
    redirect: 'feedback.2/add/main',
    children: [{
            path: '/feedback.2/add/main',
            name: "/feedback.2/add/main",
            component: r => require.ensure([], () => r(require('@/pages/feedback.2/add/views/main')), "feedback"),
            props: { TITLE: '反馈' },
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/feedback.2/add/main2',
            name: "/feedback.2/add/main2",
            component: r => require.ensure([], () => r(require('@/pages/feedback.2/add/views/main.1')), "feedback"),
            props: { TITLE: '反馈2' },
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/feedback.2/add/empsel',
            name: "feedback.2/add/empsel",
            component: r => require.ensure([], () => r(require('@/pages/com/views/emp_sel')), "feedback"),
            props: { TITLE: '选择人员', refStore: { mutation: "feedback-add/setEmp", path: "main" } },
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/feedback.2/add/dtsempsel',
            name: "feedback.2/add/dtsempsel",
            component: r => require.ensure([], () => r(require('@/pages/com/views/emp_sel')), "feedback"),
            props: { TITLE: '选择人员', refStore: { mutation: "feedback-add/addEmp", path: "dts" } },
            meta: {
                keepAlive: true
            }
        }
    ]
}