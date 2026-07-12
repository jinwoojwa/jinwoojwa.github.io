<template>
  <aside class="sidebar">
    <h2 class="brand-title" @click="goHome">STUDY</h2>
    <div
      v-for="(subCategories, topCategory) in menuList"
      :key="topCategory"
      class="top-category-group"
      :class="{ 'is-open': openedTopCategories[topCategory] }"
    >
      <h2 class="top-category-title" @click="toggleTopCategory(topCategory)">
        <span class="arrow">▶</span>
        <span>{{ topCategory }}</span>
      </h2>
      <div v-if="openedTopCategories[topCategory]" class="sub-category-wrapper">
        <!-- 하위 카테고리가 없는 경우 (파일만 있는 경우) -->
        <ul v-if="subCategories._files" class="file-list is-root">
          <li
            v-for="file in subCategories._files"
            :key="file.filename"
            :class="{
              active: currentFile === `${topCategory}/${file.filename}`,
            }"
            @click="selectFile(topCategory, null, file.filename)"
          >
            {{ file.title }}
          </li>
        </ul>
        <!-- 하위 카테고리가 있는 경우 -->
        <div
          v-for="(files, subCategory) in subCategories"
          v-else
          :key="subCategory"
          class="category-group"
          :class="{
            'is-open': openedCategories[`${topCategory}/${subCategory}`],
          }"
        >
          <h3 @click="toggleCategory(topCategory, subCategory)">
            <span class="arrow">▶</span>
            <span class="sub-category-name">{{
              subCategories[subCategory].title || subCategory
            }}</span>
            <span class="count">({{ (files.files || files).length }})</span>
          </h3>

          <ul
            v-if="openedCategories[`${topCategory}/${subCategory}`]"
            class="file-list"
          >
            <li
              v-for="file in subCategories[subCategory].files || files"
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
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { matter } from 'gray-matter-es';

const emit = defineEmits(['select-file', 'go-home']);
const props = defineProps({
  currentFile: { type: String, default: '' },
});

const menuList = ref({});
const openedCategories = ref({});
const openedTopCategories = ref({});

const baseUrl = import.meta.env.BASE_URL;

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}docs/menu.json`);
    if (!response.ok) throw new Error('메뉴 구조가 없습니다.');
    const rawMenu = await response.json();
    const parsedMenu = {};

    for (const topCategory of Object.keys(rawMenu)) {
      parsedMenu[topCategory] = {};
      const subCategoriesOrFiles = rawMenu[topCategory];

      // 1. 최상위 카테고리 바로 아래에 파일 배열이 오는 경우
      if (Array.isArray(subCategoriesOrFiles)) {
        parsedMenu[topCategory]['_files'] = [];
        for (const filename of subCategoriesOrFiles) {
          try {
            const fileResp = await fetch(
              `${baseUrl}docs/${topCategory}/${filename}`,
            );
            if (fileResp.ok) {
              const text = await fileResp.text();
              const { data } = matter(text);
              parsedMenu[topCategory]['_files'].push({
                filename: filename,
                title: data.title || filename.replace('.md', ''),
              });
            }
          } catch (e) {
            console.error(`[${topCategory}/${filename}] 파일 처리 오류:`, e);
          }
        }
      }
      // 2. 기존처럼 하위 카테고리 객체가 오는 경우
      else {
        for (const subCategory of Object.keys(subCategoriesOrFiles)) {
          const subCategoryValue = subCategoriesOrFiles[subCategory];
          const isObjectWithTitle =
            typeof subCategoryValue === 'object' &&
            subCategoryValue.title &&
            Array.isArray(subCategoryValue.files);
          const files = isObjectWithTitle
            ? subCategoryValue.files
            : subCategoryValue;
          const fileList = [];

          for (const filename of files) {
            try {
              const fileResp = await fetch(
                `${baseUrl}docs/${topCategory}/${subCategory}/${filename}`,
              );
              if (fileResp.ok) {
                const text = await fileResp.text();
                const { data } = matter(text);
                fileList.push({
                  filename: filename,
                  title: data.title || filename.replace('.md', ''),
                });
              }
            } catch (e) {
              console.error(
                `[${topCategory}/${subCategory}/${filename}] 파일 처리 오류:`,
                e,
              );
            }
          }

          if (isObjectWithTitle) {
            parsedMenu[topCategory][subCategory] = {
              title: subCategoryValue.title,
              files: fileList,
            };
          } else {
            // 기존 구조와의 호환성을 위해 파일 목록을 직접 할당
            parsedMenu[topCategory][subCategory] = fileList;
          }
        }
      }
    }

    menuList.value = parsedMenu;
  } catch (error) {
    console.error('메뉴 로드 실패:', error);
  }
});

watch(
  () => props.currentFile,
  (newFile) => {
    if (!newFile) return;

    const pathParts = newFile.split('/');
    if (pathParts.length >= 2) {
      const topCategory = pathParts[0];
      openedTopCategories.value[topCategory] = true;

      if (pathParts.length > 2) {
        openedCategories.value[`${topCategory}/${pathParts[1]}`] = true;
      }
    }
  },
  { immediate: true },
);

const toggleTopCategory = (topCategory) => {
  openedTopCategories.value[topCategory] =
    !openedTopCategories.value[topCategory];
};

const toggleCategory = (topCategory, subCategory) => {
  const categoryKey = `${topCategory}/${subCategory}`;
  openedCategories.value[categoryKey] = !openedCategories.value[categoryKey];
};

const selectFile = (topCategory, subCategory, filename) => {
  // subCategory가 없는 경우(최상위 카테고리 바로 아래 파일) 경로를 다르게 전달
  const categoryPath = subCategory
    ? `${topCategory}/${subCategory}`
    : topCategory;
  emit('select-file', categoryPath, filename);
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

.top-category-group {
  margin-bottom: 16px;
}

.top-category-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-white);
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  user-select: none;
  transition: background-color 0.15s ease;
}

.top-category-title:hover {
  background-color: var(--bg-hover);
}

.top-category-group.is-open .top-category-title .arrow {
  transform: rotate(90deg);
  color: var(--color-primary);
}

.sub-category-wrapper {
  padding-left: 12px;
  margin-top: 4px;
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

.sidebar h3 .sub-category-name {
  color: var(--text-main);
  font-weight: 500;
}

.sidebar h3:hover {
  background-color: var(--bg-hover);
  color: var(--text-white);
}

.sidebar .arrow {
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

.sidebar .file-list.is-root {
  border-left: none;
  margin-left: 0;
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
