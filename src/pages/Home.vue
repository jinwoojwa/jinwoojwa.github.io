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
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  transition: box-shadow 0.2s ease;
}

.post-card:hover {
  border-color: #8b949e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.post-card h2 {
  margin-top: 0;
}

.post-card p {
  margin-bottom: 0;
  color: #8b949e;
}

.post-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
