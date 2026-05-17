<script setup>
import { ref, onMounted } from 'vue';

const isLightMode = ref(false);

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');

  isLightMode.value = savedTheme === 'light';

  if (isLightMode.value) {
    document.body.classList.add('light-mode');
  }
});

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value;

  if (isLightMode.value) {
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
};
</script>

<template>
  <!-- 우측 상단 테마 토글 버튼 -->
  <button
    class="theme-toggle-btn"
    @click="toggleTheme"
    aria-label="Toggle Theme"
  >
    {{ isLightMode ? '🌙' : '☀️' }}
  </button>

  <div class="container">
    <AppHeader />

    <NuxtPage />

    <AppFooter />
  </div>

  <ScrollToTop />
</template>

<style scoped>
.theme-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.theme-toggle-btn:hover {
  background-color: rgba(128, 128, 128, 0.2);
}
</style>
