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
                                >Eempresa</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >Pessoa</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >Endereço</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >Status</th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center"
                                >Ação</th>
                            </tr>
                        </thead>
                        <tbody
                            v-show="!personStore.state.loading"
                            class="divide-y divide-gray-200 bg-white"
                        >
                            <tr v-if="personStore.state.companies.length == 0">
                                <td
                                    colspan="5"
                                    class="text-center text-xl text-red-800"
                                >Nenhuma pessoa encontrada</td>
                            </tr>
                            <tr
                                v-else
                                v-for="person in personStore.state.companies"
                                :key="person.id"
                            >
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div class="font-medium text-gray-900">{{ person.company_name }}</div>
                                    <div class="text-gray-500">{{ person.cnpj }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div class="font-medium text-gray-900">{{ person.name }}</div>
                                    <div
                                        class="text-gray-500"
                                    >RG: {{ person.rg }} - CPF: {{ person.cpf }}</div>
                                    <div class="text-gray-500">{{ person.email }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div
                                        class="font-medium text-gray-900"
                                    >{{ person.address }}, {{ person.address_number }}</div>
                                    <div
                                        class="text-gray-500"
                                    >{{ person.district }} - {{ person.city }}/{{ person.state }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span
                                        v-if="person.active"
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
                                        @click="edit(person.id)"
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
                                        class="mr-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        <PencilAltIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        @click="del(person)"
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
                    <div v-show="personStore.state.loading" class="text-center">
                        <p class="mb-2 mt-2 text-xl text-primary">Carregando</p>
                        <p class="mb-2">
                            <pulse-loader
                                :loading="personStore.state.loading"
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
import personStore from '../../store/person'
import { onMounted } from "vue"
import { PencilAltIcon, TrashIcon } from '@heroicons/vue/outline'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Swal from 'sweetalert2'

onMounted(() => {
    personStore.dispatch('get')
})

function del(person) {
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
            personStore.dispatch('delete', person)
        }
    })
}

function edit(id) {
    personStore.dispatch('edit', id)
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