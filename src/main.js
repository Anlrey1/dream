import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"; // ✅ Подключаем Vuetify

const app = createApp(App);

app.use(router); // ✅ Подключаем маршрутизацию
app.use(vuetify); // ✅ Подключаем Vuetify

app.mount("#app"); // ✅ Монтируем приложение
