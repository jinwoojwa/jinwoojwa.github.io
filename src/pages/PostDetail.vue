<script setup>
import { useRoute } from 'vue-router';
import { posts } from '../utils/posts';
import MarkdownIt from 'markdown-it';

const route = useRoute();
const md = new MarkdownIt();

const post = posts.find((p) => p.slug === route.params.slug);

const html = md.render(post.content);
</script>

<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div v-html="html"></div>
  </div>
</template>
