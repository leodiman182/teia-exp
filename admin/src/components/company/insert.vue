
<template>
    <form class="space-y-8 divide-y divide-gray-200" @submit="save">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div class="space-y-6 sm:space-y-5">
                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                        <label
                            for="cnpj"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >CNPJ</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="number"
                                name="cnpj"
                                id="cnpj"
                                v-model="CompanyStore.state.inputs.cnpj"
                                autocomplete="cnpj"
                                class="max-w-lg block w-full shadow-sm focus:ring-primary focus:border-primary sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                        <label
                            for="name"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >Razão Social</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                v-model="CompanyStore.state.inputs.name"
                                autocomplete="company"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >E-mail</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                v-model="CompanyStore.state.inputs.email"
                                autocomplete="email"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-secondary sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                        <label
                            for="active"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >Status</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="mt-4 space-y-4">
                                <div class="flex items-center">
                                    <input
                                        id="active"
                                        name="push-notifications"
                                        type="checkbox"
                                        class="focus:ring-AAAAAA-500 h-4 w-4 text-AAAAAA-600 border-gray-300"
                                        v-model="inactive"
                                    />
                                    <label
                                        for="active"
                                        class="ml-3 block text-sm font-medium text-gray-700"
                                    >Inativo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AlertError :errors="CompanyStore.state.errors"></AlertError>

        <div class="pt-5">
            <div class="flex justify-end">
                <button
                    @click="clear"
                    type="reset"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-AAAAAA-500"
                >Cancelar</button>
                <button
                    type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >{{ CompanyStore.state.inputs.id == '' ? 'Salvar' : 'Editar' }}</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import CompanyStore from '../../store/company'
import AlertError from '../AlertError.vue'
import { computed } from 'vue'
import { XCircleIcon } from "@heroicons/vue/solid";

const inactive = computed({
    get() {
        return !CompanyStore.state.inputs.active
    },
    set(value) {
        CompanyStore.commit("setActive", !value)
    }
})

function save(ev) {
    ev.preventDefault()
    CompanyStore.dispatch('save', CompanyStore.state.inputs)
}

function clear() {
    CompanyStore.commit('clearInputs')
    CompanyStore.state.ShowList = true
}
</script>

