<script setup>
import { posts } from '../utils/posts';
</script>

<template>
  <div>
    <div v-for="post in posts" :key="post.slug" class="post-card">
      <router-link :to="`/post/${post.slug}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* ===============================
   Post Card (포스트 목록)
   =============================== */
.post-card {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  transition: box-shadow 0.2s ease;
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-card h2 {
  margin-top: 0;
}

.post-card p {
  margin-bottom: 0;
  color: #57606a;
}

/* 카드 내부 링크 기본 스타일 제거 (글씨색 유지, 밑줄 제거) */
.post-card a {
  text-decoration: none;
  color: inherit;
  display: block; /* 클릭 영역을 카드 전체로 넓힘 */
}
</style>
