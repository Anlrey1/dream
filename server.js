require("dotenv").config(); // ✅ Загружаем переменные окружения из .env
const express = require("express");
const { Pool } = require("pg");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000; // 📌 Настраиваемый порт

// Создаём HTTP-сервер для Express и WebSocket
const server = http.createServer(app);

// Подключение к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // 📌 Railway требует SSL
});

// Проверяем подключение к БД
pool.connect()
  .then(() => console.log("✅ Подключено к PostgreSQL"))
  .catch((err) => {
    console.error("❌ Ошибка подключения к PostgreSQL:", err);
    server.close(() => process.exit(1)); // 📌 Закрываем сервер при ошибке БД
  });

// 📌 Проверка Express-сервера
app.get("/", (req, res) => {
  res.send("🚀 Бэкенд работает!");
});

// Создаём WebSocket-сервер
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("🔌 Новое WebSocket-соединение");

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message); // ✅ Парсим JSON
      console.log("📩 Получено сообщение:", data);

      if (data.type === "ping") {
        ws.send(JSON.stringify({ type: "pong" })); // ✅ Отвечаем "pong"
        return;
      }

      if (data.type === "save_message") {
        // 📌 Проверяем, что сообщение является строкой и не превышает 500 символов
        if (!data.message || typeof data.message !== "string" || data.message.length > 500) {
          ws.send(JSON.stringify({ type: "error", message: "Сообщение должно быть строкой до 500 символов!" }));
          return;
        }

        // 📌 Сохраняем сообщение в PostgreSQL
        const result = await pool.query(
          "INSERT INTO messages (text) VALUES ($1) RETURNING *",
          [data.message]
        );
        ws.send(JSON.stringify({ type: "db_response", message: result.rows[0] }));
      }
    } catch (error) {
      console.warn("⚠️ Ошибка обработки сообщения:", message);
      ws.send(JSON.stringify({ type: "error", message: "Невалидный JSON" }));
    }
  });

  // 📌 Обрабатываем разрыв соединения
  ws.on("close", () => {
    console.log("🔌 Клиент отключился");
  });

  // 📌 Обрабатываем pong от клиента
  ws.on("pong", () => {
    console.log("🔄 Клиент откликнулся на ping");
  });

  // ✅ Отправляем "ping" клиенту после подключения
  ws.send(JSON.stringify({ type: "ping" }));
});

console.log(`🚀 Используемый порт: ${port}`);
console.log(`🚀 WebSocket сервер запущен на ws://localhost:${port}`);

// 📌 Запускаем HTTP-сервер с обработкой ошибок
server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 HTTP сервер запущен на http://0.0.0.0:${port}`);
}).on("error", (err) => {
  console.error("❌ Ошибка запуска сервера:", err);
  process.exit(1);
});

// 📌 Обрабатываем завершение работы сервера
process.on("SIGINT", async () => {
  console.log("🛑 Остановка сервера...");
  wss.close();
  await pool.end(); // 📌 Закрываем соединение с БД
  console.log("✅ БД отключена.");
  process.exit(0);
});
