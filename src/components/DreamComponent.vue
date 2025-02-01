<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Сон в руку</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="dream"
          label="Введите описание вашего сна"
          outlined
        ></v-textarea>
        <v-btn color="primary" @click="parseDream">Узнать значение</v-btn>
      </v-card-text>
      <v-card-text v-if="dreamResult">
        <strong>Результат:</strong> {{ dreamResult }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DreamComponent",
  data() {
    return {
      dream: "",
      dreamResult: null,
    };
  },
  methods: {
    async parseDream() {
      this.dreamResult = `Значение сна "${this.dream}" - интерпретация ...`;
    },
  },
};
</script>
