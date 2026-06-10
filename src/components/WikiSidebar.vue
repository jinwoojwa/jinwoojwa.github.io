<template>
  <aside class="sidebar">
    <h2 class="brand-title" @click="goHome">🧠 My Wiki</h2>

    <div
      v-for="(files, category) in menuList"
      :key="category"
      class="category-group"
      :class="{ 'is-open': openedCategories[category] }"
    >
      <h3 @click="toggleCategory(category)">
        <span class="arrow">▶</span> {{ category }}
        <span class="count">({{ files.length }})</span>
      </h3>

      <ul v-if="openedCategories[category]">
        <li
          v-for="file in files"
          :key="file.filename"
          :class="{ active: currentFile === `${category}/${file.filename}` }"
          @click="selectFile(category, file.filename)"
        >
          {{ file.title }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import fm from 'front-matter';

const emit = defineEmits(['select-file', 'go-home']);
defineProps({
  currentFile: { type: String, default: '' },
});

const menuList = ref({});
const openedCategories = ref({});

onMounted(async () => {
  try {
    const response = await fetch('/docs/menu.json');
    if (!response.ok) throw new Error('메뉴 구조가 없습니다.');
    const rawMenu = await response.json();
    const parsedMenu = {};

    for (const category of Object.keys(rawMenu)) {
      parsedMenu[category] = [];
      for (const filename of rawMenu[category]) {
        try {
          const fileResp = await fetch(`/docs/${category}/${filename}`);
          if (fileResp.ok) {
            const text = await fileResp.text();
            const { attributes } = fm(text);
            parsedMenu[category].push({
              filename: filename,
              title: attributes.title || filename.replace('.md', ''),
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    menuList.value = parsedMenu;
    Object.keys(menuList.value).forEach((category, index) => {
      openedCategories.value[category] = index === 0;
    });
  } catch (error) {
    console.error('메뉴 로드 실패:', error);
  }
});

const toggleCategory = (category) => {
  openedCategories.value[category] = !openedCategories.value[category];
};

const selectFile = (category, filename) => {
  emit('select-file', category, filename);
};

const goHome = () => {
  emit('go-home');
};
</script>

<style scoped>
.sidebar {
  width: 260px;
  background-color: var(--bg-sidebar);
  padding: 24px 12px;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
}

.brand-title {
  font-size: 18px;
  color: var(--text-white);
  margin-bottom: 24px;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.15s ease;
}

.brand-title:hover {
  opacity: 0.8;
}

.category-group {
  margin-bottom: 8px;
}

.sidebar h3 {
  font-size: 13px;
  color: var(--text-muted);
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  user-select: none;
  transition: background-color 0.15s ease;
}

.sidebar h3:hover {
  background-color: var(--bg-hover);
  color: var(--text-white);
}

.sidebar h3 .arrow {
  font-size: 9px;
  margin-right: 8px;
  transition: transform 0.2s ease;
  display: inline-block;
}

.category-group.is-open h3 .arrow {
  transform: rotate(90deg);
  color: var(--color-primary);
}

.sidebar h3 .count {
  font-size: 11px;
  margin-left: auto;
  color: var(--text-muted);
  opacity: 0.6;
}

.sidebar ul {
  margin-top: 4px;
  margin-bottom: 12px;
  padding-left: 20px;
  border-left: 1px solid #333333;
  margin-left: 15px;
}

.sidebar li {
  padding: 6px 12px;
  margin-bottom: 2px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13.5px;
  color: #aaaaaa;
  position: relative;
  transition: all 0.15s ease;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.sidebar li:hover {
  background-color: var(--bg-hover);
  color: var(--text-white);
  padding-left: 16px;
}

.sidebar li.active {
  background-color: rgba(66, 184, 131, 0.15);
  color: var(--color-primary);
  font-weight: 600;
  padding-left: 16px;
}

.sidebar li.active::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background-color: var(--color-primary);
  border-radius: 50%;
}
</style>
