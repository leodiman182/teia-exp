<template>
    <div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <AuthHeader title="Crie sua conta" />

                <form class="mt-8 space-y-6" @submit="register">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <inputValidation
                            label="Nome"
                            :error="error.name.value"
                            id="name"
                            name="name"
                            type="text"
                        ></inputValidation>
                        <inputValidation
                            label="E-mail"
                            :error="error.email.value"
                            id="email"
                            name="email"
                            type="email"
                        ></inputValidation>
                        <inputValidation
                            label="Senha"
                            :error="error.password.value"
                            id="password"
                            name="password"
                            type="password"
                        ></inputValidation>
                        <inputValidation
                            label="Confime sua senha"
                            :error="error.password_confirmation.value"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                        ></inputValidation>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Cadastrar
                        </button>
                    </div>

                    <p class="text-center">
                        Já tem conta?
                        <router-link
                            :to="{ name: 'Login' }"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                        >Acesse sua conta</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import AuthHeader from '../components/AuthHeader.vue'
import inputValidation from '../components/input/Validation.vue'
import store from '../store';
import storeInput from '../store/input';
import router from '../router';
import { ref } from 'vue';

storeInput.state.field = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

let error = {
    name: ref(),
    email: ref(),
    password: ref(),
    password_confirmation: ref()
}


function register(ev) {
    ev.preventDefault()
    clearErrors()
    store
        .dispatch('register', storeInput.state.field)
        .then((res) => {
            router.push({ name: 'Dashboard' })
        })
        .catch(err => {
            setErrors(err.response.data.errors)
        })
}

function setErrors(errors) {
    let label = Object.keys(errors)
    for (let index = 0; index < label.length; index++) {
        const element = label[index];
        error[element].value = errors[element][0]
    }
}

function clearErrors() {
    let label = Object.keys(error)
    for (let index = 0; index < label.length; index++) {
        const element = label[index];
        error[element].value = null
    }
}

</script>