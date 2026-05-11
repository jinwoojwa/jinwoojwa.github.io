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

    // 목차 생성 후 현재 스크롤 위치에 맞춰 초기 활성화 상태 업데이트
    updateActiveId();
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

  const updateActiveId = () => {
    if (!contentRef.value) return;
    const headers = contentRef.value.querySelectorAll('h2, h3');

    let currentId = '';
    for (const header of headers) {
      // 브라우저 화면 상단 기준으로 일정 여백(예: 100px) 안에 들어오면 활성 상태로 간주
      if (header.getBoundingClientRect().top <= 100) {
        currentId = header.id;
      } else {
        // 스크롤 아래에 있는 헤더를 만나면 루프를 종료
        break;
      }
    }
    activeId.value = currentId;
  };

  onMounted(() => {
    window.addEventListener('scroll', updateActiveId);
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveId);
  });

  return { toc, activeId, generateToc, scrollToId };
}
