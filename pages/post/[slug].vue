<script setup>
import { ref, onMounted, nextTick } from 'vue';

const route = useRoute();
const contentBody = ref(null);

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryCollection('content').path(`/posts/${route.params.slug}`).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post Not Found',
    fatal: true,
  });
}

// SEO
useSeoMeta({
  title: `${post.value.title} | My DevLog`,
  description: post.value.summary || post.value.meta?.summary,
  // Open Graph (카카오톡, 페이스북, 슬랙 등 공유 썸네일/설명)
  ogTitle: `${post.value.title} | My DevLog`,
  ogDescription: post.value.summary || post.value.meta?.summary,
  ogType: 'article',
  articlePublishedTime: post.value.date || post.value.meta?.date,
  // Twitter 카드 설정
  twitterCard: 'summary',
  twitterTitle: `${post.value.title} | My DevLog`,
  twitterDescription: post.value.summary || post.value.meta?.summary,
});

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://jinwoojwa.github.io${route.path}`,
    },
  ],
});

const { toc, activeId, generateToc, scrollToId } = useToc(contentBody);

onMounted(async () => {
  await nextTick();
  generateToc();
});
</script>

<template>
  <div class="post-layout container">
    <article class="markdown-body post-main">
      <h1>{{ post.title }}</h1>

      <div class="post-info">
        <div class="post-tags">
          <NuxtLink
            v-for="tag in post.tags || post.meta?.tags"
            :key="tag"
            :to="{ path: '/', query: { tag } }"
            class="tag-link"
          >
            #{{ tag }}
          </NuxtLink>
        </div>

        <span class="date">
          {{ post.date || post.meta?.date }}
        </span>
      </div>

      <hr class="post-divider" />

      <div ref="contentBody" class="content-body">
        <ContentRenderer :value="post" />
      </div>

      <Giscus />
    </article>

    <aside class="toc-wrapper">
      <nav class="toc-content">
        <p class="toc-title">ON THIS PAGE</p>

        <ul class="toc-list">
          <li
            v-for="item in toc"
            :key="item.id"
            :class="[
              'toc-item',
              `level-${item.level}`,
              { active: activeId === item.id },
            ]"
            @click="scrollToId(item.id)"
          >
            {{ item.text }}
          </li>
        </ul>
      </nav>
    </aside>
  </div>
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
  max-height: calc(
    100vh - 220px
  ); /* 상단 여백(100px) + 하단 여백 및 버튼 크기(약 120px) 제외 */
  overflow-y: auto;
  display: none;
}

/* TOC 영역 얇은 스크롤바 적용 */
.toc-wrapper::-webkit-scrollbar {
  width: 4px;
}
.toc-wrapper::-webkit-scrollbar-thumb {
  background-color: #30363d;
  border-radius: 4px;
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

.toc-item:hover,
.toc-item.active {
  color: #58a6ff;
  border-left: 2px solid #58a6ff;
  padding-left: 15px;
}

.level-H3 {
  padding-left: 32px;
  font-size: 0.8rem;
}
</style>
