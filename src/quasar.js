import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

import { Quasar, Notify, Loading, Dialog } from 'quasar'

Vue.use(Quasar, {
    config: {
        dark: true,
        notify: {},
        loading: {}
    },
    components: { /* not needed if importStrategy is not 'manual' */ },
    directives: { /* not needed if importStrategy is not 'manual' */ },
    plugins: {
        Notify,
        Loading,
        Dialog
    },
})
