<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Imagem</th>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Categoria</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status
                                </th>
                                <th scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center">Ação
                                </th>
                                <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>-->
                            </tr>
                        </thead>
                        <tbody v-show="!CategoryStore.state.loading" class="divide-y divide-gray-200 bg-white">
                            <tr v-if="CategoryStore.state.categories.length == 0">
                                <td colspan="5" class="text-center text-xl text-red-800">Nenhuma categoria encontrada
                                </td>
                            </tr>
                            <tr v-else v-for="category in CategoryStore.state.categories" :key="category.id">
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <a href="#"
                                        @click="storeModal.state.img = url + '/' + category.image; storeModal.state.show = true;">
                                        <div class="h-40 w-40 flex-shrink-0">
                                            <img class="h-40 w-40 rounded border shadow-md"
                                                :src="url + '/' + category.image" alt />
                                        </div>
                                    </a>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max">
                                    <div class="ml-4">
                                        <div class="font-medium text-gray-900" v-html="print(category.title, 70)"></div>
                                        <div class="text-gray-500" v-html="print(category.description, 70)"></div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span v-if="category.active"
                                        class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Ativo</span>
                                    <span v-else
                                        class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Inativo</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                    <a :href="url + '/' + category.image" content="Abrir imagem" v-tippy="{
                                        arrow: true,
                                        arrowType: 'round',
                                        animation: 'fade',
                                        placement: 'top',
                                        appendTo: 'parent',
                                        theme: 'tomato',
                                        arrow: true
                                    }" target="_blank" type="button"
                                        class="mr-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-secondary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                                        <EyeIcon class="h-5 w-5" aria-hidden="true" />
                                    </a>
                                    <button @click="edit(category.id)" content="Editar" v-tippy="{
                                        arrow: true,
                                        arrowType: 'round',
                                        animation: 'fade',
                                        placement: 'top',
                                        appendTo: 'parent',
                                        theme: 'tomato',
                                        arrow: true
                                    }" type="button"
                                        class="mr-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        <PencilAltIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button @click="del(category)" content="Excluir" v-tippy="{
                                        arrow: true,
                                        arrowType: 'round',
                                        animation: 'fade',
                                        placement: 'top',
                                        appendTo: 'parent',
                                        theme: 'tomato',
                                        arrow: true
                                    }" type="button"
                                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        <TrashIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-show="CategoryStore.state.loading" class="text-center">
                        <p class="mb-2 mt-2 text-xl text-indigo-800">Carregando</p>
                        <p class="mb-2">
                            <pulse-loader :loading="CategoryStore.state.loading" color="#16A34A" size="16px">
                            </pulse-loader>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <ModalImagem></ModalImagem>
    </div>
</template>

<script setup>
import CategoryStore from '../../store/category'
import ModalImagem from '../ModalImagem.vue'
import storeModal from '../../store/modal-img'
import { onMounted, computed } from "vue"
import { PencilAltIcon, TrashIcon, EyeIcon } from '@heroicons/vue/outline'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Swal from 'sweetalert2'

onMounted(() => {
    CategoryStore.dispatch('get')
})

const url = computed(() => (window.location.hostname == 'localhost' ? 'http://localhost:8000' : 'https://teiaexp.carteiraholder.com.br/laravel/storage/app/public'))

function del(category) {
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
            CategoryStore.dispatch('delete', category)
        }
    })
}

function edit(id) {
    CategoryStore.dispatch('edit', id)
}

function print(str, numChar) {
    let row = (str.length ?? 1) / numChar
    let start = 0
    let newStr = ''
    for (let index = 0; index < row; index++) {
        newStr += '<p>' + str.substr(start, numChar) + '</p>'
        start = start + numChar
    }
    return newStr
}

</script>

<style scoped>
*>>>.tippy-box[data-theme~="tomato"] {
    background-color: rgb(141, 141, 141);
    color: rgb(255, 255, 255);
    padding: 6px;
    border-radius: 10px;
}
</style>

