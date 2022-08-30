import { createStore } from 'vuex'
import axios from '../plugins/axios'
// import Swal from './swal'

// Create a new store instance.
const store = createStore({
    state: {
        ShowList: false,
        inputs: {
            idCompany: 0,
            price: '',
            validation: 1,
            errors: ''
        },
        list: []
    },
    getters: {},
    actions: {
        get({ commit }, id) {
            this.state.ShowList = false
            return axios.get("Person/GetByCompany/" + id)
                .then(({ data }) => {
                    return commit("setList", data)
                })
        },
        save({ commit }) {
            let dataForm = new FormData();
            if (this.state.list.length == 0) return false

            dataForm.append(`list`, JSON.stringify(this.state.list));
            dataForm.append(`price`, this.state.inputs.price);
            dataForm.append(`validation`, this.state.inputs.validation);

            return axios.post("/Credit/setByCompany", dataForm)
                .then(({ data }) => {
                    commit("setCategory", data)
                    commit("setShowList", false)
                    return true
                })
                .catch((err) => {
                    commit('setError', err.response.data.errors)
                    return false
                })
        },
    },
    mutations: {
        setList: (state, data) => {
            state.list = data
            state.ShowList = true
            state.list.forEach(element => {
                element.checkbox = true
            })
            return data
        },
        setError: (state, err) => {
            state.errors = err
        },
    },
    modules: {},
})

export default store