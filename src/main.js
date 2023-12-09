import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faCamera,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import router from './router';
import App from './App.vue';

library.add(faSearch);
library.add(faCamera);
library.add(faPenToSquare);
library.add(faTrash);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
