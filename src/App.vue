<template>
  <div class="wiki-container">
    <WikiSidebar
      :current-file="currentFile"
      @select-file="loadMarkdown"
      @go-home="resetToHome"
    />
    <main class="viewer">
      <article v-if="content" v-html="content" class="markdown-body"></article>
    </main>
    <WikiToc :content="content" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';
import fm from 'front-matter';
import WikiSidebar from './components/WikiSidebar.vue';
import WikiToc from './components/WikiToc.vue';

const currentFile = ref('');
const content = ref('');

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');

  if (pageParam) {
    const slashIndex = pageParam.indexOf('/');
    if (slashIndex !== -1) {
      const category = pageParam.substring(0, slashIndex);
      const filename = pageParam.substring(slashIndex + 1);
      loadMarkdown(category, filename);
    }
  } else {
    resetToHome();
  }
});

const loadMarkdown = async (category, filename) => {
  const filePath = `${category}/${filename}`;
  currentFile.value = filePath;

  const newUrl = `${window.location.origin}${window.location.pathname}?page=${filePath}`;
  window.history.pushState({ path: newUrl }, '', newUrl);

  try {
    const response = await fetch(`/docs/${filePath}`);
    if (response.ok) {
      const text = await response.text();
      const { body } = fm(text);
      content.value = await marked.parse(body);
    } else {
      content.value = `🛑 파일을 찾을 수 없습니다. (경로: /docs/${filePath})`;
    }
  } catch (error) {
    content.value = '🛑 파일을 불러오는 중 네트워크 오류가 발생했습니다.';
  }
};

const resetToHome = async () => {
  currentFile.value = '';

  const cleanUrl = `${window.location.origin}${window.location.pathname}`;
  window.history.pushState({ path: cleanUrl }, '', cleanUrl);

  try {
    const response = await fetch('/docs/home.md');
    if (response.ok) {
      const text = await response.text();
      const { body } = fm(text);
      content.value = await marked.parse(body);
    } else {
      content.value =
        '<h1>🏡 나만의 지식 위키</h1><p>공부한 내용을 카테고리별로 자유롭게 정리하는 공간입니다.</p>';
    }
  } catch (error) {
    content.value = '🛑 홈 페이지를 불러오는 중 오류가 발생했습니다.';
  }
};
</script>

<style scoped>
.wiki-container {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.viewer {
  flex: 1;
  padding: 40px 40px 40px 50px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.viewer::-webkit-scrollbar {
  display: none;
}

.placeholder {
  color: var(--text-muted);
  text-align: center;
  margin-top: 150px;
  font-size: 14px;
}
</style>
