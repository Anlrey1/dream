<template>
  <v-app>
    <!-- Шапка -->
    <v-app-bar app color="primary" dark>
      <v-container class="d-flex align-center">
        <v-toolbar-title class="font-weight-bold">
          Привет, {{ userName }}!
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span>Температура в {{ city }}: {{ temperature }}°C</span>
      </v-container>
    </v-app-bar>

    <!-- Основной контент -->
    <v-main>
      <!-- Блок с кнопками навигации (под шапкой) -->
      <v-container class="main-container">
        <v-row justify="center" wrap>
          <v-col
            v-for="(button, index) in navButtons"
            :key="index"
            cols="12"
            sm="6"
            md="3"
            class="mb-4"
          >
            <v-btn @click="navigateTo(button.path)" color="primary" block>
              {{ button.text }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- Контейнер для отображаемых компонентов -->
      <v-container>
        <router-view></router-view>
        <!-- Переключение между компонентами -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userName: "Ксюшенция",
      city: "Новосибирск",
      temperature: 22,
      navButtons: [
        { text: "Рецептты твоего завтрака", path: "/breakfast" },
        { text: "Сон в руку", path: "/dream" },
        { text: "Звёзды советуют", path: "/horoscope" },
        { text: "Новости города", path: "/news" },
      ],
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path); // Навигация по маршрутам
    },
  },
};
</script>

<style scoped>
/* Стиль для контейнера, который содержит основной контент */
.main-container {
  padding-top: 2rem; /* Добавим небольшой отступ сверху */
}

/* Фиксируем контейнер на всю высоту */
.fill-height {
  min-height: calc(100vh - 64px); /* Учитываем высоту шапки */
}

/* Применение flexbox для адаптивного размещения кнопок */
.v-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.v-col {
  max-width: 250px; /* Максимальная ширина для кнопок */
}
</style>
