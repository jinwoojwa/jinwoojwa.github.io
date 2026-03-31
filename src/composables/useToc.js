import { ref, watch, nextTick } from 'vue';

export function useToc(contentRef) {
  const toc = ref([]);

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
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return { toc, generateToc, scrollToId };
}
