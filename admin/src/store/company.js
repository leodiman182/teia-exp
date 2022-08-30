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
            cnpj: '',
            name: '',
            email: '',
            active: true,
        },
        errors: null,
    },
    getters: {},
    actions: {
        delete({ commit }, company) {
            return axios.delete('Company/' + company.id)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Empresa ' + company.name + ' excluida com sucesso!'
                    }
                    Swal.commit('notification', fields)

                    return this.dispatch("get")
                }).catch(() => {
                    const fields = {
                        icon: 'error',
                        title: 'Não foi possivel excluir a empresa ' + company.name
                    }
                    Swal.commit('notification', fields)
                    return this.dispatch("get")
                })
        },
        save({ commit }, company) {
            let link = 'Company'
            if (company.id != '') {
                link += '/' + company.id
                company._method = 'put'
            }
            return axios.post(link, company)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Empresa ' + company.name + ' foi salva com sucesso!'
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
            return axios.get("Company")
                .then(({ data }) => {
                    return commit("setCompanies", data)
                })
        },
        edit({ commit }, id) {

            this.commit('clearInputs')
            return axios.get("Company/" + id)
                .then(({ data }) => {
                    commit("setCompany", data)
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
        setCompany: (state, data) => {
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
                cnpj: '',
                name: '',
                email: '',
                active: true,
            }
            state.errors = null
        },
    },
    modules: {},
})

export default store