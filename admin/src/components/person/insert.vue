
<template>
    <form class="space-y-8 divide-y divide-gray-200" @submit="save">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div class="space-y-6 sm:space-y-5">
                    <!-- <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Perfil</h3>
                        <p
                            class="mt-1 max-w-2xl text-sm text-gray-500"
                        >Essas serão as pessoas que vão utilizar as expêriencias</p>
                    </div>-->
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="company"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Empresa</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <select id="company" name="company" autocomplete="company"
                                v-model="personStore.state.inputs.company_id"
                                class="max-w-lg block focus:ring-primary focus:border-primary w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <option v-for="company in CompanyStore.state.companies" :key="company.id"
                                    v-bind:value="company.id">{{ company.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="rg" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">RG</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="rg" id="rg" v-model="personStore.state.inputs.rg" autocomplete="rg"
                                class="max-w-lg block w-full shadow-sm focus:ring-primary focus:border-primary sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="cpf" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">CPF</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="number" name="cpf" id="cpf" v-model="personStore.state.inputs.cpf"
                                autocomplete="cpf"
                                class="max-w-lg block w-full shadow-sm focus:ring-primary focus:border-primary sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Nome</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="name" id="name" v-model="personStore.state.inputs.name"
                                autocomplete="name"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div v-show="personStore.state.inputs.id == ''"
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="email"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Email</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="email" name="email" id="email" v-model="personStore.state.inputs.email"
                                autocomplete="email"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="zipcode"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">CEP</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="number" name="zipcode" id="zipcode" v-model="personStore.state.inputs.zip_code"
                                autocomplete="zipcode"
                                class="max-w-lg block w-full shadow-sm focus:ring-primary focus:border-primary sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="address"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Endereço</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="address" id="address" v-model="personStore.state.inputs.address"
                                autocomplete="address"
                                class="block max-w-lg w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="address_number"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Número</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="number" name="address_number" id="address_number"
                                v-model="personStore.state.inputs.address_number" autocomplete="address_number"
                                class="max-w-lg block w-full shadow-sm focus:ring-primary focus:border-primary sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="company"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Estado</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <select id="company" name="company" autocomplete="company"
                                v-model="personStore.state.inputs.state"
                                class="max-w-lg block focus:ring-primary focus:border-primary w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <option v-for="uf in ufs" :key="uf.sigla" v-bind:value="uf.sigla">{{ uf.nome }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="city"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Cidade</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="city" id="city" v-model="personStore.state.inputs.city"
                                autocomplete="city"
                                class="max-w-lg block w-full shadow-sm focus:ring-primary focus:border-primary sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="district"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Bairro</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="district" id="district" v-model="personStore.state.inputs.district"
                                autocomplete="district"
                                class="max-w-lg block w-full shadow-sm focus:ring-primary focus:border-primary sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
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
                </div>
            </div>
        </div>

        <AlertError :errors="personStore.state.errors"></AlertError>

        <div class="pt-5">
            <div class="flex justify-end">
                <button @click="clear" type="reset"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Cancelar</button>
                <button type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{{
                            personStore.state.inputs.id == '' ? 'Salvar' : 'Editar'
                    }}</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import store from '../../store'
import CompanyStore from '../../store/company'
import personStore from '../../store/person'
import AlertError from '../AlertError.vue'
import { computed, onMounted } from 'vue'
import { XCircleIcon } from "@heroicons/vue/solid";

onMounted(() => {
    CompanyStore.dispatch('get')
})

const inactive = computed({
    get() {
        return !personStore.state.inputs.active
    },
    set(value) {
        personStore.commit("setActive", !value)
    }
})

function save(ev) {
    ev.preventDefault()
    const passwd = 'Teia-' + parseInt(Math.random() * (9999 - 0) + 0);
    const field = {
        name: personStore.state.inputs.name,
        email: personStore.state.inputs.email,
        password: passwd, // btoa(new Date()),
        password_confirmation: passwd// btoa(new Date())
    }
    personStore.dispatch('save', personStore.state.inputs)
        .then(() => {
            if (personStore.state.inputs.id == '') store.dispatch('registerCollaborator', field)
        })


}

function clear() {
    personStore.commit('clearInputs')
    personStore.state.ShowList = true
}


const ufs = [
    { "nome": "Acre", "sigla": "AC" },
    { "nome": "Alagoas", "sigla": "AL" },
    { "nome": "Amapá", "sigla": "AP" },
    { "nome": "Amazonas", "sigla": "AM" },
    { "nome": "Bahia", "sigla": "BA" },
    { "nome": "Ceará", "sigla": "CE" },
    { "nome": "Distrito Federal", "sigla": "DF" },
    { "nome": "Espírito Santo", "sigla": "ES" },
    { "nome": "Goiás", "sigla": "GO" },
    { "nome": "Maranhão", "sigla": "MA" },
    { "nome": "Mato Grosso", "sigla": "MT" },
    { "nome": "Mato Grosso do Sul", "sigla": "MS" },
    { "nome": "Minas Gerais", "sigla": "MG" },
    { "nome": "Pará", "sigla": "PA" },
    { "nome": "Paraíba", "sigla": "PB" },
    { "nome": "Paraná", "sigla": "PR" },
    { "nome": "Pernambuco", "sigla": "PE" },
    { "nome": "Piauí", "sigla": "PI" },
    { "nome": "Rio de Janeiro", "sigla": "RJ" },
    { "nome": "Rio Grande do Norte", "sigla": "RN" },
    { "nome": "Rio Grande do Sul", "sigla": "RS" },
    { "nome": "Rondônia", "sigla": "RO" },
    { "nome": "Roraima", "sigla": "RR" },
    { "nome": "Santa Catarina", "sigla": "SC" },
    { "nome": "São Paulo", "sigla": "SP" },
    { "nome": "Sergipe", "sigla": "SE" },
    { "nome": "Tocantins", "sigla": "TO" }

]
</script>

