<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const checkScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <Transition name="fade">
    <button v-show="isVisible" @click="scrollToTop" class="scroll-to-top">
      위로 가기
    </button>
  </Transition>
</template>

<style scoped>
/* Scroll to Top 버튼 */
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;

  /* 배경과 테두리, 그림자 모두 제거 */
  background-color: transparent;
  border: none;
  box-shadow: none;

  /* 글자 및 밑줄 스타일 */
  color: #c9d1d9;
  font-family: inherit;
  font-weight: bold;
  font-size: 1rem;

  text-decoration: underline;
  text-decoration-color: #58a6ff;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;

  padding: 10px;
  cursor: pointer;
  z-index: 1000;

  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

/* 마우스를 올렸을 때 */
.scroll-to-top:hover {
  transform: scale(1.15);
  color: #58a6ff;
}

/* 모바일 화면 */
@media (max-width: 600px) {
  .scroll-to-top {
    bottom: 20px;
    right: 20px;
    font-size: 0.9rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 라이트 모드 위로 가기(ScrollToTop) */
body.light-mode .scroll-to-top {
  color: #24292f;
  text-decoration-color: #0969da;
}

body.light-mode .scroll-to-top:hover {
  color: #0969da;
}
</style>
