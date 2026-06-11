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
          <a :href="`#${item.id}`" @click.prevent="scrollToHeading(item.id)">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  content: { type: String, default: '' },
});

const toc = ref([]);

watch(
  () => props.content,
  async (newContent) => {
    if (!newContent) {
      toc.value = [];
      return;
    }

    await nextTick();
    generateTOC();
  },
  { immediate: true },
);

const generateTOC = () => {
  const viewerElement = document.querySelector('.markdown-body');
  if (!viewerElement) return;

  const headings = viewerElement.querySelectorAll('h2, h3');
  const tempToc = [];

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const depth = parseInt(heading.tagName.replace('H', ''), 10);

    tempToc.push({
      id: heading.id,
      text: heading.innerText || heading.textContent,
      depth: depth,
    });
  });

  toc.value = tempToc;
};

const scrollToHeading = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    window.history.pushState(null, null, `#${id}`);
  }
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

.toc-depth-2 {
  padding-left: 0;
}
.toc-depth-3 {
  padding-left: 12px;
  font-size: 0.95em;
}
.toc-depth-4 {
  padding-left: 24px;
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
