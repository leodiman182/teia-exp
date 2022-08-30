import { createStore } from 'vuex'
import axios from '../plugins/axios'

// Create a new store instance.
const store = createStore({
    state: {
        tags: [],
    },
    getters: {},
    actions: {
        save({ commit }, tags) {
            let CheckTags = ''
            for (let index = 0; index < tags.tags.length; index++) {
                const element = tags.tags[index];
                if (element.hasOwnProperty('check') && element.check) {
                    CheckTags += element.id + ','
                }
            }
            CheckTags = CheckTags.slice(0, -1)
            let dataForm = new FormData()
            dataForm.append(`tags`, CheckTags)
            return axios.post('/RelationshipExperienceToTag/InsertAll/' + tags.experience.id, dataForm)
                .then(({ data }) => {
                    this.dispatch("get")
                }).catch((err) => {
                    commit('setError', err.response.data.errors)
                })
        },
        get({ commit }) {
            return axios.get("ExperienceTag")
                .then(({ data }) => {
                    return commit("setTags", data)
                })
        },
        edit({ commit }, id) {
            this.dispatch("get")
            axios.get('RelationshipExperienceToTag/' + id)
                .then(({ data }) => {
                    let CheckTags = JSON.parse(data[0].tags)
                    for (let index = 0; index < this.state.tags.length; index++) {
                        const elementTags = this.state.tags[index];
                        if (CheckTags == null) continue
                        for (let index = 0; index < CheckTags.length; index++) {
                            const element = CheckTags[index];
                            if (element == elementTags.description) elementTags.check = true;
                        }
                    }

                })
        },
    },
    mutations: {
        setTags: (state, data) => {
            state.tags = data
            return data
        },
    },
    modules: {},
})

export default store