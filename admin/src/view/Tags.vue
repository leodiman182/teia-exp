<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1
                    class="text-xl font-semibold text-gray-900"
                >{{ ShowList ? 'Listagem de TAGs' : 'Cadastrar TAG' }}</h1>
                <!-- <p
                    class="mt-2 text-sm text-gray-700"
                >A list of all the users in your account including their name, title, email and role.</p>-->
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                    v-show="ShowList"
                    @click="ShowList = !ShowList"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto"
                >Adicionar TAGs</button>
                <button
                    v-show="!ShowList"
                    @click="ShowList = !ShowList"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bopacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:w-auto"
                >Listagem</button>
            </div>
        </div>
        <List v-show="ShowList"></List>
        <Insert v-show="!ShowList"></Insert>
    </div>
</template>

<script setup>

import TagStore from '../store/tag'
import List from '../components/tag/list.vue'
import Insert from '../components/tag/insert.vue'
import { computed } from "vue";

const ShowList = computed({
    get() {
        return TagStore.state.ShowList
    },
    set(value) {
        TagStore.commit("setShowList", value)
    }
})

</script>