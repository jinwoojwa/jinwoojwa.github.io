<script setup>
import { posts } from '../utils/posts';
</script>

<template>
  <div>
    <h1>My Blog</h1>

    <div v-for="post in posts" :key="post.slug">
      <router-link :to="`/post/${post.slug}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </router-link>
    </div>
  </div>
</template>
