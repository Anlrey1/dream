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

// 📌 Подключение WebSocket перед монтированием приложения
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  console.log("✅ WebSocket подключен!");
  socket.send("ping"); // ✅ Отправляем "ping", чтобы убедиться, что соединение работает
};

socket.onerror = (err) => console.error("❌ Ошибка WebSocket:", err);

socket.onmessage = (msg) => {
  if (msg.data === "ping") return; // ✅ Игнорируем сообщения "ping", чтобы не вызывать обновления

  console.log("📩 Сообщение от сервера:", msg.data);
};

// 📌 Добавляем WebSocket в глобальное свойство Vue (чтобы использовать в компонентах)
app.config.globalProperties.$socket = socket;

app.mount("#app"); // ✅ Монтируем приложение
