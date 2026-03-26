<script setup>
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { posts } from '../utils/posts';
import { optimizeCloudinaryImages } from '../utils/cloudinary';
import NotFound from '../pages/NotFound.vue';
import Giscus from '../components/Giscus.vue';

const route = useRoute();

// 파라미터(slug)와 일치하는 포스트를 찾음. 없으면 undefined
const post = computed(() => {
  return posts.find((p) => p.slug === route.params.slug);
});

// Cloudinary 이미지가 포함된 마크다운 내용을 최적화
const optimizedContent = computed(() => {
  if (!post.value || !post.value.content) return '';
  // 원본 HTML(또는 마크다운) 내의 Cloudinary 주소를 변환해서 반환
  return optimizeCloudinaryImages(post.value.content);
});

// 글 데이터가 로드되면 제목 업데이트
watchEffect(() => {
  if (post.value) {
    document.title = `${post.value.title} | My DevLog`;
  }
});
</script>

<template>
  <div v-if="post" class="container">
    <article class="markdown-body">
      <h1>{{ post.title }}</h1>

      <div class="post-info">
        <div class="post-tags" v-if="post.tags">
          <router-link
            v-for="tag in post.tags"
            :key="tag"
            :to="{ path: '/', query: { tag: tag } }"
            class="tag-link"
          >
            #{{ tag }}
          </router-link>
        </div>
        <span class="date">{{ post.date }}</span>
      </div>

      <hr class="post-divider" />

      <div v-html="optimizedContent"></div>
    </article>

    <Giscus />
  </div>

  <NotFound v-else />
</template>

<style scoped>
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #8b949e;
  font-size: 0.9rem;
}

.date {
  color: #8b949e;
  font-size: 0.9rem;
}

.post-divider {
  border: 0;
  height: 1px;
  background-color: #30363d;
  margin: 40px auto;
}

.tag-link {
  color: #58a6ff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.tag-link:hover {
  color: #79c0ff;
  text-decoration: underline;
}
</style>
