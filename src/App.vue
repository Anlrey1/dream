<template>
  <v-app>
    <!-- Шапка -->
    <v-app-bar color="primary" dark>
      <v-container class="d-flex align-center">
        <v-toolbar-title class="font-weight-bold">
          Привет, {{ userName }}!
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span>Температура в {{ city }}: {{ temperature }}°C</span>
      </v-container>
    </v-app-bar>

    <!-- Основной контент -->
    <v-container class="mt-12">
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
      userName: "Ксюшенция",
      city: "Новосибирск",
      temperature: 22,
    };
  },
  mounted() {
    console.log("✅ App.vue: Компонент успешно смонтирован");
  },
  beforeUpdate() {
    console.log("🔄 App.vue: Компонент обновляется!");
  },
};
</script>
