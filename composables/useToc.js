import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export function useToc(contentRef) {
  const toc = ref([]);
  const activeId = ref('');

  const generateToc = async () => {
    await nextTick();

    const contentEl = contentRef.value;
    if (!contentEl) return;

    const headers = contentEl.querySelectorAll('h2, h3');

    toc.value = Array.from(headers).map((header, index) => {
      const id = header.id || `header-${index}`;
      header.id = id;

      return {
        id,
        text: header.innerText,
        level: header.tagName,
      };
    });

    updateActiveId();
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  const updateActiveId = () => {
    if (!contentRef.value) return;

    const headers = contentRef.value.querySelectorAll('h2, h3');

    let currentId = '';

    for (const header of headers) {
      if (header.getBoundingClientRect().top <= 100) {
        currentId = header.id;
      } else break;
    }

    activeId.value = currentId;
  };

  onMounted(() => {
    if (import.meta.server) return;
    window.addEventListener('scroll', updateActiveId);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveId);
  });

  return { toc, activeId, generateToc, scrollToId };
}
