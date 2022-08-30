<template>
    <div>EM DESENVOLVIMENTO</div>
    <!-- <div>
        <div>
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Projects</h2>
            <ul
                role="list"
                class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                <li
                    v-for="project in projects"
                    :key="project.name"
                    class="col-span-1 flex shadow-sm rounded-md"
                >
                    <div
                        :class="[project.bgColor, 'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md']"
                    >{{ project.initials }}</div>
                    <div
                        class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
                    >
                        <div class="flex-1 px-4 py-2 text-sm truncate">
                            <a
                                :href="project.href"
                                class="text-gray-900 font-medium hover:text-gray-600"
                            >{{ project.name }}</a>
                            <p class="text-gray-500">{{ project.members }} Members</p>
                        </div>
                        <div class="flex-shrink-0 pr-2">
                            <button
                                type="button"
                                @click="swal.commit('alert', { icon: 'success', title: project.name, text: project.members + ' Members', confirmButtonText: 'Nome do botão' })"
                                class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span class="sr-only">Open options</span>
                                <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div>
            <h3 class="mt-4 text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>

            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="item in stats"
                    :key="item.id"
                    class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                    <dt>
                        <div class="absolute bg-indigo-500 rounded-md p-3">
                            <component
                                :is="item.icon"
                                class="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </div>
                        <p class="ml-16 text-sm font-medium text-gray-500 truncate">{{ item.name }}</p>
                    </dt>
                    <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                        <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
                        <p
                            :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']"
                        >
                            <ArrowSmUpIcon
                                v-if="item.changeType === 'increase'"
                                class="self-center flex-shrink-0 h-5 w-5 text-green-500"
                                aria-hidden="true"
                            />
                            <ArrowSmDownIcon
                                v-else
                                class="self-center flex-shrink-0 h-5 w-5 text-red-500"
                                aria-hidden="true"
                            />
                            <span
                                class="sr-only"
                            >{{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by</span>
                            {{ item.change }}
                        </p>
                        <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                            <div class="text-sm">
                                <a
                                    href="#"
                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    View all
                                    <span class="sr-only">{{ item.name }} stats</span>
                                </a>
                            </div>
                        </div>
                    </dd>
                </div>
            </dl>
        </div>

        <ul
            role="list"
            class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            <li
                v-for="person in people"
                :key="person.email"
                class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
                <div class="flex-1 flex flex-col p-8">
                    <img
                        class="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                        :src="person.imageUrl"
                        alt
                    />
                    <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ person.name }}</h3>
                    <dl class="mt-1 flex-grow flex flex-col justify-between">
                        <dt class="sr-only">Title</dt>
                        <dd class="text-gray-500 text-sm">{{ person.title }}</dd>
                        <dt class="sr-only">Role</dt>
                        <dd class="mt-3">
                            <span
                                class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                            >{{ person.role }}</span>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div class="-mt-px flex divide-x divide-gray-200">
                        <div class="w-0 flex-1 flex">
                            <a
                                :href="`mailto:${person.email}`"
                                class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                <MailIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span class="ml-3">Email</span>
                            </a>
                        </div>
                        <div class="-ml-px w-0 flex-1 flex">
                            <a
                                :href="`tel:${person.telephone}`"
                                class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                                <PhoneIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span class="ml-3">Call</span>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div> -->
</template>

<script setup>
import DefaultHeader from '../components/DefaultLayout/Header.vue'
import swal from '../store/swal'

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/vue/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/vue/outline'
import { MailIcon, PhoneIcon } from '@heroicons/vue/solid'
import { DotsVerticalIcon } from '@heroicons/vue/solid'



const stats = [
    { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: MailOpenIcon, change: '5.4%', changeType: 'increase' },
    { id: 3, name: 'Avg. Click Rate', stat: '24.57%', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
]

const people = [
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.adsttc.com/media/images/5f90/e509/63c0/1779/0100/010e/newsletter/3.jpg?1603331288',
    },
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
]

const projects = [
    { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
    { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
    { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
    { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },
]
</script>

<style>
</style>