<script setup>
import { useRoute } from 'vue-router';
import { posts } from '../utils/posts';
import NotFound from '../pages/NotFound.vue';

const route = useRoute();

// 파라미터(slug)와 일치하는 포스트를 찾음. 없으면 undefined
const post = posts.find((p) => p.slug === route.params.slug);
</script>

<template>
  <div v-if="post" class="container">
    <article class="markdown-body">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div>
    </article>
  </div>

  <NotFound v-else />
</template>
