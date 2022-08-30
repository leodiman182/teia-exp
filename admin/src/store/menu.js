import { createStore } from 'vuex'
import { HomeIcon, UsersIcon, GlobeIcon, CashIcon, StarIcon, PresentationChartBarIcon } from '@heroicons/vue/outline'

// Create a new store instance.
const store = createStore({
    state: {
        sidebarOpen: false,
        userNavigation: [
            // { name: 'Seu Perfil', to: '/profile' },
            // { name: 'Configuração', to: '#' },
        ],
        navigation: [
            { name: 'Dashboard', icon: HomeIcon, to: '/dashboard' },
            {
                name: 'Usuários',
                icon: UsersIcon,
                children: [
                    { name: 'Empresas', to: '/company' },
                    { name: 'Pessoas', to: '/person' },
                ],
            },
            {
                name: 'Experiências',
                icon: GlobeIcon,
                children: [
                    { name: 'TAGs', to: '/tag' },
                    { name: 'Categoria', to: '/category' },
                    { name: 'Experiências', to: '/experience' },
                ],
            },
            { name: 'Solicitão de Apresentação', icon: PresentationChartBarIcon, to: '/presentation' },
            {
                name: 'Teia Coins',
                icon: CashIcon,
                children: [
                    { name: 'Inserir por Empresa', to: '/insert-coin-company' },
                    // { name: 'Inserir por Pessoal', to: '/insert-coin-person' },
                    { name: 'Extrato de Teia Coins por Pessoa', to: '/insert-coin-extract' },
                ],
            },
            {
                name: 'Avaliação',
                icon: StarIcon,
                children: [
                    { name: 'Perguntas', to: '/dashboard' },
                    { name: 'Respostas dos usuários', to: '/dashboard' },
                ],
            },
        ]
    },
    getters: {},
    actions: {
    },
    mutations: {
    },
    modules: {},
})

export default store