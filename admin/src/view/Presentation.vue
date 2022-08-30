<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">
                    Solicitão de Apresentação
                </h1>
            </div>
        </div>


        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table v-show="!loading"  class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Data</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nome</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">E-mail</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cargo</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ação</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="list in List"
                                :key="list.id">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{new Date(list.created_at).toLocaleDateString('pt-br')}}</td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{list.name}}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm ">
                                        <a :href="'mailto:'+list.email" @click="ChangeStatus(list)">{{list.email}}</a>
                                    </td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{list.role}}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm ">
                                        <span v-show="!list.status">
                                            <ExclamationCircleIcon  class="h-5 w-5 text-red-400" aria-hidden="true" />
                                            <!-- Não foi entrado em contato -->
                                        </span>
                                        <span v-show="list.status">
                                            <CheckCircleIcon  class="h-5 w-5 text-green-400" aria-hidden="true" />
                                           <!-- E-mail já foi enviado -->
                                        </span>
                                    </td>
                                    <td>
                                        <!--  -->
                                        <a :href="'mailto:'+list.email" @click="ChangeStatus(list)">
                                            <MailIcon  class="h-5 w-5 text-secondary" aria-hidden="true" />
                                        </a>
                                        
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                        <div v-show="Loading" class="text-center">
                            <p class="mb-2 mt-2 text-xl text-indigo-800">Carregando</p>
                            <p class="mb-2">
                                <pulse-loader :loading="Loading" color="#16A34A" size="16px">
                                </pulse-loader>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ExclamationCircleIcon, CheckCircleIcon, MailIcon } from '@heroicons/vue/outline'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { ref } from "vue";
import axios from '../plugins/axios'

const List = ref([])
const Loading = ref(true)

axios.get('Presentation')
    .then(response => {
        List.value = response.data
        Loading.value = false
    })

function ChangeStatus(list){
    list.status = true
    axios.post('Presentation/changeStatus/' + list.id, list)
}

// axios.post('Presentation/changeStatus/' + list.id, list)
// let dataForm = new FormData();
// dataForm.append(`email`, 'fernando.stefanutto2@agatecnologia.com.br');
// axios.post('Presentation', dataForm)
//  
</script>