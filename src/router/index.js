import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import PostDetail from '../pages/PostDetail.vue';
import NotFound from '../pages/NotFound.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'My DevLog' },
    },
    {
      path: '/post/:slug',
      name: 'PostDetail',
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

// 페이지 이동 후 제목 변경 로직
router.afterEach((to) => {
  const baseTitle = 'My DevLog';
  // 메타 정보가 있으면 사용하고, 없으면 기본 제목 사용
  document.title = to.meta.title || baseTitle;
});

export default router;
