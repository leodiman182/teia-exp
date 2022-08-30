
<template>
    <form class="space-y-8 divide-y divide-gray-200" @submit="save">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div class="space-y-6 sm:space-y-5">
                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                        <label
                            for="title"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >Título</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                rows="2"
                                id="title"
                                name="title"
                                type="text"
                                v-model="CategoryStore.state.inputs.title"
                                autocomplete="title"
                                class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                        <label
                            for="description"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >Descrição</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                rows="4"
                                id="description"
                                name="description"
                                type="text"
                                v-model="CategoryStore.state.inputs.description"
                                autocomplete="description"
                                class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                        <label
                            for="image"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >Imagem</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <label for="image" class="hover:cursor-pointer hover:opacity-70 text-lg">
                            Adicionar uma imagem
                            <input
                                class="hidden"
                                id="image"
                                name="image"
                                type="file"
                                @change="phandleUpload($event.target.files)"
                                accept=".png, .jpg, .jpeg"
                                autocomplete="image"
                            />                            
                          </label>
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
                                        class="focus:ring-primary h-4 w-4 text-primary border-gray-300"
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
        <AlertError :errors="CategoryStore.state.errors"></AlertError>

        <div class="pt-5">
            <div class="flex justify-end">
                <button
                    @click="clear"
                    type="reset"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >Cancelar</button>
                <button
                    type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >{{ CategoryStore.state.inputs.id == '' ? 'Salvar' : 'Editar' }}</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import CategoryStore from '../../store/category'
import AlertError from '../AlertError.vue'
import { computed } from 'vue'
import { XCircleIcon } from "@heroicons/vue/solid";
import '../../assets/css/input-file.css';

const inactive = computed({
    get() {
        return !CategoryStore.state.inputs.active
    },
    set(value) {
        CategoryStore.commit("setActive", !value)
    }
})

function phandleUpload(files) {
    CategoryStore.state.inputs.image = files[0]
}

function save(ev) {
    ev.preventDefault()
    CategoryStore.dispatch('save', CategoryStore.state.inputs)
}

function clear() {
    CategoryStore.commit('clearInputs')
    CategoryStore.state.ShowList = true
}
</script>

