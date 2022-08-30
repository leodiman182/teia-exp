import { createStore } from 'vuex'
import axios from '../plugins/axios'
import Swal from './swal'

// Create a new store instance.
const store = createStore({
    state: {
        ShowList: true,
        loading: true,
        categories: [],
        inputs: {
            id: '',
            title: '',
            description: '',
            image: null,
            active: true,
        },
        errors: null,
    },
    getters: {},
    actions: {
        delete({ commit }, Category) {
            return axios.delete('ExperienceCategory/' + Category.id)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Categoria ' + Category.title + ' excluida com sucesso!'
                    }
                    Swal.commit('notification', fields)

                    return this.dispatch("get")
                }).catch(() => {
                    const fields = {
                        icon: 'error',
                        title: 'Não foi possivel excluir a categoria ' + Category.title
                    }
                    Swal.commit('notification', fields)
                    return this.dispatch("get")
                })
        },
        save({ commit }, Category) {
            let link = 'ExperienceCategory'
            let dataForm = new FormData();

            if (Category.id != '') {
                link += '/' + Category.id
                Category._method = 'put'
                dataForm.append(`_method`, 'put');
            }

            dataForm.append(`id`, Category.id);
            dataForm.append(`title`, Category.title);
            dataForm.append(`description`, Category.description);
            dataForm.append(`image`, Category.image);
            dataForm.append(`active`, Category.active);

            return axios.post(link, dataForm)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Categoria ' + Category.title + ' foi salva com sucesso!'
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
            return axios.get("ExperienceCategory")
                .then(({ data }) => {
                    return commit("setCategories", data)
                })
        },
        edit({ commit }, id) {
            this.commit('clearInputs')
            return axios.get("ExperienceCategory/" + id)
                .then(({ data }) => {
                    commit("setCategory", data)
                    commit("setShowList", false)
                    return data
                })
        },
    },
    mutations: {
        setCategories: (state, data) => {
            state.loading = false
            state.categories = data
            return data
        },
        setCategory: (state, data) => {
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
                title: '',
                description: '',
                image: null,
                active: true,
            }
            state.errors = null
        },
    },
    modules: {},
})

export default store