import Vue from 'vue';
import VueRouter from 'vue-router';

import Dream from '@/components/Dream.vue';
import Horoscope from '@/components/Horoscope.vue';
import Breakfast from '@/components/Breakfast.vue';
import News from '@/components/News.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/dream', component: Dream },
  { path: '/horoscope', component: Horoscope },
  { path: '/breakfast', component: Breakfast },
  { path: '/news', component: News },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
