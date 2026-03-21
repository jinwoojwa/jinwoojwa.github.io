<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { posts } from '../utils/posts';
import TagFilter from '../components/TagFilter.vue'; // 태그 목록

const route = useRoute();

// 한 번에 보여줄 카드 개수 (10개)
const PAGE_SIZE = 10;
const displayCount = ref(PAGE_SIZE);

// 최신순 정렬
const sortedPosts = computed(() => {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
});

// URL 쿼리에 따라 필터링된 전체 글 목록
const allFilteredPosts = computed(() => {
  const tag = route.query.tag;
  const list = sortedPosts.value;

  if (!tag || tag === 'All') return list;
  return list.filter((p) => p.tags?.includes(tag));
});

// 실제 화면에 노출할 목록 (10개)
const displayedPosts = computed(() => {
  return allFilteredPosts.value.slice(0, displayCount.value);
});

// 더보기 클릭 함수
const loadMore = () => {
  displayCount.value += PAGE_SIZE;
};

// 태그가 바뀌면 다시 10개부터 보여주도록 리셋
watch(
  () => route.query.tag,
  () => {
    displayCount.value = PAGE_SIZE;
  },
);
</script>

<template>
  <div>
    <TagFilter />

    <TransitionGroup name="list" tag="div" class="post-list">
      <div v-for="post in displayedPosts" :key="post.slug" class="post-card">
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

    <div
      v-if="displayCount < allFilteredPosts.length"
      class="load-more-container"
    >
      <button @click="loadMore" class="load-more-btn">
        더보기 ({{ allFilteredPosts.length - displayCount }}개 남음)
      </button>
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
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
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

/* 더보기 버튼 스타일 */

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 40px 0 60px;
}

.load-more-btn {
  background-color: #21262d;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 12px 30px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.load-more-btn:hover {
  background-color: #30363d;
  border-color: #8b949e;
  transform: translateY(-2px);
}

.load-more-btn:active {
  transform: translateY(0);
}
</style>
