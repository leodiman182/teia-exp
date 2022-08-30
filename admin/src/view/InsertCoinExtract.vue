<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Extrato por Colaborador </h1>
        </div>
    </div> 
    <div class="grid grid-cols-6r gap-6 mt-4">
        <div class="col-span-6 sm:col-span-3">
            <label for="company" class="block text-sm font-medium text-gray-700">Empresa</label>
            <select v-model="company_id" @change="GetPeoples" id="company" name="company" autocomplete="company-name" class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="0"></option>
                <option v-for="company in companies" :key="company.id" v-bind:value="company.id"> {{company.name}}</option>
            </select>
        </div>
        <div v-if="peoples.length > 0" class="col-span-6 sm:col-span-3">
            <label for="company" class="block text-sm font-medium text-gray-700">Colaborador</label>
            <select v-model="people_id" @change="GetByUser" id="company" name="company" autocomplete="company-name" class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="0"></option>
                <option v-for="people in peoples" :key="people.id" v-bind:value="people.id"> {{people.name}}</option>
            </select>
        </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-white">
                <tr>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data de Criação</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Valor</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Experiência</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data de Expiração </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tipo</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <template v-for="(location) in transactions" :key="location.name">
                  <tr class="border-t border-gray-200">
                    <th colspan="5" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">{{ location.name }} </th>
                  </tr>

                  <tr class="border-t border-gray-200">
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-black text-right" >Saldo Inicial</td>
                        <td colspan="4" scope="colgroup" :class="'whitespace-nowrap px-3 py-4 text-sm text-' + (location.start_credit >= 0 ? 'green' : 'red') + '-500'">{{ parseFloat(location.start_credit).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'}) }} </td>
                  </tr>
                  
                  <tr v-for="(person, personIdx) in location.people" :key="person.email" :class="[personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t']">
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{
                            new Date(person.created_at).toLocaleDateString('pt-br', {
                                timeZone: 'America/Sao_Paulo', 
                                hour12: true, 
                            })
                        }}
                         - 
                        {{
                            new Date(person.created_at).toLocaleTimeString('pt-br')
                        }}
                    </td>
                    
                    <td :class="'whitespace-nowrap px-3 py-4 text-sm text-' + (parseFloat(person.value) > 0 ? 'green' : 'red') + '-500'">
                        {{
                            parseFloat(person.value).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})
                        }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {{ person.experience_title ? person.experiences_id + ' - ' + person.experience_title : 'Inserção de Creditos'  }}
                    </td>
                    
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{
                            person.expire && new Date(person.expire).toLocaleDateString('pt-br', {
                                timeZone: 'America/Sao_Paulo', 
                                hour12: true, 
                            })
                        }}
                        {{
                            person.expire && new Date(person.expire).toLocaleTimeString('pt-br')
                        }}
                    </td>
                    <td>
                        <span :class="'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-' + (parseFloat(person.value) > 0  ? 'green' : 'red') + '-100 text-' + (parseFloat(person.value) > 0  ? 'green' : 'red') + '-800'"> 
                            {{parseFloat(person.value) > 0 ? 'Entrada' : 'Saída'}} 
                        </span>
                    </td>
                  </tr>
                  <tr class="border-t border-gray-200">
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-black text-right" >Saldo Final</td>
                        <td colspan="4" scope="colgroup" :class="'whitespace-nowrap px-3 py-4 text-sm text-' + (location.sumPrice >= 0 ? 'green' : 'red') + '-500'">{{ location.sumPrice.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'}) }} </td>
                  </tr>
                </template>
              </tbody>
              
            </table>
                <div v-if="loading" class="text-center">
                    <p class="mb-2 mt-2 text-xl text-primary">Carregando</p>
                    <p class="mb-2">
                        <pulse-loader
                            :loading="loading"
                            color="#16A34A"
                            size="16px"
                        ></pulse-loader>
                    </p>
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '../plugins/axios'
import { ref } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const loading = ref(false)
const transactions = ref([])
const companies = ref([])
const company_id = ref([])
const peoples = ref([])
const people_id = ref([])

axios.get('/Company')
  .then(({ data }) => {
    companies.value= data
  })

function GetPeoples() {
  axios.get('/Person/GetByCompany/' + company_id.value)
  .then(({ data }) => {
    peoples.value= data
  })
}

function GetByUser() {
  transactions.value = []
  loading.value = true
  axios.get("Transaction/getByUser/" + people_id.value)
    .then(({ data }) => {
        let oldName = ''
        let index = -1
        data.transactions.forEach((element) => {
            if (oldName == '' || oldName != element.person_name) {
                index++
                transactions.value.push(
                    {
                        name: element.person_name,
                        start_credit: data.balance == null ? 0 : parseFloat(data.balance),
                        sumPrice: data.balance == null ? 0 : parseFloat(data.balance),
                        people: []
                    }
                )
            } 

            // console.log(transactions.value);

            transactions.value[index].people.push(
                {
                    experiences_id: element.experiences_id,
                    experience_title: element.experience_title,
                    value: element.value,
                    expire: element.expire,
                    created_at: element.created_at,
                    credit: element.credit,
                }
            )
            transactions.value[index].sumPrice += parseFloat(element.value)
            oldName = element.person_name
            
        });
        loading.value = false
    })
    .catch(() => {loading.value = false})
}
</script>