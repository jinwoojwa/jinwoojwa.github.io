<template>
  <aside v-if="toc.length > 0" class="toc-container">
    <div class="toc-sticky">
      <p class="toc-title">ON THIS PAGE</p>
      <ul>
        <li
          v-for="item in toc"
          :key="item.id"
          :class="`toc-depth-${item.depth}`"
        >
          <a :href="`#${item.id}`">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  // 본문 HTML 문자열을 주입받음
  content: { type: String, default: '' },
});

const toc = ref([]);

// 본문 내용이 변경될 때마다 목차를 새로 갱신
watch(
  () => props.content,
  async (newContent) => {
    if (!newContent) {
      toc.value = [];
      return;
    }

    // HTML이 실제 DOM에 렌더링된 이후에 태그를 추적해야 하므로 nextTick 처리
    await nextTick();
    generateTOC();
  },
  { immediate: true },
);

// 본문 내 제목 태그(H1, H2)를 파싱하는 함수
const generateTOC = () => {
  const viewerElement = document.querySelector('.markdown-body');
  if (!viewerElement) return;

  const headings = viewerElement.querySelectorAll('h1, h2');
  const tempToc = [];

  headings.forEach((heading, index) => {
    // 앵커 이동을 위해 ID가 부여되지 않은 태그에 고유 고리(ID) 삽입
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    tempToc.push({
      id: heading.id,
      text: heading.innerText,
      depth: heading.tagName === 'H1' ? 1 : 2,
    });
  });

  toc.value = tempToc;
};
</script>

<style scoped>
.toc-container {
  width: 220px;
  padding: 40px 20px 40px 0;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.toc-container::-webkit-scrollbar {
  display: none;
}

.toc-sticky {
  position: sticky;
  top: 40px;
  border-left: 1px solid var(--border-color);
  padding-left: 16px;
}

.toc-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.8px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.toc-sticky ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-sticky li {
  margin-bottom: 8px;
  line-height: 1.4;
}

.toc-sticky a {
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.15s ease;
  display: block;
}

.toc-sticky a:hover {
  color: var(--text-white);
}

.toc-depth-1 {
  padding-left: 0;
  font-weight: 500;
}
.toc-depth-2 {
  padding-left: 12px;
}
</style>
