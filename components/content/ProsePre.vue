<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ inheritAttrs: false }); // Vue가 style을 div에 강제 상속하지 않도록 차단

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
  style: {
    type: [String, Object],
    default: null,
  },
});

const copied = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>

<template>
  <div class="prose-code-wrapper">
    <span v-if="language" class="prose-lang-badge">{{ language }}</span>
    <button
      class="prose-copy-btn"
      :class="{ copied }"
      @click="copyToClipboard"
      title="Copy Code"
    >
      <svg
        v-if="!copied"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
    <pre :class="props.class" :style="props.style"><slot /></pre>
  </div>
</template>

<style scoped>
/* 코드 블록 래퍼 */
.prose-code-wrapper {
  position: relative;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}

/* 코드 블록(pre) 디자인 */
.prose-code-wrapper pre {
  position: relative;
  margin: 0;
  border: 1px solid #444c56;
  border-radius: 8px;
  padding: 36px 16px 16px 16px;
  overflow-x: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* 내부 텍스트(code) 스타일 (pre는 템플릿에 있으므로 code에만 deep 적용) */
.prose-code-wrapper :deep(code) {
  font-size: 90%;
}

/* 언어 배지 */
.prose-lang-badge {
  position: absolute;
  top: 0;
  left: 16px;
  z-index: 1;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: bold;
  color: #8b949e;
  background-color: #30363d;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  text-transform: uppercase;
  user-select: none;
}

/* 복사 버튼 */
.prose-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d333b;
  color: #c9d1d9;
  border: 1px solid #444c56;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.2s,
    background-color 0.2s;
}

.prose-code-wrapper:hover .prose-copy-btn {
  opacity: 1;
}

.prose-copy-btn:hover {
  background-color: #444c56;
}

.prose-copy-btn.copied {
  color: #3fb950;
}
</style>
