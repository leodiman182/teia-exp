<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                                        <input
                                            v-model="checked"
                                            @change="Database.state.list.map(element => element.checkbox = checked)"
                                            type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary sm:left-6" />
                                    </th>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nome</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CPF</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">E-mail</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cadastrado em</th>
                                    <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Edit</span>
                                    </th> -->
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="person in Database.state.list" :key="person.id">
                                    <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                        <div v-if="person.checkbox" class="absolute inset-y-0 left-0 w-0.5 bg-primary"></div>
                                        <input 
                                            v-model="person.checkbox"
                                            type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray text-primary focus:ring-primary sm:left-6" 
                                        />
                                    </td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ person.name }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.cpf }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ new Date(person.created_at).toLocaleDateString() }} {{new Date(person.created_at).toLocaleTimeString()}}</td>
                                    <!-- <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a href="#" class="text-primary hover:text-isecondary"
                                        >Edit<span class="sr-only">, {{ person.name }}</span></a
                                        >
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Database from '../../../store/coin-by-company'
import { watch, ref } from 'vue'
    
watch(() =>  Database.state.inputs.idCompany, newValue =>  {
    Database.dispatch('get', newValue)
});

const checked = ref(true)



</script>

<style>

</style>