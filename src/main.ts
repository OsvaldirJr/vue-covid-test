import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router";
import store from "./stores/dataStore";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.config.globalProperties.$store = store;
app.use(router);
app.use(VueAxios, axios);
app.use(store);
app.use(VueSweetalert2);
app.use(createPinia());

app.mount("#app");
