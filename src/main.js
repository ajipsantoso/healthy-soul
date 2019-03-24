import Vue from 'vue';
import firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faPaperPlane,
  faSearch,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './firebase/firebaseInit';

library.add(faUser, faPaperPlane, faSearch, faExclamationCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
localStorage.clear();
let app;
// eslint-disable-next-line
firebase.auth().onAuthStateChanged( user =>{
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
