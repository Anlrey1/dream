# Базовый образ
FROM node:18

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости, включая concurrently (добавляем его в devDependencies)
RUN npm install concurrently --save-dev
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Открываем порты (Vue.js и WebSocket)
EXPOSE 8080 3000

# Запуск Vue.js и WebSocket одновременно
CMD ["npx", "concurrently", "--kill-others", "npm run serve", "npm run websocket"]
