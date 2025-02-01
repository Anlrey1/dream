<template>
  <v-app>
    <!-- Шапка -->
    <v-app-bar color="primary" dark>
      <v-container class="d-flex align-center">
        <v-toolbar-title class="font-weight-bold"
          >Привет, {{ userName }}!</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <span>Температура в {{ city }}: {{ temperature }}°C</span>
      </v-container>
    </v-app-bar>

    <!-- Основной контент -->
    <v-container class="mt-5">
      <!-- Навигация по страницам (рендерится только если есть вкладки) -->
      <v-tabs v-if="tabsReady" v-model="tab" background-color="blue" grow>
        <v-tab to="/dream">Сон в руку</v-tab>
        <v-tab to="/horoscope">Звёзды советуют</v-tab>
        <v-tab to="/breakfast">Рецепт твоего завтрака</v-tab>
        <v-tab to="/news">Новости города</v-tab>
      </v-tabs>

      <!-- Контент (меняется в зависимости от вкладки) -->
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userName: "Ксюха",
      city: "Новосибирск",
      temperature: 22,
      tab: null,
      tabsReady: false, // Флаг для включения v-tabs
    };
  },
  mounted() {
    // Задержка перед рендерингом вкладок (устраняет ошибку прокрутки)
    setTimeout(() => {
      this.tabsReady = true;
    }, 300);
  },
};
</script>
