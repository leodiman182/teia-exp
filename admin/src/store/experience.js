import { createStore } from 'vuex'
import axios from '../plugins/axios'
import Swal from './swal'

// Create a new store instance.
const store = createStore({
    state: {
        ShowList: true,
        loading: true,
        experiencies: [],
        inputs: {
            id: '',
            experience_categories_id: '',
            title: '',
            description: '',
            price: 0.00,
            image: null,
            duration: '',
            localization: '',
            whatsapp: '',
            email: '',
            when: '',
            active: true,
            tags: {},
        },
        errors: null,
    },
    getters: {},
    actions: {
        delete({ commit }, Experience) {
            return axios.delete('Experience/' + Experience.id)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Experiência ' + Experience.title + ' excluida com sucesso!'
                    }
                    Swal.commit('notification', fields)

                    return this.dispatch("get")
                }).catch(() => {
                    const fields = {
                        icon: 'error',
                        title: 'Não foi possivel excluir a experiência ' + Experience.title
                    }
                    Swal.commit('notification', fields)
                    return this.dispatch("get")
                })
        },
        save({ commit }, Experience) {
            let link = 'Experience'
            let dataForm = new FormData();

            if (Experience.id != '') {
                link += '/' + Experience.id
                Experience._method = 'put'
                dataForm.append(`_method`, 'put');
            }

            dataForm.append(`id`, Experience.id);
            dataForm.append(`experience_categories_id`, Experience.experience_categories_id);
            dataForm.append(`title`, Experience.title);
            dataForm.append(`description`, Experience.description);
            dataForm.append(`image`, Experience.image);
            dataForm.append(`price`, Experience.price);
            dataForm.append(`duration`, Experience.duration);
            dataForm.append(`localization`, Experience.localization);
            dataForm.append(`when`, Experience.when);
            dataForm.append(`active`, Experience.active);
            dataForm.append(`whatsapp`, Experience.whatsapp);
            dataForm.append(`email`, Experience.email);

            return axios.post(link, dataForm)
                .then(({ data }) => {

                    const fields = {
                        icon: 'success',
                        title: 'Experiência ' + Experience.title + ' foi salva com sucesso!'
                    }
                    Swal.commit('notification', fields)

                    this.dispatch("get")
                    this.commit('clearInputs')
                    this.commit("setShowList", true)
                    return data;

                }).catch((err) => {
                    commit('setError', err.response.data.errors)
                })
        },
        get({ commit }) {
            return axios.get("Experience")
                .then(({ data }) => {
                    return commit("setExperiencies", data)
                })
        },
        edit({ commit }, id) {
            this.commit('clearInputs')
            return axios.get("Experience/GetById/" + id)
                .then(({ data }) => {
                    commit("setExperience", data)
                    commit("setShowList", false)
                    return data
                })
        },
    },
    mutations: {
        setExperiencies: (state, data) => {
            state.loading = false
            state.experiencies = data

            return data
        },
        setExperience: (state, data) => {
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
                experience_categories_id: '',
                title: '',
                description: '',
                price: '',
                image: null,
                duration: '',
                localization: '',
                when: '',
                active: true,
            },
                state.errors = null
        },
    },
    modules: {},
})

export default store