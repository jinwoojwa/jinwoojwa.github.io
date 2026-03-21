import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// highlight.js 다크 테마 CSS
import 'highlight.js/styles/github-dark.css';

// CSS
import 'modern-css-reset';
import './assets/css/main.css';

createApp(App).use(router).mount('#app');
