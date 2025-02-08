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
  socket.send(JSON.stringify({ type: "ping" })); // ✅ Отправляем "ping" в формате JSON
};

socket.onerror = (err) => console.error("❌ Ошибка WebSocket:", err);

socket.onmessage = (msg) => {
  try {
    const data = JSON.parse(msg.data);

    if (data.type === "ping") return; // ✅ Игнорируем сообщения "ping", чтобы не вызывать обновления

    console.log("📩 Сообщение от сервера:", data);
  } catch (error) {
    console.warn("⚠️ Получено невалидное сообщение от сервера:", msg.data);
  }
};

// 📌 Добавляем WebSocket в глобальное свойство Vue (чтобы использовать в компонентах)
app.config.globalProperties.$socket = socket;

app.mount("#app"); // ✅ Монтируем приложение
