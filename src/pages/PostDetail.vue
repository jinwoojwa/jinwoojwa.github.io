<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { posts } from '../utils/posts';
import { optimizeCloudinaryImages } from '../utils/cloudinary';
import { renderMarkdown } from '../utils/markdown';
import { useToc } from '../composables/useToc';
import NotFound from '../pages/NotFound.vue';
import Giscus from '../components/Giscus.vue';

const route = useRoute();

const contentBody = ref(null);

const { toc, generateToc, scrollToId } = useToc(contentBody);

// 현재 포스트 데이터 계산
const post = computed(() => {
  return posts.find((p) => p.slug === route.params.slug);
});

// 마크다운 변환 + 이미지 최적화
const optimizedContent = computed(() => {
  if (!post.value || !post.value.content) return '';
  const htmlContent = renderMarkdown(post.value.content);
  // 원본 HTML(또는 마크다운) 내의 Cloudinary 주소를 변환해서 반환
  return optimizeCloudinaryImages(htmlContent);
});

// 콘텐츠 변경 시마다 목차 재생성
watch(
  optimizedContent,
  () => {
    generateToc();
  },
  { immediate: true },
);

// 브라우저 탭 제목 업데이트
watchEffect(() => {
  if (post.value) {
    document.title = `${post.value.title} | My DevLog`;
  }
});
</script>

<template>
  <div v-if="post" class="post-layout container">
    <article class="markdown-body post-main">
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

      <div
        ref="contentBody"
        class="content-body"
        v-html="optimizedContent"
      ></div>

      <Giscus />
    </article>

    <aside class="toc-wrapper">
      <nav class="toc-content">
        <p class="toc-title">ON THIS PAGE</p>
        <ul class="toc-list">
          <li
            v-for="item in toc"
            :key="item.id"
            :class="['toc-item', `level-${item.level}`]"
            @click="scrollToId(item.id)"
          >
            {{ item.text }}
          </li>
        </ul>
      </nav>
    </aside>
  </div>

  <NotFound v-else />
</template>

<style scoped>
.post-layout {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 60px;
  width: 100%;
}

.post-main {
  flex: 0 0 720px;
  width: 720px;
  min-width: 0;
}

@media (max-width: 1099px) {
  .post-main {
    flex: 1;
    width: 100%;
    max-width: 720px;
  }
}

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

/* TOC 스타일 */
.toc-wrapper {
  flex: 0 0 240px;
  width: 240px;
  position: sticky;
  top: 100px;
  height: fit-content;
  display: none;
}
@media (min-width: 1100px) {
  .toc-wrapper {
    display: block; /* 화면이 넓을 때만 노출 */
  }
}
.toc-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #8b949e;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.toc-list {
  list-style: none;
  padding: 0;
  border-left: 1px solid #30363d;
}

.toc-item {
  font-size: 0.85rem;
  color: #8b949e;
  padding: 6px 16px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;
}

.toc-item:hover {
  color: #58a6ff;
  border-left: 2px solid #58a6ff;
  padding-left: 15px;
}

.level-H3 {
  padding-left: 32px;
  font-size: 0.8rem;
}
</style>
