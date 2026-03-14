import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import PostDetail from '../pages/PostDetail.vue';
import NotFound from '../pages/NotFound.vue';

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
    // 일치하는 주소가 없을 때 띄울 404 페이지
    // 반드시 기존 라우트들 아래에 위치해야 함
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
});

export default router;
