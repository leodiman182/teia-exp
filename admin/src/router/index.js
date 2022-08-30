import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import DefaultLayout from '../components/DefaultLayout/DefaultLayout.vue'
import Dashboard from '../view/Dashboard.vue'
import Profile from '../view/Profile.vue'
import Company from '../view/Company.vue'
import Person from '../view/Person.vue'
import Tags from '../view/Tags.vue'
import Category from '../view/Category.vue'
import Experiences from '../view/Experiences.vue'
import Transactions from '../view/Transactions.vue'
import Presentation from '../view/Presentation.vue'
import InsertCoinCompany from '../view/InsertCoinCompany.vue'
import InsertCoinPerson from '../view/InsertCoinPerson.vue'
import InsertCoinExtract from '../view/InsertCoinExtract.vue'

import AuthLayout from '../components/AuthLayout.vue'
import Login from '../view/Login.vue'
import Register from '../view/Register.vue'
import Forgot from '../view/Forgot.vue'
import Reset from '../view/Reset.vue'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/company',
                name: 'Empresas',
                component: Company,
                meta: { name: '' }
            },
            {
                path: '/person',
                name: 'Pessoas',
                component: Person,
                meta: { name: '' }
            },
            {
                path: '/tag',
                name: 'TAG das experiências',
                component: Tags,
                meta: { name: '' }
            },
            {
                path: '/category',
                name: 'Categoria das experiências',
                component: Category,
                meta: { name: '' }
            },
            {
                path: '/experience',
                name: 'Experiências',
                component: Experiences,
                meta: { name: '' }
            },
            {
                path: '/presentation',
                name: 'Solicitão de Apresentação',
                component: Presentation,
                meta: { name: '' }
            },
            {
                path: '/insert-coin-company',
                name: 'Inserir Teia Coin por Compania',
                component: InsertCoinCompany,
                meta: { name: '' }
            },
            // {
            //     path: '/insert-coin-person',
            //     name: 'Inserir Teia Coin por Pessoa',
            //     component: InsertCoinPerson,
            //     meta: { name: '' }
            // },
            {
                path: '/insert-coin-extract',
                name: 'Extrato de Teia Coins',
                component: InsertCoinExtract,
                meta: { name: '' }
            },


            ///TESTES
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: { name: 'Dashboard' }
            },
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            // {
            //     path: '/register',
            //     name: 'Register',
            //     component: Register
            // },
            {
                path: '/forgot',
                name: 'Forgot',
                component: Forgot
            },
            {
                path: '/reset',
                name: 'Reset',
                component: Reset
            },
        ]
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth && !store.state.user.token)
        next({ name: 'Login' })
    else if (store.state.user.token && to.meta.isGuest)
        next({ name: 'Dashboard' })
    else
        next()
})

export default router