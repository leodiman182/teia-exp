
<template>
    <form class="space-y-8 divide-y divide-gray-200" @submit="save">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div class="space-y-6 sm:space-y-5">
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="company"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Categoria</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <select id="company" name="company" autocomplete="company"
                                v-model="ExperienceStore.state.inputs.experience_categories_id"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md">
                                <option v-for="category in CategoryStore.state.categories" :key="category.id"
                                    v-bind:value="category.id">{{ category.title }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="title"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Título</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="title" id="title" v-model="ExperienceStore.state.inputs.title"
                                autocomplete="title"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="description"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Descrição</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea rows="4" id="description" name="description" type="text"
                                v-model="ExperienceStore.state.inputs.description" autocomplete="description"
                                class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="whatsapp"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">WhatsApp</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="whatsapp" id="whatsapp" v-model="ExperienceStore.state.inputs.whatsapp"
                                autocomplete="whatsapp"
                                class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="email"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">E-mail</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="email" id="email" v-model="ExperienceStore.state.inputs.email"
                                autocomplete="email"
                                class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="description"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Preço</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 sm:text-sm pl-1">R$</span>
                            </div>
                            <input step="0.01" type="number" name="price" id="price"
                                v-model="ExperienceStore.state.inputs.price"
                                class="ml-2 focus:ring-primary focus:border-primary block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00" aria-describedby="price-currency" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="image"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Imagem</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <label for="image" class="hover:cursor-pointer hover:opacity-70 text-lg">
                            Adicionar uma imagem
                            <input class="hidden" id="image" name="image" type="file" @change="phandleUpload($event.target.files)"
                            accept=".png, .jpg, .jpeg" autocomplete="image" />                            
                          </label>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="duration"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Duração</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="duration" id="duration"
                                v-model="ExperienceStore.state.inputs.duration" autocomplete="duration"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="localization"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Localização</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="localization" id="localization"
                                v-model="ExperienceStore.state.inputs.localization" autocomplete="localization"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="when"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Quando</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="when" id="when" v-model="ExperienceStore.state.inputs.when"
                                autocomplete="when"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="active"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Status</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="mt-4 space-y-4">
                                <div class="flex items-center">
                                    <input id="active" name="push-notifications" type="checkbox"
                                        class="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                                        v-model="inactive" />
                                    <label for="active"
                                        class="ml-3 block text-sm font-medium text-gray-700">Inativo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Tags</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div v-for="tag in TagStore.state.tags" :key="tag.id" class="mt-4 space-y-4">
                                <div v-if="tag.active" class="flex items-center">
                                    <input :id="tag.id" :name="tag.id" type="checkbox"
                                        class="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                                        v-model="tag.check" />
                                    <label :for="tag.id" class="ml-3 block text-sm font-medium text-gray-700">{{
                                            tag.description
                                    }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AlertError :errors="ExperienceStore.state.errors"></AlertError>

        <div class="pt-5">
            <div class="flex justify-end">
                <button @click="clear" type="reset"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Cancelar</button>
                <button type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{{
                            ExperienceStore.state.inputs.id == '' ? 'Salvar' : 'Editar'
                    }}</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import ExperienceStore from '../../store/experience'
import CategoryStore from '../../store/category'
import TagStore from '../../store/tag_experience'
import AlertError from '../AlertError.vue'
import { computed, onMounted } from 'vue'
import { XCircleIcon } from "@heroicons/vue/solid";

onMounted(() => {
    CategoryStore.dispatch('get')
    TagStore.dispatch('get')
})

const inactive = computed({
    get() {
        return !ExperienceStore.state.inputs.active
    },
    set(value) {
        ExperienceStore.commit("setActive", !value)
    }
})

function phandleUpload(files) {
    ExperienceStore.state.inputs.image = files[0]
}

function save(ev) {
    ev.preventDefault()
    ExperienceStore.dispatch('save', ExperienceStore.state.inputs).then(data => {
        TagStore.dispatch('save', { experience: data, tags: TagStore.state.tags }).then(() => {
            ExperienceStore.dispatch('get')
        })
    })
}

function clear() {
    ExperienceStore.commit('clearInputs')
    ExperienceStore.state.ShowList = true
}
</script>

