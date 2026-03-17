<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { posts } from '../utils/posts';
import TagFilter from '../components/TagFilter.vue'; // 태그 목록

const route = useRoute();

// URL 쿼리에 따라 글 목록 필터링
const filteredPosts = computed(() => {
  const tag = route.query.tag;
  if (!tag || tag === 'All') return posts;
  return posts.filter((p) => p.tags?.includes(tag));
});
</script>

<template>
  <div>
    <TagFilter />

    <TransitionGroup name="list" tag="div" class="post-list">
      <div v-for="post in filteredPosts" :key="post.slug" class="post-card">
        <router-link :to="`/post/${post.slug}`">
          <h2>{{ post.title }}</h2>
          <p>{{ post.summary }}</p>

          <div class="post-meta">
            <div class="tags" v-if="post.tags && post.tags.length">
              <span v-for="tag in post.tags" :key="tag" class="tag-item">
                #{{ tag }}
              </span>
            </div>
            <span class="date">{{ post.date }}</span>
          </div>
        </router-link>
      </div>
    </TransitionGroup>
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

  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-card:hover {
  border-color: #8b949e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.post-card h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5rem;
  line-height: 1.4;

  display: -webkit-box;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1.4em;
}

.post-card p {
  margin-bottom: 0;
  color: #8b949e;
  line-height: 1.5;

  display: -webkit-box;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1.5em;
}

.post-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-meta,
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 15px;
  margin-bottom: 20px;
}

.date {
  font-size: 0.85rem;
  color: #8b949e;
  padding-bottom: 2px;
  line-height: 1;
}

/* 포스트 카드 안쪽 태그 스타일 */
.tags {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  font-size: 0.85rem;
  color: #58a6ff;
  background-color: #161b22;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid #30363d;
  display: inline-flex;
  align-items: center;
}

.post-card:hover .tag-item {
  border-color: #58a6ff; /* 카드 호버 시 태그 테두리 강조 */
}

/* 리스트 애니메이션 스타일 */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
/* 이동 중인 요소들 애니메이션 */
.list-move {
  transition: transform 0.4s ease;
}
</style>
