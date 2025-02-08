require("dotenv").config(); // ✅ Загружаем переменные окружения из .env
const express = require("express");
const { Pool } = require("pg");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000; // 📌 Делаем порт настраиваемым

// Создаём HTTP-сервер для Express и WebSocket
const server = http.createServer(app);

// Подключение к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // 📌 Railway требует SSL
});

// Проверяем подключение к БД
pool
  .connect()
  .then(() => console.log("✅ Подключено к PostgreSQL"))
  .catch((err) => {
    console.error("❌ Ошибка подключения к PostgreSQL:", err);
    process.exit(1);
  });

// 📌 Простая проверка Express-сервера
app.get("/", (req, res) => {
  res.send("🚀 Бэкенд работает!");
});

// Создаём WebSocket-сервер на том же HTTP-сервере
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
        // 📌 Проверяем, есть ли сообщение
        if (!data.message || typeof data.message !== "string") {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Сообщение должно быть строкой!",
            })
          );
          return;
        }

        // 📌 Сохраняем сообщение в PostgreSQL
        const result = await pool.query(
          "INSERT INTO messages (text) VALUES ($1) RETURNING *",
          [data.message]
        );
        ws.send(
          JSON.stringify({ type: "db_response", message: result.rows[0] })
        );
      }
    } catch (error) {
      console.warn("⚠️ Ошибка обработки сообщения:", message);
      ws.send(JSON.stringify({ type: "error", message: "Невалидный JSON" }));
    }
  });

  // ✅ Отправляем "ping" клиенту после подключения
  ws.send(JSON.stringify({ type: "ping" }));
});

console.log(`🚀 WebSocket сервер запущен на ws://localhost:${port}`);

// 📌 Запускаем HTTP-сервер (Express + WebSocket)
server.listen(port, () => {
  console.log(`🚀 HTTP сервер запущен на http://localhost:${port}`);
});

// 📌 Обрабатываем завершение работы сервера
process.on("SIGINT", () => {
  console.log("🛑 Остановка сервера...");
  wss.close(() => {
    console.log("✅ WebSocket-сервер остановлен.");
    process.exit(0);
  });
});
