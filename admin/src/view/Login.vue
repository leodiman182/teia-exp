<template>
    <div>
        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <AuthHeader title="Acesso restrito" redirect="regisger" />
                <form class="mt-8 space-y-6" @submit="login">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="block text-sm font-medium text-gray-700">E-mail</label>
                            <div class="mt-1">
                                <input id="email-address" name="email" type="email" autocomplete="email" required
                                    v-model="user.email"
                                    class="input-form appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm mb-2" />
                            </div>
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
                            <div class="mt-1">
                                <input id="password" name="password" type="password" autocomplete="current-password"
                                    required v-model="user.password"
                                    class="input-form appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm mb-2" />
                            </div>
                        </div>
                    </div>
                    <Alerts :error="true" :message="errMsg != null ? 'Usuário e/ou senha inválido(s)' : null" />
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                class="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                                v-model="user.remember" />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Manter conta
                                conectada</label>
                        </div>

                        <div class="text-sm">
                            <router-link :to="{ name: 'Forgot' }"
                                class="font-medium text-secondary hover:opacity-80">Esqueceu sua senha?
                            </router-link>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon class="h-5 w-5 text-tertiary "
                                    aria-hidden="true" />
                            </span>
                            Acessar
                        </button>
                    </div>

                    <!-- <p class="text-center">
                        Ainda não tem conta?
                        <router-link
                            :to="{ name: 'Register' }"
                            class="font-larger text-indigo-600 hover:text-indigo-500 label-link"
                        >Cadastre-se</router-link>
                    </p>-->
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import Alerts from '../components/Alerts.vue'
import { LockClosedIcon } from '@heroicons/vue/solid'
import AuthHeader from '../components/AuthHeader.vue'
import store from '../store'
import router from '../router';
import { ref } from 'vue';

const user = {
    email: '',
    password: '',
    remember: false
}
let errMsg = ref()

function login(ev) {
    ev.preventDefault()
    errMsg.value = null
    store.dispatch('login', user)
        .then((res) => {
            router.push({ name: 'Dashboard' })
        })
        .catch(err => {
            errMsg.value = err.response.data.errors
        })
}
</script>

<style>
/* Cor de fundo do autocomplete */
.input-form:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fbd8ca79 inset;
}
</style>

