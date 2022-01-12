import { createHash } from "crypto";
import { createRouter, createWebHashHistory } from "vue-router";
import { RouteRecordRaw  } from "vue-router";
import { store } from "../store";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/app',
        component: () => import('../views/MainPage.vue'),
        children: [
            {path:"", name: "Home", component: () => import('../views/MainRoutes/Home.vue')},
            {path:"/students", name: "Students", component: () => import('../views/MainRoutes/Students.vue')},
            {path:"/facultyes", name: "Facultyes", component: () => import('../views/MainRoutes/Facultyes.vue')},
            {path:"/settings", name: "Settings", component: () => import('../views/MainRoutes/Settings.vue')},
        ]
    },
    {
        path: '/student/:id',
        name: "StudentHome",
        component: () => import('../views/StudentPage.vue'),
        props: true
    },
    {
        path: '/faculty/:id',
        name: "FacultyHome",
        component: () => import('../views/FacultyPage.vue'),
        props: true
    }
]

export const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.state.userData.token) {
        next({name:"Login"})
    }
    next()
})