<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ScrollToTop from './components/ScrollToTop.vue';

const savedTheme = localStorage.getItem('theme');
const isLightMode = ref(savedTheme === 'light');

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

    <router-view />

    <AppFooter />
  </div>

  <ScrollToTop />
</template>
