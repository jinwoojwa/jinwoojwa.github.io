import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import PostDetail from '../pages/PostDetail.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/post/:slug',
      component: PostDetail,
    },
  ],
});

export default router;
