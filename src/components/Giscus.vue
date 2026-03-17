<script setup>
import { onMounted, ref } from 'vue';

const giscusContainer = ref(null);

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';

  // 본인의 giscus 설정값으로 교체해야함
  script.setAttribute('data-repo', 'jinwoojwa/jinwoojwa.github.io');
  script.setAttribute('data-repo-id', 'R_kgDORfG-lA');
  script.setAttribute('data-category', 'General');
  script.setAttribute('data-category-id', 'DIC_kwDORfG-lM4C4khG');

  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'bottom');
  script.setAttribute('data-theme', 'dark_dimmed');
  script.setAttribute('data-lang', 'ko');

  giscusContainer.value.appendChild(script);
});
</script>

<template>
  <div class="giscus-wrapper">
    <div ref="giscusContainer"></div>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid #30363d;
}
</style>
