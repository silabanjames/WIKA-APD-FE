import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import VueApexCharts from "vue3-apexcharts";
import 'bootstrap/dist/js/bootstrap.bundle'
import '@/assets/scss/app.scss'
import VueFeather from 'vue-feather';
// import { createI18n } from 'vue-i18n'
import en from './locales/en.json';
import pt from './locales/fr.json';
 import fr from './locales/pt.json';
import es from './locales/es.json';
import DropZone from "dropzone-vue";
import { defaultLocale, localeOptions } from './constants/config';
import Breadcrumbs from './components/bread_crumbs';
import Vue3Toasity from 'vue3-toastify';


const messages = { en: en, es: es, pt: pt, fr: fr};
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;

createApp(App).use(Vue3Toasity,{limit: 2}).use(DropZone).use(router).use(store).component("apexchart", VueApexCharts).component(VueFeather.name, VueFeather).component('Breadcrumbs', Breadcrumbs).mount('#app')

