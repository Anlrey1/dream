<template>
  <v-container>
    <h1>Звёзды советуют</h1>
    <p>Ваш гороскоп на сегодня:</p>
    <v-card class="pa-3">
      {{ horoscope }}
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "HoroscopeComponent",
  data() {
    return {
      horoscope: "Сегодня вас ждёт удача и успех!",
    };
  },
};
</script>
