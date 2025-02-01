import { createRouter, createWebHistory } from "vue-router";

// Импортируем компоненты
import DreamComponent from "@/components/DreamComponent.vue";
import HoroscopeComponent from "@/components/HoroscopeComponent.vue";
import BreakfastComponent from "@/components/BreakfastComponent.vue";
import NewsComponent from "@/components/NewsComponent.vue";

const routes = [
  { path: "/", redirect: "/dream" },
  { path: "/dream", component: DreamComponent },
  { path: "/horoscope", component: HoroscopeComponent },
  { path: "/breakfast", component: BreakfastComponent },
  { path: "/news", component: NewsComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
