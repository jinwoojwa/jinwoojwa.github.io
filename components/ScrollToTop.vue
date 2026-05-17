<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const checkScroll = () => {
  const currentScroll =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  isVisible.value = currentScroll > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <ClientOnly>
    <Transition name="fade">
      <button v-if="isVisible" class="scroll-to-top" @click="scrollToTop">
        위로 가기
      </button>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;

  background-color: transparent;
  border: none;
  box-shadow: none;

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

  transition: all 0.3s ease;
}

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
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

body.light-mode .scroll-to-top {
  color: #24292f;
  text-decoration-color: #0969da;
}

body.light-mode .scroll-to-top:hover {
  color: #0969da;
}
</style>
