import { createStore } from 'vuex'
import axios from '../plugins/axios'

// Create a new store instance.
const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        }
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axios.post('register', user)
                .then(({ data }) => {
                    return commit("setUser", data)
                })
        },
        registerCollaborator({ commit }, user) {
            return axios.post('register', user)
        },
        login({ commit }, user) {
            return axios.post('login', user)
                .then(({ data }) => {
                    return commit("setUser", data)
                })
        },
        logout({ commit }) {
            return axios.post('logout')
                .then(() => {
                    return commit("logout")
                })
        },
        forgot({ commit }, user) {
            return axios.post("forgot-password", user)
                .then(({ data }) => {
                    return data
                })
        },
        reset({ commit }, user) {
            return axios.post("reset", user)
                .then(({ data }) => {
                    return data
                })
        },
        getUser({ commit }) {
            return axios.get("user")
                .then(({ data }) => {
                    return data
                })
        },
    },
    mutations: {
        logout: (state) => {
            sessionStorage.removeItem('TOKEN')
            state.user.token = null
            state.user.data = {}
            return true
        },
        setUser: (state, userData) => {
            sessionStorage.setItem('TOKEN', userData.token)
            state.user.token = userData.token
            state.user.data = userData.user
            return userData
        },
    },
    modules: {},
})

export default store