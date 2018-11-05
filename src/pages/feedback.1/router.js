export default [{
        path: '/feedback.1/list/main',
        name: "list1",
        component: r => require.ensure([], () => r(require('@/pages/feedback.1/list/views/main')), "feedback"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/feedback/list/adv',
        name: "list1adv",
        component: r => require.ensure([], () => r(require('@/pages/feedback.1/add/views/main')), "feedback"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/feedback.1/add/main',
        name: "feedback.1/add/main",
        component: r => require.ensure([], () => r(require('@/pages/feedback.1/add/views/main')), "feedback"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/feedback.1/add/empsel',
        name: "feedback.1/add/empsel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/emp_sel')), "feedback"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/feedback.1/add/dtsempsel',
        name: "feedback.1/add/dtsempsel",
        component: r => require.ensure([], () => r(require('@/pages/com/views/emp_sel')), "feedback"),
        meta: {
            keepAlive: true
        }
    }
]