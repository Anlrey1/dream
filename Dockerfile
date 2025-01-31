# Базовый образ
FROM node:16

# Установка рабочей директории
WORKDIR /app

# Копирование файлов проекта
COPY package*.json ./
RUN npm install

COPY . .

# Сборка Vue приложения
RUN npm run build

# Запуск приложения
CMD ["npm", "run", "serve"]
