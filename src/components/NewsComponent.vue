<template>
  <v-container>
    <v-card>
      <v-card-title>Новости города</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(news, index) in newsList" :key="index">
            <v-list-item-title>{{ news.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ news.description }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newsList: [
        { title: "Новость 1", description: "Описание новости 1" },
        { title: "Новость 2", description: "Описание новости 2" },
        { title: "Новость 3", description: "Описание новости 3" },
      ],
    };
  },
};
</script>
