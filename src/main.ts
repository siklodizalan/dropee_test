import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import lockScroll from "./directives/lock-scroll";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.directive("lock-scroll", lockScroll);

app.mount("#app");
