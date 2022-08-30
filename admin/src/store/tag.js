import { createStore } from 'vuex'
import axios from '../plugins/axios'
import Swal from './swal'

// Create a new store instance.
const store = createStore({
    state: {
        ShowList: true,
        loading: true,
        companies: [],
        inputs: {
            id: '',
            description: '',
            active: true,
        },
        errors: null,
    },
    getters: {},
    actions: {
        delete({ commit }, tag) {
            return axios.delete('ExperienceTag/' + tag.id)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'TAG ' + tag.description + ' excluida com sucesso!'
                    }
                    Swal.commit('notification', fields)

                    return this.dispatch("get")
                }).catch(() => {
                    const fields = {
                        icon: 'error',
                        title: 'Não foi possivel excluir a TAG ' + tag.description
                    }
                    Swal.commit('notification', fields)
                    return this.dispatch("get")
                })
        },
        save({ commit }, tag) {
            let link = 'ExperienceTag'
            if (tag.id != '') {
                link += '/' + tag.id
                tag._method = 'put'
            }
            return axios.post(link, tag)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'TAG ' + tag.description + ' foi salva com sucesso!'
                    }
                    Swal.commit('notification', fields)

                    this.dispatch("get", data)
                    this.commit('clearInputs')
                    this.commit("setShowList", true)

                }).catch((err) => {
                    commit('setError', err.response.data.errors)
                })
        },
        get({ commit }) {
            return axios.get("ExperienceTag")
                .then(({ data }) => {
                    return commit("setCompanies", data)
                })
        },
        edit({ commit }, id) {
            this.commit('clearInputs')
            return axios.get("ExperienceTag/" + id)
                .then(({ data }) => {
                    commit("setTag", data)
                    commit("setShowList", false)
                    return data
                })
        },
    },
    mutations: {
        setCompanies: (state, data) => {
            state.loading = false
            state.companies = data
            return data
        },
        setTag: (state, data) => {
            state.inputs = data
            return data
        },
        setShowList: (state, data) => {
            state.ShowList = data
        },
        setActive: (state, data) => {
            state.inputs.active = data
        },
        setError: (state, err) => {
            state.errors = err
        },
        clearInputs: (state) => {
            state.inputs = {
                id: '',
                description: '',
                active: true,
            }
            state.errors = null
        },
    },
    modules: {},
})

export default store