import { createApp } from 'vue'
import store from './store'
import router from './router'
import './index.css'
import 'flowbite';
import App from './App.vue'

//Tooltip
import VueTippy from 'vue-tippy'
import 'tippy.js/themes/light.css'

//ALERT
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
//fortawesome
import faIcon from "./plugins/fontawesome";



createApp(App)
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .component("font-awesome-icon", faIcon)
    .use(
        VueTippy,
        // optional
        {
            directive: 'tippy', // => v-tippy
            component: 'tippy', // => <tippy/>
            componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
            defaultProps: {
                placement: 'auto-end',
                allowHTML: true,
            }, // => Global default options * see all props
        }
    )
    .mount('#app')
