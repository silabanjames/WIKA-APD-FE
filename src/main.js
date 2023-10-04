import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@/assets/scss/app.scss'
import VueFeather from 'vue-feather';
// import { createI18n } from 'vue-i18n'
import en from './locales/en.json';
import pt from './locales/fr.json';
 import fr from './locales/pt.json';
import es from './locales/es.json';
import { defaultLocale, localeOptions } from './constants/config';
import Breadcrumbs from './components/bread_crumbs';

const messages = { en: en, es: es, pt: pt, fr: fr};
 const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;

createApp(App).use(router).use(store).component(VueFeather.name, VueFeather).component('Breadcrumbs', Breadcrumbs).mount('#app')
