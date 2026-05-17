<script setup>
import { computed } from 'vue';

const route = useRoute();

const { data: posts } = await useAsyncData('tags-posts', () =>
  queryCollection('content').where('path', 'LIKE', '/posts/%').all(),
);

// 현재 선택된 태그
const selectedTag = computed(() => route.query.tag || 'All');

// 전체 태그 추출
const allTags = computed(() => {
  const tags = new Set();

  if (!posts.value) return ['All'];

  posts.value.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  return ['All', ...Array.from(tags).sort()];
});

// 태그 선택
const selectTag = async (tag) => {
  await navigateTo({
    query: {
      ...route.query,
      tag: tag === 'All' ? undefined : tag,
    },
  });
};
</script>

<template>
  <div class="tag-filter">
    <button
      v-for="tag in allTags"
      :key="tag"
      :class="['filter-btn', { active: selectedTag === tag }]"
      @click="selectTag(tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<style scoped>
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #30363d;
}

.filter-btn {
  background: none;
  border: 1px solid #30363d;
  color: #8b949e;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #58a6ff;
  color: #58a6ff;
}
.filter-btn.active {
  background-color: #58a6ff;
  border-color: #58a6ff;
  color: #0d1117;
  font-weight: bold;
}
</style>
