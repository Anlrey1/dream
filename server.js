const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 }); // WebSocket-сервер на порту 8080

wss.on("connection", (ws) => {
  console.log("Новое WebSocket-соединение");

  ws.on("message", (message) => {
    console.log("Получено сообщение: ", message);

    // ❌ Убираем автоответ при подключении
    if (message !== "ping") {
      ws.send("Ответ от сервера: " + message);
    }
  });

  // ✅ Добавляем простую проверку соединения, чтобы избежать циклов
  ws.send("ping");
});

console.log("WebSocket сервер запущен на ws://localhost:8080");
