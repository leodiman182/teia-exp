<template>
    <div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <AuthHeader title="Trocar senha" />

                <form class="mt-8 space-y-6" @submit="reset">
                    <input type="hidden" name="token" :value="storeInput.state.field.token" />
                    <div class="sm:col-span-4">
                        <label for="Email" class="block ttext-gray-700">
                            Email:
                            <b>{{ storeInput.state.field.email }}</b>
                        </label>
                    </div>

                    <div class="rounded-md shadow-sm -space-y-px">
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
                    <Alerts :error="err" :message="errMsg" />
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
                            Trocar Senha
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
import Alerts from '../components/Alerts.vue'
import inputValidation from '../components/input/Validation.vue'
import store from '../store';
import storeInput from '../store/input';
import { ref } from "vue";

let arrParameter = []
let errMsg = ref()
let err = ref(false)

window.location.search
    .split('?')[1]
    .split('&')
    .forEach(element => {
        arrParameter.push(element.split("=")[1])
    });


storeInput.state.field = {
    password: '',
    password_confirmation: '',
    token: arrParameter[0],
    email: arrParameter[1]
}

let error = {
    password: ref(),
    password_confirmation: ref()
}


function reset(ev) {
    ev.preventDefault()
    errMsg.value = null
    clearErrors()
    store
        .dispatch('reset', storeInput.state.field)
        .then((res) => {
            err.value = res.error
            errMsg.value = res.status
        })
        .catch(retErr => {
            if (retErr.response.status == 403) {
                err.value = retErr.response.data.error
                errMsg.value = retErr.response.data.status
            } else {
                setErrors(retErr.response.data.errors)
            }
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

<style>
</style>