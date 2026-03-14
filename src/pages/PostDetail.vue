<script setup>
import { useRoute } from 'vue-router';
import { posts } from '../utils/posts';

const route = useRoute();

const post = posts.find((p) => p.slug === route.params.slug);
</script>

<template>
  <div class="container">
    <article class="markdown-body">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div>
    </article>
  </div>
</template>
