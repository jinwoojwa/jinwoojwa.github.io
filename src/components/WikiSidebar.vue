<template>
  <aside class="sidebar">
    <h2 class="brand-title" @click="goHome">STUDY</h2>

    <div v-for="(subCategories, topCategory) in menuList" :key="topCategory">
      <div
        v-for="(files, subCategory) in subCategories"
        :key="subCategory"
        class="category-group"
        :class="{
          'is-open': openedCategories[`${topCategory}/${subCategory}`],
        }"
      >
        <h3 @click="toggleCategory(topCategory, subCategory)">
          <span class="arrow">▶</span>
          <span class="top-category-name">{{ topCategory.split('.')[1] }}</span>
          <span class="sub-category-name">{{ subCategory }}</span>
          <span class="count">({{ files.length }})</span>
        </h3>

        <ul
          v-if="openedCategories[`${topCategory}/${subCategory}`]"
          class="file-list"
        >
          <li
            v-for="file in files"
            :key="file.filename"
            :class="{
              active:
                currentFile ===
                `${topCategory}/${subCategory}/${file.filename}`,
            }"
            @click="selectFile(topCategory, subCategory, file.filename)"
          >
            {{ file.title }}
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { matter } from 'gray-matter-es';

const emit = defineEmits(['select-file', 'go-home']);
defineProps({
  currentFile: { type: String, default: '' },
});

const menuList = ref({});
const openedCategories = ref({});

const baseUrl = import.meta.env.BASE_URL;

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}docs/menu.json`);
    if (!response.ok) throw new Error('메뉴 구조가 없습니다.');
    const rawMenu = await response.json();
    const parsedMenu = {};

    for (const topCategory of Object.keys(rawMenu)) {
      parsedMenu[topCategory] = {};
      const subCategories = rawMenu[topCategory];
      for (const subCategory of Object.keys(subCategories)) {
        parsedMenu[topCategory][subCategory] = [];
        for (const filename of subCategories[subCategory]) {
          try {
            const fileResp = await fetch(
              `${baseUrl}docs/${topCategory}/${subCategory}/${filename}`,
            );
            if (fileResp.ok) {
              const text = await fileResp.text();
              const { data } = matter(text);
              parsedMenu[topCategory][subCategory].push({
                filename: filename,
                title: data.title || filename.replace('.md', ''),
              });
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    }

    menuList.value = parsedMenu;
    Object.keys(menuList.value).forEach((topCategory, topIndex) => {
      Object.keys(menuList.value[topCategory]).forEach(
        (subCategory, subIndex) => {
          const categoryKey = `${topCategory}/${subCategory}`;
          openedCategories.value[categoryKey] =
            topIndex === 0 && subIndex === 0;
        },
      );
    });
  } catch (error) {
    console.error('메뉴 로드 실패:', error);
  }
});

const toggleCategory = (topCategory, subCategory) => {
  const categoryKey = `${topCategory}/${subCategory}`;
  openedCategories.value[categoryKey] = !openedCategories.value[categoryKey];
};

const selectFile = (topCategory, subCategory, filename) => {
  emit('select-file', `${topCategory}/${subCategory}`, filename);
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

.sidebar h3 .top-category-name {
  color: var(--text-muted);
  margin-right: 6px;
}

.sidebar h3 .sub-category-name {
  color: var(--text-main);
  font-weight: 500;
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

.sidebar .file-list {
  margin-top: 4px;
  margin-bottom: 12px;
  padding-left: 20px;
  border-left: 1px solid #333333;
  margin-left: 15px;
}

.sidebar .file-list li {
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

.sidebar .file-list li:hover {
  background-color: var(--bg-hover);
  color: var(--text-white);
  padding-left: 16px;
}

.sidebar .file-list li.active {
  background-color: rgba(66, 184, 131, 0.15);
  color: var(--color-primary);
  font-weight: 600;
  padding-left: 16px;
}

.sidebar .file-list li.active::before {
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
