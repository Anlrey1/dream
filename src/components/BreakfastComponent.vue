<template>
  <v-container>
    <h1>Рецептты твоего завтрака</h1>
    <v-btn color="primary" @click="fetchRecipe">Получить рецепт</v-btn>
    <v-card v-if="recipe" class="mt-3 pa-3">
      <h3>{{ recipe.title }}</h3>
      <p>{{ recipe.description }}</p>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "BreakfastComponent",
  data() {
    return {
      recipe: null,
    };
  },
  methods: {
    fetchRecipe() {
      // Здесь можно сделать API-запрос на сайт с рецептами
      this.recipe = {
        title: "Омлет с с сыром",
        description: "Простой и вкусный рецепт для завтрака.",
      };
    },
  },
};
</script>
