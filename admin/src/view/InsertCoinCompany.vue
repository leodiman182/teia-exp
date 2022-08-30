
<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900"> Inserir Teia Coin por Empresa </h1>
            </div>
        </div> 
       
        <div>
            <Insert />
        </div>
        
        <div v-show="Database.state.ShowList && Database.state.inputs.idCompany > 0">
            <Divider />
            <List />
        </div>
    </div>
</template>

<script setup>
import List from '../components/coin/bycompany/list.vue'
import Insert from '../components/coin/bycompany/insert.vue'
import Divider from '../components/Divider.vue'
import Database from '../store/coin-by-company'
</script>

