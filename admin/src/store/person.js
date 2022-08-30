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
            level_id: 1,
            company_id: '',
            rg: '',
            cpf: '',
            name: '',
            email: '',
            zip_code: '',
            address: '',
            address_number: '',
            district: '',
            city: '',
            active: true,
            state: '',
        },
        errors: null,
    },
    getters: {},
    actions: {
        delete({ commit }, person) {
            return axios.delete('Person/' + person.id)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Pessoa ' + person.name + ' excluida com sucesso!'
                    }
                    Swal.commit('notification', fields)

                    return this.dispatch("get")
                }).catch(() => {
                    const fields = {
                        icon: 'error',
                        title: 'Não foi possivel excluir a pessoa ' + person.name
                    }
                    Swal.commit('notification', fields)
                    return this.dispatch("get")
                })
        },
        save({ commit }, person) {
            let link = 'Person'
            if (person.id != '') {
                link += '/' + person.id
                person._method = 'put'
            }
            return axios.post(link, person)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Pessoa ' + person.name + ' foi salva com sucesso!'
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
            return axios.get("Person")
                .then(({ data }) => {
                    return commit("setCompanies", data)
                })
        },
        edit({ commit }, id) {
            this.commit('clearInputs')
            return axios.get("Person/" + id)
                .then(({ data }) => {
                    commit("setPerson", data)
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
        setPerson: (state, data) => {
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
                level_id: 1,
                company_id: '',
                rg: '',
                cpf: '',
                name: '',
                email: '',
                zip_code: '',
                address: '',
                address_number: '',
                district: '',
                city: '',
            }
            state.errors = null
        },
    },
    modules: {},
})

export default store