import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { auth } from './firebase/config';

let app;

// when the user has already been received from Firebase
auth.onAuthStateChanged(() => {
  // render the app only once on page load/refresh
  if (!app) {
    app = createApp(App)
      .use(createPinia())
      .use(router)
      .mount('#app');
  }
});
