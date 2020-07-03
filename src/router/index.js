import Vue from 'vue'
import Router from 'vue-router'
import PageZTQK from '../pages/PageZTQK'

Vue.use(Router)
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/PageZTQK',
            meta: {
                title: '整体情况'
            }
        },
        {
            path: '/PageZTQK',
            component: PageZTQK,
        },
    ],
})
export default router
