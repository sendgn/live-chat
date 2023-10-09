import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { auth } from './firebase/config';

let app;

// render the app only once on page (re)load and when the user
// has already been received from Firebase
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(createPinia())
      .use(router)
      .mount('#app');
  }
});
