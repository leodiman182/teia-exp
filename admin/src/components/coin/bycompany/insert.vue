<template>
    <form class="space-y-8 divide-y divide-gray-200" @submit="save">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="company"
                        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Empresa</label>
                    <div class="mt-1 ml-2 sm:mt-0 sm:col-span-2">
                        <select id="company" name="company" autocomplete="company"
                            v-model="Database.state.inputs.idCompany"
                            class="max-w-lg block focus:ring-primary focus:border-primary w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                            <option value="0"></option>
                            <option v-for="company in CompanyStore.state.companies" :key="company.id"
                                v-bind:value="company.id">{{ company.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="description"
                        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Valor</label>
                    <div class="mt-1  relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 sm:text-sm pl-1">R$</span>
                        </div>
                        <input step="0.01" type="number" name="price" id="price"
                            v-model="Database.state.inputs.price"
                            class="ml-2 focus:ring-primary focus:border-primary block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00" aria-describedby="price-currency" />
                    </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="validation" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Validade em meses</label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                            v-model="Database.state.inputs.validation" 
                            type="number" name="validation" id="validation" autocomplete="validation" 
                            class="ml-2 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
            </div>
        </div>

        <AlertError :errors="Database.state.errors"></AlertError>

        <div class="pt-5">
            <div class="flex justify-end">
                <button
                    type="reset"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >Cancelar</button>
                <button
                    type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >Salvar</button>
            </div>
        </div>
    </form>
  
</template>

<script setup>
import CompanyStore from '../../../store/company'
import Database from '../../../store/coin-by-company'
import Swal from '../../../store/swal'
import AlertError from '../../AlertError.vue'
import { onMounted } from 'vue'
import axios from '../../../plugins/axios'

onMounted(() => {
    CompanyStore.dispatch('get')
    
})

async function save(ev) {
    ev.preventDefault()
    if (await Database.dispatch('save')) {
        const fields = {
            icon: 'success',
            title: 'Créditos lançados com sucesso!'
        }
        Swal.commit('notification', fields)
        clearFields()
    }

}


// let dataForm = new FormData();
// dataForm.append(`value`, 120);
// dataForm.append(`experience_id`, 14);
// dataForm.append(`person_id`, 14);
// axios.post("/Debt/setExperience", dataForm)
//     .then(({ data }) => { })
//     .catch((err) => { })
    

function clearFields() {
    Database.state.inputs.errors = ''
    Database.state.inputs.idCompany = 0
    Database.state.inputs.price = 0.00
    Database.state.inputs.validation = 1
}
</script>

<style>

</style>