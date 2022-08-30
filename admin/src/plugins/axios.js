import axios from 'axios'
import store from '../store'

const axiosClient = axios.create({
    baseURL: window.location.hostname == 'localhost' ? 'http://localhost:8000/api' : 'https://teiaexp.carteiraholder.com.br/laravel/public/api'
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config
})

export default axiosClient