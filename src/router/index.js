import { createRouter, createWebHistory } from "vue-router";

// Импортируем компоненты **динамически** (ленивая загрузка)
const DreamComponent = () => import("@/components/DreamComponent.vue");
const HoroscopeComponent = () => import("@/components/HoroscopeComponent.vue");
const BreakfastComponent = () => import("@/components/BreakfastComponent.vue");
const NewsComponent = () => import("@/components/NewsComponent.vue");

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
