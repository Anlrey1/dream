import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"; // ✅ Подключаем Vuetify

const app = createApp(App);
console.log(
  "Telegram WebApp:",
  window.Telegram ? window.Telegram.WebApp : "Не найден"
);

app.use(router); // ✅ Подключаем маршрутизацию
app.use(vuetify); // ✅ Подключаем Vuetify

app.mount("#app"); // ✅ Монтируем приложение
