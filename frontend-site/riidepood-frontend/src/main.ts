import VeeValidatePlugin from "./plugins/validation.js";
import router from "./router";
import { createPinia } from "pinia";
import { authentication } from "./plugins/authentication";
import { createApp } from "vue";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import "./styles/tables.css"

import App from "./App.vue";

const app = createApp(App)

app.use(createPinia())
app.use(VeeValidatePlugin);

authentication.install().then(()=>{
  app.use(router as any )
  app.mount('#app') 
})
