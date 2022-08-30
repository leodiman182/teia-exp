<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                >CNPJ</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >Razão Social</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >E-mail</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >Status</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center"
                                >Ação</th>
                                <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>-->
                            </tr>
                        </thead>
                        <tbody
                            v-show="!CompanyStore.state.loading"
                            class="divide-y divide-gray-200 bg-white"
                        >
                            <tr v-if="CompanyStore.state.companies.length == 0">
                                <td
                                    colspan="5"
                                    class="text-center text-xl text-red-800"
                                >Nenhuma empresa encontrada</td>
                            </tr>
                            <tr
                                v-else
                                v-for="company in CompanyStore.state.companies"
                                :key="company.id"
                            >
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div class="text-gray-900">{{ company.cnpj }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div class="text-gray-900">{{ company.name }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div class="text-gray-900">{{ company.email }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span
                                        v-if="company.active"
                                        class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                    >Ativo</span>
                                    <span
                                        v-else
                                        class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"
                                    >Inativo</span>
                                </td>
                                <td
                                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                                >
                                    <button
                                        @click="edit(company.id)"
                                        content="Editar"
                                        v-tippy="{
                                            arrow: true,
                                            arrowType: 'round',
                                            animation: 'fade',
                                            placement: 'top',
                                            appendTo: 'parent',
                                            theme: 'tomato',
                                            arrow: true
                                        }"
                                        type="button"
                                        class="mr-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-primary opacity-100 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <PencilAltIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        @click="del(company)"
                                        content="Excluir"
                                        v-tippy="{
                                            arrow: true,
                                            arrowType: 'round',
                                            animation: 'fade',
                                            placement: 'top',
                                            appendTo: 'parent',
                                            theme: 'tomato',
                                            arrow: true
                                        }"
                                        type="button"
                                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <TrashIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-show="CompanyStore.state.loading" class="text-center">
                        <p class="mb-2 mt-2 text-xl text-primary">Carregando</p>
                        <p class="mb-2">
                            <pulse-loader
                                :loading="CompanyStore.state.loading"
                                color="#16A34A"
                                size="16px"
                            ></pulse-loader>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CompanyStore from '../../store/company'
import { onMounted } from "vue"
import { PencilAltIcon, TrashIcon } from '@heroicons/vue/outline'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Swal from 'sweetalert2'

onMounted(() => {
    CompanyStore.dispatch('get')
})

function del(company) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não será capaz de reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, exclua!'
    }).then((result) => {
        if (result.isConfirmed) {
            CompanyStore.dispatch('delete', company)
        }
    })
}

function edit(id) {
    CompanyStore.dispatch('edit', id)
}

</script>

<style scoped>
* >>> .tippy-box[data-theme~="tomato"] {
    background-color: rgb(141, 141, 141);
    color: rgb(255, 255, 255);
    padding: 6px;
    border-radius: 10px;
}
</style>